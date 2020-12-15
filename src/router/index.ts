import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/HistoryPhotoGallery.vue')
  },
  {
    path: '/add_history',
    name: 'AddHistoryPhoto',
    component: () => import('@/views/AddHistoryPhoto.vue')
  },
  {
    path: '/list_history',
    name: 'listHistory',
    component: () => import('@/views/HistoryPhotoList.vue')
  },
  {
    path: '/edit_history/:id',
    name: 'edit_history',
    component: () => import('@/views/HistoryEditPhoto.vue')
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('@/views/Video.vue')
  },
  {
    path: '/about_us',
    name: 'AboutUs',
    component: () => import('@/views/AboutUs.vue')
  },
  {
    path: '/add_user',
    name: 'AddUser',
    component: () => import('@/views/AddUser.vue')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/UserList.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
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
    component: () => import('@/views/PhotoGallery.vue')
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/components/NotFound.vue')
  },
  {
    path: '/add_text_bible',
    component: () => import('@/views/AddTextBible.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
