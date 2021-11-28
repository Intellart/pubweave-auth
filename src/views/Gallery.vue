<template>
  <div>
    <suspense>
      <template #default>
        <TxList/>
      </template>
      <template #fallback>
        Loading ...
      </template>
    </suspense>
  </div>
</template>

<script>
import { defineComponent, onRenderTriggered, reactive, computed} from 'vue';
import TxList from '@/components/TxList.vue'
import { useStore } from 'vuex';


export default {
  components:{
    TxList
  },
  setup(props, context){
    const $store = useStore()
    const name = 'Gallery'
    return { name }
  }
}

</script>

<style>

</style>