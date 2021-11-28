import { createStore, storeKey } from 'vuex'
import Arweave from 'arweave';
import ArDB from '@textury/ardb';

import * as user from '@/store/modules/user.js'
import * as tx from '@/store/modules/tx.js'
import * as notification from '@/store/modules/notification.js'

const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http'
});

const ardb = new ArDB(arweave);

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    
  },
  getters: {

  },
  modules: {
    user,
    tx,
    notification
  }
})
