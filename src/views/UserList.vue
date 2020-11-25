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
              <router-link :to="{name: 'edit', params: { id: user.key }}" class="btn btn-primary">Edit
              </router-link>
              <button @click.prevent="deleteUser(user.key)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
        Dropdown button
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { db } from '@/firebaseDb'

export default {
  data () {
    return {
      Users: []
    }
  },
  created () {
    db.collection('users').onSnapshot((snapshotChange) => {
      this.Users = []
      snapshotChange.forEach((doc) => {
        this.Users.push({
          key: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          phone: doc.data().phone
        })
      })
    })
  },
  methods: {
    deleteUser (id) {
      if (window.confirm('Do you really want to delete?')) {
        db.collection('users').doc(id).delete().then(() => {
          console.log('Document deleted!')
        })
          .catch((error) => {
            console.error(error)
          })
      }
    }
  }
}
</script>

<style>
  .btn-primary {
    margin-right: 12px;
  }
</style>
