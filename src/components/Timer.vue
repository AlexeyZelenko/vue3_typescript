<template>
  <div class="displayTimer">
    <h1 class="Mobile_h1_Style">Онлайн служіння:</h1>
    <h1>Онлайн служіння:</h1>
    <div id="clockdiv">
      <div>
        <span class="days">{{ formatTime(days) }}</span>
        <div class="smalltext">Дні</div>
      </div>
      <div>
        <span class="hours">{{ formatTime(hours) }}</span>
        <div class="smalltext">Години</div>
      </div>
      <div>
        <span class="minutes">{{ formatTime(minutes) }}</span>
        <div class="smalltext">Хвилини</div>
      </div>
      <div>
        <span class="seconds">{{ formatTime(seconds) }}</span>
        <div class="smalltext">Секунди</div>
      </div>
    </div>
    <div v-if="currentTime <= 0" class="text-center" style="color: #fff">
      Час вийшло!
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, onMounted } from 'vue'

export default {
  name: 'Timer',
  setup() {
    const currentTime = ref<number>(0)
    const targetTime = ref<Date>(new Date())

    const calculateNextSunday = (): Date => {
      const now = new Date()
      const dayOfWeek = now.getDay()
      const daysUntilSunday = (7 - dayOfWeek) % 7

      // Создаем дату следующего воскресенья в 10:00 утра
      const nextSunday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + daysUntilSunday,
        10,
        0,
        0
      )

      return nextSunday
    }

    const updateTime = () => {
      targetTime.value = calculateNextSunday()
      currentTime.value = targetTime.value.getTime() - new Date().getTime()
    }

    onMounted(() => {
      targetTime.value = calculateNextSunday()
      updateTime()
      setInterval(updateTime, 1000)
    })

    const days = computed(() =>
      Math.max(Math.floor(currentTime.value / (1000 * 60 * 60 * 24)), 0)
    )
    const hours = computed(() =>
      Math.max(Math.floor((currentTime.value / (1000 * 60 * 60)) % 24), 0)
    )
    const minutes = computed(() =>
      Math.max(Math.floor((currentTime.value / (1000 * 60)) % 60), 0)
    )
    const seconds = computed(() =>
      Math.max(Math.floor((currentTime.value / 1000) % 60), 0)
    )

    const formatTime = (value: number) =>
      value < 10 ? '0' + value : value.toString()

    return {
      currentTime,
      days,
      hours,
      minutes,
      seconds,
      formatTime
    }
  }
}
</script>

<style scoped>
.Mobile_h1_Style {
  display: none;
}
@media (max-width: 767px) {
  .displayTimer {
    margin-top: 5px;
  }
  h1 {
    display: none;
  }
  .Mobile_h1_Style {
    display: block;
    font-size: 14px;
    color: #396;
  }
}
.displayTimer {
  text-align: center;
  font-family: sans-serif;
  font-weight: 100;
}
h1 {
  font-weight: 100;
  font-size: 40px;
  margin: 40px 0 20px;
}
#clockdiv {
  font-family: sans-serif;
  color: #fff;
  display: inline-block;
  font-weight: 100;
  text-align: center;
  font-size: 30px;
}
#clockdiv > div {
  padding: 10px;
  border-radius: 3px;
  background: #26170b;
  display: inline-block;
  margin: 1px;
}
#clockdiv div > span {
  padding: 15px;
  border-radius: 3px;
  background: #452612;
  display: inline-block;
}
.smalltext {
  padding-top: 5px;
  font-size: 16px;
}
</style>
