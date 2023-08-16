<template>
  <Cabecalho>

    <template v-slot:subtitulo>
        <h2>Utilizando</h2>
    </template>

    <template v-slot:extra>
        <h3>VueJS e SweetAlert2</h3>
    </template>
    
  </Cabecalho>
  <Tempo/> 
</template>


<script>
import "./assets/estilo.css";
import Cabecalho from "./components/Cabecalho.vue";
import Tempo from "./components/Tempo.vue";

export default {
  components: { 
    Cabecalho, 
    Tempo
  },
  methods: {},
  computed: {},
};
</script>

<style>
</style>
