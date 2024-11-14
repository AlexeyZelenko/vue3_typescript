<template>
  <div ref="el">
    <div class="sec-text">
      <h3 class="sec-text__title">{{ title }}</h3>
      <p class="sec-text__dsc">{{ text }}</p>
    </div>
    <section :class="isShown ? sectionClass : null"></section>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import useIntersectionObserver from '../composables/useIntersectionObserverSlide'

export default {
  name: 'CatalogItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const el = ref(null)
    const isShown = ref(false) // Добавили ref для отслеживания видимости элемента
    const { observe, unobserve } = useIntersectionObserver()

    const title = computed(() => props.data.title)
    const text = computed(() => props.data.text)
    const sectionClass = computed(() => props.data.sectionClass)

    const handleIntersection = (isIntersecting) => {
      isShown.value = isIntersecting // Обновляем isShown в зависимости от видимости элемента
    }

    onMounted(() => {
      if (el.value) {
        observe(el.value, handleIntersection)
      }
    })

    onBeforeUnmount(() => {
      if (el.value) {
        unobserve(el.value)
      }
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
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  color: #262626;
}

section {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
}
section.sec1 {
  background: url('../assets/images/причастие.jpg') no-repeat center / cover;
  background-attachment: fixed;
}
section.sec2 {
  background: url('../assets/images/nightPrayer.jpg') no-repeat center / cover;
  background-attachment: fixed;
}
section.sec3 {
  background: url('../assets/images/song.jpg') no-repeat center / cover;
  background-attachment: fixed;
}
section.sec4 {
  background: url('../assets/images/fire.jpg') no-repeat center / cover;
  background-attachment: fixed;
}
section.sec5 {
  background: url('../assets/images/water.jpg') no-repeat center / cover;
  background-attachment: fixed;
}
section.sec6 {
  background: url('../assets/images/centreHelp.jpg') no-repeat center / cover;
  background-attachment: fixed;
}
section.sec7 {
  background: url('../assets/images/homegroup.jpg') no-repeat center / cover;
  background-attachment: fixed;
}
section.sec8 {
  background: url('../assets/images/help.jpg') no-repeat center / cover;
  background-attachment: fixed;
}
section.sec9 {
  background: url('../assets/images/centreHelp.jpg') no-repeat center / cover;
  background-attachment: fixed;
}

section.is-visible {
  transform: scale(1);
  opacity: 1;
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

/* Сообщение о том, что элемент виден */
.visible-message {
  color: #fff;
  background-color: rgba(0, 128, 0, 0.7);
  padding: 10px;
  text-align: center;
  font-size: 1.2em;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
}
</style>
