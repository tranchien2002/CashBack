<template>
  <el-card :body-style="{ padding: '0px' }">
    <el-image :src="itemImg" class="list-image-market" @click="openTableVisible">
      <div slot="error" class="image-slot">
        <img src="@/assets/img/tshirt.png" class="list-image-market" />
      </div>
    </el-image>
    <div class="bottom-card">
      <p>{{ name ? name : 'No Name' }}</p>
      <h5>{{ price }} ONE</h5>
      <div class="bottom clearfix" v-if="!myProduct">
        <el-button type="primary" class="btn-buy" @click="buyProduct"
          ><i class="fa fa-cart-plus" aria-hidden="true"></i
        ></el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'Item',
  props: {
    id: {
      type: Number
    },
    itemImg: {
      type: String,
      default: '@/assets/img/not_found.jpg'
    },
    name: {
      type: String
    },
    price: {
      type: Number
    },
    type: {
      type: Number
    },
    myProduct: {
      type: Boolean
    }
  },
  methods: {
    openTableVisible() {
      this.$emit('openTableVisible', this.itemImg);
    },
    buyProduct() {
      this.$emit('buyProduct', this.id, this.price);
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../assets/css/vuetify.css';
.btn-buy {
  margin-left: 10px;
}

.fa.fa-close.strip__close {
  font-size: 30px;
}

.bottom-card {
  padding: 14px;
}

.bottom-card > h5 {
  color: black;
}

.list-image-market {
  height: 415.06px;
}
</style>
