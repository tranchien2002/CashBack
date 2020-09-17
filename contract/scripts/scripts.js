const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');

const GAS_LIMIT = 6721900;
const GAS_PRICE = 1000000000;
require('dotenv').config();

const options = {
  gasLimit: GAS_LIMIT,
  gasPrice: GAS_PRICE
};

const hmy = new Harmony(process.env.MAINNET_0_URL, {
  chainId: ChainID.HmyMainnet,
  chainType: ChainType.Harmony
});

const pointJson = require('../../client/src/contracts/Point.json');
const marketJson = require('../../client/src/contracts/Market.json');

const pointAddress = pointJson.networks[ChainID.HmyMainnet].address;
const marketAddress = marketJson.networks[ChainID.HmyMainnet].address;
// console.log(pointAddress);

exports.mintPoint = async function (oneAddress, amount) {
  try {
    let address = hmy.crypto.getAddress(oneAddress).checksum;
    const point = hmy.contracts.createContract(pointJson.abi, pointAddress);
    point.wallet.addByPrivateKey(process.env.MAINNET_PRIVATE_KEY);

    const mintTx = hmy.transactions.newTx({
      to: pointAddress
    });

    await point.wallet.signTransaction(mintTx);
    await point.methods
      .mint(address, amount)
      .send(options)
      .then(result => {
        // console.log(result);
        console.log('Mint successfully!');
      })
      .catch(error => {
        console.log('Mint error', error);
      });
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

exports.createItem = async function (name, price, oneAddress, imageUrl, itemType) {
  try {
    let address = hmy.crypto.getAddress(oneAddress).checksum;
    console.log('hmy', address);
    const market = hmy.contracts.createContract(marketJson.abi, marketAddress);
    market.wallet.addByPrivateKey(process.env.MAINNET_PRIVATE_KEY);

    const sellTx = hmy.transactions.newTx({
      to: marketAddress
    });

    await market.wallet.signTransaction(sellTx);
    await market.methods
      .sell(name, price, address, imageUrl, itemType)
      .send(options)
      .then(result => {
        // console.log(result);
        console.log('Sell successfully!');
      })
      .catch(error => {
        console.log('Sell error', error);
      });
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

exports.getItemById = async function (itemId) {
  try {
    const market = hmy.contracts.createContract(marketJson.abi, marketAddress);
    let item = await market.methods.getItemById(itemId).call(options);
    console.log(item);
    return item;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.getAllItems = async function () {
  try {
    const market = hmy.contracts.createContract(marketJson.abi, marketAddress);
    let allItems = await market.methods.getAllItems().call(options);
    console.log(allItems);
    return allItems;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.buyItem = async function (itemId, price) {
  try {
    const market = hmy.contracts.createContract(marketJson.abi, marketAddress);
    market.wallet.addByPrivateKey(process.env.MAINNET_PRIVATE_KEY);

    const buyTx = hmy.transactions.newTx({
      to: marketAddress
    });

    await market.wallet.signTransaction(buyTx);
    await market.methods
      .buy(itemId)
      .send({ ...options, value: price })
      .then(result => {
        // console.log(result);
        console.log('Buy successfully!');
      })
      .catch(error => {
        console.log('Buy error', error);
      });
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.getStakeBalance = async function (oneAddress) {
  try {
    let address = hmy.crypto.getAddress(oneAddress).checksum;
    const market = hmy.contracts.createContract(marketJson.abi, marketAddress);
    let balance = await market.methods.userBalance(address).call(options);
    console.log(balance);
    return balance;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.getWithdrawableStake = async function (oneAddress) {
  try {
    let address = hmy.crypto.getAddress(oneAddress).checksum;
    const market = hmy.contracts.createContract(marketJson.abi, marketAddress);
    let ableWithdraw = await market.methods.getWithdrawableStake(address).call(options);
    console.log('withdraw', ableWithdraw);
    return ableWithdraw;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.withdrawStake = async function (amount) {
  try {
    const market = hmy.contracts.createContract(marketJson.abi, marketAddress);
    market.wallet.addByPrivateKey(process.env.MAINNET_PRIVATE_KEY);

    const withdrawTx = hmy.transactions.newTx({
      to: marketAddress
    });
    await market.wallet.signTransaction(withdrawTx);
    await market.methods
      .withdrawStake(amount)
      .send(options)
      .then(result => {
        console.log(result);
        console.log('Withdraw successfully!');
      })
      .catch(error => {
        console.log('Withdraw error', error);
      });
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.getSellingItem = async function (index) {
  try {
    const market = hmy.contracts.createContract(marketJson.abi, marketAddress);
    let sellingItems = await market.methods.sellingItems(index).call(options);
    console.log(sellingItems);
    return sellingItems;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.getSellingItems = async () => {
  try {
    const market = hmy.contracts.createContract(marketJson.abi, marketAddress);
    console.log(market.methods.getSellingItems().call);
    let sellingItems = await market.methods.getSellingItems().call(options);
    console.log(sellingItems);
    return sellingItems;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.getBuyerItems = async function (oneAddress) {
  try {
    let address = hmy.crypto.getAddress(oneAddress).checksum;
    const market = hmy.contracts.createContract(marketJson.abi, marketAddress);
    let items = await market.methods.itemsOf(address).call(options);
    console.log(items);
    return items;
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.setupItems = async function (items) {
  const address = hmy.crypto.getAddress(process.env.MAINNET_ADDRESS).checksum;
  const market = hmy.contracts.createContract(marketJson.abi, marketAddress);
  market.wallet.addByPrivateKey(process.env.MAINNET_PRIVATE_KEY);

  const sellTx = hmy.transactions.newTx({
    to: marketAddress
  });
  await market.wallet.signTransaction(sellTx);

  for (let i = 0; i < items.length; i++) {
    await market.methods
      .sell(items[i].name, items[i].price, address, items[i].imageUrl, items[i].itemType)
      .send(options)
      .then(result => {
        // console.log(result);
        console.log(`Sell items[${i}] successfully!`);
      })
      .catch(error => {
        throw Error(`Sell items[${i}] `, error);
      });
  }
  return;
};

exports.getOneBalance = async function (oneAddress) {
  try {
    let data = await hmy.blockchain.getBalance({
      address: oneAddress
    });
    return parseInt(data.result);
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.getPointBalance = async function (oneAddress) {
  try {
    const address = hmy.crypto.getAddress(oneAddress).checksum;
    const point = hmy.contracts.createContract(pointJson.abi, pointAddress);

    let data = await point.methods.balanceOf(address).call(options);
    console.log(parseInt(data));
    return parseInt(data);
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.withdraw = async function () {
  try {
    const market = hmy.contracts.createContract(marketJson.abi, marketAddress);
    market.wallet.addByPrivateKey(process.env.MAINNET_PRIVATE_KEY);

    const withdrawTx = hmy.transactions.newTx({
      to: marketAddress
    });

    await market.wallet.signTransaction(withdrawTx);
    await market.methods
      .withdraw()
      .send({ ...options })
      .then(result => {
        // console.log(result);
        console.log('Withdraw successfully!');
      })
      .catch(error => {
        console.log('Withdraw error', error);
      });
    return;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// this.mintPoint(process.env.USER1_ADDRESS, '1000000000000000000');
// this.createItem(
//   'Shirt 01',
//   '200000000000000000',
//   process.env.MAINNET_ADDRESS,
//   'https://kathmandu.imgix.net/catalog/product/1/5/15108_605_federatewomenslsshirt_v2_a.jpg',
//   0
// );
// this.getItemById(0);
// this.getAllItems();
// this.getSellingItem(0);
// this.getSellingItems();
// this.buyItem(0, '200000000000000000');
// this.getBuyerItems(process.env.USER1_ADDRESS);
// this.getStakeBalance(process.env.USER1_ADDRESS);
// this.getWithdrawableStake(process.env.USER1_ADDRESS);
// this.withdrawStake(344000000000000);
// this.getOneBalance('one12j4ycvnta3l68ep28lpe73n20wx470yfzq9uf3');
// this.getPointBalance('one12j4ycvnta3l68ep28lpe73n20wx470yfzq9uf3');
// this.withdraw();
