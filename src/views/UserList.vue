<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Назва категорії</th>
            <th>Опис категорії</th>
            <th>Обкладинка категроії</th>
            <th>Дії</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="photo in Photos" :key="photo.key">
            <td>{{ photo.name }}</td>
            <td>{{ photo.description }}</td>
            <td>{{ photo.picture }}</td>
            <td>
              <router-link
                :to="{name: 'edit', params: { id: photo.key }}"
                class="btn btn-primary"
              >
                Редагувати
              </router-link>
              <button @click.prevent="deletePhoto(photo.key)" class="btn btn-danger">Видалити</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { db } from '@/firebaseDb'

export default {
  setup () {
    const Photos = ref([])

    db.collection('photos').onSnapshot((snapshotChange) => {
      Photos.value = []
      snapshotChange.forEach((doc) => {
        Photos.value.push({
          key: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          picture: doc.data().picture
        })
      })
    })

    const deletePhoto = (id) => {
      if (window.confirm('Ви дійсно хочете видалити?')) {
        db.collection('photos').doc(id).delete().then(() => {
          console.log('Документ видалено!')
        })
          .catch((error) => {
            console.error(error)
          })
      }
    }
    console.log('Photos', Photos)
    return {
      Photos,
      deletePhoto
    }
  }
}
</script>

<style>
  .btn-primary {
    margin-right: 12px;
  }
</style>
