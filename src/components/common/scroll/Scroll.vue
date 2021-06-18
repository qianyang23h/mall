<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name : "Scroll",
  props : {
    probeType:{
      type: Number,
      default: 0
    },
    pullUpLoad : {
      type :Boolean,
      default : false
    }
  },
  data() {
    return {
      scroll : null,
      message: "hello"
    }
  },
  mounted() {
    // 创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // keepAlive: ture,
      observeDOM: true,
      observeImage: true,
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    })

    // 监听滚动位置
    if(this.probeType == 2 || this.probeType == 3){
      this.scroll.on('scroll', (position) => {
      this.$emit('scroll',position)
    })
    }

    // 监听滚动到底部事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp', () => {
      // console.log("上拉加载更多")
      this.$emit('pullingUp')
    })
    }

  },
  methods : {
    // 回到顶部
    scrollTo(x, y, timeout=300){
      this.scroll.scrollTo(x, y, timeout)
    },
    // 结束上拉加载行为
    finishPullUp() {
        this.scroll.finishPullUp()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
