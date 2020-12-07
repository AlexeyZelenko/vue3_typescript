<template>
  <div
    style="margin: 10px"
    class="row justify-content-center"
  >
    <div class="col-md-5">
      <h3 class="text-center">Додати категорію</h3>
      <form
        @submit.prevent="onFormSubmit"
      >
        <div
          class="form-group"
        >
          <label>Назва</label>
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
<!--Фотографии-->
        <div
          style="margin: 10px"
          ref="form"
        >
          <input
            type="file"
            name="file-upload"
            multiple=""
            @change="previewFiles"
            accept="image/jpeg, image/png"
            tabindex="-1"
          >
        </div>

        <div
          style="margin: 10px"
          class="form-group"
        >
          <button class="btn btn-primary btn-block">Додати категорію</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from '@/main.ts'
// import firebase from 'firebase'
import 'firebase/storage'
import firebase from 'firebase/app'

export default {
  data () {
    return {
      File: [],
      photo: {}
    }
  },
  methods: {
    previewFiles (event) {
      // process your files, read as DataUrl or upload...
      console.log(event.target.files)
      this.File = event.target.files
      // console.log(event.target.files)

      // if you need to re-use field or drop the same files multiple times
      // this.$refs.form.reset()
    },

    async onFormSubmit (event) {
      // ЗАГРУЗКА ФОТО
      const promises = []
      const promisesName = []

      if (this.File) {
        for (let i = 0; i < this.File.length; i++) {
          const storageRef = firebase.storage().ref()
          console.log('storageRef', storageRef)
          // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

          // Создайте метаданные файла
          const metadata = {
            contentType: 'image/jpeg'
          }
          const nameTime = +new Date() + '.jpg'
          // ПРОВЕРКА ЗАГРУЗКИ ФОТО

          const uploadTask = storageRef
            .child(`${this.photo.name}/` + nameTime)
            .put(this.File[i], metadata)

          promises.push(
            uploadTask
              .then(snapshot =>
                snapshot.ref.getDownloadURL()
              )
          )
          promisesName.push(
            nameTime
          )
        }
      }

      const arrayImages = await Promise.all(promises)
      const NameImages = await Promise.all(promisesName)

      event.preventDefault()
      db.collection('photos')
        .add({
          name: this.photo.name,
          description: this.photo.description,
          picture: '',
          arrayImages,
          NameImages
        })
        .then(() => {
          alert('Категорію успішно створено!')
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
