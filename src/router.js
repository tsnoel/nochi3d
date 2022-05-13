import {createWebHashHistory, createRouter} from 'vue-router';
import demo from 'views/demo.vue';
import room from 'views/room.vue';

const routes = [
    {
        path: '/',
        name: 'Demo',
        component: demo
    },
    {
        path: '/penguins',
        name: 'Room',
        component: room
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
