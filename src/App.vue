<template>
  <div id="nav">
    <router-link  to="/">Головна</router-link> |
    <router-link  to="/about">Про церкву</router-link> |
    <router-link  to="/video">Відео</router-link> |
    <router-link  to="/about_us">Про нас</router-link>

<!--Выпадающее меню-->
    <div class="position-relative">
      <div
        class="position-absolute bottom-50 right-0"
      >
        <div
          class="dropdown"
        >
          <svg
            type="button"  data-toggle="dropdown" aria-expanded="false"
            @click="showDropdownMenu = !showDropdownMenu"
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            class="bi bi-three-dots-vertical"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style="color: #42b983"
          >
            <path
              fill-rule="evenodd"
              d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
            />
          </svg>
          <ul
            class="dropdown-menu dropdown-menu-dark dropdown-menu-right"
            aria-labelledby="dropdownMenuButton"
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
        </div>
      </div>
    </div>
  </div>

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

<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: #212;
}

#nav a {
  font-weight: bold;
  color: #dee3e9;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
