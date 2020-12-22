<template>
  <!-- The overlay -->
  <div id="myNav" class="overlay">

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
      v-for='item in arrayList'
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

  <!-- Use any element to open/show the overlay navigation menu -->
  <button
    @click="openNav"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-8 w-full"
  >
    Меню
  </button>
  <div class="card text-center">
    <div class="card-header" style="background-color: #0a53be; color: white">
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
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: '2013',
  data () {
    return {
      arrayList: [
        {
          id: 1,
          name: 'Кольоровий світ',
          link: '1dXeaG6BokMx5bvSAB5xp-xQsnfj554-D'
        },
        {
          id: 2,
          name: 'Михайлівська школа-інтернат',
          link: '10KWDBb97YV9O8MwU8U_eSDhUdaCcz0kE'
        },
        {
          id: 3,
          name: 'Центр реабелітації',
          link: '1IfnmUmO6ceLrM9ffU5CWgC0g5LZU_KHZ'
        },
        {
          id: 4,
          name: 'Виховання мужності',
          link: '1E1ZSK1XxLWIaQAPsQHDwQEPcSQrA9TIl'
        },
        {
          id: 5,
          name: 'Зимовий табір',
          link: '1_0nYT9cqqtBdrUEMs6JgSTe95V3xni0P'
        },
        {
          id: 6,
          name: 'Пункт обігріву',
          link: '1a6dni6L8dlN2Fq0ywawJMSyNvouIjyPv'
        },
        {
          id: 7,
          name: 'Дитяче служіння',
          link: '1uLM5Ho2HMtDSkc1frHT6amiHF9M9Bm8d'
        }
      ],
      text: {},
      nameFolder: '',
      idFolder: '1dXeaG6BokMx5bvSAB5xp-xQsnfj554-D'
    }
  },
  methods: {
    openNav () {
      document.getElementById('myNav').style.width = '100%'
    },
    closeNav () {
      document.getElementById('myNav').style.width = '0%'
    },
    async clickFolder (value) {
      this.idFolder = value
      const response = await fetch(`https://www.googleapis.com/drive/v3/files/${this.idFolder}?key=AIzaSyAHq7nCX7e6FxeXJ6JWD_iqWMb7_sHCdoU`)
      const data = await response.json()
      this.nameFolder = data.name
    }
  },
  async mounted () {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${this.idFolder}?key=AIzaSyAHq7nCX7e6FxeXJ6JWD_iqWMb7_sHCdoU`)
    const data = await response.json()
    this.nameFolder = data.name
    console.log(data.name)
  }
})
</script>

<style scoped>
  .overlay {
    /* Height & width depends on how you want to reveal the overlay (see JS below) */
    height: 100%;
    width: 0;
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
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
