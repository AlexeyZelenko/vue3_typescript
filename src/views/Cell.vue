<template>
  <div>
    <!--  Карта -->
<!--    <button @click="title = 'Changed Popup Title'">Change Title</button>-->
    <div id="map" />
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { onMounted, createApp, defineComponent, ref, nextTick } from 'vue'
import MyPopup from '@/components/MyPopup.vue'

export default defineComponent({
  name: 'Cell',
  setup () {
    const title = ref('Unchanged Popup Title')
    onMounted(() => {
      mapboxgl.accessToken = 'pk.eyJ1Ijoib2xla3NpaXplbGVua28iLCJhIjoiY2tsY2V2ZGs4MWYzYTJubGIydmllN3VlbiJ9._KclbdScDG_aRllQhtw5kA'
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/oleksiizelenko/ckldg6ksa4s3417rz4kydgo4m'
      })
      map.on('load', () => {
        // Здесь мы хотим загрузить слой
        map.addSource('usa', {
          type: 'geojson',
          data:
            'https://raw.githubusercontent.com/johan/world.geo.json/master/countries/USA.geo.json'
        })
        map.addLayer({
          id: 'usa-fill',
          type: 'fill',
          source: 'usa',
          paint: {
            'fill-color': 'red'
          }
        })
        // Здесь мы хотим настроить раскрывающийся список
        map.on('click', 'usa-fill', function (e) {
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<div id="popup-content"></div>')
            .addTo(map)
          const MyNewPopup = defineComponent({
            extends: MyPopup,
            setup () {
              return { title }
            }
          })
          nextTick(() => {
            createApp(MyNewPopup).mount('#popup-content')
          })
        })
      })
    })

    return {
      title
    }
  }
})
</script>

<style scoped>
#map {
  height: 100vh;
}
</style>
