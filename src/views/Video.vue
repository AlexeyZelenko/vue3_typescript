<template>
  <div>
    <div class="jumbotron">
      <div class="container">
        <h1>
          {{TextBible.title}}
        </h1>
        <h1>{{TextBible.verse}}</h1>
      </div>
    </div>
  </div>
  <div class="div1">
    <nav>
      <section class="button_tab"
        @click="listVideo('UUSb71yKJmS0eHyhRRl00ioQ')"
      >
        ВСІ
      </section>
      <section
        class="button_tab"
        @click="listVideo('PLlURDWJlf7fS8-Z9hz4ShqtXdjg2tIGil')"
      >
        ПРОПОВІДІ
      </section>
      <section class="button_tab"
        @click="listVideo('PLlURDWJlf7fQyA3kIfQ9Pa3Dtd_tM97-z')"
      >
        ПІСНІ
      </section>
<!--      <button_tab-->
<!--        @click="listVideo('PLlURDWJlf7fS9RdrfemM6deAzy1zLyhug')"-->
<!--      >-->
<!--        ДІТИ-->
<!--      </button_tab>-->
      <div class="div2"></div>
    </nav>
  </div>

<!--  Лист видео-->
  <div class="youtube-container">
    <template
      v-for="item in ListVideoData"
      :key="item.id"
      class="youtube-list"
    >
      <ModalVideo
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
            allowfullscreen
          ></iframe>
        </template>

      </ModalVideo>

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
import { defineComponent, computed, ref, onMounted, defineAsyncComponent } from 'vue'
import store from '@/store'
const ModalVideo = defineAsyncComponent(() => import('@/components/ModalVideo.vue'))

export default defineComponent({
  name: 'Video',
  components: {
    ModalVideo
  },
  setup () {
    const showModal = ref(false)
    const videoModal = ref('')
    const videoModalTitle = ref('')
    const ListVideoData = computed(() => store.state.ListVideoData)

    const TextBible = computed(() => store.getters.GET_textBible)

    const openModal = (item: any) => {
      showModal.value = true
      videoModal.value = item.snippet.resourceId.videoId
      videoModalTitle.value = item.snippet.title
    }

    const listVideo = (value: string) => {
      const payload = { value }
      store.dispatch('getListVideoData', payload)
    }

    const startListVideo = () => {
      store.dispatch('getListVideoData')
    }
    onMounted(startListVideo)

    // const cats = ref([])
    // const fetchCats = async () => {
    //   cats.value = await fetch(
    //     'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUSb71yKJmS0eHyhRRl00ioQ&key=AIzaSyAzu641YEewkYY6zzS8nAzTxY6XDLxCCkY&part=snippet&maxResults=10'
    //   ).then((response) => response.json())
    //   console.log(cats.value)
    // }
    // onMounted(fetchCats)

    return {
      ListVideoData,
      listVideo,
      showModal,
      videoModalTitle,
      openModal,
      videoModal,
      TextBible
      // cats
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
  .button_tab{
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
  .button_tab:nth-child(1) ~ div{
    transition:all .33s linear;
    -webkit-transition:all .33s linear;

  }
  .button_tab:nth-child(2):hover ~ div {
    transform:translate(100px);
    -webkit-transform:translate(100px);
    background-color:#e74c3c;
    transition:all .33s linear;
    -webkit-transition:all .33s linear;
  }
  .button_tab:nth-child(3):hover ~ div {
    transform:translate(100px);
    -webkit-transform:translate(200px);
    background-color:#BF55EC;
    transition:all .33s linear;
    -webkit-transition:all .33s linear;
  }
  .button_tab:nth-child(4):hover ~ div {
    transform:translate(100px);
    -webkit-transform:translate(360px);
    background-color:#f39c12;
    color:#03C9A9;
    transition:all .33s linear;
    -webkit-transition:all .33s linear;
  }
  .button_tab:nth-child(2):hover {
    color:#e74c3c;
  }

  .button_tab:nth-child(3):hover {
    color:#BF55EC;
  }

  .button_tab:nth-child(4):hover {
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
    margin-top: 10px;
    margin-bottom: 10px;
    border: 6px solid #BFE2FF;
    transition: box-shadow 0.3s linear;
    cursor: pointer;
    background: #BFE2FF;
    text-align: center;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }
  .change-youtube:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.2), 0 16px 20px rgba(0,0,0,0.2);
  }

  @media (max-width: 570px) {
    .youtube-list .change-youtube {
      width: 100%;
      float: none;
    }
  }
</style>
