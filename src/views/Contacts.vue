<template>
  <div class="relative pr-4 py-1 object-contain justify-center">
    <div class="flex flex-wrap object-contain justify-center w-full">
      <div class="px-1 max-w-4xl">
        <h1 class="font-bold text-4xl text-white flex-1 mb-4">Контакти</h1>

        <div v-if="categories" class="row row-cols-1 row-cols-md-3 g-4">
          <div
            class="col mx-2"
            v-for="(category, index) in categories"
            :key="category.id"
            :ref="setElementRef(index)"
          >
            <div
              v-show="isShownList[index]"
              style="border: 2px solid grey"
              class="bg-gray-800 radius-sm shadow-md rounded-md h-full mx-md-1"
            >
              <!-- Картинка -->
              <figure class="object-contain h-50 w-full">
                <img
                  :src="require(`@/assets/img/email2.jpg`)"
                  :alt="`${category.name} обложка`"
                  class="h-full w-full object-cover rounded-t-md"
                />
              </figure>

              <!-- Карточка -->
              <div class="p-5">
                <p class="text-xl text-white-50 font-sansbold border-solid border-4 border-blue-600 w-100 mt-2 text-center">
                  {{ category.name }}
                </p>
                <h3 class="text-xl lining-nums mt-md-2 text-white">
                  {{ category.telephone }}
                </h3>
                <h6 class="text-xl mt-md-2 h-40" style="color: #579f87">
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
import useIntersectionObserver from '@/composables/useIntersectionObserverSlide'

export default {
  name: 'Contacts',
  setup() {
    const categories = ref([
      {
        id: 3,
        name: 'partner@bv.ck.ua',
        description: 'з усіх питань',
        images: '@/assets/img/email1.jpg'
      },
      {
        id: 4,
        name: 'info@bv.ck.ua',
        description: 'з питань партнерства',
        images: '@/assets/img/email2.jpg'
      }
    ])

    const elements = ref([]) // Массив элементов для наблюдения
    const isShownList = ref(new Array(categories.value.length).fill(false))
    const { observe, unobserve } = useIntersectionObserver()

    const setElementRef = (index) => (el) => {
      if (el) {
        elements.value[index] = el
      }
    }

    onMounted(() => {
      // Наблюдаем за всеми элементами после монтирования
      elements.value.forEach((el, index) => {
        if (el) {
          observe(el, (isIntersecting) => {
            isShownList.value[index] = isIntersecting
          })
        }
      })
    })

    onBeforeUnmount(() => {
      // Отписываемся от наблюдения за всеми элементами
      elements.value.forEach((el) => {
        if (el) {
          unobserve(el)
        }
      })
    })

    return {
      categories,
      setElementRef,
      isShownList
    }
  }
}
</script>
