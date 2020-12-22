<template>
  <div
    style="margin: 10px"
    class="row justify-content-center"
  >
    <div class="col-md-5">
      <h3 class="text-center">Додати фото в Історію</h3>
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

        <div
          class="form-group"
        >
          <label>Рік</label>
          <input
            type="number"
            class="form-control"
            v-model="photo.year"
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
          <button class="btn btn-primary btn-block">Додати</button>
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
      this.File = event.target.files
      // console.log(event.target.files)

      // if you need to re-use field or drop the same files multiple times
      // this.$refs.form.reset()
    },

    async onFormSubmit (event) {
      this.$swal({
        title: 'Іде завантаження...',
        text: '',
        imageUrl: '352.gif' || '~~/assets/352.gif',
        showConfirmButton: false
      })

      // ЗАГРУЗКА ФОТО
      const promises = []
      const promisesName = []
      const File = this.File

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

          await storageRef.child(`История/${this.photo.name}/` + nameTime)
          try {
            await storageRef.child(`История/${this.photo.name}/` + nameTime).put(File[i], metadata)
          } catch (e) {
            console.log(e.message)
          }

          try {
            promises.push(
              await storageRef.child(`История/${this.photo.name}/` + nameTime).getDownloadURL()
            )
            promisesName.push(
              nameTime
            )
          } catch (e) {
            console.log(e.message)
          }
        }
      }

      const arrayImages = await Promise.all(promises)
      const NameImages = await Promise.all(promisesName)

      event.preventDefault()
      await db.collection('history')
        .add({
          name: this.photo.name,
          year: this.photo.year,
          description: this.photo.description,
          arrayImages,
          NameImages
        })
      try {
        this.$swal('Успішно створенно!!!')
        this.photo.name = ''
        this.photo.description = ''
        this.photo.arrayImages = []
        this.File = []
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
