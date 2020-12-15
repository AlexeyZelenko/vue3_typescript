<template>
  <div
    style="margin: 10px"
    class="row justify-content-center"
  >
    <div class="col-md-5">
      <h3 class="text-center">Додати вірш з Біблії</h3>
      <form
        @submit.prevent="createText"
      >
        <div
          class="form-group"
        >
          <label>Вірш</label>
          <input
            type="text"
            class="form-control"
            v-model="text.title"
            required
          >
        </div>

        <div class="form-group">
          <label>Місце в Біблії</label>
          <input
            type="text"
            class="form-control"
            v-model="text.verse"
            required
          >
        </div>

        <div
          style="margin: 10px"
          class="form-group"
        >
          <button class="btn btn-primary btn-block">Додати вірш</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'AddTextBible',
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
        title: this.text.title,
        verse: this.text.verse
      }
      store.dispatch('createTextBible', payload)

      try {
        this.$swal('Вірш успішно створенно!!!')
        this.text.title = ''
        this.text.verse = ''
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>

</style>
