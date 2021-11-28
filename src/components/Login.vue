<template>
  <div>
  <q-chip
    v-if='isAuthenticated'
    dense
    outline
    size='lg'
    id='wallet-chip'
    text-color="white">
    <q-avatar icon='fas fa-wallet'/>
    <span id='wallet-chip-str'>{{ $store.getters['getWalletHeader'] }}</span>
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
  </div>
</template>

<script>

import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'Login',
  setup (props, context) {
    const $store = useStore();

    const isAuthenticated = computed(() => { return $store.getters['isAuthenticated'] })

    const setLogin = () => {
      if ($store.getters['isAuthenticated']) {
        window.arweaveWallet.disconnect().then(response => {
          $store.dispatch('setLogin', {'wallet': null})
        })
      } else {
        try {
          window.arweaveWallet.connect([
              'ACCESS_ADDRESS',
              'SIGN_TRANSACTION'
            ], {
              name: 'PubWeave'
            })
            .then((response) => {
              return window.arweaveWallet.getActiveAddress();
            })
            .then((address) => {
              $store.dispatch('setLogin', {'wallet': address})
            })
          
        } catch (e) {
          console.log(e)
        }
      }
    }

    return { isAuthenticated, setLogin }
  }
})
</script>

<style>

</style>