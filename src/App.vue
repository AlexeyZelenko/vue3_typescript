<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark"
    style="background-color: #212;"
  >
    <!-- Container wrapper -->
    <div class="container-fluid">
      <!-- Кнопка для мобильника -->
      <span
        style="font-size:24px; cursor:pointer; color: #847e7e; margin-right: 10px"
        @click="openNav"
      >
      ☰
    </span>

      <!--    Боковое меню-->
      <div
        id="mySidenavMain"
        class="sidenav"
      >
        <a
          href="javascript:void(0)"
          class="closebtn"
          @click="closeNav"
        >
          ×
        </a>
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
        <router-link to="/history" class="nav-link">Історія</router-link>
        <router-link
          to='/photo_gallery'
          class="nav-link"
        >
          Фото галерея
        </router-link>
        <router-link
          to="/google_list"
          class="nav-link"
        >
          Архів
        </router-link>
        <router-link
          to="/poetry"
          class="nav-link"
        >
          Поезія
        </router-link>
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
          <li class="nav-item">
            <router-link to="/history" class="nav-link">Історія</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/google_list" class="nav-link">Архів</router-link>
          </li><li class="nav-item">
            <router-link to="/poetry" class="nav-link">Поезія</router-link>
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
    openNav () {
      document.getElementById('mySidenavMain').style.width = '250px'
    },
    closeNav () {
      document.getElementById('mySidenavMain').style.width = '0'
    }
  }
})
</script>

<style>
  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    background-color: #040303;
    opacity: 0.9;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }

  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 24px;
    color: #f7f5f5;
    display: block;
    transition: 0.3s;
  }

  .sidenav a:hover {
    color: #21b786;
    background-color: #282828;
  }

  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  @media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {
      font-size: 18px;
      color: #0f6883;
    }
  }
</style>
