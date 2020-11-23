<template>
  <div id="nav">
    <router-link  to="/">Головна</router-link> |
    <router-link  to="/about">Про церкву</router-link> |
    <router-link  to="/video">Відео</router-link> |
    <router-link  to="/about_us">Про нас</router-link>
    <router-link  to="/add_user">Користувачи</router-link>
  </div>
  <router-view/>
<!--  <VuejsHelloApp> </VuejsHelloApp>-->
  <ButtonTop >
    <template #default>
      <img
        :src="require(`@/assets/img/buttonTop.png`)"
      >
    </template>
  </ButtonTop>
</template>

<script>
// import VuejsHelloApp from 'vue-button-up'
import ButtonTop from '@/components/ButtonTop.vue'
export default {
  components: {
    ButtonTop
  }
}
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
