<template>
  <div class="flex flex-wrap justify-center">
    <div class="mx-4  max-w-4xl justify-center">
      <router-link to="/photo_gallery">
        <span class="d-grid gap-2 flex-1 mb-4">
          <button
            style="margin-top: 10px"
            class="btn btn-primary"
            type="button"
          >
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              class="bi bi-arrow-left hover:text-blue-700"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"
              />
              <path
                fill-rule="evenodd"
                d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
            назад до Фотогалереї
          </button>
        </span>
      </router-link>
      <template v-if="arrayImages">
        <PhotoList :photos="arrayImages" />
      </template>
      <template v-else-if="!arrayImages && !error">
        <PhotoListSkeleton />
      </template>
    </div>
  </div>
</template>

<script lang="ts">

import PhotoList from '@/components/photos/PhotoList.vue'
import PhotoListSkeleton from '@/components/photos/PhotoListSkeleton.vue'
import { defineComponent } from 'vue'
import { db } from '@/main'

export default defineComponent({
  name: 'GameProfile',
  components: {
    PhotoList,
    PhotoListSkeleton
  },
  data () {
    return {
      category: {},
      arrayImages: []
    }
  },
  created () {
    const dbRef = db.collection('photos').doc(this.$route.params.id)
    dbRef.get().then((doc) => {
      this.category = doc.data()
      this.arrayImages = this.category.arrayImages
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    onUpdateForm (event) {
      event.preventDefault()
      db.collection('photos').doc(this.$route.params.id)
        .update(this.photo).then(() => {
          console.log('category successfully updated!')
          this.$router.push('/list')
        }).catch((error) => {
          console.log(error)
        })
    }
  }
})
</script>
