<template lang="">
  <div id="detail">
    <detail-nav class="detail-nav" @titleClick="titleClick" ref="detailNav"/>

    <scroll class="scroll-wrapper" ref="scroll" :probeType="3" @scroll="contentScroll">  <!-- 使用scroll组件的时候，一定要给其最外层设置高度 -->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods-info="goodsInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommend" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import DetailNav from './childComps/DetailNav.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailComment from './childComps/DetailComment.vue'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'


import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {backTopMinin} from '@/common/mixin'

export default {
  name: 'Detail',
  components :{
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailComment,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [backTopMinin],
  data() {
    return {
      iid : null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      currentIndex: 0,
    }
  },
  created() {
    // 获得iid
    this.iid = this.$route.params.iid

    // 请求详情接口数据
    getDetail(this.iid).then( res => {
      //
      const data = res.result
      // 1.获取顶部图片数据
      this.topImages = data.itemInfo.topImages

      // 2.详细商品信息
      this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.店铺信息
      this.shopInfo = new Shop(data.shopInfo)

      // 4.商品详情数据
      this.detailInfo = data.detailInfo

      // 5.参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.评论信息
      this.commentInfo = data.rate.cRate ? data.rate.list[0] : {}
    })

    // 请求推荐接口数据
    getRecommend().then(res => {
      //
      this.recommend = res.data.list
    })

    // this.$nextTick(() => {
    //   // dom虽然加载了，但是图片仍然没有加载完
    //   this.themeTopYs = []
    //   this.themeTopYs.push(0)
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    //
    // })
  },
  updated(){
  },
  methods: {
    titleClick(index){
      // 滚动到相应的位置
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000)
    },
    imageLoad(){
      //图片加载获取offsettop
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

    },
    contentScroll(position){
      // 1. 获取y值
      const positionY = -position.y

      // 2. 内容滚动，显示正确的标题
      length = this.themeTopYs.length
      for(let i = 0; i < length; i++){
        if(this.currentIndex != i && (i != length -1 && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]))
        || (i == length -1 && positionY > this.themeTopYs[i])){
          this.currentIndex = i
          //
          this.$refs.detailNav.currentIndex = this.currentIndex

        }
      }
      // 3.判断BackTop是否显示
      this.isShowBackTop = positionY > 500
    },
    addToCart(){
      // 1.获取购物车需要展示的图片
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goodsInfo.title
      product.desc = this.goodsInfo.desc
      product.price = this.goodsInfo.realPrice
      product.iid = this.iid

      // 2. 将商品添加到购物车里(Promise, mapActions)
      // this.$store.commit('addToCart', product)
      this.$store.dispatch('addToCart', product).then((res) => {
        this.$toast.show(res)  // 直接通过toast插件进行调用
      })


    }

  }
}
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;

    /* 父组件设置高度 */
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  /* 设置滚动区域高度，注：该类名不要设置为wrapper，与Scroll组件内部的类名冲突 */
  .scroll-wrapper {
    /* 100%是相对于父组件的，所以父组件也需要设置一个高度 */
    height: calc(100% - 44px);
    /* height: 300px; */
  }
</style>
