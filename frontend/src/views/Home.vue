
<script lang="ts">
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue'

    export default {
        name: 'Home',
        setup(){
            const name = 'mario'
            const age = 30

            const introduction = ref<HTMLElement|null>(null);

            const clickHandler = ()=>{
                console.log(introduction, introduction.value)
                introduction.value!.classList.add('test')
                introduction.value!.textContent = 'hello, ninjas'
            }
            const names = ref(['ala', 'ma', 'kota']);
            // const names = computed(()=>
            //     ['ala', 'ma', 'kota'].filter(a=>a.includes(search.value))
            // );


            const search = ref("");


            watch(search, ()=>{
                names.value = ['ala', 'ma', 'kota'].filter(a=>a.includes(search.value));
            })

            return {
                name,
                age,
                clickHandler,
                introduction,
                names,
                search
            }
        },
    }
</script>



<template>
    <div>
        <h1>Home</h1>
        <p ref="introduction">My name is {{name}} and my age is {{age}}</p>
        <button @click="clickHandler">click me</button>
        <input type="text" v-model="search" />
        <div v-for="name in names" :key="name">{{name}}</div>
    </div>
</template>
