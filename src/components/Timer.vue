<template>
  <div
    class="displayTimer"
  >
    <h1 class="Mobile_h1_Style">Онлайн служіння:</h1>
    <h1>Онлайн служіння:</h1>
    <div id="clockdiv">
      <div>
      <span class="days">
        {{ formatTime(days) }}
      </span>
        <div class="smalltext">Дні</div>
      </div>
      <div>
       <span class="hours">
        {{ formatTime(hours) }}
      </span>
        <div class="smalltext">Години</div>
      </div>
      <div>
      <span
        class="minutes"
      >
        {{ formatTime(minutes) }}
      </span>
        <div class="smalltext">Хвилини</div>
      </div>
      <div>
      <span
        class="seconds"
      >
        {{ formatTime(seconds)  }}
      </span>
        <div class="smalltext">Секунди</div>
      </div>
    </div>
      <div
        class="text-center"
        v-if="!currentTime"
        style="color: #fff"
      >
        Час вийшло!
      </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'

export default {
  props: {
    speed: {
      type: Number,
      default: 1000
    }
  },
  setup () {
    const schedule = reactive([
      ['2021/02/14 12:00:00 GMT+0200', '2021/02/21 10:00:00 GMT+0200'],
      ['2021/02/21 12:00:00 GMT+0200', '2021/02/28 10:00:00 GMT+0200'],
      ['2021/02/28 12:00:00 GMT+0200', '2021/03/07 10:00:00 GMT+0200'],
      ['2021/03/07 12:00:00 GMT+0200', '2021/03/14 10:00:00 GMT+0200'],
      ['2021/03/14 12:00:00 GMT+0200', '2021/03/21 10:00:00 GMT+0200'],
      ['2021/03/21 12:00:00 GMT+0200', '2021/03/28 10:00:00 GMT+0200'],
      ['2021/03/28 12:00:00 GMT+0200', '2021/04/04 10:00:00 GMT+0200'],
      ['2021/03/28 12:00:00 GMT+0200', '2021/04/04 10:00:00 GMT+0200'],
      ['2021/04/04 12:00:00 GMT+0200', '2021/04/11 10:00:00 GMT+0200'],
      ['2021/04/11 12:00:00 GMT+0200', '2021/04/18 10:00:00 GMT+0200'],
      ['2021/04/18 12:00:00 GMT+0200', '2021/04/25 10:00:00 GMT+0200'],
      ['2021/04/25 12:00:00 GMT+0200', '2021/05/02 10:00:00 GMT+0200'],
      ['2021/05/02 12:00:00 GMT+0200', '2021/05/09 10:00:00 GMT+0200'],
      ['2021/05/09 12:00:00 GMT+0200', '2021/05/16 10:00:00 GMT+0200'],
      ['2021/05/16 12:00:00 GMT+0200', '2021/05/23 10:00:00 GMT+0200'],
      ['2021/05/23 12:00:00 GMT+0200', '2021/05/30 10:00:00 GMT+0200'],
      ['2021/05/30 12:00:00 GMT+0200', '2021/06/06 10:00:00 GMT+0200'],
      ['2021/05/06 12:00:00 GMT+0200', '2021/06/13 10:00:00 GMT+0200'],
      ['2021/05/13 12:00:00 GMT+0200', '2021/06/20 10:00:00 GMT+0200'],
      ['2021/05/20 12:00:00 GMT+0200', '2021/06/27 10:00:00 GMT+0200']
    ])
    const deadline = computed(() => {
      // iterate over each element in the schedule
      for (var i = 0; i < schedule.length; i++) {
        var startDate = schedule[i][0]
        var endDate = schedule[i][1]

        // put dates in milliseconds for easy comparisons
        var startMs = Date.parse(startDate)
        var endMs = Date.parse(endDate)
        var currentMs = Date.parse(new Date())

        // if current date is between start and end dates, display clock
        if (endMs > currentMs && currentMs >= startMs) {
          // initializeClock('clockdiv', endDate)
          return endDate
        }
      }

      schedule.forEach(([startDate, endDate]) => {
        // put dates in milliseconds for easy comparisons
        const startMs = Date.parse(startDate)
        const endMs = Date.parse(endDate)
        const currentMs = Date.parse(new Date())

        // if current date is between start and end dates, display clock
        if (endMs > currentMs && currentMs >= startMs) {
          return endDate
          // initializeClock('clockdiv', endDate)
        }
      })
    })

    return {
      deadline
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
      color: #396,
    }
  }
  .displayTimer{
    text-align: center;
    font-family: sans-serif;
    font-weight: 100
  }

  h1{
    color: #396;
    font-weight: 100;
    font-size: 40px;
    margin: 40px 0px 20px;
  }

  #clockdiv{
    font-family: sans-serif;
    color: #fff;
    display: inline-block;
    font-weight: 100;
    text-align: center;
    font-size: 30px;
  }

  #clockdiv > div{
    padding: 10px;
    border-radius: 3px;
    background: #00BF96;
    display: inline-block;
    margin: '1px'
  }

  #clockdiv div > span{
    padding: 15px;
    border-radius: 3px;
    background: #00816A;
    display: inline-block;
  }

  .smalltext{
    padding-top: 5px;
    font-size: 16px;
  }
</style>
