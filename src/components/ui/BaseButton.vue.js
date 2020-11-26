;
is = "as";
class {
}
"classStyles";
disabled = "disabled" >
    name;
"icon" /  >
    /slot>
    < /component>
    < /template>
    < script >
;
import { computed } from 'vue';
export default {
    name: 'BaseButton',
    props: {
        as: {
            type: String,
            default: 'button'
        },
        disabled: {
            type: Boolean
        }
    },
    setup() {
        const classStyles = computed(() => 'px-5 py-2 bg-blue-500 rounded-md border-b-4 border-blue-700 font-semibold');
        return {
            classStyles
        };
    }
}
    < /script>;
//# sourceMappingURL=BaseButton.vue.js.map