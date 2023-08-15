<!-- antigo
<template>
  <h1>App Clima</h1>
  <div class="lista">
    <div class="card" v-for="cidade in cidades" :key="cidade.id">
      <div class="card-img"></div>
      <h3>{{ cidade.name }}</h3>
      <h4>{{ cidade.description }}</h4>
      <div class="temperatura">{{ cidade.temp }}º</div>
    </div>
  </div>
</template>

<script>

import './assets/estilo.css'

export default {
    data() {
      return {
        cidades: [
          {
            id: 8429,
            name: "Rio de Janeiro",
            description: "Ensolarado",
            icon: "01d",
            temp: "25",
          },
          {
            id: 8412,
            name: "Manaus",
            description: "Chuvas Fortes",
            icon: "09d",
            temp: "25",
          },
          {
            id: 8454,
            name: "Brasília",
            description: "Ensolarado",
            icon: "10d",
            temp: "27.4",
          },
        ],
      };
  },
}
</script>

<style scoped>

</style>
-->


<template>
  <Cabecalho>

    <template v-slot:subtitulo>
        <h2>Utilizando</h2>
    </template>

    <template v-slot:extra>
        <h3>VueJS e SweetAlert2</h3>
    </template>
    
  </Cabecalho>

  <ListaCidades />
  <!-- corrigir primeiro -->
  <!--<Tempo /> -->
</template>


<script>
import "./assets/estilo.css";
import Cabecalho from "./components/Cabecalho.vue";
import ListaCidades from "./components/ListaCidades.vue";
import Tempo from "./components/Tempo.vue";

export default {
  components: { 
    Cabecalho,
    ListaCidades, 
    Tempo
  },
  methods: {},
  computed: {},
};
</script>

<style>
</style>
