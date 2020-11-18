<template>
  <div>
    <div
      class="sec-text"
    >
      <h3 class="sec-text__title">{{title}}</h3>
      <p class="sec-text__dsc">{{text}}</p>
    </div>
    <section
      :class=product_data.sectionClass
    ></section>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'v-catalog-item',
  props: {
    product_data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  setup (props) {
    const title = computed(
      () => props.product_data.title
    )
    const text = computed(
      () => props.product_data.text
    )
    return {
      title,
      text
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
