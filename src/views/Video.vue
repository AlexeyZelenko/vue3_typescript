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

<!--      Карточка видео-->
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
<!--    @click="countVideo"-->
<!--    class="fixedbut"-->
<!--  >-->
<!--    Додати 5 відео-->
<!--  </button>-->
  <div
    @click="countVideo"
    type="button"
    class="callback-bt"
  >
    <div class="text-call">
      <i class="fas fa-plus"></i>
      <span>додати 5<br>відео </span>
    </div>
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
    const idList = ref('UUSb71yKJmS0eHyhRRl00ioQ')
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
      idList.value = value
      const payload = { value }
      store.dispatch('getListVideoData', payload)
    }

    const countVideo = () => {
      store.commit('AddVideoOnPage', {
        count: 5
      })
      listVideo(idList.value)
    }

    const startListVideo = () => {
      store.dispatch('getListVideoData')
    }
    onMounted(startListVideo)

    return {
      ListVideoData,
      listVideo,
      showModal,
      videoModalTitle,
      openModal,
      videoModal,
      TextBible,
      countVideo
    }
  }
})
</script>

<style scoped>
  /*кнопка звонка*/

  .callback-bt {
    background:#38a3fd;
    border:2px solid #38a3fd;
    border-radius:50%;
    box-shadow:0 8px 10px rgba(56,163,253,0.3);
    cursor:pointer;
    height:68px;
    text-align:center;
    width:68px;
    position: fixed;
    left: 5%;
    bottom: 5%;
    z-index:999;
    transition:.5s;
    -webkit-animation:hoverWave linear 1s infinite;
    animation:hoverWave linear 1s infinite;
  }

  .callback-bt .text-call{
    height:68px;
    width:68px;
    border-radius:50%;
    position:relative;
    overflow:hidden;
  }

  .callback-bt .text-call span {
    text-align: center;
    color:#38a3fd;
    opacity: 0;
    font-size: 0;
    position:absolute;
    right: 4px;
    top: 22px;
    line-height: 14px;
    font-weight: 600;
    text-transform: uppercase;
    transition: opacity .3s linear;
    font-family: 'montserrat', Arial, Helvetica, sans-serif;
  }

  .callback-bt .text-call:hover span {
    opacity: 1;
    font-size: 11px;
  }
  .callback-bt:hover i {
    display:none;
  }

  .callback-bt:hover {
    z-index:1;
    background:#fff;
    color:transparent;
    transition:.3s;
  }
  .callback-bt:hover i {
    color:#38a3fd;
    font-size:40px;
    transition:.3s;
  }
  .callback-bt i {
    color:#fff;
    font-size:34px;
    transition:.3s;
    line-height: 66px;transition: .5s ease-in-out;
  }

  .callback-bt i  {
    animation: 1200ms ease 0s normal none 1 running shake;
    animation-iteration-count: infinite;
    -webkit-animation: 1200ms ease 0s normal none 1 running shake;
    -webkit-animation-iteration-count: infinite;
  }

  @-webkit-keyframes hoverWave {
    0% {
      box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 0 rgba(56,163,253,0.2),0 0 0 0 rgba(56,163,253,0.2)
    }
    40% {
      box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 15px rgba(56,163,253,0.2),0 0 0 0 rgba(56,163,253,0.2)
    }
    80% {
      box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 30px rgba(56,163,253,0),0 0 0 26.7px rgba(56,163,253,0.067)
    }
    100% {
      box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 30px rgba(56,163,253,0),0 0 0 40px rgba(56,163,253,0.0)
    }
  }@keyframes hoverWave {
     0% {
       box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 0 rgba(56,163,253,0.2),0 0 0 0 rgba(56,163,253,0.2)
     }
     40% {
       box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 15px rgba(56,163,253,0.2),0 0 0 0 rgba(56,163,253,0.2)
     }
     80% {
       box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 30px rgba(56,163,253,0),0 0 0 26.7px rgba(56,163,253,0.067)
     }
     100% {
       box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 30px rgba(56,163,253,0),0 0 0 40px rgba(56,163,253,0.0)
     }
   }

  /* animations icon */

  @keyframes shake {
    0% {
      transform: rotateZ(0deg);
      -ms-transform: rotateZ(0deg);
      -webkit-transform: rotateZ(0deg);
    }
    10% {
      transform: rotateZ(-30deg);
      -ms-transform: rotateZ(-30deg);
      -webkit-transform: rotateZ(-30deg);
    }
    20% {
      transform: rotateZ(15deg);
      -ms-transform: rotateZ(15deg);
      -webkit-transform: rotateZ(15deg);
    }
    30% {
      transform: rotateZ(-10deg);
      -ms-transform: rotateZ(-10deg);
      -webkit-transform: rotateZ(-10deg);
    }
    40% {
      transform: rotateZ(7.5deg);
      -ms-transform: rotateZ(7.5deg);
      -webkit-transform: rotateZ(7.5deg);
    }
    50% {
      transform: rotateZ(-6deg);
      -ms-transform: rotateZ(-6deg);
      -webkit-transform: rotateZ(-6deg);
    }
    60% {
      transform: rotateZ(5deg);
      -ms-transform: rotateZ(5deg);
      -webkit-transform: rotateZ(5deg);
    }
    70% {
      transform: rotateZ(-4.28571deg);
      -ms-transform: rotateZ(-4.28571deg);
      -webkit-transform: rotateZ(-4.28571deg);
    }
    80% {
      transform: rotateZ(3.75deg);
      -ms-transform: rotateZ(3.75deg);
      -webkit-transform: rotateZ(3.75deg);
    }
    90% {
      transform: rotateZ(-3.33333deg);
      -ms-transform: rotateZ(-3.33333deg);
      -webkit-transform: rotateZ(-3.33333deg);
    }
    100% {
      transform: rotateZ(0deg);
      -ms-transform: rotateZ(0deg);
      -webkit-transform: rotateZ(0deg);
    }
  }

  @-webkit-keyframes shake {
    0% {
      transform: rotateZ(0deg);
      -ms-transform: rotateZ(0deg);
      -webkit-transform: rotateZ(0deg);
    }
    10% {
      transform: rotateZ(-30deg);
      -ms-transform: rotateZ(-30deg);
      -webkit-transform: rotateZ(-30deg);
    }
    20% {
      transform: rotateZ(15deg);
      -ms-transform: rotateZ(15deg);
      -webkit-transform: rotateZ(15deg);
    }
    30% {
      transform: rotateZ(-10deg);
      -ms-transform: rotateZ(-10deg);
      -webkit-transform: rotateZ(-10deg);
    }
    40% {
      transform: rotateZ(7.5deg);
      -ms-transform: rotateZ(7.5deg);
      -webkit-transform: rotateZ(7.5deg);
    }
    50% {
      transform: rotateZ(-6deg);
      -ms-transform: rotateZ(-6deg);
      -webkit-transform: rotateZ(-6deg);
    }
    60% {
      transform: rotateZ(5deg);
      -ms-transform: rotateZ(5deg);
      -webkit-transform: rotateZ(5deg);
    }
    70% {
      transform: rotateZ(-4.28571deg);
      -ms-transform: rotateZ(-4.28571deg);
      -webkit-transform: rotateZ(-4.28571deg);
    }
    80% {
      transform: rotateZ(3.75deg);
      -ms-transform: rotateZ(3.75deg);
      -webkit-transform: rotateZ(3.75deg);
    }
    90% {
      transform: rotateZ(-3.33333deg);
      -ms-transform: rotateZ(-3.33333deg);
      -webkit-transform: rotateZ(-3.33333deg);
    }
    100% {
      transform: rotateZ(0deg);
      -ms-transform: rotateZ(0deg);
      -webkit-transform: rotateZ(0deg);
    }
  }
  /* конец кнопки звонка */
  .fixedbut {
    position: fixed;
    bottom: 20px;
    left: 20px;
    display: block;
    background: #2db700;
    color: #fff;
    text-decoration: none;
    padding: 6px 23px;
    font-size: 17px;
  }
  .fixedbut:hover { background: #222; }
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
