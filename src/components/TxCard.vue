<template>
  <q-card>
    <q-card-section><b>TX:</b> {{tx.id}}</q-card-section>
    <q-card-section>

      <div v-if='isImg'>
        <img :src="raw_data">
      </div>

      <div v-else>
        {{raw_data}}
      </div>

    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, reactive, toRefs, computed } from 'vue'

import { useStore } from 'vuex';
import ArweaveService from '@/services/ArweaveService.js'
export default defineComponent({
  props: {
    tx: {
      type: Object
    }
  },
  async setup(props, context){
    const $store = useStore()
    const tx = props.tx.item

    const main = reactive({
      tx: {type: Object},
      data_obj: {type: Object},
      raw_data: computed(() => {
        return main.data_obj.data
      }),
      isImg: computed(() => {
        return main.data_obj.headers['content-type'].includes('image')
      })
    })

    main.tx = props.tx.item
    // Fetch Tx Data
    main.data_obj = await ArweaveService.get_tx_data({'tx_id': tx.id})

    console.log(main.data_obj)
    console.log()
    return toRefs(main)
  }


})
</script>

<style>

</style>