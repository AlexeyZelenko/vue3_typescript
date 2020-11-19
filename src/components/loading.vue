<template>
  <div
    v-if="loading"
    class="loading-page"
  >
    <img
      src="@/assets/images/832.svg"
    >

  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
  .img {
    position: absolute;
    top: 50%;
    left: 0;
    margin-left: auto;
    margin-right: auto;
    right: 0;
    border: 0;
  }
</style>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #d7d2d2;
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
    z-index: 100;
    opacity: .8;
  }
</style>
