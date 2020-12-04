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
