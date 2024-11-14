<template>
  <div class="youtube-container">
    <div
      v-for="item in videos"
      :key="item.id"
      class="change-youtube"
      @click="$emit('selectVideo', item)"
    >
      <img
        v-if="item.snippet?.thumbnails?.medium?.url"
        style="width: 100%"
        :src="item.snippet.thumbnails.medium.url"
        alt="Video Thumbnail"
      />
      <p>{{ item.snippet?.title || 'Title not available' }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'VideoList',
  props: {
    videos: {
      type: Array as PropType<any[]>,
      required: true
    }
  }
})
</script>

<style scoped>
.youtube-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.change-youtube {
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  border: 6px solid #bfe2ff;
  cursor: pointer;
  background: #bfe2ff;
  text-align: center;
  padding: 15px;
}
.change-youtube:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
