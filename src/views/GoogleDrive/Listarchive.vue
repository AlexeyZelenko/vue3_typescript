<template>
  <div class="flex flex-wrap justify-center">
    <div class="mx-4  max-w-4xl justify-center">
      <h1
        style="margin-top: 10px"
        class="font-bold text-5xl flex-1 mb-4 justify-center"
      >
        Архів
      </h1>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full"
      >
        <router-link
          to='google_disc_2013'
          class="nav-link"
        >
          2013
        </router-link>
      </button>

      <button class="bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded mt-2 w-full">
        <router-link
          to='google_disc_2014'
          class="nav-link"
        >
          2014
        </router-link>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Listarchive'
}
</script>

<style scoped>
</style>
