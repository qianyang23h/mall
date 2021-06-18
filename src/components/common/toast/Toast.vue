<template>
  <div class="toast" v-show="isShowed">
    <div>{{message}}</div>
  </div>
</template>
<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   },
  //   isShowed: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data() {
    return {
      message: '',
      isShowed: false
    }
  },
  methods: {
    show(message='默认文字',duration = 2000) {
      this.isShowed = true;
      this.message = message
      setTimeout(()=>{
        this.isShowed = false;
        this.message = ''
      },duration)
    }
  }
}
</script>
<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    color: #ffffff;
    background-color: rgba(0,0,0,.35);
    z-index: 99;
  }
</style>
