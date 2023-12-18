<template>
  <main>
    <WeatherDashboard />
  </main>
</template>

<script>
import WeatherDashboard from "../components/WeatherDashboard.vue";
export default {
  name: "HomeView",
  components: {
    WeatherDashboard,
  },
};
</script>

<style lang="scss" scoped>
main {
  min-height: 100vh;
  background-color: $bg-variant;
}
</style>