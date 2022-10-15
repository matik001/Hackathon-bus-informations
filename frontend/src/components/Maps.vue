<script lang="ts">
import { ref, onMounted } from 'vue'
import { getBusesInfo, Position } from '../api/api';
interface Marker{
  position: Position;
}
export default {
  setup() {
    const myMapRef = ref<any>(null);
    let zoom = ref<number>(13);
    let center = ref<Position>({ lat: 34.04924594193164, lng: -118.24104309082031 });
    let markers = ref<Marker[]>([
        {
          position: {
            lat: 51.093048,
            lng: 6.84212,
          },
        },
        {
          position: {
            lat: 51.198429,
            lng: 6.69529,
          },
        },
        {
          position: {
            lat: 51.165218,
            lng: 7.067116,
          },
        },
        {
          position: {
            lat: 51.09256,
            lng: 6.84074,
          },
        },
      ]);
    onMounted(async () => {
      myMapRef.value.$mapPromise.then((mapObject: any) => {
        let trafficLayer = new google.maps.TrafficLayer;
        trafficLayer.setMap(mapObject);

        console.log('map is loaded now', mapObject);
      });
      // const busesInfo = await getBusesInfo();
      // // zoom = busesInfo.data.bus_stop.;
      // center.value = busesInfo.data.bus_stop.postition;
      // markers.value = busesInfo.data.buses.map(a=>({
      //   position: a.position
      // }))

    })
    return {
      myMapRef,
      zoom: zoom,
      center: center,
      markers: markers,
    };

  }
}

</script>
  
  
<template>
  <GMapMap :center="center" :zoom="12" map-type-id="terrain" style="width: 100vw; height: 900px" ref="myMapRef">
    <GMapCluster :zoomOnClick="true">
      <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true"
        @click="center = m.position" />
    </GMapCluster>
  </GMapMap>
</template>
  
<style>
body {
  margin: 0;
}
</style>
  