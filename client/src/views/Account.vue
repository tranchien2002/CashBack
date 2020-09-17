<template>
  <div class="content-account" v-loading="loading">
    <header-componet />

    <div class="balance-and-points">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <div class="center-content">
            <h3 class="text-balance">Balance</h3>
            <p class="balance-amount">
              <b>{{ oneBalance }}</b> <span>ONE</span>
            </p>
          </div>
        </el-col>
        <el-col :span="12"
          ><div class="center-content">
            <h3 class="text-points">Sun Coin</h3>
            <p class="points-amount">
              <b>{{ (pointBalance / 10 ** 18).toFixed(2) }}</b> <span>SUN</span>
            </p>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="cashback">
      <div class="box-cashback">
        <h3>Interest</h3>
        <div class="arrow-top">
          <div class="chevron"></div>
          <div class="chevron"></div>
          <div class="chevron"></div>
        </div>
        <div class="cashback-amount">
          <b>{{ (withdrawableStake / 10 ** 18).toFixed(3) }}</b
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <span>ONE</span>
          <strong class="interest-rate"> + ( {{ interestRate }}% / day ) </strong>
        </div>
        <br />
        <form id="form" method="post" action="">
          <div class="flex">
            <span class="currency">ONE</span>
            <input
              :value="sliderValue"
              placeholder="Amount"
              :max="withdrawableStake"
              min="0"
              @input="updateWithdrawValue"
              type="number"
            />
          </div>
          <br />
        </form>
        <range-slider class="slider" min="0" :max="withdrawValue" step="0.01" v-model="sliderValue">
        </range-slider>
        <br />
        <el-button
          type="primary"
          round
          class="btn-witdraw"
          @click="withdrawModal = true"
          :disabled="sliderValue <= 0"
          ><i class="el-icon-download"></i> Withdraw</el-button
        >
      </div>
    </div>
    <el-dialog title="" :visible.sync="withdrawModal" width="30%" center>
      <span
        >You will withdraw {{ sliderValue }} corresponding to {{ pointBurn.toFixed(2) }} of Sun coin
        will be burned</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="withdrawModal = false">Cancel</el-button>
        <el-button type="primary" @click="withdrawOne">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import RangeSlider from 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';
import HeaderComponet from '@/components/HeaderComponent';
import { mapState, mapActions } from 'vuex';
import { Harmony } from '@harmony-js/core';
import { ChainID, ChainType } from '@harmony-js/utils';

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

export default {
  components: { HeaderComponet, RangeSlider },
  name: 'account',
  data() {
    return {
      isLoginModalVisible: false,
      sliderValue: 0,
      withdrawModal: false,
      loading: false
    };
  },
  computed: {
    ...mapState([
      'mathWallet',
      'pointBalance',
      'oneBalance',
      'withdrawableStake',
      'interestRate',
      'buyBackRate',
      'market',
      'account'
    ]),
    pointBurn: function() {
      if (this.withdrawableStake > 0) {
        return (this.sliderValue * this.pointBalance) / this.withdrawableStake;
      } else {
        return 0;
      }
    },
    withdrawValue: {
      get: function() {
        return this.withdrawableStake / 10 ** 18;
      }
    }
  },
  methods: {
    ...mapActions([
      'signInWallet',
      'signOutWallet',
      'loadWallet',
      'withdraw',
      'initMarket',
      'withdraw'
    ]),
    updateWithdrawValue(e) {
      const value = e.target.value;
      if (value > this.withdrawableStake) {
        this.sliderValue = this.withdrawableStake;
        this.$forceUpdate();
      }
    },
    async withdrawOne() {
      let market = this.market;
      let account = this.account;
      this.withdrawModal = false;
      this.loading = true;
      if (account && market) {
        try {
          market.wallet.defaultSigner = hmy.crypto.getAddress(account.address).checksum;
          market.wallet.signTransaction = async tx => {
            try {
              tx.from = hmy.crypto.getAddress(account.address).checksum;
              const signTx = await window.harmony.signTransaction(tx);
              return signTx;
            } catch (e) {
              this.loading = false;
              this.$message({
                message: e.message,
                type: 'error'
              });
              return false;
            }
          };
          await market.methods
            .withdrawStake((this.sliderValue * 10 ** 18).toString())
            .send({ ...options })
            .then(e => {
              this.sliderValue = 0;
              this.loading = false;
              this.$message({
                message: e.transaction.id,
                type: 'success'
              });
              return true;
            });
          await this.loadWallet();
        } catch (e) {
          this.loading = false;
          this.$message({
            message: e.message,
            type: 'error'
          });
          return false;
        }
      }
    }
  },
  async created() {
    await this.initMarket();
    await this.loadWallet();
    let wallet = JSON.parse(localStorage.getItem('harmony_session'));
    if (!wallet || !wallet.account) {
      this.signInWallet();
    }
  }
};
</script>

