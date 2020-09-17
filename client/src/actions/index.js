const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');
const Market = require('@/contracts/Market.json');

const GAS_LIMIT = 6721900;
const GAS_PRICE = 1000000000;
require('dotenv').config();

const options = {
  gasLimit: GAS_LIMIT,
  gasPrice: GAS_PRICE
};

const hmy = new Harmony('https://api.s0.t.hmny.io', {
  chainID: ChainID.HmyMainnet,
  chainType: ChainType.Harmony
});

const pointJson = require('../contracts/Point.json');

const pointAddress = pointJson.networks[ChainID.HmyMainnet].address;

let marketAddress = Market.networks[ChainID.HmyMainnet].address;

let market = hmy.contracts.createContract(Market.abi, marketAddress);

exports.getOneBalance = async function(oneAddress) {
  try {
    let data = await hmy.blockchain.getBalance({
      address: oneAddress
    });
    return parseInt(parseInt(data.result) / 10 ** 18);
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.getPointBalance = async function(oneAddress) {
  try {
    const address = hmy.crypto.getAddress(oneAddress).checksum;
    const point = hmy.contracts.createContract(pointJson.abi, pointAddress);

    let result = await point.methods.balanceOf(address).call(options);
    return parseInt(result);
  } catch (error) {
    return error;
  }
};

exports.getRate = async function() {
  try {
    let interestRate = await market.methods.interestRate().call(options);
    let buyBackRate = await market.methods.buyBackRate().call(options);
    return { interestRate: parseInt(interestRate), buyBackRate: parseInt(buyBackRate) / 10 };
  } catch (error) {
    return error;
  }
};

// this.getOneBalance('one12j4ycvnta3l68ep28lpe73n20wx470yfzq9uf3');
// this.getPointBalance('one12j4ycvnta3l68ep28lpe73n20wx470yfzq9uf3');
