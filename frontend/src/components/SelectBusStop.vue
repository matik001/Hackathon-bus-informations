<script lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getBusesInfo, Position } from '../api/api';
import router from '../routes';

export default {
  setup() {

    const allBusStops = ref<string[]>([]);
    const busStops = ref<string[]>([]);
    const search = ref<string>("");

    watch(search, ()=>{
        busStops.value = allBusStops.value.filter(a=>a.includes(search.value));
    })

    const clickedBusHandler = (bus:string)=>{
      router.push({ name: `Map`, params: {name: bus} })
    }

    onMounted(async () => {
        async function fetchData() {
            const api_url = "http://127.0.0.1:3000";

            const res = await fetch(`${api_url}/mpk/stops`);
            const json:string[] = await res.json();
            // const json = ['stanki', 'starodworska', 'królewiecka', 'mrozów - świetlica'];
            allBusStops.value = json;
            busStops.value = json;
        }
        await fetchData();
    })



    return {
      search,
      busStops,
      clickedBusHandler
    };

  }
}

</script>
  
  
<template>
        <h1 style="display-2 mb-4">Wybierz stację</h1>
        <input type="text" style="width: 250px" class="mt-2 mb-2" v-model="search" />
        <div  class="elem"  v-for="name in busStops" :key="name" v-on:click="clickedBusHandler(name)">{{name}}</div>

</template>
  
<style scoped>
.elem{
  cursor: pointer;
}
.elem:hover{
  background-color: black;
  color: white;;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
}
/* 
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
} */


</style>
