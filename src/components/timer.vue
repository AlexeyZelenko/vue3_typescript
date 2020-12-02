<template>
  <div id="timer">
    <h1>Онлайн служіння почнеться через:</h1>
    <div id="clockdiv">
      <div>
      <span
        v-if="days"
        class="days"
      >
        {{ formatTime(days) }}
      </span>
        <div class="smalltext">Днів</div>
      </div>
      <div>
      <span
        v-if="hours"
        class="hours"
      >
        {{ formatTime(hours) }}
      </span>
        <div class="smalltext">Годин</div>
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
<!--    <div>-->
<!--      <div-->
<!--        class="text-center"-->
<!--        v-if="currentTime"-->
<!--      >-->
<!--      <span v-if="days">-->
<!--        Days: {{ formatTime(days) }}<br/>-->
<!--      </span>-->
<!--        <span v-if="hours">-->
<!--        Hours: {{ formatTime(hours) }} <br/>-->
<!--      </span>-->
<!--        Minutes: {{ formatTime(minutes) }} <br/>-->
<!--        Seconds: {{ formatTime(seconds) }} <br/>-->

<!--        <br/>-->
<!--        <span v-if="days">{{ days }}</span>:-->
<!--        <span v-if="hours">{{ hours  }}:</span>-->
<!--        <span>{{ formatTime(minutes) }}:{{ formatTime(seconds) }}</span>-->
<!--        <br />-->
<!--      </div>-->
      <div class="text-center" v-if="!currentTime">
        Час вийшло!
      </div>
<!--    </div>-->
  </div>
</template>

<script>
export default {
  props: {
    deadline: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      default: 1000
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
  #timer{
    text-align: center;
    font-family: sans-serif;
    font-weight: 100;
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
    margin: 1px;
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
