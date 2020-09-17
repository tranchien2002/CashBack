<template>
  <div class="market-view" v-loading="loading">
    <header-componet />
    <section class="strips" v-if="contentDisplay === -1">
      <article class="strips__strip" @click="openTab(0)">
        <div class="strip__content">
          <h1 class="strip__title" data-name="Lorem">
            Shirt
          </h1>
          <div class="strip__inner-text"></div>
        </div>
      </article>
      <article class="strips__strip" @click="openTab(1)">
        <div class="strip__content">
          <h1 class="strip__title" data-name="Ipsum">T-shirt</h1>
          <div class="strip__inner-text"></div>
        </div>
      </article>
      <article class="strips__strip" @click="openTab(2)">
        <div class="strip__content">
          <h1 class="strip__title" data-name="Dolor">Jeans</h1>
          <div class="strip__inner-text"></div>
        </div>
      </article>
      <article class="strips__strip" @click="openTab(3)">
        <div class="strip__content">
          <h1 class="strip__title" data-name="Sit">Shoes</h1>
          <div class="strip__inner-text"></div>
        </div>
      </article>
      <article class="strips__strip" @click="openTab(4)">
        <div class="strip__content">
          <h1 class="strip__title" data-name="Amet">Hat</h1>
          <div class="strip__inner-text"></div>
        </div>
      </article>
    </section>

    <div class="div-show">
      <div class="strip-show" v-show="contentDisplay === 0">
        <i class="fa fa-close strip__close" @click="closeTab"></i>
        <div class="content-strip">
          <div class="row">
            <div class="col-12 col-sm-6 col-md-4" :span="6" v-for="item in arr0" :key="item.id">
              <ItemComponent
                :name="item.name"
                :price="item.price"
                :itemImg="item.imageUrl"
                :id="item.id"
                @openTableVisible="openTableVisible"
                @buyProduct="buyProductMarket"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="strip-show" v-show="contentDisplay === 1">
        <i class="fa fa-close strip__close" @click="closeTab"></i>

        <div class="content-strip">
          <div class="row">
            <div class="col-12 col-sm-6 col-md-4" :span="6" v-for="item in arr1" :key="item.id">
              <ItemComponent
                :name="item.name"
                :price="item.price"
                :itemImg="item.imageUrl"
                :id="item.id"
                @openTableVisible="openTableVisible"
                @buyProduct="buyProductMarket"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="strip-show" v-show="contentDisplay === 2">
        <i class="fa fa-close strip__close" @click="closeTab"></i>
        <div class="content-strip">
          <div class="row">
            <div class="col-12 col-sm-6 col-md-4" :span="6" v-for="item in arr2" :key="item.id">
              <ItemComponent
                :name="item.name"
                :price="item.price"
                :itemImg="item.imageUrl"
                :id="item.id"
                @openTableVisible="openTableVisible"
                @buyProduct="buyProductMarket"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="strip-show" v-show="contentDisplay === 3">
        <i class="fa fa-close strip__close" @click="closeTab"></i>
        <div class="content-strip">
          <div class="row">
            <div class="col-12 col-sm-6 col-md-4" :span="6" v-for="item in arr3" :key="item.id">
              <ItemComponent
                :name="item.name"
                :price="item.price"
                :itemImg="item.imageUrl"
                :id="item.id"
                @openTableVisible="openTableVisible"
                @buyProduct="buyProductMarket"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="strip-show" v-show="contentDisplay === 4">
        <i class="fa fa-close strip__close" @click="closeTab"></i>
        <div class="content-strip">
          <div class="row">
            <div class="col-12 col-sm-6 col-md-4" :span="6" v-for="item in arr4" :key="item.id">
              <ItemComponent
                :name="item.name"
                :price="item.price"
                :itemImg="item.imageUrl"
                :id="item.id"
                @openTableVisible="openTableVisible"
                @buyProduct="buyProductMarket"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog :title="titleProduct" :visible.sync="dialogTableVisible">
      <v-zoom :img="img" width="100%"></v-zoom>
      <hr />
      <div class="content-detail">
        <h3>
          Description:
        </h3>
        <p>
          We are proud to present our best premium Shopify theme - Wokiee. This is multi-purpose
          software that can be used for any type of the store. Great variety of available options
          will make customization process very easy. Please, take a look at feature list and compare
          with our competitors. You can buy our theme and start your business online with minimal
          time investments. Wokiee support DropShipping app Oberlo. Wokiee Shopify theme is
          powerfool tool to create personal webshop.
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-buy-modal" type="primary " @click="dialogTableVisible = false"
          ><i data-v-bfe2d226="" aria-hidden="true" class="fa fa-cart-plus"></i> Buy
        </el-button>
      </span>
    </el-dialog>
    <!-- <loginModal v-show="isLoginModalVisible" @close="closeLoginModal" @signIn="signInWallet" /> -->
    <el-dialog title="Warning" :visible.sync="isLoginModalVisible" width="30%" center>
      <p class="text-center">
        You need to connect with MathWallet. If you do not have MathWallet installed, you can access
        it here:
        <a
          class="link-redirect"
          target="_blank"
          href="https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc"
          >MathWallet</a
        >
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isLoginModalVisible = false">Cancel</el-button>
        <el-button type="primary" @click="signIn">Sign In</el-button>
      </span>
    </el-dialog>

    <!-- modal buy product success -->
    <canvas id="confetti" :class="confetti ? 'z-index-1000' : ''"> </canvas>
    <div class="buy-success" v-show="confetti">
      <el-card shadow="always">
        <i class="el-dialog__close el-icon el-icon-close" @click="confetti = false"></i>
        <h1>Congratulations!</h1>
        <h3>+ {{ cashBack }} Sun</h3>
      </el-card>
    </div>
  </div>
