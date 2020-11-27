<template>
  <div class="mx-4 flex flex-wrap justify-center">
    <div class="mx-4  max-w-4xl justify-center">
      <h1 class="font-bold text-5xl flex-1 mb-4">Фотогалерея</h1>
      <div class="flex">
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
      <template v-if="games">
        <GameList :games="games" />
      </template>
      <template v-else-if="!games && !error">
        <GameListSkeleton />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import GameList from '@/components/game/GameList.vue'
import GameListSkeleton from '@/components/game/GameListSkeleton.vue'
import { db } from '@/firebaseDb'

export default defineComponent({
  name: 'Home',
  components: {
    GameList,
    GameListSkeleton
  },
  setup () {
    const games = ref([])
    db.collection('photos').onSnapshot((snapshotChange) => {
      games.value = []
      snapshotChange.forEach((doc) => {
        games.value.push({
          id: doc.id,
          picture: doc.data().picture,
          name: doc.data().name
        })
      })
    })
    return {
      games
    }
  }
})
</script>
