<script lang="ts">
import { ref, onMounted } from 'vue'
import { getBusesInfo, Position } from '../api/api';
interface Marker{
  position: Position;
  type: String;
  label: String;
}
export default {
  setup() {
    const myMapRef = ref<any>(null);
    let zoom = ref<number>(15);
    let stop_name = ref<String>("krzyki");
    // let center = ref<Position>({ lat: 34.04924594193164, lng: -118.24104309082031 });
    let center = ref<Position>({ lat: 51.116359, lng: 17.025282 });
    const options = ref({
      disableDefaultUI: true,
      styles: [
          // {
          //   featureType: 'poi',
          //   stylers: [{ visibility: 'off' }],
          // },

          {
            featureType: 'poi.attraction',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'poi.business',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'poi.government',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'poi.medical',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'poi.park',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'poi.place_of_worship',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'poi.school',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'poi.sports_complex',
            stylers: [{visibility: 'off'}]
          },

          // {
          //   featureType: 'transit',
          //   elementType: 'labels.icon',
          //   stylers: [{ visibility: 'off' }],
          // }
        ],
    });

    let markers = ref<Marker[]>([
        // {
        //   position: {
        //     lat: 51.116359, 
        //     lng: 17.025282,
        //   },
        // },
        // {
        //   position: {
        //     lat: 51.116359, 
        //     lng: 17.025282,
        //   },
        // },
        // {
        //   position: {
        //     lat: 51.116359, 
        //     lng: 17.025282,
        //   },
        // },
    ]);

    async function fetchData() {
      const api_url = "http://127.0.0.1:3000";

      const res = await fetch(`${api_url}/mpk/location/${stop_name.value}`);

      const json = await res.json();
      
      
      markers.value = [];
      for(const vehicle of json.vehiclePositions) {
        const new_marker: Marker = {
          position: {
            lat: vehicle.x,
            lng: vehicle.y,
          },
          type: vehicle.type,
          label: vehicle.name,
        }
        markers.value.push(new_marker);
      }

      center.value = {
        lng: json.stop.x,
        lat: json.stop.y,
      }
    }

    onMounted(async () => {
      myMapRef.value.$mapPromise.then((mapObject: any) => {
        let trafficLayer = new google.maps.TrafficLayer;
        trafficLayer.setMap(mapObject);

        console.log('map is loaded now', mapObject);

      });
      
      await fetchData();
      setInterval(fetchData, 5000);
    })
    return {
      myMapRef,
      zoom: zoom,
      center: center,
      markers: markers,
      options: options,
    };

  }
}

</script>
  
  
<template>
  <GMapMap :center="center" :zoom="zoom" map-type-id="terrain" style="width: 100vw; height: 900px" ref="myMapRef" :options="options">
    <GMapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :icon="{
        url: '/public/images/' + m.type + '.png',
        scaledSize: {width: 50, height: 50},
        labelOrigin: {x: 25, y: 60}
      }"
      :label="{
        text: m.label,
      }"
      title="twój tata"
    />
  </GMapMap>
</template>
  
<style>
body {
  margin: 0;
}

bus-marker-label {
  color: red;
  font-size: 30px;
  font-weight: bold;
  outline: 2px solid black;
}
</style>
