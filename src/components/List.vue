<template>
  <div>
    <form @submit='submitFromAction'>
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
  methods: {
    async submitFromAction(e){
      e.preventDefault();
      if (!(this.$store.state.items.includes(this.inputValue))){
        await this.$store.dispatch('ar_post', {'inputValue': this.inputValue, 'contentType': 'text/plain'});
        await this.$store.dispatch('ar_fetch');
      }else{
        console.log('This value already exist: ' + this.inputValue)
      }
    },
    async init(){
      await this.$store.dispatch('ar_fetch');
    },
  },
  created(){
    this.$store.dispatch('ar_fetch');
  }
  
}
</script>
