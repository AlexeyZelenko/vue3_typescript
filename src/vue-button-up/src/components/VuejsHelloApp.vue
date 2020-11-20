<template>
  <a
    :style='{ display: activeBlock }'
    class="back_to_top"
    title="Наверх"
  >
    <main>
      <slot></slot>
    </main>
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
      const scrollStep = window.pageYOffset / 40
      if (window.pageYOffset > 0) {
        window.scrollBy(0, -(scrollStep))
        setTimeout(this.backToTop, 0)
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
