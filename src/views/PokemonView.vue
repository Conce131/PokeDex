<template>
  <main class="flex justify-center">
    <div
      class="flex flex-wrap items-center justify-center mt-4 w-[25rem] h-[25rem] p-6 bg-emerald-50 border border-gray-200 rounded-lg shadow hover:bg-gray-100"
    >
      <div class="text-white text-[2rem] mr-2 bg-emerald-700 rounded-full p-2 w-16">#{{ id }}</div>
      <h1 class="text-green-800 text-[2.5rem] mr-[5rem]">
        {{ pokemon.name }}
      </h1>
      <img class="justify-center" :src="imageSrc" alt="" />
      <div class="shrink-0 mr-auto bg-emerald-300 w-full rounded-3xl p-4">
        <ul>
          <p class="text-green-700">Habilidades:</p>
          <li class="pl-4 text-green-600" v-for="items in abilities" :key="items">
            {{ items.ability.name }}
          </li>
          <li>
            <p class="py-2 text-green-700">Peso : {{ pokemon.weight }}</p>
          </li>
        </ul>
      </div>
    </div>
  </main>
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

    return { pokemon, imageSrc, abilities, id }
  }
}
</script>

<style>
img {
  width: 200px;
  height: 150px;
}
</style>
