<template>
  <div
    ref="el"
    class="bg-gray-800 radius-sm shadow-md rounded-md h-full"
  >
    <!--    Картинка-->
    <img
      :src="isShown ? photo : null"
      class="h-full w-full object-cover rounded-md z-depth-3"
      @click="photoModal(photo)"
    />
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
    const photoElement = ref('')
    const el = ref(null)
    const { observe, unobserve, isShown } = useIntersectionObserver()

    const photoModal = (photo) => {
      photoElement.value = photo
      console.log(photoElement.value)
    }

    onMounted(() => {
      observe(el.value)
    })

    onBeforeUnmount(() => {
      unobserve(el.value)
    })
    return {
      el,
      isShown,
      photoModal,
      photoElement
    }
  }
}
</script>
