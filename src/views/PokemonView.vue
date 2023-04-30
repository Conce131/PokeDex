<template>
  <div>
    <h1>{{ pokemon.name }}</h1>
    <p>Peso : {{ pokemon.weight }}</p>
    <p>Habilidades:</p>
    <ul>
      <li v-for="items in abilities" :key="items">
        {{ items.ability.name }}
      </li>
    </ul>
    <img :src="imageSrc" alt="" />
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import getResponse from '../modules/api'

export default {
  setup() {
    const route = useRoute()
    const pokemon = ref([])
    const id = route.params.id
    const imageSrc =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
      id +
      '.png'
    const abilities = ref([])
    onMounted(async () => {
      const response = await getResponse(`https://pokeapi.co/api/v2/pokemon/${id}`)
      pokemon.value = response
      abilities.value = response.abilities
      console.log(abilities.value)
    })

    return { pokemon, imageSrc, abilities }
  }
}
</script>

<style>
img {
  width: 200px;
  height: 150px;
}
</style>