</template>
<script>
import FooterComponet from '@/components/FooterComponet';
import HeaderComponet from '@/components/HeaderComponent';
import ItemComponent from '@/components/ItemComponent.vue';
import { mapState, mapActions } from 'vuex';
import vZoom from 'vue-zoom';
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
  components: { FooterComponet, HeaderComponet, vZoom, ItemComponent },
  data() {
    return {
      tabOpening: null,
      outerVisible: false,
      titleProduct: 'Product 01',
      dialogTableVisible: false,
      num: 0,
      img:
        'https://contents.mediadecathlon.com/p1484240/k$ab565f3675dbdd7e3c486175e2c16583/travel-100-men-s-trekking-shirt-maroon.jpg',
      isLoginModalVisible: false,
      contentDisplay: -1,
      arr0: [],
      arr1: [],
      arr2: [],
      arr3: [],
      arr4: [],
      loading: false,
      confetti: false,
      cashBack: 0
    };
  },
  computed: {
    ...mapState(['sellingItems', 'account', 'market', 'buyBackRate'])
  },
  methods: {
    ...mapActions([
      'fetchSellingItems',
      'initMarket',
      'signInWallet',
      'loadWallet',
      'signOutWallet',
      'initMarket'
    ]),
    effectCofetti(price) {
      this.confettiEffect();
      this.confetti = true;
      this.cashBack = (price * this.buyBackRate) / 100;
    },
    openTab(index) {
      this.contentDisplay = index;
    },
    closeTab() {
      this.contentDisplay = -1;
    },
    closeLoginModal() {
      this.isLoginModalVisible = false;
    },
    signIn() {
      this.isLoginModalVisible = false;
      this.signInWallet();
    },
    async buyProductMarket(id, price) {
      this.loading = true;
      await this.loadWallet();
      if (this.account) {
        let market = this.market;
        try {
          market.wallet.defaultSigner = hmy.crypto.getAddress(this.account.address).checksum;
          market.wallet.signTransaction = async tx => {
            try {
              tx.from = hmy.crypto.getAddress(this.account.address).checksum;
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
            .buy(id)
            .send({ ...options, value: price * 10 ** 18 })
            .then(e => {
              this.loading = false;
              this.$message({
                message: e.transaction.id,
                type: 'success'
              });
              this.effectCofetti(price);
              return true;
            });
        } catch (e) {
          this.$message({
            message: e.message,
            type: 'error'
          });
          this.loading = false;
          return false;
        }
      } else {
        this.isLoginModalVisible = true;
      }
      await this.fetchSellingItems();
      if (this.sellingItems && this.sellingItems.length > 0) {
        await this.classification();
      }
      this.loading = false;
    },
    openTableVisible(itemImg) {
      this.img = itemImg;
      this.dialogTableVisible = true;
    },
    classification() {
      let arr0 = [];
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];
      this.sellingItems.forEach(item => {
        switch (item.itemType) {
          case 0:
            arr0.push(item);
            break;
          case 1:
            arr1.push(item);
            break;
          case 2:
            arr2.push(item);
            break;
          case 3:
            arr3.push(item);
            break;
          case 4:
            arr4.push(item);
            break;
          default:
            break;
        }
      });
      this.arr0 = arr0;
      this.arr1 = arr1;
      this.arr2 = arr2;
      this.arr3 = arr3;
      this.arr4 = arr4;
    },
    confettiEffect() {
      // global variables
      const confetti = document.getElementById('confetti');
      const confettiCtx = confetti.getContext('2d');
      let container,
        confettiElements = [],
        clickPosition;

      // helper
      let rand = (min, max) => Math.random() * (max - min) + min;

      // params to play with
      const confettiParams = {
        // number of confetti per "explosion"
        number: 70,
        // min and max size for each rectangle
        size: { x: [5, 20], y: [10, 18] },
        // power of explosion
        initSpeed: 25,
        // defines how fast particles go down after blast-off
        gravity: 0.65,
        // how wide is explosion
        drag: 0.08,
        // how slow particles are falling
        terminalVelocity: 6,
        // how fast particles are rotating around themselves
        flipSpeed: 0.017
      };
      const colors = [
        { front: '#3B870A', back: '#235106' },
        { front: '#B96300', back: '#6f3b00' },
        { front: '#E23D34', back: '#88251f' },
        { front: '#CD3168', back: '#7b1d3e' },
        { front: '#664E8B', back: '#3d2f53' },
        { front: '#394F78', back: '#222f48' },
        { front: '#008A8A', back: '#005353' }
      ];

      setupCanvas();
      updateConfetti();

      confetti.addEventListener('click', addConfetti);
      window.addEventListener('resize', () => {
        setupCanvas();
        hideConfetti();
      });

      // Confetti constructor
      function Conf() {
        this.randomModifier = rand(-1, 1);
        this.colorPair = colors[Math.floor(rand(0, colors.length))];
        this.dimensions = {
          x: rand(confettiParams.size.x[0], confettiParams.size.x[1]),
          y: rand(confettiParams.size.y[0], confettiParams.size.y[1])
        };
        this.position = {
          x: clickPosition[0],
          y: clickPosition[1]
        };
        this.rotation = rand(0, 2 * Math.PI);
        this.scale = { x: 1, y: 1 };
        this.velocity = {
          x: rand(-confettiParams.initSpeed, confettiParams.initSpeed) * 0.4,
          y: rand(-confettiParams.initSpeed, confettiParams.initSpeed)
        };
        this.flipSpeed = rand(0.2, 1.5) * confettiParams.flipSpeed;

        if (this.position.y <= container.h) {
          this.velocity.y = -Math.abs(this.velocity.y);
        }

        this.terminalVelocity = rand(1, 1.5) * confettiParams.terminalVelocity;

        this.update = function() {
          this.velocity.x *= 0.98;
          this.position.x += this.velocity.x;

          this.velocity.y += this.randomModifier * confettiParams.drag;
          this.velocity.y += confettiParams.gravity;
          this.velocity.y = Math.min(this.velocity.y, this.terminalVelocity);
          this.position.y += this.velocity.y;

          this.scale.y = Math.cos((this.position.y + this.randomModifier) * this.flipSpeed);
          this.color = this.scale.y > 0 ? this.colorPair.front : this.colorPair.back;
        };
      }

      function updateConfetti() {
        confettiCtx.clearRect(0, 0, container.w, container.h);

        confettiElements.forEach(c => {
          c.update();
          confettiCtx.translate(c.position.x, c.position.y);
          confettiCtx.rotate(c.rotation);
          const width = c.dimensions.x * c.scale.x;
          const height = c.dimensions.y * c.scale.y;
          confettiCtx.fillStyle = c.color;
          confettiCtx.fillRect(-0.5 * width, -0.5 * height, width, height);
          confettiCtx.setTransform(1, 0, 0, 1, 0, 0);
        });

        confettiElements.forEach((c, idx) => {
          if (
            c.position.y > container.h ||
            c.position.x < -0.5 * container.x ||
            c.position.x > 1.5 * container.x
          ) {
            confettiElements.splice(idx, 1);
          }
        });
        window.requestAnimationFrame(updateConfetti);
      }

      function setupCanvas() {
        container = {
          w: confetti.clientWidth,
          h: confetti.clientHeight
        };
        confetti.width = container.w;
        confetti.height = container.h;
      }

      function addConfetti(e) {
        const canvasBox = confetti.getBoundingClientRect();
        if (e) {
          clickPosition = [e.clientX - canvasBox.left, e.clientY - canvasBox.top];
        } else {
          clickPosition = [canvasBox.width * Math.random(), canvasBox.height * Math.random()];
        }
        for (let i = 0; i < confettiParams.number; i++) {
          confettiElements.push(new Conf());
        }
      }

      function hideConfetti() {
        confettiElements = [];
        window.cancelAnimationFrame(updateConfetti);
      }
      addConfetti();
      setInterval(addConfetti, 1000);
    }
  },
  async created() {
    await this.initMarket();
    await this.loadWallet();
    await this.fetchSellingItems();
    if (this.sellingItems && this.sellingItems.length > 0) {
      this.classification();
    }
    // this.confettiEffect();
    // await this.signOutWallet();
  }
};
</script>
<style lang="scss" scoped>
@import '../assets/css/markets-style.scss';
.text-center {
  text-align: center;
}

.link-redirect {
  color: blue;
}
.link-redirect:hover {
  color: blue;
}

#confetti {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  left: 0;
  z-index: -1;
}

.z-index-1000 {
  z-index: 1000 !important;
}

.buy-success {
  z-index: 2000;
  position: fixed;
  left: 38%;
  top: 38%;
  width: 450px;
  text-align: center;
  -webkit-animation: slide-down 0.5s ease-out;
  -moz-animation: slide-down 0.5s ease-out;
  .el-icon-close {
    position: absolute;
    right: 15px;
    top: 10px;
    cursor: pointer;
  }
  h1 {
    color: #0e846f;
    margin-top: 30px;
  }
  h3 {
    color: gold;
  }
}
</style>
