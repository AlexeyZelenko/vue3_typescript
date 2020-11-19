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
          :src="`https://www.youtube.com/embed/${codVideo}`"
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </template>

      <template v-slot:footer>
      </template>

    </ModalVideo>

    <header>
      <div class="container">
        <div class="brand">
          <img :src="require(`@/assets/img/logo.png`)" />
          <h1>Блага вість</h1>
          <h3>Церква християн віри евангельскої</h3>
          <div class="clear"></div>
        </div>
      </div>
    </header>

<!--    ВидеоОбложка-->
    <div class="fullscreen-bg">
      <div class="overlay">
        <h1>
          Так бо Бог полюбив світ, що дав Сина Свого Одноро́дженого, щоб кожен, хто вірує в Нього, не згинув, але мав життя вічне.
        </h1>
        <button
          class="button"
          @click="this.showModal = true"
        >
          Дивитися останє служіння
        </button>
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

    <div class="services">
      <div class="container">
        <h2>Сервіси</h2>
        <div class="service">
          <i aria-hidden="true"
             class="fa fa-tachometer fa-3x"
          ></i>
          <p>Молитва</p>
        </div>
        <div class="service">
          <i aria-hidden="true"
             class="fa fa-calendar fa-3x"
          ></i>
          <p>Навчання практичному Слову Божому</p>
        </div>
        <div class="service">
          <i aria-hidden="true" class="fa fa-bar-chart fa-3x"></i>
          <p>Підтримка</p>
        </div>
      </div>
    </div>

    <div class="jumbotron">
      <div class="container">
        <h1>
          Ісус відповів: „Поправді, поправді кажу Я тобі: Коли хто не родиться з води й Духа, той не може ввійти в Царство Боже.
          /Івана 3 : 5/</h1>
        <button class="button"
                @click="showModal = true"
        >
          Дивитися останє служіння
        </button>
      </div>
    </div>

    <div class="blog">
      <div class="container">
        <h2>Служіння</h2>
        <div class="post">
          <img :src="require(`@/assets/img/2.jpg`)">
          <h3>Загальноцерковне служіння</h3>
          <h4 class="date">Неділя 10:00 та Четвер 18:00</h4>
          <p>Богослужіння поділяються на два основних види: загальні і приватні. Загальні богослужіння відбуваються регулярно, відповідно до вимог церковного уставу,
            тоді як приватні призначені для задоволення поточних потреб віруючих і відбуваються будь-коли.</p>
        </div>
        <div class="post">
          <img :src="require(`@/assets/img/3.jpg`)">
          <h3>Нічна молитва</h3>
          <h4 class="date">П'ятниця</h4>
          <p>{{`Молитва - джерело сили та двигун Церкви! Молитва - головний інструмент та стратегічне знаряддя церкви для впливу на своє місто, країну, континент і весь світ. Все починається з молитви. Молитва - це головне покликання Церкви!\n'
            «Отже, перш над усе я благаю чинити молитви, благання, прохання, подяки за всіх людей» (1 Тимофія 2:1)
            На служіннях загальноцерковних вечірньої та нічної молитв в атмосфері Божої слави та поклоніння ви переживете особливі зустрічі з Богом і приймете свіжий вогонь Святого Духа! Ви зможете бути істинними заступниками за церкву, країну, за своїх рідних та близьких, своє призначення та молитися за інші питання.`}}</p>
        </div>
        <div class="post">
          <img :src="require(`@/assets/img/1.jpg`)">
          <h3>Молитва на Соборній площі</h3>
          <h4 class="date">Неділя 16:00</h4>
          <p>{{`Молитва - джерело сили та двигун Церкви! Молитва - головний інструмент та стратегічне знаряддя церкви для впливу на своє місто, країну, континент і весь світ. Все починається з молитви. Молитва - це головне покликання Церкви!'
            «Отже, перш над усе я благаю чинити молитви, благання, прохання, подяки за всіх людей» (1 Тимофія 2:1)`}}</p>
        </div>
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

<script lang="ts">
import { defineAsyncComponent, defineComponent, computed, onMounted, ref } from 'vue'
import store from '@/store'
const ModalVideo = defineAsyncComponent(() => import('@/components/ModalVideo.vue'))

export default defineComponent({
  name: 'HelloWorld',
  components: {
    ModalVideo
  },
  computed: {
    style () {
      return this.styleBtnUp
    },
    codVideo (): string {
      return this.LastVideoData.resourceId.videoId
    },
    titleVideo (): string {
      return this.LastVideoData.title
    }
  },
  setup () {
    const showModal = ref(false)
    const icons = computed(() => store.state.icons)
    const LastVideoData = computed(() => store.state.LastVideoData)

    const getCodeVideo = () => {
      store.dispatch('getLastVideoData')
    }
    onMounted(getCodeVideo)

    // const cats = ref([])
    // const fetchCats = async () => {
    //   cats.value = await fetch(
    //     'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUSb71yKJmS0eHyhRRl00ioQ&key=AIzaSyAzu641YEewkYY6zzS8nAzTxY6XDLxCCkY&part=snippet&maxResults=10'
    //   ).then((response) => response.json())
    //   console.log(cats.value)
    // }
    // onMounted(fetchCats)

    return {
      icons,
      LastVideoData,
      showModal
    }
  }
})
</script>

<style >
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
  @media (max-width: 767px) {
    iframe {
      width: 100%;
      height: 240px;
    }
    .brand img {
      width: 96px;
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
      font-size: 25px;
      margin:5% 5%;
      text-shadow: 0 0 10px black;
    }
  }
  .overlay button {
    cursor: pointer;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    background-color: #fa5ba5;
    padding: 20px 30px;
    border-radius: 30px;
    z-index: 99999;
  }
  iframe {
    width: 100%;
    height: 460px;
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
    font-size: 40px;
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
    max-width: 300px;
    height: auto;
  }

  /* Header */
  header {
    background-color: #fff;
    padding-top: 5px;
  }

  header .brand {
    float: left;
    color: #59abe3;
    padding-top: 5px;
  }

  header .menu {
    float: right;
    margin-bottom: 30px;
  }

  header .menu li {
    padding-left: 20px;
  }

  header .menu li a {
    color: #aaa;
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

  .jumbotron .button {
    display: inline-block;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    margin-top: 40px;
    background-color: #fa5ba5;
    padding: 20px 30px;
    border-radius: 30px;
  }

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

  /* Blog */
  .blog {
    clear: both;
    padding-top: 50px;
    padding-bottom: 50px;
    background-color: #fcfcfc;
  }

  .blog h2 {
    text-align: center;
  }

  .blog .post {
    padding-top: 30px;
    display: inline-block;
    clear: both;
  }

  .blog .post img {
    float: left;
    margin-right: 30px;
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
  @media (max-width: 575px) {
    .services .service {
      width: 100%;
      float: none;
    }

    .blog .post img {
      float: none;
      display: block;
      margin-right: auto;
      margin-left: auto;
    }

    .blog .post {
      max-width: 280px;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }

  }

</style>
