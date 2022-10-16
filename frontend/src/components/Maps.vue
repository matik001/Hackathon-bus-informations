<script lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { getBusesInfo, Position } from '../api/api';
interface Marker{
  position: Position;
  type: String;
  label: String;
  estimated_time?: String;
}
export default {
  setup() {
    const myMapRef = ref<any>(null);
    let zoom = ref<number>(15);
    let stop_name = ref<String>("");
    // let center = ref<Position>({ lat: 34.04924594193164, lng: -118.24104309082031 });
    let center = ref<Position>({ lat: 51.116359, lng: 17.025282 });

    const route = useRoute();
    stop_name.value = route.params.name as string;

    let home_marker = ref<Marker>({ 
      position: center.value,
      type: "stop",
      label: stop_name.value,
      estimated_time: undefined,
    });
    
    const options = ref({
      disableDefaultUI: true,
      styles: [
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
        ],
    });

    let markers = ref<Marker[]>([]);

    async function fetchData() {
      const api_url = "http://127.0.0.1:3000";

      const res = await fetch(`${api_url}/mpk/location/${stop_name.value}`);

      const json = await res.json();
      
      center.value = {
        lng: json.stop.x,
        lat: json.stop.y,
      }

      home_marker.value = { 
        position: center.value,
        type: "stop",
        label: stop_name.value,
      };
      
      const new_markers: Marker[] = [home_marker.value];
      for(const vehicle of json.vehiclePositions) {
        const new_marker: Marker = {
          position: {
            lat: vehicle.x,
            lng: vehicle.y,
          },
          type: vehicle.type,
          label: vehicle.name,
          estimated_time: vehicle.estimatedTime,
        }
        new_markers.push(new_marker);
      }

      markers.value = new_markers;
    }

    function to_minify(marker: Marker) {
      const stop = home_marker.value;
      const dist = Math.sqrt(Math.pow(marker.position.lat - stop.position.lat, 2) + Math.pow(marker.position.lng - stop.position.lng, 2));

      return marker != stop && dist < 0.001;
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
      zoom,
      home_marker,
      center,
      markers,
      options,
      to_minify,
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
        url: '/public/images/' + (to_minify(m) ? 'dot' : m.type) + '.png',
        scaledSize: to_minify(m) ? {width: 20, height: 20} : {width: 40, height: 40},
        labelOrigin: {x: 20, y: 50}
      }"
      :label="!to_minify(m) ? {
        text: m.label + (m.estimated_time ? ' (' + m.estimated_time + ')' : ''),
        className: 'bus-marker-label',
        color: 'red',
        fontSize: '20px',
        fontWeight: 'bold',
      } : ''"
    />
  </GMapMap>
</template>
  
<style>
body {
  margin: 0;
}

.bus-marker-label {
  text-transform: capitalize;
	-webkit-text-stroke: 1px gray;
	-webkit-text-fill-color: black;
}
</style>
