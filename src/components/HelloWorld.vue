<template>
  <div>
<!--    Модальное окно-->
    <ModalVideo
      v-if="showModal"
      @click="showModal = false"
    >
      <template v-slot:header>
        <div>
          <h4 style="display: inline-block;">{{titleVideo}}</h4>
        </div>
      </template>

      <template v-slot:body>
        <iframe
          v-if="codVideo"
          :src="`https://www.youtube.com/embed/${codVideo}`"
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </template>

      <template v-slot:footer>
      </template>

    </ModalVideo>
    <!--    Модальное окно -  Прямая трансляция-->
    <ModalVideo
      v-if="showModalOnline"
      @click="showModalOnline = false"
    >
      <template v-slot:header>
        <div>
          <h4 style="display: inline-block;">{{liveTitleVideo}}</h4>
        </div>
      </template>

      <template v-slot:body>
        <iframe
          v-if="liveCodVideo"
          :src="`https://www.youtube.com/embed/${liveCodVideo}`"
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </template>

      <template v-slot:footer>
      </template>

    </ModalVideo>

    <header>
      <div class="container">
        <table>
          <tr>
            <td style="vertical-align: middle">
              <img :src="require(`@/assets/img/logo.png`)" />
            </td>
            <td style="vertical-align: middle">
              <h1>Блага вість</h1>
              <h3>Церква християн віри евангельскої</h3>
            </td>
          </tr>
        </table>
      </div>
    </header>

<!--    ВидеоОбложка-->
    <div class="fullscreen-bg">
      <div class="overlay">
        <h1>
          {{TextBible.title}}
        </h1>
        <a
          v-if="!LiveVideoData"
          class="btn btn-outline-light btn-lg"
          @click="this.showModal = true"
          role="button"
        >Дивитися останє служіння
        </a>
        <a
          v-if="LiveVideoData"
          style="margin-top: 5px"
          class="btn btn-outline-light btn-lg"
          @click="showModalOnline = true"
          role="button"
        >Дивитися онлайн служіння
        </a>
      </div>
      <video
        loop=""
        muted=""
        autoplay=""
        poster="../assets/video/plane.jpg"
        class="fullscreen-bg__video"
      >
        <source
          :src="require(`../assets/video/plane.mp4`)"
        >
        <source
          :src="require(`../assets/video/plane.webm`)"
          type="video/webm"
        >
      </video>
    </div>
    <Timer
      v-if="!LiveVideoData"
    >
    </Timer>

    <div class="services">
      <div class="container">
        <h2>Сервіси</h2>
        <div class="service">
          <i
            aria-hidden="true"
            class="fas fa-praying-hands fa-3x"
          ></i>
          <p>Молитва</p>
        </div>
        <div class="service">
          <i aria-hidden="true"
          class="fas fa-bible fa-3x"
          ></i>
          <p>Навчання практичному Слову Божому</p>
        </div>
        <div class="service">
          <i
            aria-hidden="true"
            class="fas fa-hands-helping fa-3x"
          ></i>
          <p>Підтримка</p>
        </div>
      </div>
    </div>

<!--    ФотоОбложка-->
    <div class="jumbotron">
      <div class="container">
        <h1>
          Ісус відповів: „Поправді, поправді кажу Я тобі: Коли хто не родиться з води й Духа, той не може ввійти в Царство Боже.
          /Івана 3 : 5/</h1>
      </div>
    </div>

<!--    Блог-->
    <div class="blog">
      <div class="container">
        <Ministries/>
      </div>
    </div>

    <footer>
      <div>
        <iframe
          allowfullscreen=""
          aria-hidden="false"
          frameborder="0"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2595.4405292888096!2d32.10316!3d49.419485!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9101cca08af2968c!2z0KbQtdGA0LrQvtCy0Ywg0JHQu9Cw0LPQsNGPINCS0LXRgdGC0Ywg0KfQtdGA0LrQsNGB0YHRiw!5e0!3m2!1suk!2sus!4v1603789520347!5m2!1suk!2sus"
          style="border:0;"
          tabindex="0"
        >
        </iframe>
        <div>
          <div class="brand">{{ new Date().getFullYear() }} — Блага вість</div>
              <nav>
                <ul class="menu">
                  <template
                    :key="icon.icon"
                    v-for="icon in icons"
                  >
                    <li>
                      <a :href="icon.src">
                        <i
                          :class="icon.fontawesome"
                          aria-hidden="true"></i>
                      </a>
                    </li>
                  </template>
                </ul>
              </nav>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineAsyncComponent, defineComponent, computed, onMounted, ref } from 'vue'
import store from '@/store'
const Timer = defineAsyncComponent(() => import('@/components/Timer.vue'))
const ModalVideo = defineAsyncComponent(() => import('@/components/ModalVideo.vue'))
const Ministries = defineAsyncComponent(() => import('@/components/Ministries.vue'))

