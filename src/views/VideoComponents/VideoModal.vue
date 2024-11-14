<template>
  <div class="modal">
    <div class="modal-content">
      <span @click="$emit('close')" class="close">&times;</span>
      <iframe
        v-if="videoId"
        :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&origin=http://bv.ck.ua`"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VideoModal',
  props: {
    videoId: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
</style>
