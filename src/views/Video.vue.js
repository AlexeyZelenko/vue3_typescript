import { defineComponent, computed, ref, onMounted, defineAsyncComponent } from 'vue';
import store from '@/store';
const ModalVideo = defineAsyncComponent(() => import('@/components/ModalVideo.vue'));
export default defineComponent({
    name: 'Video',
    components: {
        ModalVideo
    },
    setup() {
        const showModal = ref(false);
        const videoModal = ref('');
        const videoModalTitle = ref('');
        const ListVideoData = computed(() => store.state.ListVideoData);
        const openModal = (item) => {
            showModal.value = true;
            videoModal.value = item.snippet.resourceId.videoId;
            videoModalTitle.value = item.snippet.title;
        };
        const listVideo = (value) => {
            const payload = { value };
            store.dispatch('getListVideoData', payload);
        };
        const startListVideo = () => {
            store.dispatch('getListVideoData');
        };
        onMounted(startListVideo);
        // const cats = ref([])
        // const fetchCats = async () => {
        //   cats.value = await fetch(
        //     'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUSb71yKJmS0eHyhRRl00ioQ&key=AIzaSyAzu641YEewkYY6zzS8nAzTxY6XDLxCCkY&part=snippet&maxResults=10'
        //   ).then((response) => response.json())
        //   console.log(cats.value)
        // }
        // onMounted(fetchCats)
        return {
            ListVideoData,
            listVideo,
            showModal,
            videoModalTitle,
            openModal,
            videoModal
            // cats
        };
    }
});
//# sourceMappingURL=Video.vue.js.map