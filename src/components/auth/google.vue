<template>
  <ul class="navbar-nav mr-2 mb-2 mb-lg-0">
    <!-- Avatar -->
    <span
      v-if="adminEntrance"
      style="font-size:30px; cursor:pointer; color: white; margin-right: 10px"
      @click="openNav"
    >
      ☰
    </span>
    <li
      style="color: #3c8baf; margin-right: 5px"
      v-if="adminEntrance"
    >
      {{getUserName}}
    </li>
    <li
      v-if="adminEntrance"
      class="nav-item dropdown mr-4"
    >
      <img
        style="height: 40px"
        :src="getProfilePicUrl"
        class="rounded-circle"
        alt=""
        loading="lazy"
      />
    </li>
    <li>
      <button
        v-if="!adminEntrance"
        type="button"
        class="btn btn-outline-light btn-rounded mr-auto"
        data-ripple-color="dark"
        @click="signInWithGoogle"
      >
        <i class="fas fa-user-circle"></i> Війти через Google
      </button>
    </li>
    <li>
      <button
        @click="logout"
        v-if="adminEntrance"
        type="button"
        class="btn btn-outline-primary btn-rounded mr-auto"
        data-ripple-color="dark"
      >
        Вийти
      </button>
    </li>

<!--    Боковое меню-->
    <div
      id="mySidenav"
      class="sidenav2"
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
      >
        Головна
      </router-link>
      <router-link
        class="dropdown-item"
        to="/add_user"
        exact
      >Додати категорію фото
      </router-link>
      <router-link
        class="dropdown-item"
        to="/list"
        exact
      >
        Список категорій фото
      </router-link>
      <router-link
        class="dropdown-item"
        to="/add_history"
        exact
      >
        Додати фото в Історію
      </router-link>
      <router-link
        class="dropdown-item"
        to="/list_history"
        exact
      >
        Список фото в Історіі
      </router-link>
      <router-link
        class="dropdown-item"
        to="/add_text_bible"
        exact
      >
        Додати вірш Біблії
      </router-link>
      <router-link
        class="dropdown-item"
        to="/list_text_bible"
        exact
      >
        Список віршів Біблії
      </router-link>
      <router-link
        class="dropdown-item"
        to="/add_folder_google_disc"
        exact
      >
        Додати папку в Архів
      </router-link>
      <a
        class="dropdown-item"
        href="https://squoosh.app/index.html"
        target="_blank"
      >
        Сжати фото
      </a>
    </div>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import store from '@/store'
import firebase from 'firebase'

export default defineComponent({
  name: 'google',
  methods: {
    openNav () {
      document.getElementById('mySidenav').style.width = '250px'
    },
    closeNav () {
      document.getElementById('mySidenav').style.width = '0'
    }
  },
  setup () {
    const adminEntrance = computed(() => store.state.adminEntrance)
    const signInWithGoogle = () => {
      try {
        store.dispatch('signInWithGoogle')
      } catch (e) {
        console.log('Ошибка входа Google')
      }
    }
    const logout = () => {
      store.dispatch('logout')
    }

    const getUserName = computed(() => firebase.auth().currentUser.displayName)
    const getProfilePicUrl = computed(() => firebase.auth().currentUser.photoURL)
    return {
      getProfilePicUrl,
      getUserName,
      logout,
      signInWithGoogle,
      adminEntrance
    }
  }
})
</script>

<style scoped>
  .sidenav2 {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 9999;
    top: 0;
    right: 0;
    background-color: #212;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }

  .sidenav2 a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 18px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  .sidenav a:hover {
    color: #f1f1f1;
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
    .sidenav a {font-size: 18px;}
  }
</style>
