<!-- alterar/corrigir -->
<template>
    <h2>Digite a sua localização: </h2>
    <div class="lista"> 
            <div class="flex flex-col sm:flex-row items-center">
                <input type="text" id="location-input" v-model="location"/>
                <div class="flex mt-2 sm:mt-0">
                    <button @click="getWeather"
                        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-l shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                        Informar o Clima
                    </button>
                    <button @click="getLocation"
                        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-r shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                        Usar a Localização Atual
                    </button>
                </div>
            </div>
        <div v-if="error">{{ error }}</div>
        <div v-if="weatherData"
            class="weather-info bg-blue-800 shadow-lg hover:shadow-xl rounded-lg p-6 w-80 transform hover:scale-105 transition duration-300 ease-in-out">
            <h2 class="text-2xl font-bold mb-4">{{ weatherData.name }}</h2>
            <div class="flex items-center mb-4">
                <img :src="getWeatherIconUrl(weatherData.weather[0].icon)" class="w-16 h-16 mr-4" />
                <p class="text-lg">{{ weatherData.weather[0].description }}</p>
            </div>
            <div class="flex justify-between mb-4">
                <div>
                    <p class="text-4xl font-bold">{{ getTemperature() }}</p>

                </div>
                <div>
                    <button @click="toggleTemperatureUnit"
                        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                        {{ getTemperatureUnit(true) }}
                    </button>
                </div>
            </div>
            <div class="flex justify-between mb-4">
                <div>
                    <p class="text-lg font-bold"></p>
                    <p class="text-lg">{{ weatherData.time }}</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import Alerta from "sweetalert2";

export default {
    name: "WeatherApp",
    data() {
        return {
            location: "",
            weatherData: null,
            isCelsius: true,
            error: null,
        };
    },
    methods: {
        async getWeather() {
            this.weatherData = null; // set weatherData to null before making API call
            this.error = null; // reset error state before making API call

            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${this.location
                    }&appid=60015bca9662a2ab816cbdd318050800&units=${this.isCelsius ? "metric" : "imperial"
                    }`
                );
                const data = await response.json();
                this.weatherData = data;

                const lat = data.coord.lat;
                const lon = data.coord.lon;
                const timezoneResponse = await fetch(
                    `https://api.timezonedb.com/v2.1/get-time-zone?key=NFSIRR9QZCE2&format=json&by=position&lat=${lat}&lng=${lon}`
                );
                const timezoneData = await timezoneResponse.json();
                const dateTime = new Date(timezoneData.formatted);
                this.weatherData.time = dateTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                });
            } catch (error) {
                this.error =
                    "An error occurred while fetching the weather data. Please try again later.";
            }
        },
        getTemperature() {
            if (this.isCelsius) {
                return `${Math.round(this.weatherData.main.temp)}°C`;
            } else {
                return `${Math.round(this.weatherData.main.temp * 1.8 + 32)}°F`;
            }
        },
        getTemperatureUnit(short = false) {
            return this.isCelsius
                ? short
                    ? "C"
                    : "Celsius"
                : short
                    ? "F"
                    : "Fahrenheit";
        },
        toggleTemperatureUnit() {
            this.isCelsius = !this.isCelsius;

            if (this.weatherData) {
                if (this.isCelsius) {
                    this.weatherData.main.temp =
                        ((this.weatherData.main.temp - 32) * 5) / 9;
                } else {
                    this.weatherData.main.temp =
                        (this.weatherData.main.temp * 9) / 5 + 32;
                }
            }
            this.getWeather();
        },
        getWeatherIconUrl(icon) {
            try {
                return `https://openweathermap.org/img/w/${icon}.png`;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
        getLocation() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    try {
                        const response = await fetch(
                            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=60015bca9662a2ab816cbdd318050800&units=${this.isCelsius ? "metric" : "imperial"
                            }`
                        );
                        const data = await response.json();
                        this.weatherData = data;
                    } catch (error) {
                        this.error =
                            "An error occurred while fetching the weather data. Please try again later.";
                    }
                });
            } else {
                alert("Geolocation is not available");
            }
        },
    },
    computed: {
        isLocationEmpty() {
            return !this.location && !("geolocation" in navigator);
        },
        getWeatherMessage() {
            if (this.weatherData) {
                const weatherDescription = this.weatherData.weather[0].description;
                return (
                    weatherDescription.charAt(0).toUpperCase() +
                    weatherDescription.slice(1)
                );
            }
            return "";
        },
    },
};
</script>
  
<style>
input:focus {
    outline: none;
    box-shadow: none;
}
</style>
