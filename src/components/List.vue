<template>
  <div >
    <form @submit='submitFromAction'>
      <input type="file" accept="image/*" @change="onChange" />
      <div id="preview">
        
        <img v-if="item.imageUrl" :src="item.imageUrl" />
        
      </div>
      <label for="input-box"></label>
      <input
        id='input-box'
        type="text"
        v-model="inputValue"
        placeholder='edit me'
      />
      <input class="button" type="submit" value="Submit">
    </form>
    <ul>
      <li v-for='(item) in $store.state.items' :key='item.id'>
        <p>{{item}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /srcW
export default {

  name: 'List',
  components: {

  },
  data() {
    return {
      inputValue: '',
      item: {
        image : null,
        imageUrl: null,
        imageType: null,
        imageSize: null
      }
    }
  },
  methods: {
    async submitFromAction(e){
      e.preventDefault();
      if (!(this.$store.state.items.includes(this.inputValue))){
        await this.$store.dispatch('ar_post', {'inputValue': this.inputValue, 'contentType': 'text/plain'});
        await this.$store.dispatch('ar_fetch');
      }else{
        console.log('This value already exist: ' + this.inputValue)
      }

      if(this.image != null){
        await this.$store.dispatch('ar_post', {'inputValue': this.inputValue, 'contentType': 'image/png'});
      }
    },
    async init(){
      await this.$store.dispatch('ar_fetch');
    },
    onChange(e) {
      console.log(e)
      const file = e.target.files[0]
      this.image = file
      this.item.imageUrl = URL.createObjectURL(file)
      this.imageType = file.type
      this.imageSize = file.size
    }
  },
  created(){
    this.$store.dispatch('ar_fetch');
  }
  
}
</script>
