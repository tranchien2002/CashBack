import Vue from 'vue';
import Vuex from 'vuex';
import { Harmony } from '@harmony-js/core';
import { ChainID, ChainType, fromWei, hexToNumber, Units } from '@harmony-js/utils';
const {
  encode,
  decode,
  randomBytes,
  toBech32,
  fromBech32,
  HarmonyAddress,
  generatePrivateKey,
  getPubkeyFromPrivateKey,
  getAddressFromPublicKey,
  getAddressFromPrivateKey,
  encryptPhrase,
  decryptPhrase
} = require('@harmony-js/crypto');
import Market from '@/contracts/Market.json';
import { getOneBalance, getPointBalance, getRate } from '@/actions';

const GAS_LIMIT = 6721900;
const GAS_PRICE = 1000000000;
const options = {
  gasPrice: GAS_PRICE,
  gasLimit: GAS_LIMIT
};
const hmy = new Harmony('https://api.s0.t.hmny.io', {
  chainID: ChainID.HmyMainnet,
  chainType: ChainType.Harmony
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mathWallet: null,
    account: null,
    oneBalance: 0,
    pointBalance: 0,
    withdrawableStake: 0,
    market: null,
    sellingItems: [],
    buyBackRate: 0,
    interestRate: 0,
    itemsOf: []
  },
  mutations: {
    setMathWallet(state, payload) {
      state.mathWallet = payload.mathWallet;
    },
    setAccount(state, payload) {
      state.account = payload.account;
      state.oneBalance = payload.oneBalance;
      state.pointBalance = payload.pointBalance;
      state.withdrawableStake = payload.withdrawable;
    },
    setMarket(state, payload) {
      state.market = payload.market;
    },
    setSellingItems(state, payload) {
      state.sellingItems = payload.sellingItems;
    },
    setRate(state, payload) {
      state.buyBackRate = payload.buyBackRate;
      state.interestRate = payload.interestRate;
    },
    setItemsOf(state, itemsOf) {
      state.itemsOf = itemsOf;
    }
  },
  actions: {
    async loadWallet({ commit, state }) {
      let mathWallet = window.harmony;
      const session = localStorage.getItem('harmony_session');
      const sessionObj = JSON.parse(session);
      if (sessionObj && sessionObj.account) {
        commit('setMathWallet', { mathWallet });
        let market = state.market;
        let account = sessionObj.account;
        let withdrawable = 0;
        if (market) {
          let address = hmy.crypto.getAddress(account.address).checksum;
          withdrawable = await market.methods.getWithdrawableStake(address).call(options);
        }
        let oneBalance = await getOneBalance(account.address);
        let pointBalance = await getPointBalance(account.address);

        commit('setAccount', { account, oneBalance, pointBalance, withdrawable });
      }
      let { interestRate, buyBackRate } = await getRate();
      commit('setRate', { interestRate, buyBackRate });
    },

    syncLocalStorage({ commit }, { account, sessionType }) {
      console.log('sync', account, sessionType);
      localStorage.setItem(
        'harmony_session',
        JSON.stringify({
          account: account,
          sessionType: sessionType
        })
      );
    },

    signInWallet({ dispatch, commit, state }) {
      let isMathWallet = window.harmony && window.harmony.isMathWallet;
      if (isMathWallet) {
        let mathWallet = window.harmony;
        mathWallet.getAccount().then(async account => {
          commit('setMathWallet', { mathWallet });

          let market = state.market;
          let withdrawable = 0;
          if (market) {
            let address = hmy.crypto.getAddress(account.address).checksum;
            withdrawable = await market.methods.getWithdrawableStake(address).call(options);
          }

          let oneBalance = await getOneBalance(account.address);
          let pointBalance = await getPointBalance(account.address);

          commit('setAccount', { account, oneBalance, pointBalance, withdrawable });
          dispatch('syncLocalStorage', { account: account, sessionType: 'mathWallet' });
        });
      }
    },

    signOutWallet({ dispatch, commit }) {
      let isMathWallet = window.harmony && window.harmony.isMathWallet;
      if (isMathWallet) {
        let mathwallet = window.harmony;
        mathwallet.forgetIdentity().then(() => {
          commit('setAccount', { account: null });
          dispatch('syncLocalStorage', { account: null, mathWallet: null });
        });
      }
    },

    async initMarket({ commit }) {
      let marketAddress = Market.networks[ChainID.HmyMainnet].address;
      const addr = new HarmonyAddress(marketAddress);
      console.log(addr, 'address');
      if (marketAddress) {
        let market = hmy.contracts.createContract(Market.abi, marketAddress);
        commit('setMarket', { market });
      } else {
        console.error('Market contract not found');
      }
    },

    async fetchSellingItems({ commit, state }) {
      let market = state.market;
      if (market) {
        let sellingItemIds = await market.methods.getSellingItems().call(options);
        let sellingItems = [];
        if (sellingItemIds) {
          sellingItems = await Promise.all(
            sellingItemIds.map(async id => {
              let itemInfo = await market.methods.getItemById(parseInt(id)).call(options);
              let item = {
                id: id.toNumber(),
                price: parseInt(itemInfo[0]) / 10 ** 18,
                imageUrl: itemInfo[2],
                itemType: parseInt(itemInfo[3]),
                name: itemInfo[4]
              };
              return item;
            })
          );
        }
        commit('setSellingItems', { sellingItems });
      }
    },

    async withdraw({ dispatch, state }, amount) {
      let market = state.market;
      if (market) {
        try {
          market.wallet.defaultSigner = hmy.crypto.getAddress(state.account.address).checksum;
          market.wallet.signTransaction = async tx => {
            try {
              tx.from = hmy.crypto.getAddress(state.account.address).checksum;
              const signTx = await window.harmony.signTransaction(tx);
              return signTx;
            } catch (e) {
              console.log(e);
            }
          };
        } catch (e) {
          console.log(e);
        }
        await market.methods
          .withdrawStake(amount.toString())
          .send({ ...options })
          .then(e => {
            dispatch('loadWallet');
          });
      }
    },
    async getItemsOf({ commit, state }, account) {
      let market = state.market;
      let address = hmy.crypto.getAddress(account.address).checksum;
      if (market) {
        let resItemsOf = await market.methods.itemsOf(address).call(options);
        let itemsOf = [];
        if (resItemsOf) {
          itemsOf = await Promise.all(
            resItemsOf.map(async id => {
              let itemInfo = await market.methods.getItemById(parseInt(id)).call(options);
              let item = {
                id: id.toNumber(),
                price: parseInt(itemInfo[0]) / 10 ** 18,
                imageUrl: itemInfo[2],
                itemType: parseInt(itemInfo[3]),
                name: itemInfo[4]
              };
              return item;
            })
          );
        }
        commit('setItemsOf', itemsOf);
      }
    }
  },
  modules: {}
});
