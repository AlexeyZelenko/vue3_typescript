<template>
  <div id="nav">
    <router-link  to="/">Головна</router-link> |
    <router-link  to="/about">Про церкву</router-link> |
    <router-link  to="/video">Відео</router-link> |
    <router-link  to="/about_us">Про нас</router-link> |
    <router-link  to="/add_user">Додати користувача</router-link> |
    <router-link  to="/list">Список користувачив</router-link>
  </div>

  <component :is="layout">
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
import { defineAsyncComponent, defineComponent } from 'vue'
const Vue3DownUpButton = defineAsyncComponent(() => import('@/components/Vue3DownUpButton.vue'))
const user = defineAsyncComponent(() => import('@/layouts/user.vue'))
const empty = defineAsyncComponent(() => import('@/layouts/empty.vue'))

export default defineComponent({
  components: {
    Vue3DownUpButton,
    user,
    empty
  },
  // setup ($route) {
  //   const layout = computed(() => ($route.meta.layout || 'empty') + '-layout')
  //
  //   return { layout }
  // }
  computed: {
    layout () {
      if (this.$route.meta.layout) {
        console.log(this.$route.meta.layout)
        return (this.$route.meta.layout) + '-layout'
      } else { return 'empty' + '-layout' }
    }
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
