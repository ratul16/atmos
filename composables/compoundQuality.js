// Define the air quality information
const airQualityInfo = {
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
};

// Define the air quality index
const airQualityIndex = {
  1: {
    name: 'Good',
    color: '#1D8348'
  },
  2: {
    name: 'Satisfactory',
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
};

// Function to determine air quality based on O3 values
const o3Quality = (value) => {
  if (value <= 50) return airQualityIndex[1];
  if (value >= 51 && value <= 100) return airQualityIndex[5];
  if (value >= 101 && value <= 168) return airQualityIndex[3];
  if (value >= 169 && value <= 208) return airQualityIndex[4];
  if (value >= 209 && value <= 748) return airQualityIndex[5];
  return airQualityIndex[6];
};

// Function to determine air quality based on NO2 values
const no2Quality = (value) => {
  if (value <= 40) return airQualityIndex[1];
  if (value >= 41 && value <= 80) return airQualityIndex[2];
  if (value >= 81 && value <= 180) return airQualityIndex[3];
  if (value >= 181 && value <= 280) return airQualityIndex[4];
  if (value >= 281 && value <= 400) return airQualityIndex[5];
  return airQualityIndex[6];
};

// Function to determine air quality based on CO values
const coQuality = (value) => {
  if (value <= 1) return airQualityIndex[1];
  if (value >= 1.1 && value <= 2.0) return airQualityIndex[5];
  if (value >= 2.1 && value < 10) return airQualityIndex[3];
  if (value > 10 && value < 17) return airQualityIndex[4];
  if (value > 17 && value < 34) return airQualityIndex[5];
  return airQualityIndex[6];
};

// Function to determine air quality based on SO2 values
const so2Quality = (value) => {
  if (value >= 0 && value <= 40) return airQualityIndex[1];
  if (value >= 41 && value <= 80) return airQualityIndex[5];
  if (value >= 81 && value <= 380) return airQualityIndex[3];
  if (value >= 381 && value <= 800) return airQualityIndex[4];
  if (value >= 801 && value <= 1600) return airQualityIndex[5];
  return airQualityIndex[6];
};

// Function to determine air quality based on NH3 values
const nh3Quality = (value) => {
  if (value >= 0 && value <= 200) return airQualityIndex[1];
  if (value >= 201 && value <= 400) return airQualityIndex[5];
  if (value >= 401 && value <= 800) return airQualityIndex[3];
  if (value >= 801 && value <= 1200) return airQualityIndex[4];
  if (value >= 1201 && value <= 1800) return airQualityIndex[5];
  return airQualityIndex[6];
};

// Export the composable
export const useAirQuality = () => {
  return {
    airQualityInfo,
    airQualityIndex,
    o3Quality,
    no2Quality,
    coQuality,
    so2Quality,
    nh3Quality,
  };
};
