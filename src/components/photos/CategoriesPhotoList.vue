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
      <router-link
        style="text-decoration: none"
        :to="`/categories/${category.id}`"
      >
        <CategoriesPhotoCard :category="category" />
      </router-link>
    </div>
  </div>
</template>

<script>
import CategoriesPhotoCard from './CategoriesPhotoCard.vue'

export default {
  name: 'GameList',
  components: {
    CategoriesPhotoCard
  },
  props: {
    categories: {
      type: Object
    }
  }
}
</script>
