<template>
  <div
    ref="el"
    class="bg-gray-800 radius-sm shadow-md rounded-md h-full w-full"
  >
<!--    Картинка-->
    <figure class="relative">
      <img
        :src="isShown ? categoryImages : null"
        :alt="`${categoryName} обложка`"
        class=" h-100 w-full object-cover rounded-t-md"
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
      <h6
        class="text-sm"
        style="color: #579f87"
      >
        {{ categoryDescription }}
      </h6>
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
      return props.category.arrayImages[0]
    })
    const categoryName = computed(() => {
      return props.category.name
    })
    const categoryDescription = computed(() => {
      return props.category.description
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
      categoryKey,
      categoryDescription
    }
  }
}
</script>
