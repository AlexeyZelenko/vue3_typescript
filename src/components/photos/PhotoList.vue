<template>
  <div
    id="carousel-example-1z" class="carousel slide carousel-fade" data-ride="carousel">
    <div
      class="carousel-inner">
      <div
        v-for="(item, i) in category"
        :key="i"
        class="carousel-item active">
        <figure>
          <img
            :src=item
            class="d-block w-100"
            alt="..."
          >
        </figure>
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselExampleIndicators"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </a>
  </div>
<!--  <ul-->
<!--    v-if="games"-->
<!--    class="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-2 lg:grid-cols-3"-->
<!--  >-->
<!--    <li v-for="game in games" :key="game.id">-->
<!--      <router-link :to="{name: 'games', params: { id: game.name }}">-->
<!--        <PhotoCard :game="game" />-->
<!--      </router-link>-->
<!--    </li>-->
<!--    <li-->
<!--      v-for="game in games"-->
<!--      :key="game.id"-->
<!--    >-->
<!--      <PhotoCard :game="game" />-->
<!--    </li>-->
<!--  </ul>-->
</template>

<script>
// import PhotoCard from './PhotoCard.vue'

export default {
  name: 'PhotoList',
  // components: {
  //   PhotoCard
  // },
  props: {
    category: {
      type: Object
    }
  }
}
</script>
