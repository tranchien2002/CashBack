<template>
  <header class="header-markets">
    <div class="row">
      <div class="col-12 col-md-2 center-inline-block">
        <img src="@/assets/fonts/logo.png" class="logo-header" />
      </div>
      <div class="col-12 col-md-8">
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/markets">Markets</router-link>
          <router-link to="/account">Account</router-link>
          <!-- <router-link to="/my-products">My Products</router-link> -->
          <!-- <a href="#">Blog</a>
          <a href="#">Portefolio</a>
          <a href="#">Contact</a> -->
          <div class="animation start-home"></div>
        </nav>
      </div>
      <div class="col-12 col-md-2 center-inline-block">
        <el-dropdown trigger="click" class="info-account">
          <span class="el-dropdown-link">
            {{ showAddress }} <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              Balance
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              <router-link to="/my-products" tag="span">My Products</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'heaer-component',
  data() {
    return {
      address: ''
    };
  },
  computed: {
    ...mapState(['account']),
    showAddress() {
      let result = this.address
        ? this.address.substring(0, 3) + '...' + this.address.substring(this.address.length - 4)
        : '...';
      return result;
    }
  },
  methods: {
    ...mapActions(['loadWallet'])
  },
  async created() {
    await this.loadWallet();
    this.address = this.account ? this.account.address : '';
  }
};
</script>

<style lang="scss" scoped>
.header-markets {
  background: #34495e;
  padding: 15px;
}

.center-inline-block {
  display: flex;
  justify-content: center;
  // align-items: center;
}

.logo-header {
  width: 70%;
}

.info-account {
  background: #212533;
  border-radius: 3px;
  padding: 0.5rem;
  letter-spacing: 1px;
  font-size: 14px;
  font-weight: 600;
  text-transform: none;
  height: 50px;
  span {
    color: white;
  }
}

li:not(:last-child) {
  margin-bottom: 0;
}

.clear-both {
  clear: both;
}
nav {
  margin: 0 auto;
  position: relative;
  width: 310px;
  height: 50px;
  background-color: #34495e;
  // border-radius: 8px;
  font-size: 0;
}
nav a {
  line-height: 50px;
  height: 100%;
  font-size: 15px;
  display: inline-block;
  position: relative;
  z-index: 1;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);
}
nav .animation {
  position: absolute;
  height: 100%;
  top: 0;
  z-index: 0;
  transition: all 0.5s ease 0s;
  border-radius: 8px;
}
a:nth-child(1) {
  width: 100px;
}
a:nth-child(2) {
  width: 110px;
}
a:nth-child(3) {
  width: 100px;
}
a:nth-child(4) {
  width: 160px;
}
a:nth-child(5) {
  width: 120px;
}

// a:nth-child(1).router-link-active ~ .animation {
//   width: 100px;
//   left: 0;
//   background-color: #1abc9c;
// }

a:nth-child(2).router-link-active ~ .animation {
  width: 110px;
  left: 100px;
  background-color: #e74c3c;
}
a:nth-child(3).router-link-active ~ .animation {
  width: 100px;
  left: 210px;
  background-color: #3498db;
}

a:nth-child(4).router-link-active ~ .animation {
  width: 160px;
  left: 310px;
  background-color: #9b59b6;
}

a:nth-child(5).router-link-active ~ .animation {
  width: 120px;
  left: 470px;
  background-color: #e67e22;
}

// nav .start-home,
a:nth-child(1):hover ~ .animation {
  width: 100px;
  left: 0;
  background-color: #1abc9c;
}
nav .start-about,
a:nth-child(2):hover ~ .animation {
  width: 110px;
  left: 100px;
  background-color: #e74c3c;
}
nav .start-blog,
a:nth-child(3):hover ~ .animation {
  width: 100px;
  left: 210px;
  background-color: #3498db;
}
nav .start-portefolio,
a:nth-child(4):hover ~ .animation {
  width: 160px;
  left: 310px;
  background-color: #9b59b6;
}
nav .start-contact,
a:nth-child(5):hover ~ .animation {
  width: 120px;
  left: 470px;
  background-color: #e67e22;
}

body {
  font-size: 12px;
  font-family: sans-serif;
  background: #2c3e50;
}
h1 {
  text-align: center;
  margin: 40px 0 40px;
  text-align: center;
  font-size: 30px;
  color: #ecf0f1;
  text-shadow: 2px 2px 4px #000000;
  font-family: 'Cherry Swash', cursive;
}

p {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  color: #ecf0f1;
  font-family: 'Cherry Swash', cursive;
  font-size: 16px;
}

span {
  color: #2bd6b4;
}
</style>
