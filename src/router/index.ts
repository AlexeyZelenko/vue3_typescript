import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

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
    component: () => import('@/views/Video.vue')
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
    path: '/categories/:id',
    name: 'categories',
    component: () => import('@/views/CategoriesPhotoProfile.vue')
  },
  {
    path: '/photo_gallery',
    name: 'PhotoGallery',
    meta: { layout: 'empty' },
    component: () => import('@/views/PhotoGallery.vue')
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/components/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
