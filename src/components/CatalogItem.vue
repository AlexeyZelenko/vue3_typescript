<template>
  <div ref="el">
    <div
      class="sec-text"
    >
      <h3 class="sec-text__title">{{title}}</h3>
      <p class="sec-text__dsc">{{text}}</p>
    </div>
    <section
      ref="el"
      :class="isShown ? sectionClass : null"
    ></section>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import useIntersectionObserver from '../composables/useIntersectionObserver'

export default {
  name: 'CatalogItem',
  props: {
    data: Object
  },
  setup (props) {
    const el = ref(null)
    const { observe, unobserve, isShown } = useIntersectionObserver()
    const title = computed(
      () => props.data.title
    )
    const text = computed(
      () => props.data.text
    )
    const sectionClass = computed(
      () => props.data.sectionClass
    )

    onMounted(() => {
      observe(el.value)
    })

    onBeforeUnmount(() => {
      unobserve(el.value)
    })
    return {
      title,
      text,
      sectionClass,
      isShown,
      el
    }
  }
}
</script>

<style scoped>
  body {margin: 0;padding: 0;font-family: sans-serif;color: #262626;}

  section {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
  }
  section.sec1 {
    background: url('../assets/images/причастие.jpg')  no-repeat center / cover;
    background-attachment: fixed;
  }
  section.sec2 {
    background: url('../assets/images/nightPrayer.jpg') no-repeat center / cover;
    background-attachment: fixed;
  }
  section.sec3 {
    background: url('../assets/images/song.jpg')no-repeat center / cover;
    background-attachment: fixed;
  }
  section.sec4 {
    background: url('../assets/images/fire.jpg')no-repeat center / cover;
    background-attachment: fixed;
  }
  section.sec5 {
    background: url('../assets/images/water.jpg')no-repeat center / cover;
    background-attachment: fixed;
  }
  section.sec6 {
    background: url('../assets/images/centreHelp.jpg')no-repeat center / cover;
    background-attachment: fixed;
  }
  section.sec7 {
    background: url('../assets/images/homegroup.jpg')no-repeat center / cover;
    background-attachment: fixed;
  }
  section.sec8 {
    background: url('../assets/images/help.jpg')no-repeat center / cover;
    background-attachment: fixed;
  }
  section.sec9 {
    background: url('../assets/images/centreHelp.jpg')no-repeat center / cover;
    background-attachment: fixed;
  }
  .sec-text {
    padding: 4% 8%;
    height: auto;
  }
  .sec-text__title {
    margin: 0;
    padding: 0;
    font-size: 2em;
  }
  .sec-text__dsc {
    font-size: 1em;
  }
</style>
