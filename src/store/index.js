import { createStore } from 'vuex'
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
    'items': [
    ],
  },
  mutations: {
    // Change data within the sate through mutation commit
    // Cannot be async code
    add_item: (state, item) => {
      if(!(state.items.includes(item))){
        state.items.push(item)
      }
    }
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
      tx.addTag('Content-Type', 'text/plain');

      await arweave.transactions.sign(tx);
      await arweave.transactions.post(tx);
    },

    async ar_fetch({commit}){
      ardb.search('transactions').appName('PubWeave').find().then(async (txs) => {
        console.log(txs)
        for(const tx of txs) {
          const res = await arweave.api.get(`${tx.id}`);
          commit('add_item', res.data)
        }
      });
    }
  },
  getters: {
    // Parse and return data from state
  },
  modules: {
    
  }
})
