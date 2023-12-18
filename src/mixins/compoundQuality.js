export default {
  data() {
    return {
      airQualityInfo: {
        1: {
          label: 'Good',
          des: 'Air quality is satisfactory, and air pollution poses little or no risk.',
          color: ''
        },
        2: {
          label: 'Moderate',
          des: `Air quality is acceptable. However, there may be a risk for some people,
            particularly those who are unusually sensitive to air pollution.`,
          color: ''
        },
        3: {
          label: 'Unhealthy for sensitive groups',
          des: `Members of sensitive groups may experience health effects.
            The general public is less likely to be affected.`,
          color: ''
        },
        4: {
          label: 'Unhealthy',
          des: `Some members of the general public may experience health effects.
            Members of sensitive groups may experience more serious health effects.`,
          color: ''
        },
        5: {
          label: 'Very Unhealthy',
          des: 'Health alert: The risk of health effects is increased for everyone.',
          color: ''
        },
        6: {
          label: 'Hazardous',
          des: 'Health warning of emergency conditions: everyone is more likely to be affected.',
          color: ''
        },
      },
      airQualityIndex: {
        1: {
          name: 'Good',
          color: '#1D8348'
        },
        2: {
          name: 'Satisfactory ',
          color: '#2ECC71'
        },
        3: {
          name: 'Moderate',
          color: '#facf39'
        },
        4: {
          name: 'Poor',
          color: '#f99049'
        },
        5: {
          name: 'Severe',
          color: '#a070b6'
        },
        6: {
          name: 'Hazardous',
          color: '#7B241C'
        },
      },
    }
  },
  methods: {
    o3Quality(value) {
      let result = {}
      if (value <= 50) {
        result = this.airQualityIndex[1];
      } else if (value >= 51 && value <= 100) {
        result = this.airQualityIndex[5];
      } else if (value >= 101 && value <= 168) {
        result = this.airQualityIndex[3];
      } else if (value >= 169 && value <= 208) {
        result = this.airQualityIndex[4];
      } else if (value >= 209 && value <= 748) {
        result = this.airQualityIndex[5];
      } else {
        result = this.airQualityIndex[6];
      }
      return result
    },
    no2Quality(value) {
      let result = {}
      if (value <= 40) {
        result = this.airQualityIndex[1]
      } else if (value >= 41 && value <= 80) {
        result = this.airQualityIndex[2]
      } else if (value >= 81 && value <= 180) {
        result = this.airQualityIndex[3]
      } else if (value >= 181 && value <= 280) {
        result = this.airQualityIndex[4]
      } else if (value >= 281 && value <= 400) {
        result = this.airQualityIndex[5]
      } else {
        result = this.airQualityIndex[6]
      }
      return result
    },
    coQuality(value) {
      let result = {}
      if (value <= 1) {
        result = this.airQualityIndex[1];
      } else if (value >= 1.1 && value <= 2.0) {
        result = this.airQualityIndex[5];
      } else if (value >= 2.1 && value < 10) {
        result = this.airQualityIndex[3];
      } else if (value > 10 && value < 17) {
        result = this.airQualityIndex[4];
      } else if (value > 17 && value < 34) {
        result = this.airQualityIndex[5];
      } else {
        result = this.airQualityIndex[6];
      }
      return result
    },
    so2Quality(value) {
      let result = {}
      if (value >= 0 && value <= 40) {
        result = this.airQualityIndex[1];
      } else if (value >= 41 && value <= 80) {
        result = this.airQualityIndex[5];
      } else if (value >= 81 && value <= 380) {
        result = this.airQualityIndex[3];
      } else if (value >= 381 && value <= 800) {
        result = this.airQualityIndex[4];
      } else if (value >= 801 && value <= 1600) {
        result = this.airQualityIndex[5];
      } else {
        result = this.airQualityIndex[6];
      }
      return result
    },
    nh3Quality(value) {
      let result = {}
      if (value >= 0 && value <= 200) {
        result = this.airQualityIndex[1];
      } else if (value >= 201 && value <= 400) {
        result = this.airQualityIndex[5];
      } else if (value >= 401 && value <= 800) {
        result = this.airQualityIndex[3];
      } else if (value >= 801 && value <= 1200) {
        result = this.airQualityIndex[4];
      } else if (value >= 1201 && value <= 1800) {
        result = this.airQualityIndex[5];
      } else {
        result = this.airQualityIndex[6];
      }
      return result
    },
  }
};