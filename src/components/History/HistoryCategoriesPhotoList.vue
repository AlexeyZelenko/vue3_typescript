<template>
  <div
    v-if="categories"
    class="row row-cols-1 row-cols-md-3 g-4"
  >
    <div
      class="col"
      v-for="category in categories"
      :key="category.id"
    >
      <HistoryCategoriesPhotoCard :category="category" />
    </div>
  </div>
</template>

<script>
import HistoryCategoriesPhotoCard from './HistoryCategoriesPhotoCard.vue'

export default {
  name: 'GameList',
  components: {
    HistoryCategoriesPhotoCard
  },
  props: {
    categories: {
      type: Object
    }
  }
}
</script>
