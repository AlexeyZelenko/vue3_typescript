<template>
  <ul
    v-if="photos"
    class="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-2 lg:grid-cols-3"
  >
    <li v-for="photo in photos" :key="photo.id">
      <PhotoCard
        :photo="photo"
      />
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
    photos: {
      type: Object
    }
  }
}
</script>
<!--<style>-->
<!--Стиль для v-cloak-->
<!--  [v-cloak] {-->
<!--    display: block;-->
<!--    padding: 50px 0;-->
<!--  }-->

<!--  @keyframes spinner {-->
<!--    to {-->
<!--      transform: rotate(360deg);-->
<!--    }-->
<!--  }-->

<!--  [v-cloak]:before {-->
<!--    content: '';-->
<!--    box-sizing: border-box;-->
<!--    position: absolute;-->
<!--    top: 50%;-->
<!--    left: 50%;-->
<!--    width: 20px;-->
<!--    height: 20px;-->
<!--    margin-top: -10px;-->
<!--    margin-left: -10px;-->
<!--    border-radius: 50%;-->
<!--    border: 2px solid #ccc;-->
<!--    border-top-color: #333;-->
<!--    animation: spinner .6s linear infinite;-->
<!--    text-indent: 100%;-->
<!--    white-space: nowrap;-->
<!--    overflow: hidden;-->
<!--  }-->

<!--  [v-cloak] > div {-->
<!--    display: none;-->
<!--  }-->
<!--</style>-->
