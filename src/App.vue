<template>
  <div id="nav">
    <router-link  to="/">Головна</router-link> |
    <router-link  to="/about">Про церкву</router-link> |
    <router-link  to="/video">Відео</router-link>
  </div>
  <router-view/>
</template>

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
