<template>
  <div class="container">
    <line-chart
      v-if="loaded"
      :chartdata="data"
      :options="options"/>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import Daily from '@/assets/daily.json'

export default {
    extends: Line,
    data: () => ({
        daily : Daily,
        loaded:false,
        labels: ["Day1","Day2","Day3","Day4","Day5","Day6","Day7","Day7"],
        data: [1,4,2,3,1,4,2,5],
        temp: {
            day:[],
            night:[]
        },
        pressure: [],
        humidity: [],
        wind: [],
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false,
                        },
                        gridLines: {
                            display: true,
                        },
                    },
                ],
                xAxes: [
                    {
                        gridLines: {
                            display: true,
                        },
                    },
                ],
            },
            legend: {
                display: true,
            },
            responsive: true,
            maintainAspectRatio: false,
        },
    }),
    mounted() {
        this.renderChart({
        labels: this.labels,
        datasets: [
            {
                label: 'Day Temp',
                borderColor: '#e74c3c',
                pointBackgroundColor: 'white',
                borderWidth: 2,
                pointBorderColor: '#e74c3c',
                backgroundColor: 'transparent',
                data: this.temp.day
            },
            {
                label: 'Night Temp',
                borderColor: '#e74c3c',
                pointBackgroundColor: 'white',
                borderWidth: 2,
                pointBorderColor: '#e74c3c',
                backgroundColor: 'transparent',
                data: this.temp.night
            },
        ]
      }, this.options),
      this.getData(),
      console.log( this.temp.day)
    },
    methods:{
        getData(){
            let data = this.daily.daily

            data.forEach(val => {
                this.temp.night.push(val.temp.night)
                this.temp.day.push(val.temp.day)
                //this.temp.night.push(val.temp.night)
                //console.log(val.temp.day)
                this.loaded = true;
            });

        }
    },
    watch:{
        loaded(isLoaded){
            if(isLoaded){
                this.drawChart();
            }
        }
    },
};
</script>

<style></style>
