import { ref, provide } from 'vue'

const deadLine = ref('2020/12/06 10:00:00 GMT-0200')
provide('deadline', deadLine)
const Title = ref('Онлайн служіння почнеться через:')
provide('title', Title)

export const deadline = () => provide(
  deadLine
)

