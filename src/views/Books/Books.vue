<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Назва книги</th>
            <th>Дії</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="book in arrayBooks"
            :key="book.id"
          >
            <td>{{ book.title }}</td>
            <td>
              <a :href=book.link>
              <button
              :href=book.link
                style="margin-top: 5px; margin-right: 10px"
              >
                ЧИТАТИ
                <i
                  style="color: #2655ba"
                  class="fas fa-book fa-2x"
                ></i>
              </button>
              </a>
<!--              <button-->
<!--                @click.prevent="deleteText(book.id)"-->
<!--                style="margin-top: 5px"-->
<!--              >-->
<!--                <i-->
<!--                  style="color: #ba2626"-->
<!--                  class="fas fa-trash-alt fa-2x"-->
<!--                ></i>-->
<!--              </button>-->
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
      arrayBooks: []
    }
  },
  async mounted () {
    const response = await fetch('https://blv-vue3-tp.firebaseio.com/books.json')
    const data = await response.json()

    this.arrayBooks = Object.keys(data).map(key => {
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

      await fetch(`https://blv-vue3-tp.firebaseio.com/books/${id}.json`, {
        method: 'DELETE'
      })

      const response = await fetch('https://blv-vue3-tp.firebaseio.com/books.json')
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
