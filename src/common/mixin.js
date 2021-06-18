import BackTop from 'components/content/backTop/BackTop.vue'

export const backTopMinin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0, 0)
    },
  },
}


