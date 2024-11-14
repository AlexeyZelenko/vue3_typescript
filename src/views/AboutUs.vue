<template>
  <div class="about">
    <!-- Video Section -->
    <div class="fullscreen-bg">
      <div class="overlay">
        <h1>{{ textBible.title }}</h1>
        <h1>{{ textBible.verse }}</h1>
      </div>
      <video
        loop
        muted
        autoplay
        poster="../assets/video/earth.jpg"
        class="fullscreen-bg__video"
      >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/blv-vue3-tp.appspot.com/o/assets%2Fcloude.mp4?alt=media&token=ae94a048-d272-42b9-9328-d4603e5bdafa"
        />
        <source
          src="https://firebasestorage.googleapis.com/v0/b/blv-vue3-tp.appspot.com/o/assets%2Fcloude.webm?alt=media&token=11351eb6-2e9e-4cf6-9e45-3ba7237fd171"
          type="video/webm"
        />
      </video>
    </div>
    <!-- Sections -->
    <v-catalog-item
      v-for="(product, i) in sections"
      :key="product.title"
      :index="i"
      :data="product"
    />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

const vCatalogItem = defineAsyncComponent(() => import('@/components/CatalogItem.vue'))

export default {
  name: 'AboutUs',
  components: {
    vCatalogItem
  },
  data() {
    return {
      sections: [
        {
          title: 'Домашні церкви',
          text: `Ми називаємо їх дуже ніжно: "Домашки". На "домашках" ми вивчаємо Слово Боже, молимось один за одного, п'єм чай.
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
          text: `Виявлення милосердя для будь-якої людини відкриває двері до пізнання ближнього, а це веде до богопізнання, співчуття та милосердя – це колиска Божественної любові у людському серці.
            Чим ближчим серце людини є до брата, тим ближчим воно стає до Бога. І навпаки. Наш реабелытацыйний центр допомогаэ нужденим вже довгы роки.`,
          sectionClass: 'sec9',
          seen: true
        }
      ],
      textBible: {}
    }
  },
  async mounted() {
    try {
      const response = await fetch('https://blv-vue3-tp.firebaseio.com/bible.json')
      const data = await response.json()
      const arrayVerse = Object.keys(data).map((key) => ({
        ...data[key],
        id: key
      }))
      this.textBible = arrayVerse[Math.floor(Math.random() * arrayVerse.length)]
    } catch (error) {
      console.error('Failed to fetch Bible text:', error)
    }
  }
}
</script>

<style scoped>
.fullscreen-bg {
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  padding-top: 45%;
}

.fullscreen-bg__video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.overlay {
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  text-align: center;
}

.overlay h1 {
  color: #fff;
  font-size: 45px;
  margin: 10% 10%;
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
    font-size: 25px;
    margin: 5% 5%;
  }
}
</style>
