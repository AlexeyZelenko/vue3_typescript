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
      <a href="#" class="hvr-grow">HOME</a>
      <a href="#" >ABOUT</a>
      <a href="#" >CONTACT US</a>
      <a href="#" >FOLLOW US</a>
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

        <template v-slot:body>
          <iframe
            width="560"
            height="315"
            :src="`https://www.youtube.com/embed/${videoModal}`"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
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
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
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
  // computed: {
  //   mainVideo (): string {
  //     return this.LastVideoData.resourceId.videoId
  //   }
  // },
  methods: {
    openModal (item) {
      this.showModal = true
      this.videoModal = item.snippet.resourceId.videoId
      this.videoModalTitle = item.snippet.title
    },
    PlaylistIdSermons () {
      this.resultPlaylistId = 'PLlURDWJlf7fS8-Z9hz4ShqtXdjg2tIGil'
      this.refresh()
    },
    PlaylistIdAll () {
      this.resultPlaylistId = 'UUSb71yKJmS0eHyhRRl00ioQ'
      this.refresh()
    },
    PlaylistIdSong () {
      this.resultPlaylistId = 'PLlURDWJlf7fQyA3kIfQ9Pa3Dtd_tM97-z'
      this.refresh()
    },
    PlaylistIdLife () {
      this.resultPlaylistId = 'PLlURDWJlf7fTuF3VfkKrsesTtfQtuNwo9'
      this.refresh()
    },
    PlaylistIdChildren () {
      this.resultPlaylistId = 'PLlURDWJlf7fS9RdrfemM6deAzy1zLyhug'
      this.refresh()
    }
  },
  setup () {
    const ListVideoData = computed(() => store.state.ListVideoData)

    const listVideo = () => {
      store.dispatch('getListVideoData')
    }
    onMounted(listVideo)
    return {
      ListVideoData,
      listVideo
    }
  }
})
</script>

<style>
  .div1{
    width: 100%;
    height: 100px;
    font-family: 'Oswald', sans-serif;
    background-color:#212;
    position: relative
  }

  nav{
    padding: 10px;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%)
  }
  a{
    text-decoration:none;
    color:#fff;
    width:120px;
    display:inline-block;
    text-align:center;
    transition:all .33s linear;
    -webkit-transition:all .33s linear;
  }

  .div2 {
    width:120px;
    height:2px;
    background:#fff;
  }
  a:nth-child(1) ~ div{
    transition:all .33s linear;
    -webkit-transition:all .33s linear;

  }
  a:nth-child(2):hover ~ div {
    transform:translate(120px);
    -webkit-transform:translate(120px);
    background-color:#e74c3c;
    transition:all .33s linear;
    -webkit-transition:all .33s linear;
  }
  a:nth-child(3):hover ~ div {
    transform:translate(120px);
    -webkit-transform:translate(240px);
    background-color:#BF55EC;
    transition:all .33s linear;
    -webkit-transition:all .33s linear;
  }
  a:nth-child(4):hover ~ div {
    transform:translate(120px);
    -webkit-transform:translate(360px);
    background-color:#f39c12;
    color:#03C9A9;
    transition:all .33s linear;
    -webkit-transition:all .33s linear;
  }
  a:nth-child(2):hover {
    color:#e74c3c;
  }

  a:nth-child(3):hover {
    color:#BF55EC;
  }

  a:nth-child(4):hover {
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
