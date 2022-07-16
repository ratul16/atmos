<template>
  <div class="home">
    <WeatherDashboard />
  </div>
</template>

<script>
// @ is an alias to /src
import WeatherDashboard from "@/components/WeatherDashboard.vue";

export default {
  name: "Home",
  components: {
    WeatherDashboard,
  },
};
</script>
