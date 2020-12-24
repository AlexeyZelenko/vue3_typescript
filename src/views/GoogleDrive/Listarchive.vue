<template>
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
  <button
    @click="openNav"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-8 w-100"
  >
    Виберіть ПОДІЮ
  </button>

  <!--  Отображение события-->
  <div class="card text-center">
    <div
      class="card-header"
      style="background-color: #0a53be; color: white"
    >
      {{nameFolder}}
    </div>
    <div class="card-body">
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
       Натисніть "Пошук"`,
      text: '2. Виберіть подію'
    })
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${this.idFolder}?key=AIzaSyAHq7nCX7e6FxeXJ6JWD_iqWMb7_sHCdoU`)
    const data = await response.json()
    this.nameFolder = await data.name
  },
  setup () {
    const nameFolder = ref('')
    const searchInput = ref('')
    const sortYear = ref(2013)
    const categories = ref([])
    const idFolder = ref('1dXeaG6BokMx5bvSAB5xp-xQsnfj554-D')
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
      })
      if (categories.value.length === 0) {
        alert(`Нічого не знайденно...
       Введіть інший рік.
       2013, 2014, 2019, 2020`)
      }
    }
    return {
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
