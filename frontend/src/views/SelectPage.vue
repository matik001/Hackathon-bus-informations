
<script lang="ts">
import { computed } from '@vue/reactivity';
import { ref, watch } from 'vue'
import Maps from '../components/Maps.vue';
import SelectBusStop from '../components/SelectBusStop.vue';

    export default {
    name: "SelectPage",
    setup() {
        return {
        };
    },
    components: { SelectBusStop }
}
</script>



<template>
    <div>
        <SelectBusStop />
    </div>
</template>
