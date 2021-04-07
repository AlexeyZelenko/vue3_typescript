<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Назва</th>
            <th>Опис</th>
            <th>Телефон</th>
            <th>Дії</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="business in arrayBusiness"
            :key="business.id"
          >
            <td>{{ business.title }}</td>
            <td>{{ business.description }}</td>
            <td>{{ business.telephone }}</td>
            <td>
              <a
                v-if="business.link"
                :href=business.link
              >
                <button
                  class="btnHref"
                >
                  Сайт
                </button>
              </a>
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
      arrayBusiness: []
    }
  },
  async mounted () {
    const response = await fetch('https://blv-vue3-tp.firebaseio.com/business.json')
    const data = await response.json()

    this.arrayBusiness = Object.keys(data).map(key => {
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

      await fetch(`https://blv-vue3-tp.firebaseio.com/business/${id}.json`, {
        method: 'DELETE'
      })

      const response = await fetch('https://blv-vue3-tp.firebaseio.com/business.json')
      const data = await response.json()

      this.arrayBusiness = Object.keys(data).map(key => {
        return { ...data[key], id: key }
      })

      try {
        this.$swal('Вірш видаленно!!!')
        this.text.title = ''
        this.text.verse = ''
        this.text.description = ''
        this.text.telephone = ''
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.btnHref {
  margin-top: 10px;
  padding: 6px 12px;
  background: #01ba01;
  color: white;
  border: 0;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}
.btnHref:hover {
  background: green;
}
</style>
