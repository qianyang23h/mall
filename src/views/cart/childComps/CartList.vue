<template lang="">
  <div class="cart-list">
    <scroll class="scroll-wrapper" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item" />


    </scroll>
  </div>
</template>


<script>
import Scroll from 'components/common/scroll/Scroll.vue'

import CartListItem from './CartListItem.vue'

import { mapGetters } from 'vuex'

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    // 更新一下scroll对象，更新scrollHeight属性，防止不能滚动
    // this.$refs.scroll.refresh()
    console.log('this.$refs.scroll: ', this.$refs.scroll);

  }
}
</script>
<style>
  .cart-list {
    /* 这里必须有空格 */
    height: calc(100vh - 44px - 49px - 40px);
  }

  /* 给滚动区域的wrapper设置一个具体的高度 */
  .scroll-wrapper {
    height: 100%;
    overflow: hidden;
  }
</style>
