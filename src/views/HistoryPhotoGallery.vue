<template>
  <div class="mx-4 flex flex-wrap justify-center">
    <div class="mx-4  max-w-4xl justify-center">
      <h1
        style="margin-top: 10px"
        class="font-bold text-5xl flex-1 mb-4 justify-center"
      >
        Історія в фото...
      </h1>
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
    const categories = ref([])
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
      categories
    }
  }
})
</script>
