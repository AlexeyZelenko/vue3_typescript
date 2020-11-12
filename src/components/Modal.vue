<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div
            v-for="(video, i) in lastVideoData.items"
            :key="i"
            class="modal-body"
          >
            <slot name="body">
              <youtube
                style="padding: 5px"
                @ready="ready"
                :player-vars="{ autoplay: 0, controls: 1, modestbranding: 1, showinfo: 0, rel: 0 }"
                player-width="100%"
                :video-id="ijUrKZEPimo"
              />
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import store from '@/store'

export default defineComponent({
  name: 'Modal',
  data: () => ({
  }),
  setup () {
    const lastVideoData = computed(() => store.state.LastVideoData)
    return {
      lastVideoData
    }
  }
})
</script>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
