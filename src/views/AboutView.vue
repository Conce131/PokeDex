<template>
  <v-card @click="ShowDialog = true">
    <v-card-title> Título de la tarjeta </v-card-title>
    <v-card-text> Contenido de la tarjeta </v-card-text>
    <v-dialog v-model="ShowDialog">
      <v-card>
        <v-card-title> Título del diálogo </v-card-title>
        <v-card-text> Contenido del diálogo </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const ShowDialog = ref(false)
    return {
      ShowDialog
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
