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
  }
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
  margin: 0;
}
</style>