<template>
  <div
    class="bg-gray-900 relative px-4 py-1 sm:p-5"
  >
    <div
      class="flex flex-wrap justify-center sm:m-5"
    >
      <div
        class="p-1 max-w-4xl"
      >
        <h1
          class="font-bold text-4xl text-white flex-1 mb-4"
        >
          Історія в фото...
        </h1>

        <div class="flex mb-4">
          <input
            type="search"
            v-model="searchInput"
            v-on:keyup.enter="fetchGame(searchInput)"
            class="flex-1 text-white px-4 py-2 bg-gray-800 text-gray-300 rounded-sm"
            placeholder="Введіть рік..."
          />
          <button
            @click="fetchGame(searchInput)"
            class="py-2 px-5 uppercase font-bold bg-green-400 rounded-sm ml-2"
          >
            Пошук
          </button>
        </div>

        <template v-if="categories">
          <HistoryCategoriesPhotoList
            :categories="categories"
          />
        </template>

        <template v-else-if="!categories && !error">
          <PhotoListSkeleton />
        </template>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import HistoryCategoriesPhotoList from '@/components/History/HistoryCategoriesPhotoList.vue'
import PhotoListSkeleton from '@/components/photos/PhotoListSkeleton.vue'
import { db } from '@/main.ts'

export default defineComponent({
  name: 'PhotoGallery',
  components: {
    HistoryCategoriesPhotoList,
    PhotoListSkeleton
  },
  setup () {
    const searchInput = ref('')
    const sortYear = ref(2019)
    const categories = ref([])
    const fetchGame = (searchInput) => {
      sortYear.value = searchInput
      db.collection('history').where('year', '==', `${sortYear.value}`).onSnapshot((snapshotChange) => {
        categories.value = []
        snapshotChange.forEach((doc) => {
          categories.value.push({
            id: doc.id,
            name: doc.data().name,
            arrayImages: doc.data().arrayImages,
            description: doc.data().description,
            year: doc.data().year
          })
        })
      })
    }
    db.collection('history').onSnapshot((snapshotChange) => {
      categories.value = []
      snapshotChange.forEach((doc) => {
        categories.value.push({
          id: doc.id,
          name: doc.data().name,
          arrayImages: doc.data().arrayImages,
          description: doc.data().description,
          year: doc.data().year
        })
      })
    })
    return {
      categories,
      sortYear,
      searchInput,
      fetchGame
    }
  }
})
</script>
