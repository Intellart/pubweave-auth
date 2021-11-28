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

    if('fileName' in payload){
      tx.addTag('fileName', payload.fileName)
    }

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
      //for(const tx of txs) {
      //  console.log(tx)
      //}
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
  },

  async get_tx_tags(payload){
    return await arweave.transactions.get(payload.tx_id).then(transaction => {
      let tags = {}
      transaction.get('tags').forEach(tag => {
        let key = tag.get('name', {decode: true, string: true});
        let value = tag.get('value', {decode: true, string: true});
        tags[key] = value
      });
      return tags
    });
  },

  formatBytes(bytes){
    var marker = 1024; // Change to 1000 if required
    var decimal = 3; // Change as required
    var kiloBytes = marker; // One Kilobyte is 1024 bytes
    var megaBytes = marker * marker; // One MB is 1024 KB
    var gigaBytes = marker * marker * marker; // One GB is 1024 MB
    var teraBytes = marker * marker * marker * marker; // One TB is 1024 GB

    // return bytes if less than a KB
    if(bytes < kiloBytes) return bytes + " Bytes";
    // return KB if less than a MB
    else if(bytes < megaBytes) return(bytes / kiloBytes).toFixed(decimal) + " KB";
    // return MB if less than a GB
    else if(bytes < gigaBytes) return(bytes / megaBytes).toFixed(decimal) + " MB";
    // return GB if less than a TB
    else return(bytes / gigaBytes).toFixed(decimal) + " GB";
  },

  loadTags(tx){
    let tags = {}
    tx.tags.foreach(element => {
      tags[element.name] = element.value
    })
    return tags
  }
  
}