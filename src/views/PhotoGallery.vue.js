import { defineComponent, ref } from 'vue';
import useSWRFetch from '@/composables/useSWRFetch';
import GameList from '@/components/game/GameList.vue';
import GameListSkeleton from '@/components/game/GameListSkeleton.vue';
export default defineComponent({
    name: 'Home',
    components: {
        GameList,
        GameListSkeleton
    },
    setup() {
        const searchInput = ref('');
        const { data, error, mutate, isValidating } = useSWRFetch('https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added', {
            revalidateOnFocus: false
        });
        function fetchGame() {
            mutate(async () => {
                const response = await fetch(`https://api.rawg.io/api/games?search=${searchInput.value}`);
                const results = await response.json();
                return results;
            });
        }
        return {
            searchInput,
            games: data,
            error,
            fetchGame,
            isValidating
        };
    }
});
//# sourceMappingURL=PhotoGallery.vue.js.map