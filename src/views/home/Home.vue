<template>
  <div id="home">
    <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl1"
                    class="tab-control"
                    v-show="isTabFixed"/>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommder-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl2"
                    />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import HomeSwiper from './childComps/HomeSwiper'
import RecommderView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'



import {getHomeMultidata, getHomeGoods} from 'network/home'
import {backTopMinin} from '@/common/mixin'


export default {
  name:"Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommderView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [backTopMinin],
  data(){
    return {
      banners : [],
      recommends : [],
      goods : {
        'pop' : {page: 0, list: []},
        'new' : {page: 0, list: []},
        'sell' : {page: 0, list: []},
      },
      currentType: 'pop',
      tabOffsetTop : 0,
      isTabFixed : false,
      saveY : 0
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list

    }
  },
  created(){
    // 1. 请求多个数据
    this.getHomeMultidata(),

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  activated(){
    this.$refs.scroll.scrollTo(0, this.saveY)
    // 更新一下scroll对象，更新scrollHeight属性，防止不能滚动
    this.$refs.scroll.scroll.refresh()
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
  },

  methods: {
    // **************************
    // 事件监听相关方法
    // **************************
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      // 使得TabControl1和TabControl2保持一致
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick(){
      // 通过this.$refs直接拿到scroll组件对象
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position){
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000

      // 2.判断tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      //
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },


    // ****************************************************************
    // 网络请求相关方法
    // **************************
    getHomeMultidata(){
      getHomeMultidata().then(res => {  // 通过回调函数获取请求的数据
        //
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;  // 获取当前page的下一页
      getHomeGoods(type, page).then(res => {
        // 遍历的方式
        for(let item of res.data.list){
          this.goods[type].list.push(item)
        }

        // 特殊方式
        // this.goods[type].list.push(...res.data.list);   // push(...array)依次将array中的数字添加  或者遍历push
        this.goods[type].page += 1

        // 上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }

  },
};
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
  }

  .home-bar {
    background-color: var(--color-tint);
    color: white;

    /* 在使用浏览器原生滚动时，为了顶部导航栏不一块跟随滑动问题 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10; */
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 10;
    background-color: #fff;
  }

  /* 设置页面滑动的高度 */
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.content {*/
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  /*}*/



</style>




