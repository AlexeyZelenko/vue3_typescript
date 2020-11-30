<template>
  <div
    ref="el"
    class="bg-gray-800 radius-sm shadow-md rounded-md h-full"
  >
    <!--    Картинка-->
    <img
      :src="isShown ? photo : null"
      class="h-full w-full object-cover rounded-md"
    />
  </div>
<!--  <div ref="el" class="card h-100">-->
<!--    <img-->
<!--      :src="isShown ? game : null"-->
<!--      class="rounded mx-auto d-block"-->
<!--    />-->
<!--  </div>-->
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
