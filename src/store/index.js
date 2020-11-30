import { createStore } from 'vuex';
export default createStore({
    state: {
        icons: [
            {
                fontawesome: 'fa fa-facebook-official fa-2x',
                icon: 'mdi-facebook',
                name: 'facebook',
                src: 'https://www.facebook.com/%D0%A6%D0%B5%D1%80%D0%BA%D0%BE%D0%B2%D1%8C-%D0%91%D0%BB%D0%B0%D0%B3%D0%B0%D1%8F-%D0%92%D0%B5%D1%81%D1%82%D1%8C-%D0%A7%D0%B5%D1%80%D0%BA%D0%B0%D1%81%D1%81%D1%8B-746415165547326/'
            },
            {
                fontawesome: 'fa fa-youtube fa-2x',
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
                fontawesome: 'fa fa-instagram fa-2x',
                icon: 'mdi-instagram',
                name: 'instagram',
                src: 'https://www.instagram.com/bv.ck.ua/'
            }
        ],
        icon: [],
        LastVideoData: [],
        ListVideoData: [],
        LiveVideoData: false,
        videOnPage: 10
    },
    mutations: {
        SET_VIDEO(state, LastVideoData) {
            state.LastVideoData = LastVideoData;
        },
        SET_ONLINE_VIDEO(state, LiveVideoData) {
            state.LiveVideoData = LiveVideoData;
        },
        SET_VIDEO_LIST(state, ListVideoData) {
            state.ListVideoData = ListVideoData;
        },
        SET_VIDEO_ON_PAGE(state) {
            state.videOnPage = state.videOnPage + 5;
        }
    },
    actions: {
        async getLastVideoData({ commit }) {
            const response = await fetch('https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUSb71yKJmS0eHyhRRl00ioQ&key=AIzaSyAzu641YEewkYY6zzS8nAzTxY6XDLxCCkY&part=snippet&&maxResults=1');
            const data = await response.json();
            const LastVideoData = data.items[0].snippet || '';
            commit('SET_VIDEO', LastVideoData);
        },
        async getLiveVideoData({ commit }) {
            const response = await fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCSb71yKJmS0eHyhRRl00ioQ&eventType=live&type=video&key=AIzaSyAzu641YEewkYY6zzS8nAzTxY6XDLxCCkY');
            const data = await response.json();
            const LiveVideoData = data.items[0] || '';
            console.log(LiveVideoData);
            commit('SET_ONLINE_VIDEO', LiveVideoData);
        },
        async getListVideoData({ commit }, payload) {
            const value = payload ? payload.value : 'UUSb71yKJmS0eHyhRRl00ioQ';
            const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${value}&key=AIzaSyAzu641YEewkYY6zzS8nAzTxY6XDLxCCkY&part=snippet&maxResults=15`);
            const data = await response.json();
            const ListVideoData = data.items;
            commit('SET_VIDEO_LIST', ListVideoData);
        },
        setVideoOnPage({ commit }) {
            commit('SET_VIDEO_ON_PAGE');
        }
    },
    getters: {
        GET_VIDEO_ON_PAGE: s => s.videOnPage
    },
    modules: {}
});
//# sourceMappingURL=index.js.map