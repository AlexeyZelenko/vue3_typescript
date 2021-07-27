import { createStore } from 'vuex'
import Note from '@/models/NoteModel'
import Icon from '@/models/IconModel'
import Video from '@/models/Video'
import { db } from '@/main.ts'
import firebase from 'firebase/app'

export default createStore({
  state: {
    icons: [
      {
        fontawesome: 'fab fa-facebook-f fa-2x',
        icon: 'mdi-facebook',
        name: 'facebook',
        src: 'https://www.facebook.com/%D0%A6%D0%B5%D1%80%D0%BA%D0%BE%D0%B2%D1%8C-%D0%91%D0%BB%D0%B0%D0%B3%D0%B0%D1%8F-%D0%92%D0%B5%D1%81%D1%82%D1%8C-%D0%A7%D0%B5%D1%80%D0%BA%D0%B0%D1%81%D1%81%D1%8B-746415165547326/'
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
    LastVideoData: [] as any,
    ListVideoData: [] as any,
    LiveVideoData: false as any,
    videOnPage: 10,
    User_Entrance: false,
    userEntrance: false,
    adminEntrance: false,
    userId: null
  },
  mutations: {
    USER_ENTRANCE: (state, userEntrance) => {
      state.userEntrance = userEntrance
    },
    USER_ID_ENTRANCE: (state, userID) => {
      state.userId = userID
    },
    SET_VIDEO (state, LastVideoData) {
      state.LastVideoData = LastVideoData
    },
    SET_ONLINE_VIDEO (state, LiveVideoData) {
      state.LiveVideoData = LiveVideoData
    },
    SET_VIDEO_LIST (state, ListVideoData) {
      state.ListVideoData = ListVideoData
    },
    ADMIN_ENTRANCE: (state, adminEntrance) => {
      state.adminEntrance = adminEntrance
    },
    AddVideoOnPage: (state, payload) => {
      state.videOnPage = payload.count + state.videOnPage
    }
  },
  actions: {
    async createFolderGoogleDisc ({ commit }, payload) {
      const newFolder = payload
      await db.collection('archive')
        .add({
          name: newFolder.name,
          year: newFolder.year,
          link: newFolder.link
        })
      try {
        console.log('Категорію успішно створенно!!!')
      } catch (error) {
        console.log(error)
      }
    },
    async createTextBible ({ commit }, payload) {
      const newText = payload
      const response = await fetch('https://blv-vue3-tp.firebaseio.com/bible.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newText)
      })
      const data = await response.json()
    },
    async createTextPoetry ({ commit }, payload) {
      const newText = payload
      const response = await fetch('https://blv-vue3-tp.firebaseio.com/poetry.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newText)
      })
      const data = await response.json()
    },
    async createNewBook ({ commit }, payload) {
      const newText = payload
      const response = await fetch('https://blv-vue3-tp.firebaseio.com/books.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newText)
      })
      const data = await response.json()
    },
    async createNewBusiness ({ commit }, payload) {
      const newText = payload
      const response = await fetch('https://blv-vue3-tp.firebaseio.com/business.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newText)
      })
      const data = await response.json()
    },
    async logout ({ commit }) {
      await firebase.auth().signOut()
        .then(() => {
          const adminEntrance = !!firebase.auth().currentUser
          commit('ADMIN_ENTRANCE', adminEntrance)
        })
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async signInWithGoogle ({ commit, dispatch }) {
      const uid = await dispatch('getUid')
      try {
        const provider = new firebase.auth.GoogleAuthProvider()
        await firebase.auth().signInWithPopup(provider)
        const uid = await dispatch('getUid')

        // Проверка администратора
        if (['J4IfR9V40cdfNDKumeiyqvzhyzK2', '8KRYS9dR8seAKFjykBx4HP15nPq2']
          .some(elem => elem === uid)) {
          console.log('Администратор вошел!')
          // router.push('/admin')
        } else {
          alert('Тільки адміністратори сайту можуть увійти!!!')
          console.log('Пользователь вошел!')
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }

      const userEntrance = !!firebase.auth().currentUser
      const USER_ID = await dispatch('getUid')
      if (userEntrance) {
        const adminEntrance = await ['J4IfR9V40cdfNDKumeiyqvzhyzK2', '8KRYS9dR8seAKFjykBx4HP15nPq2'].includes(USER_ID)
        commit('ADMIN_ENTRANCE', adminEntrance)
      }
      commit('USER_ENTRANCE', userEntrance)
    },
    async getLastVideoData ({ commit }) {
      const response = await fetch('https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UCSb71yKJmS0eHyhRRl00ioQ=AIzaSyAHq7nCX7e6FxeXJ6JWD_iqWMb7_sHCdoU&part=snippet&&maxResults=1')
      const data = await response.json()
      const LastVideoData = data.items[0].snippet
      commit('SET_VIDEO', LastVideoData)
    },
    async getLiveVideoData ({ commit }) {
      const response = await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCSb71yKJmS0eHyhRRl00ioQ&eventType=live&type=video&key=AIzaSyAHq7nCX7e6FxeXJ6JWD_iqWMb7_sHCdoU')
      const data = await response.json()
      const LiveVideoData = data.items[0]
      commit('SET_ONLINE_VIDEO', LiveVideoData)
    },
    async getListVideoData ({ commit, getters }, payload) {
      const value = payload ? payload.value : 'UUSb71yKJmS0eHyhRRl00ioQ'
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${value}&key=AIzaSyAHq7nCX7e6FxeXJ6JWD_iqWMb7_sHCdoU&part=snippet&maxResults=${getters.GET_VIDEO_ON_PAGE}`)
      const data = await response.json()
      const ListVideoData = data.items || ''
      commit('SET_VIDEO_LIST', ListVideoData)
    },
    setVideoOnPage ({ commit }) {
      commit('SET_VIDEO_ON_PAGE')
    }
  },
  getters: {
    // GET_textBible: s => (s.textBibleArray[Math.floor(Math.random() * s.textBibleArray.length)]),
    GET_VIDEO_ON_PAGE: s => s.videOnPage,
    USER_ID (state) {
      return state.userId
    },
    User_Entrance (state) {
      return state.userEntrance
    }
  },
  modules: {
  }
})
