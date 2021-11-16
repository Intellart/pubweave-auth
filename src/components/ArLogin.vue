<template>
  <div class='row'>
    <div class="col text-end">
      <a @click="login" class='login' href='#'>Login</a>
      <div class="hidden small-text">
        <span class="address"></span>
        <br>
        <a @click="logout" class='logout' href='#'>Logout</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Arlogin',
  methods: {
    login: async() => {
      await window.arweaveWallet.connect([
        'ACCESS_ADDRESS',
        'SIGN_TRANSACTION'
      ], {
        name: 'Intellart'
      });

      var address = await window.arweaveWallet.getActiveAddress();
      try {
        var address = await window.arweaveWallet.getActiveAddress();
        document.querySelector('.login').style.display = 'none';
        for(const addy of document.getElementsByClassName('address')){
          addy.innerHTML = address;
        }
      } catch(e) {
        document.querySelector('.login').style.display = 'block';
        for(const addy of document.getElementsByClassName('address')){
          addy.innerHTML  = '';
        }
      }
    },
    logout: async() => {
      await window.arweaveWallet.disconnect();
      document.querySelector('.login').style.display = 'block';
      for(const addy of document.getElementsByClassName('address')){
        addy.innerHTML  = '';
      }
    },
  }
}
</script>