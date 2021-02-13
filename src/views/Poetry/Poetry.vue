<template>
  <div
    class="card"
    style="text-align: center"
  >
    <div class="card-body">
      <p
        class="card-text"
        v-html="TextBible.title"
      ></p>
      <h5
        class="card-title text-muted lead"
        v-html="TextBible.verse"
      >
      </h5>
    </div>
  </div>
  <div
    class="container"
    style="margin-top: 50px"
  >
    <DynamicScroller
      :items="list"
      :min-item-size="54"
      class="scroller"
    >
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[
          item.title,
          item.verse
        ]"
          :data-index="index"
        >
          <div
            class="col p-4"
          >
            <div
              class="card"
              style="text-align: center"
            >
              <div class="card-body">
                <p
                  class="card-text"
                  v-html="item.title"
                ></p>
                <h5
                  class="card-title text-muted lead"
                  v-html="item.verse"
                >
                </h5>
              </div>
            </div>
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
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
    console.log(this.TextBible)
  }
})
</script>

<style scoped>
  .scroller {
    height: 100%;
  }
  /*.scroller {*/
  /*  height: 100%;*/
  /*}*/
  /*.user {*/
  /*  height: 32%;*/
  /*  padding: 0 12px;*/
  /*  display: flex;*/
  /*  align-items: center;*/
  /*}*/
</style>
