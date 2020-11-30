import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { layout: 'empty' }
    },
    {
        path: '/about',
        name: 'About',
        meta: { layout: 'empty' },
        component: () => import('@/views/About.vue')
    },
    {
        path: '/video',
        name: 'Video',
        meta: { layout: 'empty' },
        component: () => import('../views/Video.vue')
    },
    {
        path: '/about_us',
        name: 'AboutUs',
        meta: { layout: 'empty' },
        component: () => import('@/views/AboutUs.vue')
    },
    {
        path: '/add_user',
        name: 'AddUser',
        meta: { layout: 'user' },
        component: () => import('@/views/AddUser.vue')
    },
    {
        path: '/list',
        name: 'list',
        meta: { layout: 'user' },
        component: () => import('@/views/UserList.vue')
    },
    {
        path: '/edit/:id',
        name: 'edit',
        meta: { layout: 'user' },
        component: () => import('@/views/UserEdit.vue')
    },
    {
        path: '/games/:name',
        name: 'games',
        component: () => import('@/views/GameProfile.vue')
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('@/components/NotFound.vue')
    },
    {
        path: '/photo',
        name: 'photo',
        component: () => import('@/views/PhotoGallery.vue')
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;
//# sourceMappingURL=index.js.map