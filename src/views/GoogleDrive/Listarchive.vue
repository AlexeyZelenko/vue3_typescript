<template>
  <!-- Message -->
  <div
    v-if="showModal"
  >
    <div>
      <span
        @click="showModal = false"
        class="close"
      >
        &times;
      </span>
      <div
        v-if="alertShow"
        class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div class="flex">
          <div class="py-1">
            <svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
            </svg>
          </div>
          <div>
            <p
              class="font-bold"
            >
              {{alertTitle}}
            </p>
            <p
              class="text-sm"
            >
              {{alertText}}
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>

<!--  Поиск-->
  <div
    class="justify-start sm:justify-center md:justify-end lg:justify-between xl:justify-around"
    style="max-width: 600px; text-align: center"
  >
    <input
      type="search"
      v-model="searchInput"
      v-on:keyup.enter="fetchGame(searchInput)"
      class="flex-1 text-white px-4 py-2 m-2 bg-gray-800 text-gray-300 rounded-sm w-50"
      placeholder="Введіть рік..."
    />
    <button
      @click="fetchGame(searchInput)"
      class="py-2 px-5 uppercase font-bold bg-green-400 hover:bg-green-500 rounded-sm ml-2 w-40"
    >
      Пошук
    </button>
  </div>

<!--  Выбор события-->
  <button
    v-if="idFolder"
    @click="openNav"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-8 w-100"
  >
    Виберіть ПОДІЮ
  </button>

  <!--  Отображение события-->
  <div
    class="card text-center"
  >
    <div
      v-if="idFolder"
      class="card-header"
      style="background-color: #0a53be; color: white"
    >
      {{nameFolder}}
    </div>
    <div v-if="!idFolder">
      <img
        src="https://drive.google.com/uc?export=view&id=1BEj10Ll6vqzm8XSvFA1yKNt6QaD5NKlb"
        style="width: 100%"
      >
    </div>
    <div
      v-if="idFolder"
      class="card-body"
    >
      <h6 class="card-title">По кліку фото відкриється у новому вікні</h6>
      <iframe
        style = "height: 1000px; overflow: hidden; margin: 0 auto"
        :src='`https://drive.google.com/embeddedfolderview?id=${idFolder}#grid`'
        frameborder="0"
      ></iframe>
    </div>
  </div>

  <!-- The overlay -->
  <div
    v-if="NavWindow"
    id="myNav"
    class="overlay"
  >

    <!-- Button to close the overlay navigation -->
    <a
      href="javascript:void(0)"
      class="closebtn"
      @click="closeNav"
    >
      &times;
    </a>

    <!-- Overlay content -->
    <div
      class="overlay-content"
      v-for='item in categories'
      :key='item.id'
    >
      <a
        @click="clickFolder(item.link)"
        href="#"
      >
        {{item.name}}
      </a>
    </div>
  </div>
</template>

<script>
import { db } from '@/main'
import { ref } from 'vue'

export default {
  name: 'Listarchive',
  data () {
    return {
      NavWindow: false
    }
  },
  methods: {
    openNav () {
      this.NavWindow = true
    },
    closeNav () {
      this.NavWindow = false
    },
    async clickFolder (value) {
      this.idFolder = value
      const response = await fetch(`https://www.googleapis.com/drive/v3/files/${this.idFolder}?key=AIzaSyAHq7nCX7e6FxeXJ6JWD_iqWMb7_sHCdoU`)
      const data = await response.json()
      this.nameFolder = await data.name
    }
  },
  async mounted () {
    this.$swal({
      title: `1. Введіть рік.
       Натисніть "Пошук"
       !!!Події з невідомим роком: 0000`,
      text: '2. Виберіть подію'
    })
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${this.idFolder}?key=AIzaSyAHq7nCX7e6FxeXJ6JWD_iqWMb7_sHCdoU`)
    const data = await response.json()
    this.nameFolder = await data.name
  },
  setup () {
    const showModal = ref(false)
    const alertShow = ref(false)
    const alertText = ref('')
    const alertTitle = ref('')
    const alertMessage = (ctx) => {
      showModal.value = true
      alertShow.value = true
      alertText.value = ctx.text
      alertTitle.value = ctx.title
      setTimeout(alertMessageClosed, 10000)
    }
    const alertMessageClosed = () => {
      showModal.value = false
      alertShow.value = false
    }

    const nameFolder = ref('')
    const searchInput = ref('')
    const sortYear = ref(2013)
    const categories = ref([])
    const idFolder = ref(null)
    const fetchGame = (searchInput) => {
      sortYear.value = searchInput
      db.collection('archive').where('year', '==', `${sortYear.value}`).onSnapshot((snapshotChange) => {
        categories.value = []
        snapshotChange.forEach((doc) => {
          categories.value.push({
            id: doc.id,
            name: doc.data().name,
            link: doc.data().link,
            year: doc.data().year
          })
          idFolder.value = categories.value[0].link
          nameFolder.value = categories.value[0].name
        })
        if (!categories.value.length) {
          const ctx = {
            title: 'Нічого не знайденно... Введіть інший рік.',
            text: 'Наразі - 2013, 2014, 2019, 2020, 2004. Події з невідомим роком - введіть 0000'
          }
          alertMessage(ctx)
        } else {
          const ctx = {
            title: 'Виберіть подію...'
          }
          alertMessage(ctx)
        }
      })
    }
    return {
      showModal,
      alertTitle,
      alertText,
      alertShow,
      alertMessage,
      nameFolder,
      idFolder,
      categories,
      sortYear,
      searchInput,
      fetchGame
    }
  }
}
</script>

<style scoped>
  /* The Close Button */
  .close {
    color: #aaa;
    float: left;
    font-size: 35px;
    font-weight: bold;
    margin-left: 10px;
    margin-right: 20px;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .overlay {
    /* Height & width depends on how you want to reveal the overlay (see JS below) */
    height: 100%;
    width: 100%;
    position: fixed; /* Stay in place */
    z-index: 2; /* Sit on top */
    left: 0;
    top: 0;
    background-color: rgb(0,0,0); /* Black fallback color */
    background-color: rgba(0,0,0, 0.9); /* Black w/opacity */
    overflow-x: hidden; /* Disable horizontal scroll */
    transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
  }

  /* Position the content inside the overlay */
  .overlay-content {
    position: relative;
    top: 25%; /* 25% from the top */
    width: 100%; /* 100% width */
    text-align: center; /* Centered text/links */
    margin-top: 25px; /* 30px top margin to avoid conflict with the close button on smaller screens */
  }

  /* The navigation links inside the overlay */
  .overlay a {
    padding: 8px;
    text-decoration: none;
    font-size: 20px;
    color: #818181;
    display: block; /* Display block instead of inline */
    transition: 0.3s; /* Transition effects on hover (color) */
  }

  /* When you mouse over the navigation links, change their color */
  .overlay a:hover, .overlay a:focus {
    color: #f1f1f1;
  }

  /* Position the close button (top right corner) */
  .overlay .closebtn {
    position: absolute;
    top: 30px;
    right: 45px;
    font-size: 60px;
  }

  /* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they don't overlap */
  @media screen and (max-height: 450px) {
    .overlay a {font-size: 20px}
    .overlay .closebtn {
      font-size: 16px;
      top: 15px;
      right: 35px;
    }
  }
</style>
