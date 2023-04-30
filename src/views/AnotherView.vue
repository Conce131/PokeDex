<template>
  <div>
    <v-card
      @click="showDialog(item)"
      v-for="(item, index) in pokeList"
      :key="index"
      :class="{ 'bg-orange': true, 'm-2': true }"
    >
      <v-card-title> {{ item.name }} </v-card-title>
      <img :src="imageSrc + (index + 1) + '.png'" alt="Pokemon" />
      <v-card-text> Contenido de la tarjeta </v-card-text>
    </v-card>
    <v-dialog v-model="dialogVisible">
      <v-card>
        <RouterLink :to="'/pokemon/' + selectedPokemon.id">
          <v-card-title>{{ selectedPokemon.name }}</v-card-title>
        </RouterLink>
        <img :src="selectedPokemon.image" />

        <v-card-text>{{ selectedPokemon.description }}</v-card-text>
        <v-card-actions>
          <v-btn @click="dialogVisible = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script type="module">
import { ref, onMounted } from 'vue'
import getResponse from '../modules/api.js'
import axios from 'axios'
export default {
  setup() {
    const pokeList = ref([])
    const imageSrc =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'
    const selectedPokemon = ref(null)
    const dialogVisible = ref(false)

    onMounted(async () => {
      const response = await getResponse(`https://pokeapi.co/api/v2/pokemon?limit=151`)
      response.results.forEach((pokemon, index) => {
        pokeList.value.push({
          id: index + 1,
          name: pokemon.name,

          url: pokemon.url
        })
      })
    })
    async function showDialog(pokemon) {
      const response = await axios.get(pokemon.url)
      selectedPokemon.value = response.data
      selectedPokemon.value.image = imageSrc + selectedPokemon.value.id + '.png'
      dialogVisible.value = true
    }
    function saveSelectedPokemon() {
      localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemon.value))
    }

    return { pokeList, imageSrc, selectedPokemon, dialogVisible, showDialog, saveSelectedPokemon }
  }
}
</script>
