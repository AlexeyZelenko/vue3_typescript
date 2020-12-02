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
      data-toggle="modal"
      data-target="#exampleModal"
    />
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>{{photo}}</p>
          <img
            :src="photoElement"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
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
