<script>
import { Line } from "vue-chartjs";
import data from '@/assets/data.json'
// import axios from 'axios'

export default {
    props:['tData','city'],
    extends: Line,
    data: () => ({
        daily : data,
        loaded:false,
        labels: ["Day1","Day2","Day3","Day4","Day5","Day6","Day7"],
        data: [1,4,2,3,1,4,2,5],
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
        this.arrangeVal(),
        this.renderChart({
        labels: this.labels,
        datasets: [
            {
                label: '',
                borderColor: '#3498DB',
                pointBackgroundColor: 'white',
                borderWidth: 4,
                pointBorderColor: '#3498DB',
                radius:4,
                backgroundColor: '#c7e5f9',
                data: this.tData
            },
        ]
        }, this.options);
    },
    methods:{
        arrangeVal(){
            console.log("Got data")
        },
    },
};
</script>

<style>

</style>