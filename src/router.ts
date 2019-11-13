import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Lighting from '@/components/lighting/LightingGame.vue';
Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL || '/game/',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/lighting',
            name: 'lighting',
            component: Lighting,
        },
    ],
});
