<template>
  <div
    class="container"
    style="margin-top: 50px"
  >
   <RecycleScroller
    class="scroller row row-cols-1 row-cols-md-2 g-4"
    :items="list"
    :item-size="32"
    key-field="id"
    v-slot="{ item }"
  >
    <div
      class="col p-4"
    >
      <div class="card">
        <div class="card-body">
          <h5 class="card-title" v-text="item.title"></h5>
          <p class="card-text">{{item.verse}}</p>
        </div>
      </div>
    </div>
  </RecycleScroller>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    TextBible: {},
    list: []
  }),
  async mounted () {
    const response = await fetch('https://blv-vue3-tp.firebaseio.com/poetry.json')
    const data = await response.json()

    const arrayVerse = Object.keys(data).map(key => {
      return { ...data[key], id: key }
    })
    console.log(arrayVerse)
    this.list = arrayVerse

    // Случайный стих
    this.TextBible = arrayVerse[Math.floor(Math.random() * arrayVerse.length)]
  }
})
</script>

<style scoped>
  .scroller {
    height: 100%;
  }

  .user {
    height: 32%;
    padding: 0 12px;
    display: flex;
    align-items: center;
  }
</style>
