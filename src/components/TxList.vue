<template>
  <div class="q-pa-md row items-start" >
    <div v-for='(item) in txs' :key='item.id'
      class='col-6 col-sm-4 col-md-3 col-xl-2'>
      <TxCard :tx="{item}"/>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent } from 'vue'
import { useStore } from 'vuex';
import TxCard from '@/components/TxCard.vue'
export default defineComponent({
  name: 'Gallery',
  components:{
    TxCard
  },
  async setup (props, context){
    // Written this way to visualize which property are exposed by data_txs
    const { txs } = await usePubweaveTxs()
    return { txs }
  }
})


async function usePubweaveTxs(){
  const $store = useStore()
  const data_txs = reactive({
    txs: {type: Array},
  })

  // Currently
  data_txs.txs = await $store.dispatch('load_uploaded_data_txs').then((response) => {
    return $store.state.tx.uploaded_data_txs
  })
  // Can be written this way if there's only the reactive object to return
  //return toRefs(txs_obj)
  return { ...toRefs(data_txs) }
}

</script>

<style>

</style>