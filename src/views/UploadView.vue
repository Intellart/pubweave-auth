<template>
  <div class='row justify-center'>
  <div class='col-8 col-md-9 col-xl-6'>
    <br/>
    <q-card >
      <q-card-section>
        <div class="text-h6">Upload an image</div>
      </q-card-section>
      
      <q-card-section >
        <form @submit='uploadAsset'>
          <div class='row justify-center'>
            <DropZone @drop.prevent="drop" @change="selectedFile" />
          </div>
          <br/>
          <q-btn color='primary' type='submit' label='Submit' />
        </form>
      </q-card-section>
      
      <q-card-section v-if="dropzoneFile">
        Details
        <div>
        
          <p>Content-Type: 
            <span>
              {{ dropzoneFile.file !== '' ? dropzoneFile.file.type : '' }}
            </span>
          </p>

          <p>Size: 
            <span>
              {{ dropzoneFile.file !== '' ? getFileBytes() : '' }}
            </span>
          </p>

          <p>Name: 
            <span>
              {{ dropzoneFile.file !== '' ? dropzoneFile.file.name : '' }}
            </span>
          </p>
          
          {{ dropzoneFile.file !== '' ? dropzoneFile.file.file : '' }}
        </div>

        <p>Preview:</p>
        <div id="preview">
          <img v-if="dropzoneFile.preview_url" :src="dropzoneFile.preview_url" />
        </div>

      </q-card-section>
    </q-card>
  </div>
  </div>
  
</template>

<script>
import DropZone from "@/components/DropZone.vue";
import ArweaveService from '@/services/ArweaveService.js'
import { reactive, computed } from 'vue'

export default {
  name: 'Upload',
  components: {
    DropZone
  },
  setup (props, context) {
    const dropzoneFile = reactive({
      file : '',
      preview_url: computed(() => {
        return dropzoneFile.file !== '' ? URL.createObjectURL(dropzoneFile.file) : null
      })
    })

    const formatBytes = (bytes) => {
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
    }

    const blobToBase64 = (blob) => {
      return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      })
    }

    // DropZone methods
    const drop = (e) => {
      dropzoneFile.file = e.dataTransfer.files[0]
      console.log('dropped')
      console.log(dropzoneFile)
    }
    const selectedFile = (e) => {
      dropzoneFile.file  = document.querySelector(".dropzoneFile").files[0]
    }
    const getFileBytes = (e) => {
      return dropzoneFile.file !== '' ? formatBytes(dropzoneFile.file.size) : ''
    }

    const uploadAsset = async (e) => {
      e.preventDefault()

      if (dropzoneFile.file !== ''){
        blobToBase64(dropzoneFile.file).then((data_blob) => {
          return ArweaveService.ar_post({'inputValue': data_blob, 'contentType': dropzoneFile.file.type})
        }).then((tx_id) => {
          console.log(tx_id)
          // Call func to add this transaction to app data
        }).catch(error => {
          console.log(error)
        })
      }
    }
    
    return {dropzoneFile, uploadAsset, drop, selectedFile, getFileBytes}
  }
}
</script>

<style>

</style>