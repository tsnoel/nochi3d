import {createWebHashHistory, createRouter} from 'vue-router';
import demo from 'views/demo.vue';

const routes = [
    {
        path: '/',
        name: 'Title',
        component: demo
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
