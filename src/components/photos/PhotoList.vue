<template>
  <ul
    v-if="games"
    class="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-2 lg:grid-cols-3"
  >
<!--    <li v-for="game in games" :key="game.id">-->
<!--      <router-link :to="{name: 'games', params: { id: game.name }}">-->
<!--        <PhotoCard :game="game" />-->
<!--      </router-link>-->
<!--    </li>-->
    <li v-for="game in games" :key="game.id">
      <PhotoCard :game="game" />
    </li>
  </ul>
</template>

<script>
import PhotoCard from './PhotoCard.vue'

export default {
  name: 'PhotoList',
  components: {
    PhotoCard
  },
  props: {
    games: {
      type: Object
    }
  }
}
</script>
