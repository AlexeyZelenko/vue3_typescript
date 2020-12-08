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
    userId: null,
    textBibleArray: [
      {
        title: 'Хто вірує в Нього, не буде засуджений; хто ж не вірує, – той вже засуджений, що не повірив в Ім\'я Однородженого Сина Божого.',
        verse: 'Івана 3 : 18'
      },
      {
        title: 'Істино, істино глаголю тобі: Коли хто не народить ся звиш, не може видїти царства Божого.',
        verse: 'Івана 3 : 3'
      },
      {
        title: 'Бо як тіло без духа ме́ртве, так і віра без діл – мертва!',
        verse: 'Якова 2 : 26'
      },
      {
        title: 'Так бо Бог полюбив світ, що дав Сина Свого Одноро́дженого, щоб кожен, хто вірує в Нього, не згинув, але мав життя вічне.',
        verse: 'Івана 3 : 16'
      },
      {
        title: 'Хто вірує в Сина, той має вічне життя; а хто в Сина не вірує, той життя не побачить – а гнів Божий на нім перебуває',
        verse: 'Івана 3 : 36'
      },
      {
        title: '"Коли Я говорив вам про земне, та не вірите ви, то як же повірите ви, коли Я говоритиму вам про небесне?"',
        verse: 'Івана 3 : 12'
      },
      {
        title: 'Тож підкоріться Богові та спротивляйтесь дияволові, – то й утече він від вас',
        verse: 'Якова 4 : 7-8'
      },
      {
        title: 'Отож, хто знає, як чинити добро, та не чинить, – той має гріх!',
        verse: 'Якова 4 : 17'
      },
      {
        title: 'А якщо кому з вас не стачає мудрости, нехай просить від Бога, що всім дає просто, та не докоряє, – і бу́де вона йому да́на.',
        verse: 'Якова 1 : 5'
      },
      {
        title: 'Коли ж хто гада́є, що він побожний, і свого язика не вгамо́вує, та своє серце обманює, – марна́ побожність того́!',
        verse: 'Якова 1 : 26'
      },
      {
        title: 'Чи хочеш ти знати, о марна́ люди́но, що віра без діл – ме́ртва?',
        verse: 'Якова 2 : 20'
      },
      {
        title: 'Бо як тіло без духа ме́ртве, так і віра без діл – мертва!',
        verse: 'Якова 2 : 26'
      },
      {
        title: 'Хто мудрий і розумний між вами, нехай він покаже діла́ свої в ла́гідній мудрості добрим поводженням!',
        verse: 'Якова 3 : 13'
      },
      {
        title: 'Отож, хто знає, як чинити добро, та не чинить, – той має гріх!',
        verse: 'Якова 4 : 17'
      },
      {
        title: 'Слово Господнє повік пробуває“! А це те Слово, яке звіщене вам у Єва́нгелії.',
        verse: '1 Петра 1 : 25'
      },
      {
        title: 'Але ви – ви́браний рід, свяще́нство царське́, наро́д святий, люд власности Божої, щоб звіщали чесно́ти Того, Хто покликав вас із те́мряви до дивного світла Свого́',
        verse: '1 Петра 2 : 9'
      }
    ]
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
    }
  },
  actions: {
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
        if (['J4IfR9V40cdfNDKumeiyqvzhyzK2']
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
        const adminEntrance = await ['J4IfR9V40cdfNDKumeiyqvzhyzK2'].includes(USER_ID)
        commit('ADMIN_ENTRANCE', adminEntrance)
      }
      commit('USER_ENTRANCE', userEntrance)
    },
    async login ({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async getLastVideoData ({ commit }) {
      const response = await fetch('https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUSb71yKJmS0eHyhRRl00ioQ&key=AIzaSyAzu641YEewkYY6zzS8nAzTxY6XDLxCCkY&part=snippet&&maxResults=1')
      const data = await response.json()
      const LastVideoData = data.items[0].snippet
      commit('SET_VIDEO', LastVideoData)
    },
    async getLiveVideoData ({ commit }) {
      const response = await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCSb71yKJmS0eHyhRRl00ioQ&eventType=live&type=video&key=AIzaSyAzu641YEewkYY6zzS8nAzTxY6XDLxCCkY')
      const data = await response.json()
      const LiveVideoData = data.items[0]
      commit('SET_ONLINE_VIDEO', LiveVideoData)
    },
    async getListVideoData ({ commit }, payload) {
      const value = payload ? payload.value : 'UUSb71yKJmS0eHyhRRl00ioQ'
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${value}&key=AIzaSyAzu641YEewkYY6zzS8nAzTxY6XDLxCCkY&part=snippet&maxResults=15`)
      const data = await response.json()
      const ListVideoData = data.items || ''
      commit('SET_VIDEO_LIST', ListVideoData)
    },
    setVideoOnPage ({ commit }) {
      commit('SET_VIDEO_ON_PAGE')
    }
  },
  getters: {
    GET_textBible: s => (s.textBibleArray[Math.floor(Math.random() * s.textBibleArray.length)]),
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
