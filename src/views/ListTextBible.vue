<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Вірш з Біблії</th>
            <th>Місце</th>
            <th>Дії</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="photo in arrayVerse"
            :key="photo.id"
          >
            <td>{{ photo.title }}</td>
            <td>{{ photo.verse }}</td>
            <td>
              <button
                @click.prevent="deleteText(photo.id)"
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
import 'firebase/storage'

export default {
  data () {
    return {
      text: {},
      TextBible: {},
      arrayVerse: []
    }
  },
  async mounted () {
    const response = await fetch('https://blv-vue3-tp.firebaseio.com/bible.json')
    const data = await response.json()

    this.arrayVerse = Object.keys(data).map(key => {
      return { ...data[key], id: key }
    })
  },
  methods: {
    async deleteText (id) {
      this.$swal({
        title: 'Зачекайте...',
        text: '',
        imageUrl: '352.gif' || '~~/assets/352.gif',
        showConfirmButton: false
      })

      await fetch(`https://blv-vue3-tp.firebaseio.com/bible/${id}.json`, {
        method: 'DELETE'
      })

      const response = await fetch('https://blv-vue3-tp.firebaseio.com/bible.json')
      const data = await response.json()

      this.arrayVerse = Object.keys(data).map(key => {
        return { ...data[key], id: key }
      })

      try {
        this.$swal('Вірш видаленно!!!')
        this.text.title = ''
        this.text.verse = ''
      } catch (error) {
        console.log(error)
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
