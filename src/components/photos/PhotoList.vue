<template>
  <ul
    ref="el"
    v-if="photos"
    class="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-2 lg:grid-cols-3"
  >
    <li
      v-for="photo in photos"
      :key="photo.id"
    >
      <PhotoCard
        :photo="isShown ? photo : null"
      />
    </li>
  </ul>

</template>

<script>
import PhotoCard from './PhotoCard.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import useIntersectionObserver from '@/composables/useIntersectionObserver'

export default {
  name: 'PhotoList',
  components: {
    PhotoCard
  },
  props: {
    photos: {
      type: Object
    }
  },
  setup (props) {
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
