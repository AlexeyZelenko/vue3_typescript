<template>
  <div
    ref="el"
    class="bg-gray-800 radius-sm shadow-md rounded-md h-full"
  >
<!--    Картинка-->
    <figure class="relative pb-2/3">
      <img
        :src="isShown ? gameImages : null"
        :alt="`${gameName} обложка`"
        class=" h-full w-full object-cover rounded-t-md"
      />
    </figure>

<!--Карточка-->
    <div class="p-5">
      <h3
        class="text-2xl font-bold"
        style="color: #f7f4f4"
      >
        {{ gameName }}
      </h3>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import useIntersectionObserver from '@/composables/useIntersectionObserver'

export default {
  name: 'GameCard',
  props: {
    game: Object
  },
  setup (props) {
    const photo = ref({})
    const el = ref(null)
    const { observe, unobserve, isShown } = useIntersectionObserver()

    const gameImages = computed(() => {
      return props.game.picture
    })
    const gameName = computed(() => {
      return props.game.name
    })
    const gameKey = computed(() => {
      return props.game.id
    })

    onMounted(() => {
      observe(el.value)
    })

    onBeforeUnmount(() => {
      unobserve(el.value)
    })
    return {
      gameImages,
      el,
      isShown,
      gameName,
      photo,
      gameKey
    }
  }
}
</script>
