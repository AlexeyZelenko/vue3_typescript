<template>
  <div id="nav">
    <router-link  to="/">Головна</router-link> |
    <router-link  to="/about">Про церкву</router-link> |
    <router-link  to="/video">Відео</router-link>
  </div>
  <router-view/>
  <a
    :style='{ display: activeBlock }'
    class="back_to_top"
    title="Наверх"
  ><img
    :src="require(`@/assets/img/buttonTop.png`)"
  >
<!--    <i aria-hidden="true"-->
<!--       style="color: #239f9f"-->
<!--       class="fa fa-arrow-up fa-3x"-->
<!--    ></i>-->
  </a>
</template>

<script>
export default {
  data: () => ({
    activeBlock: 'display'
  }),
  // watch: {
  //   activeBlock () {
  //     console.log('Данные изменились на:', this.activeBlock)
  //   }
  // },
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
        window.scrollBy(0, -80)
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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: #212;
}

#nav a {
  font-weight: bold;
  color: #dee3e9;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
