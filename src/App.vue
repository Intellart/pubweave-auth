<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-toolbar-title>
          PubWeave
        </q-toolbar-title>
        <Login />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Gallery" exact/>
        <q-route-tab to="/upload" label="Upload" exact/>
        <q-route-tab v-if='isAuthenticated' to="/my-assets" label="My Assets" exact/>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
const name = 'LayoutDefault'
import Login from '@/components/Login.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

const $store = useStore();

const isAuthenticated = computed(() => { return $store.getters['isAuthenticated'] })
</script>
