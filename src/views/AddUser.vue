<template>
  <div class="row justify-content-center">
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

<!--        <div class="form-group">-->
<!--          <label>Обкладинка</label>-->
<!--          <input type="text" class="form-control" v-model="photo.picture" required>-->
<!--        </div>-->

<!--        <div-->
<!--          class="mb-3"-->
<!--        >-->
<!--          <label-->
<!--            for="formFile"-->
<!--            class="form-label"-->
<!--          >-->
<!--            Фото обкладинки-->
<!--          </label>-->
<!--          <input-->
<!--            :change="photo.picture"-->
<!--            class="form-control"-->
<!--            type="file"-->
<!--            id="formFile"-->
<!--            label="Загрузка фотографій"-->
<!--          >-->
<!--        </div>-->

        <div>
          <input
            ref="upload"
            type="file"
            name="file-upload"
            multiple=""
            accept="image/jpeg, image/png"
            @change="onUploadFiles"
          >
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block">Додати категорію</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from '@/main.ts'
import firebase from 'firebase'
import 'firebase/storage'

export default {
  data () {
    return {
      File: [],
      photo: {}
    }
  },
  methods: {
    previewFiles () {
      this.File = this.$refs.myFiles.files
    },

    async onFormSubmit (event) {
      // ЗАГРУЗКА ФОТО
      const promises = []
      const promisesName = []

      if (File) {
        for (let i = 0; i < File.length; i++) {
          const storageRef = firebase.storage().ref()
          // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

          // Создайте метаданные файла
          const metadata = {
            contentType: 'image/jpeg'
          }
          const nameTime = +new Date() + '.jpg'
          // ПРОВЕРКА ЗАГРУЗКИ ФОТО
          const uploadTask = storageRef.child(`${this.photo.name}/images/` + nameTime).put(File[i], metadata)

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

      console.log(this.photo)
      console.log(arrayImages)
      console.log(NameImages)

      event.preventDefault()
      db.collection('photos')
        .add({
          photo: this.photo,
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
