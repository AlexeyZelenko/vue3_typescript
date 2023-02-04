<template>
  <div
    class="row justify-content-center"
    style="margin: 5px"
  >
    <div class="col-md-5">
      <h3 class="text-center">Редагувати категорію</h3>
      <form
        @submit.prevent="onUpdateForm"
      >
        <div class="form-group">
          <label>Назва категорії</label>
          <p>{{photo.name}}</p>
<!--          <input-->
<!--            type="text"-->
<!--            class="form-control"-->
<!--            v-model="photo.name"-->
<!--            required-->
<!--          >-->
        </div>

        <div
          class="form-group"
          style="margin-bottom: 10px"
        >
          <label>Редагувати Опис</label>
          <input
            type="text"
            class="form-control"
            v-model="photo.description"
            required
          >
        </div>
        <!--Фотографии-->
        <div
          style="margin-bottom: 10px"
          ref="form"
        >
          <label>Додати фото</label><br>
          <input
            type="file"
            name="file-upload"
            @change="previewFiles"
            multiple=""
            accept="image/jpeg, image/png"
            tabindex="-1"
          >
        </div>

        <!--Слайдер-->
        <label>Переглянути фото:</label><br>
        <div
          id="carouselExampleFade"
          class="carousel slide carousel-fade"
          data-ride="carousel"
          style="margin-bottom: 10px"
        >
          <div
            class="carousel-inner"
          >
            <div
              class="carousel-item active"
              data-interval="1000"
              v-for="item in photo.arrayImages" :key="item.id"
            >
              <img
                :src="photo.arrayImages[this.count]"
                class="d-block w-100" alt="..."
              >
            </div>
          </div>
          <a
            @click="clickLeft"
            class="carousel-control-prev"
            href="#carouselExampleFade"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </a>
          <a
            @click="clickRight"
            class="carousel-control-next"
            href="#carouselExampleFade"
            role="button"
          >
            <span
              class="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span
              class="visually-hidden"
            >
              Next
            </span>
          </a>
        </div>

<!--        Фото-->
        <label>Редагувати фото:</label><br>
        <ul
          v-if="photo.arrayImages"
          class="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <li
            v-for="item in photo.arrayImages"
            :key="item.id"
          >
            <div class="card h-100">
              <PhotoCard :photo="item"/>
              <div class="card-body">
                <div
                  class="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  <button
                    @click="deleteFoto(photo, item)"
                    type="button"
                    class="btn btn-danger btn-sm"
                  >
                    Видалити
                  </button>
                  <button
                    @click="FirstFoto(photo, item)"
                    type="button"
                    class="btn btn-warning btn-sm"
                  >
                    Головна
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <div class="form-group">
          <button
            class="btn btn-primary btn-block"
          >
            Зберегти
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { db } from '@/main'
import PhotoCard from '@/components/photos/PhotoCard.vue'
import firebase from 'firebase'

export default defineComponent({
  components: {
    PhotoCard
  },
  setup () {
    const File = ref([])
    const photo = ref({})
    const count = ref(0)
    return {
      photo, count, File
    }
  },
  created () {
    const dbRef = db.collection('good').doc(this.$route.params.id)
    dbRef.get().then((doc) => {
      this.photo = doc.data()
    }).catch((error) => {
      this.$swal({
        title: 'Помилка...',
        text: error
      })
    })
  },
  methods: {
    previewFiles (event) {
      // process your files, read as DataUrl or upload...
      this.File = event.target.files

      // if you need to re-use field or drop the same files multiple times
      // this.$refs.form.reset()
    },
    deleteFoto (photo, item) {
      const array = photo.arrayImages
      const arrayName = photo.NameImages

      const index = array.indexOf(item)
      if (index > -1) {
        array.splice(index, 1)
        arrayName.splice(index, 1)
      }
      photo.arrayImages = array
      photo.NameImages = arrayName
    },
    async FirstFoto (photo, item) {
      const array = photo.arrayImages
      const arrayName = photo.NameImages

      const index = array.indexOf(item)
      if (index > -1) {
        await array.unshift(...array.splice(index, 1))
        await arrayName.unshift(...arrayName.splice(index, 1))
      }
      this.photo.arrayImages = array
      this.photo.NameImages = arrayName
    },
    clickRight () {
      if (this.count < this.photo.arrayImages.length - 1) {
        this.count++
      } else {
        this.count = 0
      }
    },
    clickLeft () {
      if (this.count > 0) {
        this.count--
      } else {
        this.count = 0
      }
    },
    async onUpdateForm (event) {
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

          await storageRef.child(`${this.photo.name}/` + nameTime)
          try {
            await storageRef.child(`${this.photo.name}/` + nameTime).put(File[i], metadata)
          } catch (e) {
            console.log(e.message)
          }

          try {
            promises.push(
              await storageRef.child(`${this.photo.name}/` + nameTime).getDownloadURL()
            )
            promisesName.push(
              nameTime
            )
          } catch (e) {
            console.log(e.message)
          }
        }
      }

      const NameImages = await Promise.all(promisesName)
      const URLs = await Promise.all(promises)
      const ArrayOld = await this.photo.arrayImages
      const NameImagesOld = await this.photo.NameImages
      const ArrayFile = [...URLs, ...ArrayOld]
      const ArrayNameImages = [...NameImages, ...NameImagesOld]

      event.preventDefault()
      db.collection('good').doc(this.$route.params.id)
        .update({
          name: this.photo.name,
          description: this.photo.description,
          arrayImages: ArrayFile,
          NameImages: ArrayNameImages
        })
        .then(() => {
          console.log('Category of foto successfully updated!')
          // this.$router.push('/list')
        }).catch((error) => {
          console.log(error)
        })

      const dbRef = await db.collection('good').doc(this.$route.params.id)
      dbRef.get().then((doc) => {
        this.photo = doc.data()
      }).catch((error) => {
        console.log(error)
      })
      try {
        this.$swal('Категорію фото успішно оновлено!!!')
        this.photo.name = ''
        this.photo.description = ''
        this.photo.arrayImages = []
        this.File = []
      } catch (error) {
        console.log(error)
      }
    }
  }
})
</script>
