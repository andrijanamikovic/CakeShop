<template>
  <div>
    <header-component></header-component>
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<script>
import HeaderComponent from './components/layout/TheHeader.vue';
import FooterComponent from './components/layout/TheFooter.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent
  },
  created() {
    localStorage.removeItem('loggedInUser')
    fetch('https://cakeshop-1641c-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle the data
        this.$store.dispatch('setUsers', data)
        console.log('Users: ', data)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Lobster', cursive;
}

body {
  padding-top: 10vh;
  margin: 0;
  padding: 0;
}
</style>