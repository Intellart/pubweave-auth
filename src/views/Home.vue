<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ArLogin />
    <List />
  </div>
</template>

<script>
// @ is an alias to /src
import ArLogin from '@/components/ArLogin.vue'
import List from '@/components/List.vue'

export default {
  name: 'Home',
  components: {
    ArLogin,
    List
  },
  
}
</script>
