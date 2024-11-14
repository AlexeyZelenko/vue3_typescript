import { createStore } from 'vuex'
import Note from '@/models/NoteModel'
import Icon from '@/models/IconModel'

const REQUEST_LIMIT = 5 // Лимит запросов в минуту
let requestCount = 0 // Текущее количество запросов
let isRateLimited = false // Флаг ограничения

export default createStore({
  state: {
    icons: [
      {
        fontawesome: 'fab fa-facebook-f fa-2x',
        icon: 'mdi-facebook',
        name: 'facebook',
        src: 'https://www.facebook.com/Церковь-Благая-Весть-Черкассы-746415165547326/'
      },
      {
        fontawesome: 'fab fa-youtube fa-2x',
        icon: 'mdi-youtube-tv',
        name: 'youtube',
        src: 'https://www.youtube.com/channel/UCSb71yKJmS0eHyhRRl00ioQ'
      },
      {
        fontawesome: 'fa fa-envelope fa-2x',
        icon: 'mdi-email',
        name: 'email',
        src: 'mailto:info@bv.ck.ua'
      },
      {
        fontawesome: 'fab fa-instagram fa-2x',
        icon: 'mdi-instagram',
        name: 'instagram',
        src: 'https://www.instagram.com/bv.ck.ua/'
      }
    ] as Note[],
    icon: [] as Icon[],
    LastVideoData: null as any,
    ListVideoData: [] as any,
    LiveVideoData: null as any,
    videOnPage: 10,
    // eslint-disable-next-line @typescript-eslint/camelcase
    User_Entrance: false,
    userEntrance: false,
    adminEntrance: false,
    userId: null
  },
  mutations: {
    SET_USER_ENTRANCE(state, userEntrance) {
      state.userEntrance = userEntrance
    },
    SET_USER_ID(state, userID) {
      state.userId = userID
    },
    SET_VIDEO(state, LastVideoData) {
      state.LastVideoData = LastVideoData
    },
    SET_ONLINE_VIDEO(state, LiveVideoData) {
      state.LiveVideoData = LiveVideoData
    },
    SET_VIDEO_LIST(state, ListVideoData) {
      state.ListVideoData = ListVideoData
    },
    SET_ADMIN_ENTRANCE(state, adminEntrance) {
      state.adminEntrance = adminEntrance
    },
    ADD_VIDEO_ON_PAGE(state, count) {
      state.videOnPage += count
    },
    RESET_REQUEST_COUNT() {
      requestCount = 0
    }
  },
  actions: {
    async rateLimitCheck() {
      if (isRateLimited) {
        throw new Error('Превышен лимит запросов. Подождите минуту.')
      }

      requestCount++
      if (requestCount >= REQUEST_LIMIT) {
        isRateLimited = true
        setTimeout(() => {
          this.commit('RESET_REQUEST_COUNT')
          isRateLimited = false
        }, 60000) // Сброс счетчика запросов через минуту
      }
    },
    async fetchVideoData({ commit, dispatch }, { endpoint, mutation }) {
      try {
        await dispatch('rateLimitCheck') // Проверка ограничения запросов

        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`)
        }
        const data = await response.json()
        commit(mutation, data.items[0] || null)
      } catch (error) {
        console.error(`Ошибка при выполнении запроса ${endpoint}:`, error)
      }
    },
    async getLastVideoData({ dispatch }) {
      const endpoint =
        'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UCSb71yKJmS0eHyhRRl00ioQ&part=snippet&&maxResults=1'
      await dispatch('fetchVideoData', {
        endpoint,
        mutation: 'SET_VIDEO'
      })
    },
    async getLiveVideoData({ dispatch }) {
      const endpoint =
        'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCSb71yKJmS0eHyhRRl00ioQ&eventType=live&type=video'
      await dispatch('fetchVideoData', {
        endpoint,
        mutation: 'SET_ONLINE_VIDEO'
      })
    },
    async getListVideoData({ commit, getters, dispatch }, payload) {
      const value = payload ? payload.value : 'UUSb71yKJmS0eHyhRRl00ioQ'
      const endpoint = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${value}&part=snippet&maxResults=${getters.GET_VIDEO_ON_PAGE}`

      try {
        await dispatch('rateLimitCheck') // Проверка ограничения запросов

        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`)
        }
        const data = await response.json()
        commit('SET_VIDEO_LIST', data.items || [])
      } catch (error) {
        console.error('Ошибка при получении списка видео:', error)
      }
    },
    addVideosOnPage({ commit }, count) {
      commit('ADD_VIDEO_ON_PAGE', count)
    }
  },
  getters: {
    GET_VIDEO_ON_PAGE: (state) => state.videOnPage,
    USER_ID: (state) => state.userId,
    USER_ENTRANCE: (state) => state.userEntrance
  }
})
