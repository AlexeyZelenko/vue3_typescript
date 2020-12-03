<template>
  <div
    :style='[timerStyle]'
  >
    <h1 :style="[h1Style]">{{title}}</h1>
    <div :style="[clockdiv]">
      <div :style="clockdivDiv">
      <span
        :style="clockdivDivSpan"
      >
        {{ formatTime(days) }}
      </span>
        <div :style="smalltext">{{titleDays}}</div>
      </div>
      <div :style="clockdivDiv">
      <span
        :style="clockdivDivSpan"
      >
        {{ formatTime(hours) }}
      </span>
        <div :style="smalltext">{{titleHours}}</div>
      </div>
      <div :style="clockdivDiv">
      <span
        :style="clockdivDivSpan"
      >
        {{ formatTime(minutes) }}
      </span>
        <div :style="smalltext">{{titleMinutes}}</div>
      </div>
      <div :style="clockdivDiv">
      <span
        :style="clockdivDivSpan"
      >
        {{ formatTime(seconds)  }}
      </span>
        <div :style="smalltext">{{titleSeconds}}</div>
      </div>
    </div>
      <div
        class="text-center"
        v-if="!currentTime"
        :style="styleEndTime"
      >
        {{titleEndTime}}
      </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  props: {
    speed: {
      type: Number,
      default: 1000
    }
  },
  setup () {
    const title = inject('title')
    const deadline = inject('deadline')
    const h1Style = inject('h1Style')
    const timerStyle = inject('timerStyle')
    const clockdiv = inject('clockdiv')
    const clockdivDiv = inject('clockdivDiv')
    const clockdivDivSpan = inject('clockdivDivSpan')
    const smalltext = inject('smalltext')
    const titleDays = inject('titleDays')
    const titleHours = inject('titleHours')
    const titleMinutes = inject('titleMinutes')
    const titleSeconds = inject('titleSeconds')
    const titleEndTime = inject('titleEndTime')
    const styleEndTime = inject('styleEndTime')

    return {
      deadline,
      title,
      timerStyle,
      h1Style,
      clockdiv,
      clockdivDiv,
      clockdivDivSpan,
      smalltext,
      titleDays,
      titleMinutes,
      titleHours,
      titleSeconds,
      titleEndTime,
      styleEndTime
    }
  },
  data () {
    return {
      currentTime: Date.parse(this.deadline) - Date.parse(new Date())
    }
  },
  mounted () {
    setTimeout(this.countdown, 1000)
  },
  computed: {
    seconds () {
      return Math.floor((this.currentTime / 1000) % 60)
    },
    minutes () {
      return Math.floor((this.currentTime / 1000 / 60) % 60)
    },
    hours () {
      return Math.floor((this.currentTime / (1000 * 60 * 60)) % 24)
    },
    days () {
      return Math.floor(this.currentTime / (1000 * 60 * 60 * 24))
    }
  },
  methods: {
    formatTime (value) {
      if (value < 10) {
        return '0' + value
      }
      return value
    },
    countdown () {
      this.currentTime = Date.parse(this.deadline) - Date.parse(new Date())
      if (this.currentTime > 0) {
        setTimeout(this.countdown, this.speed)
      } else {
        this.currentTime = null
      }
    }
  }
}
</script>
