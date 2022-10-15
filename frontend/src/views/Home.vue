
<script lang="ts">
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue'
import Maps from '../components/Maps.vue';

    export default {
    name: "Home",
    setup() {
        return {
        };
    },
    components: { Maps }
}
</script>



<template>
    <div>
        <h1>Home</h1>
        <Maps />
    </div>
</template>
