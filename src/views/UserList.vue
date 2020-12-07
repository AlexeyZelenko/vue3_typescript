<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Назва категорії</th>
            <th>Опис категорії</th>
            <th>Дії</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="photo in Photos" :key="photo.key">
            <td>{{ photo.name }}</td>
            <td>{{ photo.description }}</td>
            <td>
              <router-link
                :to="{name: 'edit', params: { id: photo.key }}"
                class="btn btn-primary"
              >
                Редагувати
              </router-link>
              <button
                @click.prevent="deletePhoto(photo)"
                style="margin-top: 5px"
                class="btn btn-danger"
              >
                Видалити
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
import { db } from '@/main.ts'
import 'firebase/storage'
import firebase from 'firebase/app'

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
          arrayImages: doc.data().arrayImages,
          NameImages: doc.data().NameImages
        })
      })
    })

    const deletePhoto = (photo) => {
      if (window.confirm('Ви дійсно хочете видалити?')) {
        console.log('id', photo.key)
        const File = photo.arrayImages
        console.log(photo.arrayImages)

        if (File) {
          for (let i = 0; i < File.length; i++) {
            const storageRef = firebase.storage().ref()
            const nameTime = photo.NameImages[i]
            console.log(nameTime)
            const Ref = storageRef.child(`${photo.name}/` + nameTime)
            console.log(Ref)
            Ref.delete().then(function () {
            }).catch(function (error) {
              console.log('удаление фото со всем объявлением' + error)
            })
          }
        }
        db.collection('photos').doc(photo.key).delete().then(() => {
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
  .btn-primary {
    margin-right: 12px;
  }
</style>
