<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Редагувати категорію</h3>
      <form @submit.prevent="onUpdateForm">
        <div class="form-group">
          <label>Назва категорії</label>
          <input
            type="text"
            class="form-control"
            v-model="photo.name"
            required
          >
        </div>

        <div class="form-group">
          <label>Опис</label>
          <input
            type="text"
            class="form-control"
            v-model="photo.description"
            required
          >
        </div>

        <div class="form-group">
          <label>Обкладинка</label>
          <input
            type="text"
            class="form-control"
            v-model="photo.picture"
            required
          >
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block">Зберегти</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { db } from '@/firebaseDb'

export default defineComponent({
  data () {
    return {
      photo: {
      }
    }
  },
  created () {
    const dbRef = db.collection('photos').doc(this.$route.params.id)
    dbRef.get().then((doc) => {
      this.photo = doc.data()
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    onUpdateForm (event) {
      event.preventDefault()
      db.collection('photos').doc(this.$route.params.id)
        .update(this.photo).then(() => {
          console.log('photo successfully updated!')
          this.$router.push('/list')
        }).catch((error) => {
          console.log(error)
        })
    }
  }
})
</script>
