<template>
<!--  <iframe-->
<!--    src="https://drive.google.com/embeddedfolderview?id=1dXeaG6BokMx5bvSAB5xp-xQsnfj554-D#list"-->
<!--    width="700"-->
<!--    height="500"-->
<!--    frameborder="0"-->
<!--  ></iframe>-->
  <iframe
    src="https://drive.google.com/embeddedfolderview?id=1dXeaG6BokMx5bvSAB5xp-xQsnfj554-D#grid"
    width="700"
    height="500"
    frameborder="0"
  ></iframe>
  <p>{{folders}}</p>
<!--  <img src='https://drive.google.com/uc?export=view&amp;id=1RrVOTTiptYIWuDqX4FpSkkhoM2i17PBQ'/>-->
</template>

<script>
import useSWRFetch from '@/composables/useSWRFetch'
import { defineComponent } from 'vue'

export default defineComponent({
  name: '2013',
  setup () {
    const { data: folders, error } = useSWRFetch(
      'https://drive.google.com/embeddedfolderview?id=1dXeaG6BokMx5bvSAB5xp-xQsnfj554-D#grid'
    )
    console.log(folders.value)
    return {
      error,
      folders
    }
  }
})
</script>
