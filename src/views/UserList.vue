<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in Users" :key="user.key">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>
              <router-link :to="{name: 'edit', params: { id: user.key }}" class="btn btn-primary">Редагувати
              </router-link>
              <button @click.prevent="deleteUser(user.key)" class="btn btn-danger">Видалити</button>
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
    const Users = ref([])

    db.collection('users').onSnapshot((snapshotChange) => {
      Users.value = []
      snapshotChange.forEach((doc) => {
        Users.value.push({
          key: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          phone: doc.data().phone
        })
      })
    })

    const deleteUser = (id) => {
      if (window.confirm('Ви дійсно хочете видалити?')) {
        db.collection('users').doc(id).delete().then(() => {
          console.log('Документ видалено!')
        })
          .catch((error) => {
            console.error(error)
          })
      }
    }
    return {
      Users,
      deleteUser
    }
  }
}
</script>

<style>
  .btn-primary {
    margin-right: 12px;
  }
</style>
