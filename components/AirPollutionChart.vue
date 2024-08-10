<template>
  <div class="air-pollution">
    <div class="mb-4">
      <h4 class="font-weight-bold mb-1">Air Pollution Highlights</h4>
      <small>
        Note: Air quality index status follows
        <a target="_blank" href="https://www.eea.europa.eu/themes/air/air-quality-index">
          European Environment Agency
        </a>
        Chart
      </small>
    </div>
    {{ airPollution.list }}
    <div class="pollution-index" v-if="airPollution.length">
      <div
        class="info-card quality-level"
        :style="`--bg-color:${airQualityIndex[airPollution[0].main.aqi].color}`"
      >
        <h5 class="text-muted">Air Quality Index</h5>
        <div class="content">
          <span>{{ airQualityInfo[airPollution[0].main.aqi].label }}</span>
          <p>
            {{ airQualityInfo[airPollution[0].main.aqi].des }}
          </p>
        </div>
      </div>
      <div
        class="info-card quality-border"
        :style="`--bg-color:${o3Quality(airPollution[0].components.o3).color}`"
      >
        <h5 class="text-muted">Ozone (O<sub>3</sub>)</h5>
        <div class="content">
          <span>{{ airPollution[0].components.o3 }}</span>
          <span class="small-text">μg/m<sup>3</sup></span>
          <small class="condition d-block">
            Condition {{ o3Quality(airPollution[0].components.o3).name }}
          </small>
        </div>
      </div>
      <div
        class="info-card quality-border"
        :style="`--bg-color:${coQuality(airPollution[0].components.co).color}`"
      >
        <h5 class="text-muted">Carbon monoxide (CO)</h5>
        <div class="content">
          <span>{{ airPollution[0].components.co }}</span>
          <span class="small-text">μg/m<sup>3</sup></span>
          <small class="condition d-block">
            Condition {{ coQuality(airPollution[0].components.co).name }}
          </small>
        </div>
      </div>
      <div
        class="info-card quality-border"
        :style="`--bg-color:${no2Quality(airPollution[0].components.no2).color}`"
      >
        <h5 class="text-muted">Nitrogen dioxide (NO<sub>2</sub>)</h5>
        <div class="content">
          <span>{{ airPollution[0].components.no2 }}</span>
          <span class="small-text">μg/m<sup>3</sup></span>
          <small class="condition d-block">
            Condition {{ no2Quality(airPollution[0].components.no2).name }}
          </small>
        </div>
      </div>
      <div
        class="info-card quality-border"
        :style="`--bg-color:${so2Quality(airPollution[0].components.so2).color}`"
      >
        <h5 class="text-muted">Sulphur dioxide (SO<sub>2</sub>)</h5>
        <div class="content">
          <span>{{ airPollution[0].components.so2 }}</span>
          <span class="small-text">μg/m<sup>3</sup></span>
          <small class="condition d-block">
            Condition {{ so2Quality(airPollution[0].components.so2).name }}
          </small>
        </div>
      </div>
      <div
        class="info-card quality-border"
        :style="`--bg-color:${nh3Quality(airPollution[0].components.nh3).color}`"
      >
        <h5 class="text-muted">Ammonia (NH<sub>3</sub>)</h5>
        <div class="content">
          <span>{{ airPollution[0].components.nh3 }}</span>
          <span class="small-text">μg/m<sup>3</sup></span>
          <small class="condition d-block">
            Condition {{ nh3Quality(airPollution[0].components.nh3).name }}
          </small>
        </div>
      </div>
    </div>
    <div class="no-data" v-else>
      <h4>Sorry air pollution data not found</h4>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useAirQuality } from "@composables/compoundQuality";

const {
  airQualityInfo,
  airQualityIndex,
  o3Quality,
  no2Quality,
  coQuality,
  so2Quality,
  nh3Quality,
} = useAirQuality();

// Define props
const props = defineProps({
  coord: {
    type: Object,
    default: () => ({}),
  },
});

const coords = ref({});
const airPollution = ref([]);

const fetchAirPollution = async (lat, lon) => {
  let searchQuery = `air_pollution?lat=${lat}&lon=${lon}`;
  try {
    const response = await $fetch(`/api/weather?query=${encodeURIComponent(searchQuery)}`);
    if (response.status === 200) {
      airPollution.value = response.data.list;
      // groupWeatherByDay(forecastData.value);
    } else {
      console.error("No data returned from the API");
    }
  } catch (error) {
    console.error("Error fetching air pollution data:", error);
  }
};

onMounted(() => {
  if (Object.keys(props.coord).length) {
    coords.value = props.coord;
    fetchAirPollution(props.coord.lat, props.coord.lon);
  }
});

watch(props, (newValue) => {
  coords.value = newValue.coord;
  fetchAirPollution(props.coord.lat, props.coord.lon);
});
</script>

<style lang="scss" scoped>
.air-pollution {
  margin-bottom: 20px;

  a {
    text-decoration: none;
    color: $primary;
  }
  .pollution-index {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    .info-card {
      // min-height: 150px;
      @include shadow($text-variant-4);
      border-radius: 5px;
      padding: 20px;
      h5 {
        margin: 0 auto;
        color: $text-variant-4;
      }
      .content {
        span {
          font-size: 40px;
          font-weight: 600;
          margin-right: 5px;
        }
        .condition {
          display: block;
        }
        .small-text {
          font-size: 20px;
        }
      }
      &:first-child {
        grid-column: 1 / 3;
      }
    }
  }
}

@include media-queries("desktop") {
  .air-pollution {
    .pollution-index {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@include media-queries("tab-sm") {
  .air-pollution {
    .pollution-index {
      grid-template-columns: 1fr;
      .info-card:first-child {
        grid-column: 1;
      }
    }
  }
}
</style>
