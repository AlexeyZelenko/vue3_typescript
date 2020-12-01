<template>
  <nav class="navbar navbar-dark navbar-expand-lg " style="background-color: #212;">
    <!-- Container wrapper -->
    <div class="container-fluid">
      <!-- Toggle button -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarLeftAlignExample"
        aria-controls="navbarLeftAlignExample"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>

      <!-- Collapsible wrapper -->
      <div class="collapse navbar-collapse" id="navbarLeftAlignExample">
        <!-- Left links -->
        <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link  to="/" class="nav-link" aria-current="page">Головна</router-link>
          </li>
          <li class="nav-item">
            <router-link  to="/about" class="nav-link">Про церкву</router-link>
          </li><li class="nav-item">
          <router-link  to="/video" class="nav-link">Відео</router-link>
          </li><li class="nav-item">
            <router-link  to="/about_us" class="nav-link">Про нас</router-link>
          </li><li class="nav-item">
          <router-link  to="/photo" class="nav-link">Фото галерея</router-link>
          </li>
          <!-- Avatar -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle d-flex align-items-center"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                style="height: 24px"
                src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                class="rounded-circle"
                alt=""
                loading="lazy"
              />
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
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
                >Додати користувача
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to="/list"
                  exact
                >
                  Список користувачив
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <component :is=layout>
    <router-view/>
  </component>

  <Vue3DownUpButton >
    <template #default>
<!--      <img-->
<!--        :src="require(`@/assets/img/buttonTop.png`)"-->
<!--      >-->
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
<!--      <img-->
<!--        :src="require(`@/assets/img/buttonDown.png`)"-->
<!--      >-->
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
import { defineAsyncComponent, defineComponent, ref, computed } from 'vue'
import router from '@/router'
const Vue3DownUpButton = defineAsyncComponent(() => import('@/components/Vue3DownUpButton.vue'))
const user = defineAsyncComponent(() => import('@/layouts/user.vue'))
const empty = defineAsyncComponent(() => import('@/layouts/empty.vue'))

export default defineComponent({
  components: {
    Vue3DownUpButton,
    user,
    empty
  },
  setup () {
    const { currentRoute } = router
    const showDropdownMenu = ref(false)
    const layout = computed(() => {
      if (currentRoute.value.meta.layout) {
        return (currentRoute.value.meta.layout) + '-layout'
      } else { return 'empty' + '-layout' }
    })
    return {
      showDropdownMenu,
      layout
    }
  },
  beforeRouteLeave (to, from, next) {
    this.clearNote()
    next()
  }
})
</script>
