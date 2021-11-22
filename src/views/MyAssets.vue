<template>
  <div class='row justify-center'>
  <div class='col-8 col-md-9 col-xl-6' v-if='isAuthenticated'>
    <div>My Assets vue</div>
    <q-btn @click="get_my_assets" label='Get my assets' />
    <ul>
      <li v-for='(item) in $store.state.myAssets' :key='item.id'>
        <p>ID{{item.id}}</p>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
import store from '@/store/index.js';

export default {
  props: {
  },
  name: 'MyAssets',
  methods: {
    get_my_assets: async () => {
      if (store.getters.isAuthenticated) {
        let wallet = store.state.activeWallet
        await store.dispatch('get_my_assets', {'wallet': wallet})
      }
    }
  },
  computed: {
    isAuthenticated() { return store.getters.isAuthenticated }, 
  }

}
</script>

<style>

</style>