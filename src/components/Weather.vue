<template>
    <div class="container">

        <div class="head pt-4">
            <h1 class="text-uppercase font-weight-bold">
                <transition name="fade">
                    <img v-if="show" src="../assets/logo.svg" class="mr-2" width="60">
                </transition>
                <span class="appname">a</span>t<span class="appname">m</span>o<span class="appname">s</span>
            </h1>

            <br />
            <div class="searchbar mx-auto">
                <form class="form-group justify-content-center" @submit="searchWeather($event)">
                    <div class="p-1 bg-light rounded rounded-pill shadow mb-4">
                        <div class="input-group">
                            <input
                                type="search"
                                placeholder=" Enter City Name...."
                                aria-describedby="button-addon1"
                                class="form-control border-0 bg-light ml-2"
                                v-model="search"
                            />
                            <div class="input-group-append">
                                <button
                                    id="button-addon1"
                                    type="submit"
                                    class="btn btn-link text-dark"
                                >
                                    <i class="fas fa-umbrella"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="weatherbody" v-if="!show">
            <img src="../assets/logo.svg" alt="" srcset="">
            <h4 class="text capitalize">Your Neighborhood Weather App</h4>
        </div>

        <transition name="fade">
            <div class="weatherUpdate" v-if="show" >
                <div class="card forcast rounded shadow my-4" :class="data.base.temp <=20 ? 'cold':'' ">
                    
                    <div class="card-body text-center">
                        <div class="info-board">
                            <span class="temp">{{ data.base.temp }}&#176;</span>
                            <span class="h2 font-weight-bold">C</span>
                            <br />                           
                            
                        </div>
                    </div>

                </div>

                <div class="country my-4">
                    <div class="card rounded shadow border-0">
                        <div class="card-body text-left text-capitalize">
                            <h4 class="">{{ data.name }}, {{ data.city.country }}</h4>
                            <h5>{{ data.condition.description }}</h5>
                            <h6>Geo Coords : [ {{ data.coord.lat }}, {{ data.coord.lon }} ]</h6>
                            <h6>Country Code : {{data.city.id}}</h6>
                        </div>
                    </div>
                </div>


                <div class="details">
                    <div class="">
                        <h4 class="text-left mb-2">
                            <strong>Details</strong> 
                            <img :src="`https://openweathermap.org/img/wn/${data.condition.icon}@2x.png`" width="70" loading='lazy' />
                        </h4>
                    </div>
                    


                    <div class="row">

                        <div class="col-sm-6 col-md-4 col-lg-4">
                            <div class="card rounded shadow">
                                <div class="card-body font-weight-bold">
                                    <div class="text-left">
                                        <i class="fas fa-thermometer-full weather mr-4"></i>
                                    <span class="title">Temperature</span>
                                    </div>
                                    <div class="text-right value">
                                        <span>{{data.base.temp_min}}&#176;C | {{data.base.temp_max}}&#176;C</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-6 col-md-4 col-lg-4">
                            <div class="card rounded shadow">
                                <div class="card-body font-weight-bold">
                                    <div class="text-left">
                                        <i class="fas fa-thermometer-half weather mr-4"></i>
                                    <span class="title">Feels like</span>
                                    </div>
                                    <div class="text-right value">
                                        <span> {{data.base.feels_like}}&#176;C</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-6 col-md-4 col-lg-4">
                            <div class="card rounded shadow">
                                <div class="card-body font-weight-bold">
                                    <div class="text-left">
                                        <i class="fas fa-compass weather mr-4"></i>
                                    <span class="title">Pressure</span>
                                    </div>
                                    <div class="text-right value">
                                        <span>{{data.base.pressure}} hPa</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-6 col-md-4 col-lg-4">
                            <div class="card rounded shadow">
                                <div class="card-body font-weight-bold">
                                    <div class="text-left">
                                        <i class="fas fa-tint weather mr-4"></i>
                                    <span class="title">Humidity</span>
                                    </div>
                                    <div class="text-right value">
                                        <span>{{data.base.humidity}} %</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-6 col-md-4 col-lg-4">
                            <div class="card rounded shadow">
                                <div class="card-body font-weight-bold">
                                    <div class="text-left">
                                        <i class="fas fa-wind weather mr-4"></i>
                                    <span class="title">Wind Speed</span>
                                    </div>
                                    <div class="text-right value">
                                        <span>{{data.wind.speed}} m/s</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-6 col-md-4 col-lg-4">
                            <div class="card rounded shadow">
                                <div class="card-body font-weight-bold">
                                    <div class="text-left">
                                        <i class="fas fa-cloud weather mr-4"></i>
                                    <span class="title">Cloudy</span>
                                    </div>
                                    <div class="text-right value">
                                        <span>{{data.cloudy}} %</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-6 col-md-4 col-lg-4">
                            <div class="card rounded shadow">
                                <div class="card-body font-weight-bold">
                                    <div class="text-left">
                                        <i class="fas fa-sun weather mr-4"></i>
                                    <span class="title">Sunrise</span>
                                    </div>
                                    <div class="text-right value">
                                        <span>{{getTime(data.city.sunrise)}} AM</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-6 col-md-4 col-lg-4">
                            <div class="card rounded shadow">
                                <div class="card-body font-weight-bold">
                                    <div class="text-left">
                                        <i class="far fa-sun weather mr-4"></i>
                                    <span class="title">Sunset</span>
                                    </div>
                                    <div class="text-right value">
                                        <span>{{getTime(data.city.sunset)}} PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-sm-6 col-md-4 col-lg-4">
                            <div class="card rounded shadow">
                                <div class="card-body font-weight-bold">
                                    <div class="text-left">
                                        <i class="fas fa-clock weather mr-4"></i>
                                    <span class="title">Timezone</span>
                                    </div>
                                    <div class="text-right value">
                                        <span>{{data.timezone}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>

            <!-- <div class="daily my-4">
                <h4 class="text-left"><strong>Daily Update</strong></h4>
            </div> -->
        </transition>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        show:false,
        search:'',
        data:{
            name : '',
            condition:'',
            city : '',
            base: '',
            wind : '',
            cloudy : '',
            coord:'',
            timezone:''
        }
    }),
    methods: {
        async searchWeather(e) {
            e.preventDefault()

            const cityValid = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(this.search)
            cityValid ? false : alert("Wrong City Name")


            let KEY = process.env.VUE_APP_KEY; 
            
            const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.search}&APPID=${KEY}&units=metric`

            await axios.get(API)
            .then(res => {

                let val  = res.data
                let weather = {
                    name : val.name,
                    condition:val.weather[0],
                    city : val.sys,
                    base: val.main,
                    wind : val.wind,
                    cloudy : val.clouds.all,
                    coord:val.coord,
                    timezone: val.timezone
                }
                //console.log(weather)
                this.data = weather
                this.show = true
                //this.$emit('temp',val.main.temp)
                this.search =''
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                alert('City Name Invaild/ Not Found.\nUse Proper City Name. Ex: new york, london ')
            })

        },
        getTime(val){
            let date = new Date(val*1000);
            let hr = date.getHours();
            let m = "0" + date.getMinutes();
            let s = "0" + date.getSeconds();
            return hr+ ' : ' + m.substr(-2) + ' : ' + s.substr(-2);
        }
        
    },
};
</script>

<style>


</style>
