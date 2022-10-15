<!-- <script lang="ts">

export default {
    setup() {
        return {
            center: {lat: 51.093048, lng: 6.842120},
        }
    }
}

</script>

<template>
    <GMapMap
        :center="{lat: 51.093048, lng: 6.842120}"
        :zoom="12"
        map-type-id="terrain"
        style="width: 100vw; height: 900px"
    >
    </GMapMap>
  </template>
   -->
   <template>
    <GMapMap
      :center="center"
      ref="myMapRef"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100vw; height: 20rem"
    >
      <GMapCluster :zoomOnClick="true">
        <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
      </GMapCluster>
    </GMapMap>
  </template>
  
  <script >
  export default {
    mounted() {
      this.$refs.myMapRef.$mapPromise.then((mapObject) => {
        console.log('map is loaded now', mapObject);
      });
    },
    data() {
      return {
        center: { lat: 51.093048, lng: 6.84212 },
        markers: [
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
        ],
      };
    },
  };
  </script>
  
  <style>
  body {
    margin: 0;
  }
  </style>
  