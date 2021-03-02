<template>
  <div
    style="margin: 10px"
    class="row justify-content-center"
  >
    <div class="col-md-5">
      <h3 class="text-center">Додати бізнес</h3>
      <form
        @submit.prevent="createText"
      >

        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Назва бізнесу</span>
          <input
            type="text"
            class="form-control"
            placeholder="Автор"
            aria-label="Автор"
            aria-describedby="basic-addon1"
            v-model="text.title"
          >
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Посилання</span>
          <input
            type="text"
            class="form-control"
            aria-label="Опис"
            aria-describedby="basic-addon1"
            v-model="text.link"
          >
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Телефон</span>
          <input
            type="text"
            class="form-control"
            aria-label="Опис"
            aria-describedby="basic-addon1"
            v-model="text.telephone"
          >
        </div>

        <div class="input-group">
          <span class="input-group-text">Опис бізнесу</span>
          <textarea
            class="form-control"
            placeholder="Опис"
            aria-label="With textarea"
            v-model="text.description"
          ></textarea>
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
  name: 'AddNewBooks',
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
        link: this.text.link,
        description: this.text.description,
        telephone: this.text.telephone
      }
      store.dispatch('createNewBusiness', payload)

      try {
        this.$swal('Успішно створенно!!!')
        this.text.title = ''
        this.text.link = ''
        this.text.description = ''
        this.text.telephone = ''
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
