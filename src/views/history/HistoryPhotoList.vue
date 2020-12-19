<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Назва категорії</th>
            <th>Рік</th>
            <th>Опис категорії</th>
            <th>Дії</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="photo in Photos" :key="photo.key">
            <td>{{ photo.name }}</td>
            <td>{{ photo.year }}</td>
            <td>{{ photo.description }}</td>
            <td>
              <router-link
                :to="{name: 'edit_history', params: { id: photo.key }}"
              >
                <i
                  style="color: #2a6aaa; margin-right: 10px"
                  class="fas fa-edit fa-2x"
                ></i>
              </router-link>
              <button
                @click.prevent="deletePhoto(photo)"
                style="margin: 10px"
              >
                <i
                  style="color: #ba2626"
                  class="fas fa-trash-alt fa-2x"
                ></i>
              </button>
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
import { db } from '@/main'
import 'firebase/storage'
import firebase from 'firebase/app'

export default {
  setup () {
    const Photos = ref([])

    db.collection('history').onSnapshot((snapshotChange) => {
      Photos.value = []
      snapshotChange.forEach((doc) => {
        Photos.value.push({
          key: doc.id,
          name: doc.data().name,
          year: doc.data().year,
          description: doc.data().description,
          arrayImages: doc.data().arrayImages,
          NameImages: doc.data().NameImages
        })
      })
    })

    const deletePhoto = (photo) => {
      if (window.confirm('Ви дійсно хочете видалити?')) {
        const File = photo.arrayImages

        if (File) {
          for (let i = 0; i < File.length; i++) {
            const storageRef = firebase.storage().ref()
            const nameTime = photo.NameImages[i]
            const Ref = storageRef.child(`История/${photo.name}/` + nameTime)

            Ref.delete()
              .then(() => {
                console.log('удаление фото со всем объявлением')
              })
              .catch((error) => {
                console.log(error)
              })
          }
        }
        db.collection('history')
          .doc(photo.key)
          .delete()
          .then(() => {
            console.log('Документ видалено!')
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }
    return {
      Photos,
      deletePhoto
    }
  }
}
</script>

<style>
  /*.btn-primary {*/
  /*  margin-right: 12px;*/
  /*}*/
  ol, ul {
    padding-left: 0.5rem;
  }
</style>
