import ArweaveService from '@/services/ArweaveService.js'

export const state = {
  'uploaded_data_txs': []
}
export const mutations = {
  save_uploaded_data_tx: (state, tx) => {
    if (state.uploaded_data_txs.filter(item => item.id == tx.id).length == 0){
      console.log('loading')
      console.log(tx.id)
      state.uploaded_data_txs.push(tx)
    }
  }
}
export const actions = {
  async load_uploaded_data_txs({commit}){
    ArweaveService.get_upload_txs().then( (response) => {
      for(const tx of response) {
        commit('save_uploaded_data_tx', tx)
      }
    })
  }
}
export const getters = {
  /*
  tx_by_content_type: (state) => (contentType) => {
    return state.txs.find(tx => tx.data.type == contentType)
  },
  tx_from_wallet: (state) => (wallet) => {
    return state.txs.find(tx => tx.owner.address == wallet)
  }
  */
}