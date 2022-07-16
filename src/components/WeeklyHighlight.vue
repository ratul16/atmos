<template>
  <div class="weekly-update">
    <h4 class="mb-4 font-weight-bold">Weekly Highlights</h4>
    <div class="weekly-temps">
      <div class="temp-card" v-for="day in 7" :key="day">
        <span class="day">
          {{ day }}
        </span>
        <img
          class="icon"
          src="https://openweathermap.org/img/wn/02d@2x.png"
          loading="lazy"
        />
        <div class="temp">
          <span>12</span> | 
          <span>23</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeeklyHighlight',
};
</script>

<style lang="scss" scoped>
.weekly-update {
  margin-bottom: 20px;
  .weekly-temps {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 20px;
    .temp-card {
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
