import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import Home from '../views/Home.vue';
import SelectPage from '../views/SelectPage.vue';

const routes:RouteRecordRaw[] = [
    {
        path: '/',
        name: 'SelectPage',
        component: SelectPage
    },
    {
        path: '/:name',
        name: 'Map',
        component: Home
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})


export default router;