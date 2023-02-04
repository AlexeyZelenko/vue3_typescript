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
                :to="{name: 'editGoods', params: { id: photo.key }}"
              >
                <button
                  class="button_edit"
                >
                  Редагувати
                </button>
              </router-link>
              <button
                @click.prevent="deletePhoto(photo)"
                class="button_delete"
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
import { db } from '@/main'
import 'firebase/storage'
import firebase from 'firebase/app'

export default {
  setup () {
    const Photos = ref([])

    db.collection('good').onSnapshot((snapshotChange) => {
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
        const File = photo.arrayImages

        if (File) {
          for (let i = 0; i < File.length; i++) {
            const storageRef = firebase.storage().ref()
            const nameTime = photo.NameImages[i]
            const Ref = storageRef.child(`${photo.name}/` + nameTime)

            Ref.delete()
              .then(() => {
                console.log('удаление фото со всем объявлением')
              })
              .catch((error) => {
                console.log(error)
              })
          }
        }
        db.collection('good')
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
  @layer components {
    .button_edit {
      @apply bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2;
    }
    .button_edit:hover {
      @apply bg-blue-600;
    }

    .button_delete {
      @apply bg-red-600 text-white font-bold py-2 px-4 rounded mx-2;
    }
    .button_delete:hover {
      @apply bg-red-500;
    }
  }
</style>
