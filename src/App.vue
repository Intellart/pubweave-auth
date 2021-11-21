<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-toolbar-title>
          PubWeave
        </q-toolbar-title>

        <q-chip
          dense
          outline
          size='lg'
          id='wallet-chip'
          text-color="white"
          icon='fas fa-wallet'
          style="display: none">
        </q-chip>

        <q-btn
          label='Login'
          id='header-login'
          @click="loginFunc"
        />

        <q-btn
          label='Logout'
          id='header-logout'
          @click="logoutFunc"
          style='display: none'
        />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Gallery" />
        <q-route-tab to="/upload" label="Create NFT" />
        <q-route-tab to="/my-assets" label="My Assets" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-page>
        <Home />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
// import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Home from './views/Home.vue'

export default {
  name: 'LayoutDefault',

  components: {
    Home
  },
  methods: {
    loginFunc: async () => {
      await window.arweaveWallet.connect([
        'ACCESS_ADDRESS',
        'SIGN_TRANSACTION'
      ], {
        name: 'PubWeave'
      })

      try {
        const address = await window.arweaveWallet.getActiveAddress()
        document.querySelector('#header-login').style.display = 'none'
        document.querySelector('#header-logout').style.display = 'block'
        document.querySelector('#wallet-chip').style.display = 'block'
        document.querySelector('#wallet-chip').innerHTML = address.substring(0, 10) + '...'
      } catch (e) {
        document.querySelector('#header-login').style.display = 'block'
        document.querySelector('#header-logout').style.display = 'none'
        document.querySelector('#wallet-chip').innerHTML = ''
        document.querySelector('#wallet-chip').display = 'none'

      }
    },
    logoutFunc: async () => {
      await window.arweaveWallet.disconnect()
      document.querySelector('#header-login').style.display = 'block'
      document.querySelector('#header-logout').style.display = 'none'
      document.querySelector('#wallet-chip').innerHTML = ''
      document.querySelector('#wallet-chip').display = 'none'
    }
  },
  setup () {
    return {
      // leftDrawerOpen: ref(false)
    }
  }
}
</script>
