<template>
  <div class="about">
    <!--    ВидеоОбложка-->
    <div class="fullscreen-bg">
      <div
        class="loader"
        v-if="loading"
      ></div>
      <div
        class="overlay"
        v-else
      >
        <h1>
          {{TextBible.title}}
        </h1>
        <h1>{{TextBible.verse}}</h1>
      </div>
      <video
        loop=""
        muted=""
        autoplay=""
        poster="../assets/video/earth.jpg"
        class="fullscreen-bg__video"
      >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/blv-vue3-tp.appspot.com/o/assets%2Fearth.mp4?alt=media&token=efc1e30d-fc4e-4393-9fd8-3b5f3e7ad0ca"
        >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/blv-vue3-tp.appspot.com/o/assets%2Fearth.webm?alt=media&token=02e742a3-55d3-496e-bda9-c22cf622acfe"
          type="video/webm"
        >
      </video>
    </div>
  </div>
<!--  Фото с описанием-->
  <CatalogItem
    v-for="(product, i) in sections"
    :key="product.title"
    :index="i"
    :data="product"
  ></CatalogItem>

</template>

<script>
import CatalogItem from '@/components/CatalogItem.vue'

export default {
  name: 'About',
  components: {
    CatalogItem
  },
  data: () => ({
    TextBible: {},
    loading: false,
    sections: [
      {
        title: 'Таїнство святого причастя',
        text: 'Таїнство святого причастя установив Сам Господь наш Ісус Христос під час останньої Тайної вечері, напередодні Своїх страждань і смерті. Він Сам звершив це Таїнство: "Взявши хліб і подякувавши (Богу Отцю за всі Його ласки до роду людського), розламав і подав ученикам, промовивши: "Прийміть, споживайте: це є тіло Моє, що за вас ламається; це чиніть на спомин про Мене. Також, узявши чашу і подякувавши, подав їм, кажучи: пийте з неї всі; це є кров Моя Нового Завіту, що за вас і за багатьох проливається на відпущення гріхів. Це чиніть на спомин про Мене" (Див.: Мф 26, 26-28; Мк 14, 22-24; Лк 22, 19-24; 1 Kop.11, 23-25).',
        sectionClass: 'sec1',
        seen: true
      },
      {
        title: 'Молитва',
        text: 'Молитва - джерело сили та двигун Церкви! Молитва - головний інструмент та стратегічне знаряддя церкви для впливу на своє місто, країну, континент і весь світ. Все починається з молитви. Молитва - це головне покликання Церкви!\n' +
          '«Отже, перш над усе я благаю чинити молитви, благання, прохання, подяки за всіх людей» (1 Тимофія 2:1)' +
          'На служіннях загальноцерковних вечірньої та нічної молитв в атмосфері Божої слави та поклоніння ви переживете особливі зустрічі з Богом і приймете свіжий вогонь Святого Духа! Ви зможете бути істинними заступниками за церкву, країну, за своїх рідних та близьких, своє призначення та молитися за інші питання.',
        sectionClass: 'sec2',
        seen: true
      },
      {
        title: 'Загальноцерковні служіння',
        text: 'Богослужіння поділяються на два основних види: загальні і приватні. Загальні богослужіння відбуваються регулярно, відповідно до вимог церковного уставу,\n' +
          '      тоді як приватні призначені для задоволення поточних потреб віруючих і відбуваються будь-коли.',
        sectionClass: 'sec3',
        seen: false
      },
      {
        title: 'Тепла домашня атмосфера',
        text: '"По тому пізнають усі, що ви учні Мої, як будете мати любов між собою." Вiд Iвана 13:35',
        sectionClass: 'sec4',
        seen: false
      },
      {
        title: 'Водне Хрещення',
        text: '1Петр.3:21 «Того образ, хрищення не тілесної нечистости позбуття, але обітниця Богові доброго сумління…»\n' +
          '\n' +
          '      Водне хрещення є привселюдним обрядом (присвятою), під час якого людина вступає в завіт із Христом, приймаючи Його Ім’я і підкоряючись Його керівництву.',
        sectionClass: 'sec5',
        seen: false
      },
      {
        title: 'Допомога',
        text: '«Хто любить Бога, той нехай любить і брата свого» (1 Йоана 4:21). Церква вже багато років приймає та допомагає нужденним в своєму реабелітаційному центрі.',
        sectionClass: 'sec6',
        seen: false
      }
    ]
  }),
  async mounted () {
    this.loading = true
    const response = await fetch('https://blv-vue3-tp.firebaseio.com/bible.json')
    const data = await response.json()

    const arrayVerse = Object.keys(data).map(key => {
      return { ...data[key], id: key }
    })

    this.TextBible = arrayVerse[Math.floor(Math.random() * arrayVerse.length)]

    this.loading = false
  }
}
</script>

<style scoped>
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
    .fullscreen-bg {
      background: url('../assets/images/earth.jpg') center center / cover no-repeat;
      padding-top: 70%;
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
</style>
