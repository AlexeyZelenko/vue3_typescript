<template>
  <div
    ref="el"
    class="bg-gray-800 radius-sm shadow-md rounded-md h-full"
  >
<!--    Картинка-->
    <figure class="relative pb-2/3">
      <img
        :src="isShown ? categoryImages : null"
        :alt="`${categoryName} обложка`"
        class=" h-full w-full object-cover rounded-t-md"
      />
    </figure>

<!--Карточка-->
    <div class="p-5">
      <h3
        class="text-2xl font-bold"
        style="color: #f7f4f4"
      >
        {{ categoryName }}
      </h3>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import useIntersectionObserver from '@/composables/useIntersectionObserver'

export default {
  name: 'CategoriesPhotoCard',
  props: {
    category: Object
  },
  setup (props) {
    const photo = ref({})
    const el = ref(null)
    const { observe, unobserve, isShown } = useIntersectionObserver()

    const categoryImages = computed(() => {
      return props.category.picture
    })
    const categoryName = computed(() => {
      return props.category.name
    })
    const categoryKey = computed(() => {
      return props.category.id
    })

    onMounted(() => {
      observe(el.value)
    })

    onBeforeUnmount(() => {
      unobserve(el.value)
    })
    return {
      categoryImages,
      el,
      isShown,
      categoryName,
      photo,
      categoryKey
    }
  }
}
</script>
