<template>
  <div
    class="bg-gray-900 relative pr-4 py-1 object-contain justify-center"
  >
    <div
      class="flex flex-wrap object-contain justify-center w-full"
    >
      <div
        class="px-1 max-w-4xl"
      >
        <h1
          class="font-bold text-4xl text-white flex-1 mb-4"
        >
          Контакти
        </h1>

        <div
          v-if="categories"
          class="row row-cols-1 row-cols-md-3 g-4"
        >
          <div
            class="col"
            v-for="category in categories"
            :key="category.id"
          >
            <div
              ref="el"
              class="bg-gray-800 radius-sm shadow-md rounded-md h-full mx-md-1"
            >
              <!--    Картинка-->
              <figure
                class="object-contain h-50 w-full"
              >
                <img
                  :src="isShown ? category.images : null"
                  :alt="`${category.name} обложка`"
                  class=" h-full w-full object-cover rounded-t-md"
                />
              </figure>

              <!--Карточка-->
              <div class="p-5">
                <p
                  class="text-2xl text-white-50 font-sansbold border-solid border-4 border-blue-600 w-100 mt-2 text-center"
                >
                  {{ category.name }}
                </p>
                <h3
                  class="text-xl lining-nums mt-md-2 text-white"
                >
                  {{ category.telephone }}
                </h3>
                <h6
                  class="text-sm mt-md-2 h-40"
                  style="color: #579f87"
                >
<!--                  {{ category.description }}-->
                  <span v-html="category.description"></span>
                </h6>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import useIntersectionObserver from '@/composables/useIntersectionObserver'

export default {
  name: 'Contacts',
  data: () => ({
    categories: [
      {
        id: 1,
        name: 'Вікторія',
        telephone: '+380635771563',
        description: 'Помічниця пастора',
        images: 'https://drive.google.com/uc?export=view&id=1ZOxl5Lr0ZKJcycqSkrrlWMJsUvIsWGRt'
      },
      {
        id: 2,
        name: 'Олександр',
        telephone: '+380734850426',
        description: 'адміністратор церкви',
        images: 'https://drive.google.com/uc?export=view&id=1CLUg5PIEDS91Y0RZywyEmR2_jmObrUca'
      }
    ]
  }),
  setup () {
    const openModal = (categoryImages) => {
      showModal.value = true
    }
    const showModal = ref(false)
    const photo = ref({})
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
      photo,
      openModal,
      showModal
    }
  }
}
</script>

<style scoped>

</style>
