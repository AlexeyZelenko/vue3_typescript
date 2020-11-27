<template>
  <div
    ref="el"
    class="bg-gray-800 radius-sm shadow-md rounded-md h-full"
  >
<!--    Картинка-->
    <figure class="relative pb-2/3">
      <img
        :src="isShown ? gameImages : null"
        :alt="`${gameName} обложка`"
        class="h-full w-full object-cover rounded-t-md"
      />
    </figure>

<!--Карточка-->
    <div class="p-5">
      <h3 class="text-2xl font-bold" style="color: #7f2121">{{ gameName }}</h3>
    </div>
    <router-link
      :to="{name: 'edit', params: { id: photo.key }}"
      class="btn btn-primary"
    >
      Редагувати
    </router-link>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import useIntersectionObserver from '@/composables/useIntersectionObserver'
import { db } from '@/firebaseDb'

export default {
  name: 'GameCard',
  data () {
    return {
      photo: {
      }
    }
  },
  created () {
    const dbRef = db.collection('photos').doc(this.$route.params.id)
    dbRef.get().then((doc) => {
      this.photo = doc.data()
    }).catch((error) => {
      console.log(error)
    })
  },
  props: {
    game: Object
  },
  setup (props) {
    console.log('1', props.game)
    const el = ref(null)
    const { observe, unobserve, isShown } = useIntersectionObserver()

    const gameImages = computed(() => {
      return props.game.picture
    })
    const gameName = computed(() => {
      console.log(props.game.name)
      return props.game.name
    })

    onMounted(() => {
      observe(el.value)
    })

    onBeforeUnmount(() => {
      unobserve(el.value)
    })
    return {
      gameImages,
      el,
      isShown,
      gameName
    }
  }
}
</script>
