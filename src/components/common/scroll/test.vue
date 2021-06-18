
<script>
  import BScroll from '@better-scroll/core'
  export default {
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.bs = new BScroll(this.$refs.wrapper, {
          freeScroll: true,
          bounce: {
            bottom: false,
            left: false,
            right: false,
            top: false
          }
        })
      }
    }
  }
</script>
