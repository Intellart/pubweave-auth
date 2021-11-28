import { createRouter, createWebHashHistory } from 'vue-router'

// Import components this way for JS LazyLoading, bigger view should have thier own webpackChunkName
const MyAssets = () => import(/* webpackChunkName': "creator" */'../views/MyAssets')
const Upload = () => import(/* webpackChunkName': "creator" */'../views/UploadView.vue')
const Gallery = () => import(/* webpackChunkName': "creator" */'../views/Gallery.vue')

const routes = [
  {
    path: '/',
    name: 'Gallery',
    component: Gallery
  },{
    path: '/upload',
    name: 'Upload',
    component: Upload
  },{
    path: '/my-assets',
    name: 'MyAssets',
    component: MyAssets
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  /*
  scrollBehavior(){
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
  */
})

export default router
