<template>
  <div :style="{ width: isOpen ? '250px' : '0' }" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" @click="$emit('close')">×</a>
    <a @click="$emit('selectList', 'UUSb71yKJmS0eHyhRRl00ioQ')" class="nav-link">ВСІ</a>
    <a @click="$emit('selectList', 'PLlURDWJlf7fQA1Pp2nyFBy9PTqJTpB5XL')" class="nav-link">ПІСНІ</a>
    <a @click="$emit('selectList', 'PLlURDWJlf7fS8-Z9hz4ShqtXdjg2tIGil')" class="nav-link">ПРОПОВІДІ</a>
    <a @click="$emit('selectList', 'PLlURDWJlf7fTuF3VfkKrsesTtfQtuNwo9')" class="nav-link">ЖИТТЯ</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SideNav',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  }
})
</script>

<style scoped>
.sidenav {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.5s;
  background-color: #111;
  padding-top: 60px;
}

.closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
  color: #fff;
}
</style>
