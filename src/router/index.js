import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Upload from '../views/UploadView.vue'
import MyAssets from '../views/MyAssets.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  routes
})

export default router
