<template>
  <ul class="navbar-nav mr-2 mb-2 mb-lg-0">
    <!-- Avatar -->
    <li
      style="color: #3c8baf"
      v-if="adminEntrance"
    >
      {{getUserName}}
    </li>
    <li
      v-if="adminEntrance"
      class="nav-item dropdown mr-4"
    >
      <a
        class="nav-link dropdown-toggle d-flex align-items-center"
        href="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          style="height: 40px"
          :src="getProfilePicUrl"
          class="rounded-circle"
          alt=""
          loading="lazy"
        />
      </a>
      <ul
        class="dropdown-menu"
        aria-labelledby="navbarDropdownMenuLink"
      >
        <li>
          <router-link
            class="dropdown-item"
            to="/"
            exact
          >
            Головна
          </router-link>
        </li>
        <li>
          <router-link
            class="dropdown-item"
            to="/add_user"
            exact
          >Додати категорію фото
          </router-link>
        </li>
        <li>
          <router-link
            class="dropdown-item"
            to="/list"
            exact
          >
            Список категорій фото
          </router-link>
        </li>
        <li>
          <a
            class="dropdown-item"
            href="https://squoosh.app/index.html"
            target="_blank"
          >
            Сжати фото
          </a>
        </li>
      </ul>
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
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import store from '@/store'
import firebase from 'firebase'

export default defineComponent({
  name: 'google',
  setup () {
    const showDropdownMenu = ref(false)

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
      showDropdownMenu,
      adminEntrance
    }
  }
})
</script>

<style scoped>

</style>
