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
    path: '/add_text_poetry',
    component: () => import('@/views/Poetry/AddTextPoetry.vue')
  },
  {
    path: '/list_text_poetry',
    component: () => import('@/views/Poetry/ListTextPoetry.vue')
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
    path: '/google_list',
    component: () => import('@/views/GoogleDrive/Listarchive.vue')
  },
  {
    path: '/add_folder_google_disc',
    component: () => import('@/views/GoogleDrive/AddFolderGoogleDisc.vue')
  },
  {
    path: '/poetry',
    component: () => import('@/views/Poetry/Poetry.vue')
  },
  {
    path: '/cell',
    name: 'Cell',
    component: () => import('@/views/Cell.vue')
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import('@/views/Books/Books.vue')
  },
  {
    path: '/add_new_book',
    component: () => import('@/views/Books/AddNewBooks.vue')
  },
  // {
  //   path: '/business',
  //   name: 'ListBusiness',
  //   component: () => import('@/views/business/ListBusiness.vue')
  // },
  {
    path: '/add_new_business',
    component: () => import('@/views/business/AddNewBusiness.vue')
  },
  {
    path: '/contacts',
    component: () => import('@/views/Contacts.vue')
  },
  {
    path: '/power_kindness',
    name: 'PowerOfKindness',
    component: () => import('@/views/PowerOfKindness/index.vue')
  },
  {
    path: '/add_good',
    name: 'AddGood',
    component: () => import('@/views/PowerOfKindness/AddUser.vue')
  },
  {
    path: '/list_goods',
    name: 'listGoods',
    component: () => import('@/views/PowerOfKindness/UserList.vue')
  },
  {
    path: '/edit_good/:id',
    name: 'editGoods',
    component: () => import('@/views/PowerOfKindness/UserEdit.vue')
  },
  {
    path: '/categories_goods/:id',
    name: 'categoriesGoods',
    component: () => import('@/views/PowerOfKindness/CategoriesPhotoProfile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