export default defineComponent({
  name: 'HelloWorld',
  components: {
    ModalVideo, Ministries, Timer
  },
  setup () {
    const TextBible = computed(() => store.getters.GET_textBible)

    const titleVideo = computed(() => LastVideoData.value.title)
    const codVideo = computed(() => LastVideoData.value.resourceId.videoId)
    const liveTitleVideo = computed(() => LiveVideoData.value.snippet.title)
    const liveCodVideo = computed(() => LiveVideoData.value.id.videoId)
    const LiveVideoData = computed(() => store.state.LiveVideoData)

    const showModal = ref(false)
    const showModalOnline = ref(false)

    const icons = computed(() => store.state.icons)
    const LastVideoData = computed(() => store.state.LastVideoData)

    const getCodeVideo = () => {
      store.dispatch('getLastVideoData')
    }
    onMounted(getCodeVideo)

    const getLiveVideoData = () => {
      store.dispatch('getLiveVideoData')
    }
    onMounted(getLiveVideoData)

    return {
      icons,
      LastVideoData,
      showModal,
      showModalOnline,
      LiveVideoData,
      titleVideo,
      codVideo,
      liveTitleVideo,
      liveCodVideo,
      TextBible
    }
  }
})
</script>

<style>
  table {  border-collapse: collapse; }
  td {
    height: 100px;
  }
  .clear {
    clear: both;
  }
  .fullscreen-bg {
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
    padding-top:45%;
  }

  .fullscreen-bg__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .overlay {
    background: rgba(0,0,0,0.6);
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: 4;
    text-align:center;
  }
  .overlay h1 {
    text-align:center;
    color:#fff;
    font-size: 45px;
    margin:10% 10%;
    text-shadow: 0 0 10px black;
  }
  iframe {
    width: 100%;
    height: 640px;
  }

  /* General */
  body {
    font-family: Raleway, Arial, Helvetica, sans-serif;
  }

  p {
    font-size: 14px;
    color: #999;
    line-height: 1.6;
  }

  h1 {
    font-size: 30px;
    color: #fff;
    text-shadow: 0 0 5px black;
  }

  h2 {
    font-size: 28px;
  }

  h3 {
    font-size: 26px;
  }

  h2, h3 {
    color: #282828;
  }

  .container {
    width: 90%;
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
  }

  .brand {
    width: 100%;
    font-size: 30px;
  }
    img {
      float: left;
    }

  .menu {
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  .menu li {
    float: left;
    font-size: 16px;
    list-style: none;
  }

  .menu li a {
    text-decoration: none;
  }

  img {
    display: block;
    height: auto;
  }

  /* Header */
  header {
    background-color: #fff;
  }

  header .brand {
    float: left;
    color: #59abe3;
  }

  /* Jumbotron */
  .jumbotron {
    background-image: url(../assets/img/jumbotron.jpg);
    background-size: cover;
    background-position: 0 0;
    background-repeat: no-repeat;
    padding-top: 80px;
    padding-bottom: 80px;
    min-height: 250px;
    text-align: center;
    clear: both;
  }

  /*.jumbotron .button {*/
  /*  display: inline-block;*/
  /*  color: #fff;*/
  /*  text-decoration: none;*/
  /*  font-weight: bold;*/
  /*  font-size: 18px;*/
  /*  margin-top: 40px;*/
  /*  background-color: #fa5ba5;*/
  /*  padding: 20px 30px;*/
  /*  border-radius: 30px;*/
  /*}*/

  /* Services */
  .services .service {
    width: 33.333333%;
    float: left;
    padding-left: 15px;
    padding-right: 15px;
    margin-top: 30px;
    margin-bottom: 50px;
    box-sizing: border-box;
  }

  .services {
    padding-top: 50px;
    text-align: center;
  }

  .services .fa {
    color: #979797;
    margin-bottom: 15px;
  }
  .services .fas {
    color: #979797;
    margin-bottom: 15px;
  }

  /* Blog */
  .blog {
    clear: both;
    padding-top: 50px;
    padding-bottom: 50px;
    background-color: #fcfcfc;
  }

  /* Footer */
  footer {
    clear: both;
    padding-top: 50px;
    padding-bottom: 40px;
    text-align: center;
    background-color: #38404b;
  }

  footer .brand {
    color: #bcc9dd;
  }

  footer .menu li {
    padding-left: 10px;
    padding-right: 10px;
  }

  footer .menu li a {
    color: #bcc9dd;
  }

  footer .menu {
    display: inline-block;
    margin-top: 30px;
    margin-bottom: 15px;
  }

  footer .copyright {
    font-size: 12px;
    color: #eee;
  }

  /* Media Queries */
  @media (max-width: 767px) {
    h1 {
      font-size: 30px;
    }
    iframe {
      width: 100%;
      height: 240px;
    }
    td img {
      width: 96px;
    }
    td h3 {
      font-size: 16px;
    }
    .fullscreen-bg {
      background: url('../assets/images/jumbotron.png') center center / cover no-repeat;
      padding-top: 100%;
    }
    .fullscreen-bg__video {
      display: none;
    }
    .overlay h1 {
      text-align:center;
      color:#fff;
      font-size: 20px;
      margin:5% 5%;
      text-shadow: 0 0 10px black;
    }
  }
  @media (max-width: 575px) {
    h1 {
      font-size: 25px;
    }
    iframe {
      margin-top: 20%;
      width: 100%;
      height: 240px;
    }
    .services .service {
      width: 100%;
      float: none;
    }

    .blog .post {
      max-width: 280px;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }

  }

</style>
