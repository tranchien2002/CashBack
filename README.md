<h1 align="center">Welcome to CashBack 👋</h1>
<p align="center">
  <img src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
</p>

![](/imageReadme/cover.png)

## Description

Buyback is an e-commerce platform that allows users to purchase items for a payback in the form of ERC20. Each product will have a corresponding payback rate. After being reimbursed in ERC20 form, users can staking that amount of ERC20 to be able to Yield Farming to generate a corresponding ONE, after each day 2% of the ERC20 is converted to ONE. Users can withdraw the converted ONE at any time they want, however when withdrawing the ERC20 amount will be burned corresponding to the percentage of ONE withdrawn.

## Functionality

#### What CashBack does :

- Users buy the product and get a 8.6% payback of the product value, which is created in the form of a Sun token. After each day, the amount of ONE newly created will be equal to 2% of the amount of Sun tokens the user is holding. This amount of One, users can withdraw to MathWallet at any time.
- Users withdraw ONE interest generated from staking Sun. After ONE withdrawal, the amount of Sun tokens will be destroyed corresponding to the percentage of One withdrawn.
  **Example**: There are 20 ONE and 1000 Sun tokens, withdraw 10 ONE to the wallet, users will only have 500 Sun tokens. From there the interest per day will be calculated based on the remaining Sun tokens

#### In the future:

- First,we are building a cross-chain protocol with cosmos - this product will be like a the bridge between Harmony and ETH - from which users can buy and sell products on the Cashback floor with existing tokens.
  <p align="center">
    <img src="/imageReadme/token.png" />
  </p>

- Next we want to make Cashback a marketplace where people can sell their products at their own rates of return (the competition benefits the buyers). Successful transactions will be charged and this fee will be used to pay bonuses to those who are staking ERC20 cash back when buying items.
  <p align="center">
    <img src="/imageReadme/marketplace.jpg" />
  </p>

## How we built it

Buyback is built on 2 smart contracts, Market and Point. Market is used to coordinate activities on exchanges such as buying, selling, withdrawing money, ... Contract Point is a temporarily customized ERC20 contract that cannot be transferred between accounts, but will only play the role is staking and to calculate the amount of daily ONE that a user will be paid for by staking.

On the client side, we use vuejs to build, combined with harmony-sdk to help users interact with the application through MathWallet.Users buy and sell as well as keep Erc20 cash back through mathWallet

## Activity diagram

Users will have 2 main streams to interact with Cashback

- Buy item activity :

<p align="center">
  <img src="/imageReadme/BuyDiagram.png" />
</p>

- Withdraw interest activity:

<p align="center">
  <img src="/imageReadme/WithdrawDiagram.png" />
</p>

## Using

- Landing page:

<p align="center">
  <img src="/imageReadme/01-landing.png" />
</p>

- Market - Where you can choose product to buy:

  <p align="center">
    <img src="/imageReadme/02-markets.png" />
  </p>

- Select item:

  <p align="center">
    <img src="/imageReadme/03-jeans.png" />
  </p>

- You must sign in before buying and sign transaction:
  <p align="center">
    <img src="/imageReadme/05-buy-01.png" />
  </p>

- Transaction successful:
  <p align="center">
    <img src="/imageReadme/06-buy-02.png" />
  </p>
- Show purchased products:
  <p align="center">
    <img src="/imageReadme/07-my-products.png" />
  </p>
- Interest will be increased daily based on the amount of Sun coin you hold:
  <p align="center">
    <img src="/imageReadme/08-account-01.png" />
  </p>
- You can withdraw the interest at any time but the sun coin will be burned:
  <p align="center">
    <img src="/imageReadme/09-account-02.png" />
  </p>

## Project setup (testnet)

#### Setup contract :

- Load dependencies:

```
cd contract
yarn install
```

- Copy .env file:

```
//LOCAL
//Local uses account one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7 on Shard 0
LOCAL_PRIVATE_KEY='45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e'
LOCAL_MNEMONIC='urge clog right example dish drill card maximum mix bachelor section select'
LOCAL_0_URL='http://localhost:9500'

//TESTNET
//Account: one18t4yj4fuutj83uwqckkvxp9gfa0568uc48ggj7
TESTNET_PRIVATE_KEY='01F903CE0C960FF3A9E68E80FF5FFC344358D80CE1C221C3F9711AF07F83A3BD'
TESTNET_ADDRESS = 'one18t4yj4fuutj83uwqckkvxp9gfa0568uc48ggj7'
TESTNET_MNEMONIC='urge clog right example dish drill card maximum mix bachelor section select'

TESTNET_0_URL='https://api.s0.b.hmny.io'
TESTNET_1_URL='https://api.s1.b.hmny.io'

//MAINNET
//Please replace MAINNET_PRIVATE_KEY and MAINNET_MNEMONIC with your own!
//Account: one18t4yj4fuutj83uwqckkvxp9gfa0568uc48ggj7
MAINNET_PRIVATE_KEY='01F903CE0C960FF3A9E68E80FF5FFC344358D80CE1C221C3F9711AF07F83A3BD'
MAINNET_MNEMONIC='urge clog right example dish drill card maximum mix bachelor section select'
MAINNET_0_URL='https://api.s0.t.hmny.io'

GAS_LIMIT=3321900
GAS_PRICE=1000000000
```

- Deploy contract:

**Note:** Config in **contract/scripts/\*** to deploy in TESTNET

- You must change network **ChainID.HmyMainnet** -> **ChainID.HmyTestnet**
- MAINNET_PRIVATE_KEY -> TESTNET_PRIVATE_KEY
- MAINNET_0_URL -> TESTNET_0_URL

```
yarn all
```

#### Setup client:

- Load dependencies:

```
cd client
yarn install
```

- Run

```
yarn serve
```
