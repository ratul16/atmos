<template>
  <div id="app">
    <a href="https://github.com/ratul16/atmos" target="_blank" class="btn btn-dark repo shadow-lg">
      <i class="fab fa-github"></i>
    </a>
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

.repo {
  position: fixed;
  bottom: 2%;
  right: 5%;
  width: 60px;
  height: 60px;
  padding: 9px;
  border-radius: 50%;
  text-align: center;
  z-index: 99999;
}

.repo:hover{
  transform: scale(1.1);
  transition: .5s;
}

.repo i {
  font-size: 2.5em;
}
</style>
