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
              {{ this.dropzoneFile !== null ? this.dropzoneFile.type : '' }}
            </span>
          </p>

          <p>Size: 
            <span>
              {{ this.dropzoneFile !== null ? getFileBytes() : '' }}
            </span>
          </p>

          <p>Name: 
            <span>
              {{ this.dropzoneFile !== null ? this.dropzoneFile.name : '' }}
            </span>
          </p>
          
          {{ this.dropzoneFile !== null ? this.dropzoneFile.file : '' }}
        </div>

        <p>Preview:</p>
        <div id="preview">
          <img v-if="preview_url" :src="preview_url" />
        </div>

      </q-card-section>
    </q-card>
  </div>
  </div>
  
</template>

<script>
function formatBytes(bytes) {
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

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  })
}

import DropZone from "@/components/DropZone.vue";

export default {
  name: 'Upload',
  components: {
    DropZone
  },
  data() {
    return {
      dropzoneFile: null,
      preview_url: null
    }
  },
  methods: {
    async uploadAsset(e) {
      e.preventDefault()
      console.log(this.dropzoneFile)
      var data_blob = await blobToBase64(this.dropzoneFile)

      const base64Response = await fetch(data_blob)
      const blob = await base64Response.blob();
      if (this.dropzoneFile !== null){
        this.$store.dispatch('ar_post', {
          'inputValue': data_blob,
          'contentType': this.dropzoneFile.type
        })
      }
    },
    // DropZone methods
    drop(e) {
      this.dropzoneFile = e.dataTransfer.files[0]
      this.preview_url = URL.createObjectURL(this.dropzoneFile)
    },
    selectedFile(e) {
      this.dropzoneFile = document.querySelector(".dropzoneFile").files[0]
      this.preview_url = URL.createObjectURL(this.dropzoneFile)
    },
    getFileBytes() {
      let out = ''
      if (this.dropzoneFile !== null){
        out = formatBytes(this.dropzoneFile.size)
      }
      return out
    },
  },
}
</script>

<style>

</style>