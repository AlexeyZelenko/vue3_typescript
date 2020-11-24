<template>
  <a
    :style='{ display: activeBlock }'
    class="back_to_top"
    title="Наверх"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'ButtonTop',
  data: () => ({
    activeBlock: 'display'
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

    backToTop () {
      if (window.pageYOffset > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  },
  mounted () {
    const goTopBtn = document.querySelector('.back_to_top')
    window.addEventListener('scroll', this.trackScroll)
    goTopBtn.addEventListener('click', this.backToTop)
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
</style>
