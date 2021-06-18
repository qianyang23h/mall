<template>
  <!-- 如果goodsInfo是空的对象，不进行渲染 -->
  <div class="base-info" v-if="Object.keys(goodsInfo).length !== 0">
    <div class="info-title">
      {{goodsInfo.title}}
    </div>

    <div class="info-price">
      <span class="new-price">{{goodsInfo.price}}</span>


      <span class="old-price">{{goodsInfo.oldPrice}}</span>
      <span class="discount">{{goodsInfo.discount}}</span>
    </div>

    <div class="info-other">
      <span>{{goodsInfo.columns[0]}}</span>
      <span>{{goodsInfo.columns[1]}}</span>
      <span>{{goodsInfo.services[goodsInfo.services.length-1].name}}</span>
    </div>

    <div class="info-service">
      <span v-for="index in goodsInfo.services.length-1" :key="index" class="info-service-item">
				<img :src="goodsInfo.services[index-1].icon" alt="">
				<span>{{goodsInfo.services[index-1].name}}</span>
			</span>
    </div>

  </div>
</template>
<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goodsInfo:{
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-price {
    margin-top: 10px;
  }

  .info-title {
    color: 10px
  }

  .info-price .new-price {
    font-size: 24px;
    color: var(--color-high-text);
  }

  .info-price .old-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }

  .info-price .discount {
    font-size: 12px;

    background-color: var(--color-high-text);
    color: #fff;
    border-radius: 8px;
    padding: 2px 5px;
    margin-left: 5px;

    /* 行内元素，垂直方向padding、border、margin不会影响页面的布局 */
    /* 通过相对定位使该元素上浮一点底*/
    position: relative;
    top: -4px;
  }

  .info-other {
    /* display: flex; */
    margin-top: 15px;
    line-height: 30px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }


  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

  .info-service-item img {
    width: 14px;
    height: 14px;

    margin-right: 2px;

    /* 相对定位不会脱离文档流 */
    position: relative;
    top: 2px;
  }

  .info-service-item span {
    font-size: 13px;
    color: #333;
  }
</style>
