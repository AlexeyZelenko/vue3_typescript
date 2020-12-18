<template>
  <div
    ref="el"
    class="bg-gray-800 radius-sm shadow-md rounded-md h-full bg-image hover-zoom hover-shadow"
  >
    <!--    Картинка-->
    <a
      href="#!"
      @click="clickFoto"
    >
      <img
        :src="isShown ? photo : null"
        class="h-full w-full object-cover rounded-md z-depth-3 w-100 "
        @click="openModal(photo)"
      />
    </a>

    <ModalImages
      v-if="showModal"
      @click="showModal = false"
    >
      <template #body>
        <img
          :src="photo"
          style="max-height: 80%;"
          class="rounded-md"
        />
      </template>
    </ModalImages>

  </div>

</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import useIntersectionObserver from '@/composables/useIntersectionObserver'
import ModalImages from '@/components/photos/ModalImages'

export default {
  name: 'PhotoCard',
  props: {
    photo: String
  },
  components: {
    ModalImages
  },
  setup (props) {
    const openModal = (photo) => {
      showModal.value = true
    }
    const showModal = ref(false)
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
      isShown,
      showModal,
      openModal
    }
  }
}
</script>

<style scoped>

</style>
