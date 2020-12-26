<template>
  <div
    style="margin: 10px"
    class="row justify-content-center"
  >
    <div class="col-md-5">
      <h3 class="text-center">Додати папку в Архів Google Диска</h3>
      <form
        @submit.prevent="createText"
      >
        <div
          class="form-group"
        >
          <label>Назва події</label>
          <input
            type="text"
            class="form-control"
            v-model="text.name"
            required
          >
        </div>

        <div class="form-group">
          <label>Рік</label>
          <input
            type="text"
            class="form-control"
            v-model="text.year"
            required
          >
        </div>

        <div class="form-group">
          <label>id папки</label>
          <p>Відкрити доступ до папки...</p>
          <input
            type="text"
            class="form-control"
            v-model="text.link"
            required
          >
        </div>

        <div
          style="margin: 10px"
          class="form-group"
        >
          <button class="btn btn-primary btn-block">Додати</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'AddFolderGoogleDisc',
  data () {
    return {
      text: {}
    }
  },
  methods: {
    createText () {
      this.$swal({
        title: 'Іде завантаження...',
        text: '',
        imageUrl: '352.gif' || '~~/assets/352.gif',
        showConfirmButton: false
      })

      const payload = {
        name: this.text.name,
        year: this.text.year,
        link: this.text.link
      }
      store.dispatch('createFolderGoogleDisc', payload)

      try {
        this.$swal('Подію успішно створенно!!!')
        this.text.title = ''
        this.text.verse = ''
      } catch (error) {
        this.$swal({
          title: 'Помилка завантаження...',
          text: error
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
