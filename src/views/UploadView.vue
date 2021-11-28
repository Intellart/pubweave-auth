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
    }
    const selectedFile = (e) => {
      dropzoneFile.file  = document.querySelector(".dropzoneFile").files[0]
    }
    const getFileBytes = (e) => {
      return dropzoneFile.file !== '' ? ArweaveService.formatBytes(dropzoneFile.file.size) : ''
    }

    const uploadAsset = async (e) => {
      e.preventDefault()

      if (dropzoneFile.file !== ''){
        blobToBase64(dropzoneFile.file).then((data_blob) => {
          return ArweaveService.ar_post({
            'inputValue': data_blob,
            'contentType': dropzoneFile.file.type,
            'fileName': dropzoneFile.file.name
            })
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