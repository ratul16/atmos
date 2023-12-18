<template>
  <div class="weather-loader">
    <b-row>
      <b-col cols="12" md="6">
        <b-card no-body img-top>
          <b-skeleton-img card-img="top" aspect="3:1"></b-skeleton-img>
        </b-card>
      </b-col>
      <b-col cols="12" md="6">
        <h5>Image bottom</h5>
        <b-card no-body img-bottom>
          <b-card-body>
            Vestibulum maximus, ligula eu feugiat molestie, massa diam imperdiet
            odio, vitae viverra ligula est id nisi. Aliquam ut molestie est.
          </b-card-body>
          <b-skeleton-img card-img="bottom" aspect="3:1"></b-skeleton-img>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
