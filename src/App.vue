<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Weather/>
  </div>
</template>

<script>
import Weather from './components/Weather'

export default {
  name: 'App',
  data:()=>({
    temp :''
  }),
  components: {
    Weather
  },
}
</script>

<style>
@import './assets/style.css';

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
