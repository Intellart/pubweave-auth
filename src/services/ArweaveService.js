import Arweave from 'arweave';
import ArDB from '@textury/ardb';

const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http'
});

const ardb = new ArDB(arweave);

export default {

  /* Make a transaction with Arweave */
  async ar_post(payload){
    const tx = await arweave.createTransaction({
      data: payload.inputValue
    });

    tx.addTag('App-Name', 'PubWeave')
    tx.addTag('Content-Type', payload.contentType)
    tx.addTag('tx-type', 'data-upload')

    await arweave.transactions.sign(tx)
    await arweave.transactions.post(tx)
    return tx.id
  },

  /* Fetch Data Upload transaction made by PubWeave */
  async get_upload_txs(){
    return await ardb.search('transactions').tags([
      {name: 'App-Name', values: ['PubWeave']},
      {name: 'tx-type', values: ['data-upload']}
    ])
    .findAll().then(async (txs) => {
      for(const tx of txs) {
        console.log(tx)
      }
      return txs
    })
    .catch((error) => {
      console.log(error)
      return []
    })
  },
  
  async get_tx_data(payload){
    return await arweave.api.get(`${payload.tx_id}`).then( 
      (response) => {
        return response
      })
  }
  
}