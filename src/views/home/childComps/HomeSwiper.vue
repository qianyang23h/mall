<template lang="">
  <div>
    <swiper>
      <!-- 当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略
      为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，
      你需要为每项提供一个唯一 key attribute：  -->
      <swiper-item v-for="item in banners" :key="item.index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/'

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad : false
    }
  },
  methods : {
    imgLoad(){
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>
<style >

</style>