<style lang="scss">
.content-account {
  background: #eef2f7;
  min-height: 100vh;
  .balance-and-points {
    background: #34495e;
    padding-top: 20px;
  }
  .center-content {
    text-align: center;
  }
  .cashback {
    margin-top: 30px;
    text-align: center;
    background: #eef2f7;
    h3 {
      color: #34495e;
    }
  }
  h3.text-balance {
    color: cyan;
  }
  p.balance-amount {
    color: #ffffff;
  }
  h3.text-points {
    color: gold;
  }
  p.points-amount {
    color: #ffffff;
  }
  .balance-amount {
    b {
      font-size: 1.5em;
    }
    span {
      color: cadetblue;
    }
  }
  .cashback-amount {
    b {
      color: #09babf;
      font-size: 1.5em;
    }
    span {
      color: cadetblue;
    }
    strong {
      font-size: 1.3em;
    }
  }
  .points-amount {
    b {
      font-size: 1.5em;
    }
    span {
      color: #bfa519;
    }
  }

  .btn-witdraw {
    margin-top: 30px;
  }

  .interest-rate {
    position: relative;
  }
  .box-cashback {
    padding-top: 30px;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
      0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072),
      0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);

    min-height: 200px;
    width: 400px;
    height: 400px;
    margin: 0 auto;
    background: white;
    border-radius: 50%;
    position: relative;
    h3 {
      margin-top: 0;
      margin-bottom: 60px;
    }
  }

  $base: 0.6rem;

  .arrow-top {
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 100%;
    position: relative;
  }

  .chevron {
    position: absolute;
    top: 15px;
    width: $base * 3.5;
    height: $base * 0.8;
    opacity: 0;
    transform: scale(0.3);
    animation: move-chevron 3s ease-out infinite;
  }

  .chevron:first-child {
    animation: move-chevron 3s ease-out 1s infinite;
  }

  .chevron:nth-child(2) {
    animation: move-chevron 3s ease-out 2s infinite;
  }

  .chevron:before,
  .chevron:after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 50%;
    background: #2c3e50;
  }

  .chevron:before {
    left: 0;
    transform: skewY(-30deg);
  }

  .chevron:after {
    right: 0;
    width: 50%;
    transform: skewY(30deg);
  }

  @keyframes move-chevron {
    25% {
      opacity: 1;
    }
    33.3% {
      opacity: 1;
      transform: translateY(-$base * 3.8);
    }
    66.6% {
      opacity: 1;
      transform: translateY(-$base * 5.2);
    }
    100% {
      opacity: 0;
      transform: translateY(-$base * 8) scale(0.5);
    }
  }
}
.slider {
  /* overwrite slider styles */
  width: 200px;
}
form {
  width: 100%;
  max-width: 295px;
  margin: 0px auto;
}
form input {
  font-size: 20px;
  padding: 0;
  border: 2px solid #ccc;
  border-left: 0;
  color: #666;
  border-radius: 0 7px 7px 0;
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
  text-align: center;
}
form input:focus {
  outline: 0;
}
form input.error {
  border-color: #ff0000;
}
form label.error {
  background-color: #ff0000;
  color: #fff;
  padding: 6px;
  font-size: 11px;
}
.flex {
  display: flex;
  justify-content: flex-start;
}
.flex input {
  max-width: 300px;
  flex: 1 1 300px;
}
.flex .currency {
  font-size: 13px;
  padding: 0 10px 0 20px;
  color: #999;
  border: 2px solid #ccc;
  border-right: 0;
  line-height: 2.5;
  border-radius: 7px 0 0 7px;
  background: white;
}
</style>
