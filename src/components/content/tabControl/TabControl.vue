<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index" class="tab-control-item"
    :class="{active : currentIndex === index}"  @click="getCurrentIndex(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>

export default {
  name : "TabControl",
  props : {
    titles : {
      type : Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex : 0
    }
  },
  methods : {
    getCurrentIndex(index){
      this.currentIndex = index
      this.$emit('tabClick', index)   // $emit(param1, param2) param1：自定义事件名 param: 发射出去的信息，传给父组件的监听函数
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
  }

  .tab-control-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);

  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }

</style>
