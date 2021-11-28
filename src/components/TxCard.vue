<template>
  <q-card>
    
    <q-card-section>

      <div v-if='isImg' style="heigth:150px">
        <q-img
          v-if='isImg'
          :src="raw_data"
          alt="img"
          class="image-fit">
          <div class="absolute-bottom">
            <div class="text-h6"><b>{{getFileName()}}</b></div>
            <div class="text-subtitle2">A subtitle</div>
          </div>
        </q-img>
    </div>
    </q-card-section>

    <q-card-section>
      <q-list bordered separator>
        <q-item v-ripple>
          <q-item-section><b>Owner: </b>{{tx.owner.address}}</q-item-section>
        </q-item>

        <q-item v-ripple>
          <q-item-section>
            <q-item-label><b>Size: </b>{{dataSize}}</q-item-label>
            <q-item-label caption>{{data_obj.headers['content-type']}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-actions>
      <q-btn flat>Action 1</q-btn>
      <q-btn flat>Action 2</q-btn>
    </q-card-actions>
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
      tags: {type: Object},
      raw_data: computed(() => {
        return main.data_obj.data
      }),
      isImg: computed(() => {
        return main.data_obj.headers['content-type'].includes('image')
      }),
      dataSize: computed(() => {
        return ArweaveService.formatBytes(main.data_obj.headers['content-length'])
      }),
    })

    main.tx = props.tx.item
    // Fetch Tx Data
    main.data_obj = await ArweaveService.get_tx_data({'tx_id': tx.id})
    main.tags = await ArweaveService.get_tx_tags({'tx_id': tx.id})

    function getFileName(){
      return 'fileName' in main.tags ? main.tags['fileName'] : 'Default Name'
    }
    return { ...toRefs(main), getFileName}
  }


})
</script>

<style>
  .image-fit{
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
</style>