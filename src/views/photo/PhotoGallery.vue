<template>
  <div class="flex flex-wrap justify-center">
    <div class="mx-4  max-w-4xl justify-center">
      <h1
        style="margin-top: 10px"
        class="font-bold text-5xl flex-1 mb-4 justify-center"
      >
        Фотогалерея
      </h1>
      <template
        v-if="categories"
      >
        <CategoriesPhotoList
          class="pr-4 justify-center sm:pr-2"
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

import CategoriesPhotoList from '@/components/photos/CategoriesPhotoList.vue'
import PhotoListSkeleton from '@/components/photos/PhotoListSkeleton.vue'
import { db } from '@/main'

export default defineComponent({
  name: 'PhotoGallery',
  components: {
    CategoriesPhotoList,
    PhotoListSkeleton
  },
  setup () {
    const categories = ref([])
    db.collection('photos').onSnapshot((snapshotChange) => {
      categories.value = []
      snapshotChange.forEach((doc) => {
        categories.value.push({
          id: doc.id,
          picture: doc.data().picture,
          name: doc.data().name,
          arrayImages: doc.data().arrayImages,
          description: doc.data().description
        })
      })
    })
    return {
      categories
    }
  }
})
</script>
