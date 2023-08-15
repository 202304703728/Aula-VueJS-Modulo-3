<template>
  <h2>Selecione uma cidade: {{ cidadeselecionada }}</h2>
  <div class="lista">
    <CardCidade
      v-for="cidade in cidades"
      :key="cidade.id"
      :cidade="cidade"
      v-on:cidadeclicada="mudarcidadeselecionada"
    />
  </div>
</template>

<!--<vue-basic-alert ref="alert" /> -->

<script>

import CardCidade from "./CardCidade.vue";
import Alerta from "sweetalert2";

export default {
  components: { CardCidade },
  methods:{
    mudarcidadeselecionada(cidade){
      //alert(cidade.name)
      //Alerta.fire("Você clicou em:", cidade.name,"info")
      Alerta.fire({
        //position: 'top-end',
        icon: 'info',
        title: 'Você clicou em:' + cidade.name,
        showConfirmButton: true,
        confirmButtonText: "Entendido",
        //timer: 1500
      })
    }
  },
  data() {
    return {
      cidadeselecionada : "",
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
};
</script>

<style>
</style>