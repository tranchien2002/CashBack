const { Harmony } = require('@harmony-js/core');
const { ChainID, ChainType } = require('@harmony-js/utils');
const GAS_LIMIT = 6721900;
const GAS_PRICE = 1000000000;
const Scripts = require('./scripts');

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

const rate = 86;
const interestRate = 2;
const items = [
  {
    name: 'Shirt 01',
    price: '1000000000000000000000',
    imageUrl:
      'https://contents.mediadecathlon.com/p1484240/k$ab565f3675dbdd7e3c486175e2c16583/travel-100-men-s-trekking-shirt-maroon.jpg',
    itemType: '0'
  },
  {
    name: 'Shirt 02',
    price: '19000000000000000000000',
    imageUrl:
      'https://kathmandu.imgix.net/catalog/product/1/5/15108_605_federatewomenslsshirt_v2_a.jpg',
    itemType: '0'
  },
  {
    name: 'Shirt 03',
    price: '12000000000000000000000',
    imageUrl:
      'https://outdoor-and-country-res.cloudinary.com/image/upload/e_trim:2/bo_8px_solid_white/c_pad,b_white,w_1000,h_1200,f_auto,q_auto/v1540205233/product/186710.jpg',
    itemType: '0'
  },
  {
    name: 'T-shirt 01',
    price: '70000000000000000000000',
    imageUrl: 'https://cf.shopee.vn/file/80196bdbee4665d42649feb9e66bf169',
    itemType: '1'
  },
  {
    name: 'Dúi Idol 1 T-shirt',
    price: '4000000000000000000000',
    imageUrl:
      'https://product.hstatic.net/1000088324/product/tw059t_t_c8e9fb4c17cf431faf8e8a586c838d5b_b37591efefa0489e9b6f12c5fa066254_master.jpg',
    itemType: '1'
  },
  {
    name: 'Dúi Idol 2 T-shirt',
    price: '6000000000000000000000',
    imageUrl:
      'https://product.hstatic.net/1000088324/product/tw059d-t_41af870f300748849befd5bd94b364b6_6e3068531be3421f80db4f177b91d01a_master.jpg',
    itemType: '1'
  },
  {
    name: 'Jeans 01',
    price: '4000000000000000000000',
    imageUrl: 'https://anninc.scene7.com/is/image/LO/538256_9435?$pdp2x$',
    itemType: '2'
  },
  {
    name: 'Jeans 02',
    price: '6000000000000000000000',
    imageUrl:
      'https://gloimg.zafcdn.com/zaful/pdm-product-pic/Clothing/2019/09/30/source-img/20190930153238_15097.jpg',
    itemType: '2'
  },
  {
    name: 'Jeans 03',
    price: '6000000000000000000000',
    imageUrl:
      'https://www.america-today.com/dw/image/v2/BBPV_PRD/on/demandware.static/-/Sites-at-master-catalog/default/dw767cbce1/images/product/mom-jeans-jadan-b-women-blue-2112002032-376-h.jpg',
    itemType: '2'
  },
  {
    name: 'Shoes 01',
    price: '12000000000000000000000',
    imageUrl:
      'https://assets.ajio.com/medias/sys_master/root/h5a/h59/13018715881502/-1117Wx1400H-460342492-blue-MODEL.jpg',
    itemType: '3'
  },
  {
    name: 'Shoes 02',
    price: '16000000000000000000000',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0258/2485/4100/products/flatheads-ooof-denim-shoes-diagonal_fd366257-38b1-4b29-ad5f-689450b29622_400x.jpg',
    itemType: '3'
  },
  {
    name: 'Shoes 03',
    price: '16000000000000000000000',
    imageUrl: 'https://img0.junaroad.com/uiproducts/14494337/zoom_0-1512382271.jpg',
    itemType: '3'
  },
  {
    name: 'Hat 01',
    price: '9000000000000000000000',
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/dfad6b12-71f9-4709-9851-7999516e11f1/legacy91-golf-hat-KN3jRL.jpg',
    itemType: '4'
  },
  {
    name: 'Hat 02',
    price: '9000000000000000000000',
    imageUrl:
      'https://assets.adidas.com/images/w_600,f_auto,q_auto/0bab92c0bc66495bb1b9a6eb015b211e_9366/Originals_Relaxed_Strap_Back_Hat_Black_BH7137.jpg',
    itemType: '4'
  },
  {
    name: 'Hat 03',
    price: '9000000000000000000000',
    imageUrl: 'https://cdn.shopify.com/s/files/1/1430/6402/products/hat_hat_2048x2048.jpg',
    itemType: '4'
  }
];

module.exports = async () => {
  try {
    // Setup for Market
    const market = hmy.contracts.createContract(marketJson.abi, marketAddress);
    market.wallet.addByPrivateKey(process.env.MAINNET_PRIVATE_KEY);
    const txnSetup = hmy.transactions.newTx({
      to: marketAddress
    });
    await market.wallet.signTransaction(txnSetup);
    await market.methods
      .setPointContract(pointAddress.toString())
      .send(options)
      .then(result => {
        // console.log(result);
        console.log('Setup point contract successfully!');
      })
      .catch(error => {
        console.log('Setup point contract error', error);
      });

    await market.methods
      .setBuyBackRate(rate)
      .send(options)
      .then(result => {
        // console.log(result);
        console.log('Setup rate successfully!');
      })
      .catch(error => {
        console.log('Setup rate error', error);
      });

    await market.methods
      .setInterestRate(interestRate)
      .send(options)
      .then(result => {
        // console.log(result);
        console.log('Setup interest rate successfully!');
      })
      .catch(error => {
        console.log('Setup interest rate error', error);
      });

    // Add Market Contract Address to Point'miters array
    const point = hmy.contracts.createContract(pointJson.abi, pointAddress);
    point.wallet.addByPrivateKey(process.env.MAINNET_PRIVATE_KEY);

    const txnSetupMinter = hmy.transactions.newTx({
      to: pointAddress
    });

    await point.wallet.signTransaction(txnSetupMinter);
    await point.methods
      .addMinter(marketAddress)
      .send(options)
      .then(result => {
        // console.log(result);
        console.log('Setup minter successfully!');
      })
      .catch(error => {
        console.log('Setup minter error', error);
      });

    const txnPause = hmy.transactions.newTx({
      to: pointAddress
    });

    await point.wallet.signTransaction(txnPause);
    await point.methods
      .pause()
      .send(options)
      .then(result => {
        // console.log(result);
        console.log('Pause successfully!');
      })
      .catch(error => {
        console.log('Pause error', error);
      });

    await Scripts.setupItems(items);

    console.log('ALL SETUP SUCCESSFULLY!');
    process.exit();
  } catch (error) {
    console.log('SETUP FAILED!: ', error);
    process.exit();
  }
};
