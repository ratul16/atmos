<template>
  <div class="weekly-update">
    <h4 class="mb-4 font-weight-bold">Weekly Highlights</h4>
    <div class="weekly-temps">
      <div class="temp-card" v-for="day in 7" :key="day">
        <span class="day">
          {{ weekDays[day] }}
        </span>
        <img
          class="icon"
          src="https://openweathermap.org/img/wn/02d@2x.png"
          loading="lazy"
        />
        <div class="temp">
          <span>12&#176;</span> | 
          <span>23&#176;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeeklyHighlight',
  data() {
    return {
      weekDays: {
        1: 'Sat',
        2: 'Sun',
        3: 'Mon',
        4: 'Tue',
        5: 'Wed',
        6: 'Thu',
        7: 'Fri',
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.weekly-update {
  margin-bottom: 20px;
  .weekly-temps {
    display: flex;
    overflow-x: auto;
    gap: 20px;
    .temp-card {
      flex-basis: calc( 100% / 7 );
      min-width: 120px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 20px;
      background-color: white;
      .icon {
        margin: 0 auto;
        width: 50px;
      }
    }
  }
}
</style>
