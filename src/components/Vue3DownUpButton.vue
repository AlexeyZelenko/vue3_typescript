<template>
  <a
    :style='{ display: activeBlock }'
    class="back_to_top"
  >
    <slot></slot>
  </a>
  <a
    :style='{ display: activeBlockDown }'
    class="back_to_down"
  >
    <slot name="down"></slot>
  </a>
</template>

<script>
export default {
  name: 'Vue3DownUpButton',
  data: () => ({
    activeBlock: 'display',
    activeBlockDown: 'display'
  }),
  methods: {
    trackScroll () {
      const scrolled = window.pageYOffset
      const coords = document.documentElement.clientHeight

      if (scrolled > coords) {
        this.activeBlock = 'block'
      }
      if (scrolled < coords) {
        this.activeBlock = 'none'
      }
    },
    trackScrollDown () {
      const scrolled = window.pageYOffset
      const coords = document.documentElement.clientHeight

      if (scrolled > coords) {
        this.activeBlockDown = 'block'
      }
      if (scrolled < coords) {
        this.activeBlockDown = 'none'
      }
    },

    backToTop () {
      if (window.pageYOffset > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    backToDown () {
      if (window.pageYOffset >= 0) {
        window.scroll({
          top: 10000,
          behavior: 'smooth'
        })
      }
    }
  },
  mounted () {
    const goTopBtn = document.querySelector('.back_to_top')
    const goDownBtn = document.querySelector('.back_to_down')
    window.addEventListener('scroll', this.trackScroll)
    window.addEventListener('scroll', this.trackScrollDown)
    goTopBtn.addEventListener('click', this.backToTop)
    goDownBtn.addEventListener('click', this.backToDown)
  }
}
</script>

<style scoped>
  .back_to_top {
    opacity: 0.8;
    position: fixed;
    bottom: 70px;
    right: 40px;
    z-index: 9999;
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: none
  }
  .back_to_down {
    opacity: 0.8;
    position: fixed;
    bottom: 25px;
    right: 40px;
    z-index: 9999;
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: none
  }
</style>
