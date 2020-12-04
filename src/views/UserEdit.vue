<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Редагувати категорію</h3>
      <form
        @submit.prevent="onUpdateForm"
      >
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

<!--        <div class="form-group">-->
<!--          <label>Фотографіі</label>-->
<!--          <input-->
<!--            type="text"-->
<!--            class="form-control"-->
<!--            v-model="photo.images"-->
<!--            required-->
<!--          >-->
<!--        </div>-->
        <ul
          v-if="photo.arrayImages"
          class="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <li v-for="item in photo.arrayImages" :key="item.id">
            <PhotoCard
              :photo="item"
            />
          </li>
        </ul>

        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div
              class="carousel-item active"
              v-for="item in photo.arrayImages" :key="item.id"
            >
              <img :src="item" class="d-block w-100" alt="...">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </a>
        </div>

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
import { defineComponent } from 'vue'
import { db } from '@/main.ts'
import PhotoCard from '@/components/photos/PhotoCard.vue'

export default defineComponent({
  data () {
    return {
      photo: {
      }
    }
  },
  components: {
    PhotoCard
  },
  created () {
    const dbRef = db.collection('photos').doc(this.$route.params.id)
    dbRef.get().then((doc) => {
      this.photo = doc.data()
      console.log(this.photo)
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
