<template>

    <h2>Digite a sua localização: </h2>
    <!--<h4>País, Estado (UF), Cidade ou Bairro</h4>-->

    <div id="wrapper">
        <div id="form-wrapper">
            <div id="o-form">
                <input type="text" id="texto-localizacao" v-model="localizacao" />
                <div>
                    <button @click="retornaTempo">Informar o Clima</button>
                    <!--<button @click="usarLocalizacao">Usar a Localização</button>-->
                </div>
            </div>
            <div v-if="houveErro">{{ houveErro }}</div>
        </div>
    </div>

    <div v-if="localizacao.length > 0">
        <div v-if="dadosDoTempo" class="card">
            <div v-if="dadosDoTempo">
                <h2>{{ dadosDoTempo.name }}</h2>
                <div class="card-img">
                    <img :src="retornaUrlDoIconeDoTempo(dadosDoTempo.weather[0].icon)" class="w-16 h-16 mr-4" />
                    <p>{{ dadosDoTempo.weather[0].description }}</p>
                </div>
                <div>
                    <div class="temperatura">
                        <p>{{ retornaTemperatura() }}</p>
                    </div>
                    <div>
                        <button @click="alternaUnidadeDeTemperatura">
                            {{ retornaUnidadeDeTemperatura(true) }}
                        </button>
                    </div>
                </div>
                <div>
                    <div>
                        <p>{{ dadosDoTempo.time }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        {{ this.dadosDoTempo = null }}
    </div>

</template>

<script>

import Alerta from "sweetalert2";

export default {

    data() {
        return {
            localizacao: "",
            dadosDoTempo: null,
            ehCelsius: true,
            houveErro: null,
        };
    },

    methods: {
        async retornaTempo() {
            this.dadosDoTempo = null;
            this.houveErro = null;

            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${this.localizacao
                    }&appid=60015bca9662a2ab816cbdd318050800&units=${this.ehCelsius ? "metric" : "imperial"
                    }`
                );
                const data = await response.json();
                this.dadosDoTempo = data;

                const lat = data.coord.lat;
                const lon = data.coord.lon;
                const timezoneResponse = await fetch(
                    `https://api.timezonedb.com/v2.1/get-time-zone?key=NFSIRR9QZCE2&format=json&by=position&lat=${lat}&lng=${lon}`
                );
                const timezoneData = await timezoneResponse.json();
                const dateTime = new Date(timezoneData.formatted);
                this.dadosDoTempo.time = dateTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                });
            } catch (houveErro) {
                Alerta.fire("Erro", "Ocorreu um erro ao buscar os dados meteorológicos. Por favor, tente novamente mais tarde.", "error");
            }
        },
        retornaTemperatura() {
            if (this.ehCelsius) {
                return `${Math.round(this.dadosDoTempo.main.temp)}°C`;
            } else {
                return `${Math.round(this.dadosDoTempo.main.temp * 1.8 + 32)}°F`;
            }
        },
        retornaUnidadeDeTemperatura(short = false) {
            return this.ehCelsius
                ? short
                    ? "C"
                    : "Celsius"
                : short
                    ? "F"
                    : "Fahrenheit";
        },
        alternaUnidadeDeTemperatura() {
            this.ehCelsius = !this.ehCelsius;

            if (this.dadosDoTempo) {
                if (this.ehCelsius) {
                    this.dadosDoTempo.main.temp =
                        ((this.dadosDoTempo.main.temp - 32) * 5) / 9;
                } else {
                    this.dadosDoTempo.main.temp =
                        (this.dadosDoTempo.main.temp * 9) / 5 + 32;
                }
            }
            this.retornaTempo();
        },
        retornaUrlDoIconeDoTempo(icon) {
            try {
                return `https://openweathermap.org/img/w/${icon}.png`;
            } catch (houveErro) {
                Alerta.fire("Erro", houveErro, "error");
                return null;
            }
        },
        usarLocalizacao() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    try {
                        const response = await fetch(
                            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=60015bca9662a2ab816cbdd318050800&units=${this.ehCelsius ? "metric" : "imperial"
                            }`
                        );

                        const data = await response.json();
                        this.dadosDoTempo = data;

                    } catch (houveErro) {
                        Alerta.fire("Erro", "Ocorreu um erro ao buscar os dados meteorológicos. Por favor, tente novamente mais tarde.", "error");
                    }
                });
            } else {
                Alerta.fire("Atenção", "Geolocalização não está disponível", "info");
            }
        },
    },

    computed: {
        localizacaoEstaVazia() {
            return !this.localizacao && !("geolocation" in navigator);
        },
        retornaMensagemSobreTempo() {
            if (this.dadosDoTempo) {
                const weatherDescription = this.dadosDoTempo.weather[0].description;
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
