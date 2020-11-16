<template>
  <div>
    <div class="jumbotron">
      <div class="container">
        <h1>
          Так бо Бог полюбив світ, що дав Сина Свого Одноро́дженого, щоб кожен, хто вірує в Нього, не згинув, але мав життя вічне.
        </h1>
      </div>
    </div>
  </div>
  <div class="div1">
    <nav>
      <button_tab
        @click="listVideo('UUSb71yKJmS0eHyhRRl00ioQ')"
      >
        ВСІ
      </button_tab>
      <button_tab
        @click="listVideo('PLlURDWJlf7fS8-Z9hz4ShqtXdjg2tIGil')"
        class="hvr-grow"
      >
        ПРОПОВІДІ
      </button_tab>
      <button_tab
        @click="listVideo('PLlURDWJlf7fQyA3kIfQ9Pa3Dtd_tM97-z')"
      >
        ПІСНІ
      </button_tab>
<!--      <button_tab-->
<!--        @click="listVideo('PLlURDWJlf7fS9RdrfemM6deAzy1zLyhug')"-->
<!--      >-->
<!--        ДІТИ-->
<!--      </button_tab>-->
      <div class="div2"></div>
    </nav>
  </div>
  <div class="youtube-container">
    <template
      v-for="item in ListVideoData"
      :key="item.id"
      class="youtube-list"
    >
      <Modal
        v-if="showModal"
        @click="showModal = false"
      >
        <template #header>
          <h4>{{videoModalTitle}}</h4>
        </template>

        <template #body>
          <iframe
            :src="`https://www.youtube.com/embed/${videoModal}`"
            frameborder="0"
            allow="accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture"
            allowfyullscreen
          ></iframe>
        </template>

      </Modal>

      <div
        class="change-youtube"
        :class="item.class"
        :data-youtube="item.snippet.resourceId.videoId"
        @click="openModal(item)"
      >
        <img
          style="width: 100%"
          :src="item.snippet.thumbnails.medium.url"
        />
        <p
          style="max-width: 200px"
        >{{item.snippet.title}}</p>
      </div>

    </template>
  </div>
<!--  <button-->
<!--    @click="videoOnPage( 5)"-->
<!--  >-->
<!--    додати 5 відео-->
<!--  </button>-->
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import store from '@/store'
import Modal from '@/components/Modal.vue'

export default defineComponent({
  name: 'Video',
  components: {
    Modal
  },
  data: () => ({
    showModal: false,
    videoModal: '',
    videoModalTitle: ''
  }),
  methods: {
    openModal (item) {
      this.showModal = true
      this.videoModal = item.snippet.resourceId.videoId
      this.videoModalTitle = item.snippet.title
    }
  },
  setup () {
    const ListVideoData = computed(() => store.state.ListVideoData)

    const videoOnPage = (value2) => {
      const payload = { value2 }
      store.dispatch('getListVideoData', payload)
    }

    const listVideo = (value) => {
      const payload = { value }
      store.dispatch('getListVideoData', payload)
    }
    // onMounted(listVideo)
    return {
      ListVideoData,
      listVideo,
      videoOnPage
    }
  }
})
</script>

<style scoped>
  .div1{
    width: 100%;
    height: 100px;
    font-family: 'Oswald', sans-serif;
    background-color:#212;
    position: relative
  }

  nav{
    padding: 5px;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%)
  }
  button_tab{
    cursor: pointer;
    text-decoration:none;
    color:#fff;
    width:100px;
    display:inline-block;
    text-align:center;
    transition:all .33s linear;
    -webkit-transition:all .33s linear;
  }

  .div2 {
    width:100px;
    height:2px;
    background:#fff;
  }
  button_tab:nth-child(1) ~ div{
    transition:all .33s linear;
    -webkit-transition:all .33s linear;

  }
  button_tab:nth-child(2):hover ~ div {
    transform:translate(100px);
    -webkit-transform:translate(100px);
    background-color:#e74c3c;
    transition:all .33s linear;
    -webkit-transition:all .33s linear;
  }
  button_tab:nth-child(3):hover ~ div {
    transform:translate(100px);
    -webkit-transform:translate(200px);
    background-color:#BF55EC;
    transition:all .33s linear;
    -webkit-transition:all .33s linear;
  }
  button_tab:nth-child(4):hover ~ div {
    transform:translate(100px);
    -webkit-transform:translate(360px);
    background-color:#f39c12;
    color:#03C9A9;
    transition:all .33s linear;
    -webkit-transition:all .33s linear;
  }
  button_tab:nth-child(2):hover {
    color:#e74c3c;
  }

  button_tab:nth-child(3):hover {
    color:#BF55EC;
  }

  button_tab:nth-child(4):hover {
    color:#f39c12;
  }

  ---------
  .youtube-container-main {
    margin-top: 20px;
  }
  .youtube-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .youtube-list {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 16px;
    margin-bottom: 16px;
    margin-left: 1px;
  }
  .change-youtube {
    box-shadow: 0 2px 5px rgba(0,0,0,0.2), 0 4px 6px rgba(0,0,0,0.2);
    margin-top: 30px;
    margin-bottom: 50px;
    border: 6px solid #BFE2FF;
    transition: box-shadow 0.3s linear;
    cursor: pointer;
    background: #BFE2FF;
    text-align: center;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }
  .change-youtube:nth-child(2) {
    margin-left: 16px;
    margin-right: 16px;
  }
  .change-youtube span {
    display: block;
    padding: 6px 12px 0 12px;
    font-size: 18px;
    font-family: 'Roboto Condensed', sans-serif;
  }
  .change-youtube:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.2), 0 16px 20px rgba(0,0,0,0.2);
  }
  .change-youtube.active {
    border: 6px solid #00b3ff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2), 0 16px 20px rgba(0,0,0,0.2);
    color: #FFF;
    background: #00b3ff;
  }

  @media (max-width: 570px) {
    .youtube-list .change-youtube {
      width: 100%;
      float: none;
    }
  }
</style>
