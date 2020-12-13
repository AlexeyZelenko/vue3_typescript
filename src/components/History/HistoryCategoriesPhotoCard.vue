<template>
  <div
    ref="el"
    class="bg-gray-800 radius-sm shadow-md rounded-md h-full"
  >
    <!--    Картинка-->
    <a
      href="#!"
      @click="clickFoto"
    >
      <figure
        class="relative pb-2/3"
      >
        <img
          @click="openModal(categoryImages)"
          :src="isShown ? categoryImages : null"
          :alt="`${categoryName} обложка`"
          class=" h-full w-full object-cover rounded-t-md"
        />
      </figure>
    </a>

    <!--Карточка-->
    <div class="p-5">
      <p
        class="text-2xl font-semibold border-solid border-4 border-blue-600 w-100 text-center"
      >
        {{ categoryYear }} рік
      </p>
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
  <ModalImages
    v-if="showModal"
    @click="showModal = false"
  >
    <template #body>
      <img
        :src="categoryImages"
        style="max-height: 600px;"
        class="rounded-md"
      />
    </template>
  </ModalImages>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import useIntersectionObserver from '@/composables/useIntersectionObserver'
import ModalImages from '@/components/photos/ModalImages'

export default {
  name: 'CategoriesPhotoCard',
  props: {
    category: Object
  },
  components: {
    ModalImages
  },
  setup (props) {
    const openModal = (categoryImages) => {
      showModal.value = true
    }
    const showModal = ref(false)
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
    const categoryYear = computed(() => props.category.year)

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
      categoryDescription,
      categoryYear,
      openModal,
      showModal
    }
  }
}
</script>
