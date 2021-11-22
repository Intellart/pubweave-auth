<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-toolbar-title>
          PubWeave
        </q-toolbar-title>

        <q-chip
          v-if='isAuthenticated'
          dense
          outline
          size='lg'
          id='wallet-chip'
          text-color="white">
          <q-avatar icon='fas fa-wallet'/>
          <span id='wallet-chip-str'>{{ $store.getters.getWalletHeader }}</span>
          </q-chip>

        <q-btn
         v-if='isAuthenticated'
         @click="setLogin"
         label="Logout"
        />
        <q-btn
          v-else
          @click="setLogin"
          label="Login"
        />

      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Gallery" exact/>
        <q-route-tab to="/upload" label="Upload" exact/>
        <q-route-tab to="/my-assets" label="My Assets" exact/>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>

import Home from './views/Home.vue'
import store from '@/store/index.js';

export default {
  name: 'LayoutDefault',
  components: {
    Home
  },
  methods: {
    setLogin: async () => {
      if(store.getters.isAuthenticated){
        await window.arweaveWallet.disconnect()
        store.dispatch('setLogin', {'wallet': null})
      }else{
        try {
          await window.arweaveWallet.connect([
              'ACCESS_ADDRESS',
              'SIGN_TRANSACTION'
            ], {
              name: 'PubWeave'
            })
          const address = await window.arweaveWallet.getActiveAddress()
          store.dispatch('setLogin', {'wallet': address})
        } catch (e) {

        }
      }
    }
  },
  setup () {
    return {}
  },
  async mounted() {
    await this.$store.dispatch('fetch_pubweave_txs')
  },
  computed: {
    isAuthenticated() { return this.$store.getters.isAuthenticated }, 
  }
}
</script>
