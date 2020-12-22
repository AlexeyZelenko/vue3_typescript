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
    component: () => import('@/views/history/HistoryPhotoGallery.vue')
  },
  {
    path: '/add_history',
    name: 'AddHistoryPhoto',
    component: () => import('@/views/history/AddHistoryPhoto.vue')
  },
  {
    path: '/list_history',
    name: 'listHistory',
    component: () => import('@/views/history/HistoryPhotoList.vue')
  },
  {
    path: '/edit_history/:id',
    name: 'edit_history',
    component: () => import('@/views/history/HistoryEditPhoto.vue')
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
    component: () => import('@/views/photo/AddUser.vue')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/photo/UserList.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('@/views/photo/UserEdit.vue')
  },
  {
    path: '/categories/:id',
    name: 'categories',
    component: () => import('@/views/photo/CategoriesPhotoProfile.vue')
  },
  {
    path: '/photo_gallery',
    name: 'PhotoGallery',
    component: () => import('@/views/photo/PhotoGallery.vue')
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/components/NotFound.vue')
  },
  {
    path: '/add_text_bible',
    component: () => import('@/views/textBible/AddTextBible.vue')
  },
  {
    path: '/list_text_bible',
    component: () => import('@/views/textBible/ListTextBible.vue')
  },
  {
    path: '/google_disc_2013',
    component: () => import('@/views/GoogleDrive/Archive.vue')
  },
  {
    path: '/google_list',
    component: () => import('@/views/GoogleDrive/Listarchive.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
