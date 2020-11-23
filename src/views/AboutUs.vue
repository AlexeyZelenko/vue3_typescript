<template>
  <div class="about">
    <!--    ВидеоОбложка-->
    <div class="fullscreen-bg">
      <div class="overlay">
        <h1>
         "Коли Я говорив вам про земне, та не вірите ви, то як же повірите ви, коли Я говоритиму вам про небесне?"
        </h1>
        <h1>Івана 3 : 12</h1>
      </div>
      <video
        loop=""
        muted=""
        autoplay=""
        poster="../assets/video/earth.jpg"
        class="fullscreen-bg__video"
      >
        <source
          :src="require(`../assets/video/cloude.mp4`)"
        >
        <source
          :src="require(`../assets/video/cloude.webm`)"
          type="video/webm"
        >
      </video>
    </div>
  </div>
  <!--  Фото с описанием-->
  <vCatalogItem
    v-for="(product, i) in sections"
    :key="product.title"
    :index="i"
    :product_data="product"
  />

</template>

<script>
import { defineAsyncComponent } from 'vue'

const vCatalogItem = defineAsyncComponent(() => import('@/components/v-catalog-item.vue'))

export default {
  name: 'AboutUs',
  components: {
    vCatalogItem
  },
  data: () => ({
    sections: [
      {
        title: 'Домашні церкви',
        text: `Ми називаємо їх дуже ніжно: "Домашки". На "домашках" ми вивчаємо Слово Боже, молимось один за одного, п'єм чай. \n
          Вперше поняття «домашньої церкви» зустрічається в посланнях апостола Павла (1 Кор. 16:19; Рим. 16: 4)`,
        sectionClass: 'sec7',
        seen: true
      },
      {
        title: 'Допомога ближнім',
        text: `Господь запитав охоронця Закону: “Хто з тих трьох, здається тобі, був ближній тому, хто потрапив до рук розбійників?” Законник відповів: “Той, що змилосердився над ним”. Тоді Ісус сказав йому: “Іди і ти роби так само”.'
          З цих слів Христа абсолютно зрозуміло, що ближній для нас – це кожна людина, яка потребує нашої допомоги.`,
        sectionClass: 'sec8',
        seen: true
      },
      {
        title: 'Милосердя',
        text: 'Виявлення милосердя для будь-якої людини відкриває двері до пізнання ближнього, а це веде до богопізнання, співчуття та милосердя – це колиска Божественної любові у людському серці.\n' +
          ' Чим ближчим серце людини є до брата, тим ближчим воно стає до Бога. І навпаки. Наш реабелытацыйний центр допомогаэ нужденим вже довгы роки.',
        sectionClass: 'sec9',
        seen: true
      }
    ]
  })
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
