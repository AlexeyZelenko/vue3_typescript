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
  <div
    id="player"
    class="youtube-container-main"
  >
    <iframe
      :src="`https://www.youtube.com/embed/${mainVideo}`"
      allowfullscreen
      allowtransparency
    ></iframe>
  </div>
  <div class="youtube-container">
    <div >
      <template
        v-for="item in ListVideoData"
        :key="item.id"
        class="youtube-list"
      >

        <div
          class="change-youtube"
          :class="item.class"
          :data-youtube="item.snippet.resourceId.videoId"
          @click="changeVideo(item.snippet.resourceId.videoId)"
        >
          <img
            style="width: 100%"
            :src="item.snippet.thumbnails.medium.url"
          />
          <p>{{item.snippet.title}}</p>
        </div>

      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import store from '@/store'

export default defineComponent({
  name: 'Video',
  data: () => ({
    mainVideo: 'kmHZ0lI-hHs'
  }),
  // computed: {
  //   mainVideo (): string {
  //     return this.LastVideoData.resourceId.videoId
  //   }
  // },
  methods: {
    changeVideo (item) {
      this.mainVideo = item
      const a = this.ListVideoData.findIndex(i => i.snippet.resourceId.videoId === item)
      for (let i = 0; this.ListVideoData.length > i; i++) {
        this.ListVideoData[i].class = 'change-youtube'
      }
      this.ListVideoData[a].class = 'change-youtube active'
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
    // const LastVideoData = computed(() => store.state.LastVideoData)

    const listVideo = () => {
      store.dispatch('getListVideoData')
    }
    onMounted(listVideo)
    return {
      ListVideoData,
      listVideo
      // LastVideoData
    }
  }
})
</script>

<style>
  .youtube-container-main {
    margin-top: 20px;
  }
  .youtube-container {
    padding-top: 30px;
    text-align: center;
    margin: 10px;
  }
  .youtube-list {
    width: 90%;
    max-width: 960px;
    margin-left: 10px;
    margin-right: 10px;
    padding-right: 20px;
  }
  .change-youtube {
    width: 30.333%;
    float: left;
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
    .youtube-container .youtube-list {
      width: 100%;
      float: none;
    }
  }
</style>
