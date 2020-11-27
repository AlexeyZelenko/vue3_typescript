<template>
  <div class="flex flex-wrap justify-center">
    <router-link to="/photo">
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
    </router-link>
    <div class="mx-4  max-w-4xl justify-center">
      <h1 class="font-bold text-5xl flex-1 mb-4">Фотогалерея</h1>
      <div class="flex mb-4">
        <input
          type="search"
          v-model="searchInput"
          v-on:keyup.enter="fetchGame"
          class="flex-1 text-black px-4 py-2 bg-gray-800 text-gray-300 rounded-sm"
          placeholder="Що шукаємо..."
        />
        <button
          @click="fetchGame"
          class="py-2 px-5 uppercase font-bold bg-green-400 rounded-sm ml-2"
        >
          Пошук
        </button>
      </div>
      <template v-if="listImages">
        <PhotoList :games="listImages" />
      </template>
      <template v-else-if="!listImages && !error">
        <GameListSkeleton />
      </template>
    </div>
  </div>
</template>

<script lang="ts">

import PhotoList from '@/components/photos/PhotoList.vue'
import GameListSkeleton from '@/components/game/GameListSkeleton.vue'
import { defineComponent } from 'vue'
import { db } from '@/firebaseDb'

export default defineComponent({
  name: 'GameProfile',
  components: {
    PhotoList,
    GameListSkeleton
  },
  data () {
    return {
      photo: {},
      listImages: {}
    }
  },
  created () {
    const dbRef = db.collection('photos').doc(this.$route.params.id)
    dbRef.get().then((doc) => {
      this.photo = doc.data()
      this.listImages = this.photo.listImages
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    onUpdateForm (event) {
      event.preventDefault()
      db.collection('photos').doc(this.$route.params.id)
        .update(this.photo).then(() => {
          console.log('photo successfully updated!')
          this.$router.push('/list')
        }).catch((error) => {
          console.log(error)
        })
    }
  }
})
</script>
