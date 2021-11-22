import { createStore, storeKey } from 'vuex'
import Arweave from 'arweave';
import ArDB from '@textury/ardb';

const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http'
});

const ardb = new ArDB(arweave);

export default createStore({
  state: {
    'activeWallet': null,
    'items': [],
    'txs': []
  },
  mutations: {
    // Change data within the sate through mutation commit
    // Cannot be async code
    add_item: (state, item) => {
      if(!(state.items.includes(item))){
        state.items.push(item)
      }
    },
    // Save an array of arweave tx
    save_pub_tx: (state, txs) => {
      txs.forEach(function (item, index) {
        if(!(state.txs.includes(item))){
          state.txs.push(item)
        }
      })
    },
    setActiveWallet: (state, wallet) => {
      state.activeWallet = wallet
    },
  },
  actions: {
    // Methods that can't change data inside of state
    // Can be async code
    async ar_post({commit}, payload){ 
      console.log('posting something')
      const tx = await arweave.createTransaction({
        data: payload.inputValue
      });

      tx.addTag('App-Name', 'PubWeave');
      tx.addTag('Content-Type', payload.contentType)

      await arweave.transactions.sign(tx)
      await arweave.transactions.post(tx)
    },

    async ar_fetch({commit}){
      ardb.search('transactions').appName('PubWeave').find().then(async (txs) => {
        for(const tx of txs) {
          const res = await arweave.api.get(`${tx.id}`)
          commit('add_item', res.data)
        }
      });
    },
    // Fetch and store PubWeave transactions to vuex
    async fetch_pubweave_txs({commit}){
      ardb.search('transactions').appName('PubWeave').find().then(async (txs) => {
        commit('save_pub_tx', txs)
      });
    },
    // Wallet is null is case of a logout
    setLogin({commit}, payload) {
      commit('setActiveWallet', payload.wallet)
    }
  },
  getters: {
    // Parse and return data from state
    tx_by_content_type: (state) => (contentType) => {
      return state.txs.find(tx => tx.data.type == contentType)
    },
    tx_from_wallet: (state) => (wallet) => {
           return state.txs.find(tx => tx.owner.address == wallet)
      //return state.txs.find(tx => tx.anchor == "")
    },
    isAuthenticated: (state) => {
      return state.activeWallet === null ? false : true
    }
  },
  modules: {
    
  }
})
