<template>
  <div
    style="margin: 10px"
    class="row justify-content-center"
  >
    <div class="col-md-5">
      <h3 class="text-center">Додати вірш</h3>
      <form
        @submit.prevent="createText"
      >

        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Хто написав вірш</span>
          <input
            type="text"
            class="form-control"
            placeholder="Автор"
            aria-label="Автор"
            aria-describedby="basic-addon1"
            v-model="text.title"
          >
        </div>

        <div class="input-group">
          <span class="input-group-text">Вірш</span>
          <textarea
            class="form-control"
            aria-label="With textarea"
            v-model="text.verse"
          ></textarea>
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
  name: 'AddTextPoetry',
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
      store.dispatch('createTextPoetry', payload)

      try {
        this.$swal('Вірш успішно створенно!!!')
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
