<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark"
    style="background-color: #212;"
  >
    <!-- Container wrapper -->
    <div class="container-fluid">
      <!-- Кнопка для мобильника -->
      <div class="dropdown">
        <button
          @click="myFunction"
          class="dropbtn"
        >
          <i class="fas fa-bars"></i>
        </button>
        <div
          id="myDropdown"
          class="dropdown-content"
          @click="myFunction"
        >
          <router-link
            to="/"
            class="nav-link"
            aria-current="page"
          >
            Головна
          </router-link>
          <router-link  to="/about" class="nav-link">Про церкву</router-link>
          <router-link  to="/video" class="nav-link">Відео</router-link>
          <router-link to="/about_us" class="nav-link">Про нас</router-link>
          <router-link
            to='/photo_gallery'
            class="nav-link"
          >
            Фото галерея
          </router-link>
        </div>
      </div>

      <!-- Меню -->
      <div
        class="collapse navbar-collapse"
        id="navbarLeftAlignExample"
      >
        <!-- Left links -->
        <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="/"
              class="nav-link"
              aria-current="page"
            >
              Головна
            </router-link>
          </li>
          <li class="nav-item">
            <router-link  to="/about" class="nav-link">Про церкву</router-link>
          </li>
          <li class="nav-item">
            <router-link  to="/video" class="nav-link">Відео</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about_us" class="nav-link">Про нас</router-link>
          </li>
          <li class="nav-item">
            <router-link
              to='/photo_gallery'
              class="nav-link"
            >
              Фото галерея
            </router-link>
          </li>
        </ul>
          <!--ВХОД ЧЕРЕЗ ГУГЛ АККАУНТ-->
        <google></google>
      </div>
    </div>
  </nav>

  <router-view/>

  <Vue3DownUpButton >
    <template #default>
      <svg
        width="2em"
        height="2em"
        viewBox="0 0 16 16"
        class="bi bi-arrow-up-circle-fill"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
        />
      </svg>
<!--      &uarr;-->
    </template>
    <template #down>
      <svg
        width="2em"
        height="2em"
        viewBox="0 0 16 16"
        class="bi bi-arrow-down-circle-fill"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
        />
      </svg>
<!--      &darr;-->
    </template>
  </Vue3DownUpButton>

</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
const Vue3DownUpButton = defineAsyncComponent(() => import('@/components/Vue3DownUpButton.vue'))
const google = defineAsyncComponent(() => import('@/components/auth/google.vue'))

export default defineComponent({
  components: {
    Vue3DownUpButton,
    google
  },
  data: () => ({
    showDropdownMenu: false
  }),
  methods: {
    myFunction () {
      document.getElementById('myDropdown').classList.toggle('show')
    },
    filterFunction () {
      this.input = document.getElementById('myInput')
      const filter = this.input.value.toUpperCase()
      const div = document.getElementById('myDropdown')
      const a = div.getElementsByTagName('a')
      for (let i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = ''
        } else {
          a[i].style.display = 'none'
        }
      }
    }
  }
})
</script>

<style scoped>
  .dropbtn {
    /*background-color: #4CAF50;*/
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }

  .dropbtn:hover, .dropbtn:focus {
    background-color: #392139;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f6f6f6;
    min-width: 230px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 99999;
  }

  .dropdown-content a {
    color: #b69999;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown a:hover {background-color: #212;}

  .show {display: block;}
</style>
