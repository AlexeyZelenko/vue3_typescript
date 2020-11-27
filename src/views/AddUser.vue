<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Додати категорію</h3>
      <form @submit.prevent="onFormSubmit">
        <div class="form-group">
          <label>Назва</label>
          <input type="text" class="form-control" v-model="photo.name" required>
        </div>

        <div class="form-group">
          <label>Опис</label>
          <input type="email" class="form-control" v-model="photo.description" required>
        </div>

        <div class="form-group">
          <label>Обкладинка</label>
          <input type="text" class="form-control" v-model="photo.picture" required>
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block">Додати категорію</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from '../firebaseDb'

export default {
  data () {
    return {
      photo: {}
    }
  },
  methods: {
    onFormSubmit (event) {
      event.preventDefault()
      db.collection('photos').add(this.photo).then(() => {
        alert('Користувача успішно створено!')
        this.photo.name = ''
        this.photo.description = ''
        this.photo.picture = ''
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
