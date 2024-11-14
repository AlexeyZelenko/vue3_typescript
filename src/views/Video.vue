<template>
  <div>
    <div class="jumbotron">
      <div class="container">
        <h1>{{ textBible.title }}</h1>
        <h1>{{ textBible.verse }}</h1>
      </div>
    </div>

    <!-- Боковое меню -->
    <SideNav
      :is-open="isSideNavOpen"
      @open="openNav"
      @close="closeNav"
      @selectList="listVideo"
    />

    <!-- Кнопка для мобильных устройств -->
    <div class="btn_mobile" @click="toggleNav">
      <p>
        <i class="fas fa-align-justify"></i>
        МЕНЮ ВІДЕО
        <i class="fas fa-video"></i>
      </p>
    </div>

    <!-- Лист видео -->
    <VideoList
      :videos="filteredVideoList"
      @selectVideo="selectVideo"
    />

    <!-- Модальное окно для видео -->
    <VideoModal
      v-if="showModal"
      :video-id="videoModal"
      @close="closeModal"
    />

    <!-- Кнопка добавления видео -->
    <div @click="countVideo" class="callback-bt">
      <div class="text-call">
        <i class="fas fa-plus"></i>
        <span>додати 5<br />відео </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import store from '@/store'
import SideNav from './VideoComponents/SideNav.vue'
import VideoList from './VideoComponents/VideoList.vue'
import VideoModal from './VideoComponents/VideoModal.vue'

export default defineComponent({
  name: 'Video',
  components: {
    SideNav,
    VideoList,
    VideoModal
  },
  setup() {
    const idList = ref('UUSb71yKJmS0eHyhRRl00ioQ')
    const showModal = ref(false)
    const videoModal = ref('')
    const videoModalTitle = ref('')
    const textBible = ref({})
    const isSideNavOpen = ref(false)

    // Список видео из хранилища
    const ListVideoData = computed(() => {
      const data = store.state.ListVideoData
      return Array.isArray(data) ? data : [] // Убедитесь, что это массив
    })

    // Функция для фильтрации видео
    const isPrivateVideo = (item: any) => {
      return (
        item?.snippet?.title?.toLowerCase() === 'private video' ||
        item?.snippet?.description?.toLowerCase().includes('private')
      )
    }

    const filteredVideoList = computed(() => {
      return ListVideoData.value.filter((item) => !isPrivateVideo(item))
    })

    // Получение случайного текста из Библии при монтировании компонента
    onMounted(async () => {
      try {
        const response = await fetch('https://blv-vue3-tp.firebaseio.com/bible.json')
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`)
        }
        const data = await response.json()
        const arrayVerse = Object.keys(data).map((key) => ({
          ...data[key],
          id: key
        }))
        textBible.value = arrayVerse[Math.floor(Math.random() * arrayVerse.length)]
      } catch (error) {
        console.error('Ошибка при загрузке текста из Библии:', error)
      }

      // Вызов действия Vuex и обработка ошибок
      try {
        await store.dispatch('getListVideoData')
      } catch (error) {
        console.error('Ошибка при вызове getListVideoData:', error)
      }
    })

    // Функция для открытия бокового меню
    const openNav = () => {
      isSideNavOpen.value = true
    }

    // Функция для закрытия бокового меню
    const closeNav = () => {
      isSideNavOpen.value = false
    }

    // Функция для переключения бокового меню
    const toggleNav = () => {
      isSideNavOpen.value = !isSideNavOpen.value
    }

    // Функция для выбора списка видео
    const listVideo = (value: string) => {
      idList.value = value
      const payload = { value }
      store.dispatch('getListVideoData', payload).catch((error) => {
        console.error('Ошибка при вызове getListVideoData с параметром:', error)
      })
    }

    // Функция для выбора видео для отображения в модальном окне
    const selectVideo = (item: any) => {
      if (!item?.snippet?.resourceId?.videoId) {
        console.warn('Некорректное видео, пропущено:', item)
        return
      }
      videoModal.value = item.snippet.resourceId.videoId
      videoModalTitle.value = item.snippet.title || 'Video'
      showModal.value = true
      window.scrollTo({ top: 300, behavior: 'smooth' })
    }

    // Функция для закрытия модального окна
    const closeModal = () => {
      showModal.value = false
    }

    // Функция для добавления видео
    const countVideo = () => {
      store.commit('AddVideoOnPage', {
        count: 5
      })
      listVideo(idList.value)

      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        })
      }, 100)
    }

    return {
      textBible,
      ListVideoData,
      listVideo,
      showModal,
      videoModal,
      isSideNavOpen,
      filteredVideoList,
      selectVideo,
      closeModal,
      openNav,
      closeNav,
      toggleNav,
      countVideo
    }
  }
})
</script>

<style scoped lang="scss">
.jumbotron {
  background-image: url(../assets/img/jumbotron.jpg);
  background-size: cover;
  background-position: 0 0;
  padding: 80px 0;
  text-align: center;
}

.btn_mobile {
  text-align: center;
  padding-top: 20px;
  display: none;
  p {
    display: flex;
    justify-content: space-around;
    font-size: 24px;
    cursor: pointer;
    color: #847e7e;
  }
}

.callback-bt {
  background: #38a3fd;
  border: 2px solid #38a3fd;
  border-radius: 50%;
  box-shadow: 0 8px 10px rgba(56, 163, 253, 0.3);
  cursor: pointer;
  height: 68px;
  text-align: center;
  width: 68px;
  position: fixed;
  left: 5%;
  bottom: 5%;
  z-index: 999;
  transition: 0.5s;
  i {
    color: #fff;
    font-size: 34px;
    line-height: 66px;
    transition: 0.5s ease-in-out;
  }
  &:hover {
    background: #fff;
    color: transparent;
    i {
      color: #38a3fd;
      font-size: 40px;
    }
  }
}

@media (max-width: 670px) {
  .btn_mobile {
    display: block;
  }
  .jumbotron {
    font-size: 30px;
  }
}
</style>
