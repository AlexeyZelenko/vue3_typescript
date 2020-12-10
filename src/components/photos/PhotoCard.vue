<template>
  <div
    ref="el"
    class="bg-gray-800 radius-sm shadow-md rounded-md h-full bg-image hover-zoom hover-shadow"
  >
    <!--    Картинка-->
    <a href="#!">
      <img
        :src="isShown ? photo : null"
        class="h-full w-full object-cover rounded-md z-depth-3 w-100"
      />
    </a>
  </div>

</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import useIntersectionObserver from '@/composables/useIntersectionObserver'

export default {
  name: 'PhotoCard',
  props: {
    photo: String
  },
  setup () {
    const el = ref(null)
    const { observe, unobserve, isShown } = useIntersectionObserver()

    onMounted(() => {
      observe(el.value)
    })

    onBeforeUnmount(() => {
      unobserve(el.value)
    })
    return {
      el,
      isShown
    }
  }
}
</script>
