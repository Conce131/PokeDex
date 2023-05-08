<template>
  <main class="flex justify-center">
    <div
      class="flex flex-wrap items-center justify-center mt-4 w-[30rem] h-[30rem] p-6 bg-emerald-50 border border-gray-200 rounded-lg shadow hover:bg-gray-100"
    >
      <div
        class="flex justify-center items-center text-white text-[1.5rem] w-[4rem] h-[4rem] mr-2 bg-emerald-700 rounded-full p-2 w-16"
      >
        #{{ id }}
      </div>
      <h1 class="text-green-800 text-[2.5rem] mr-[5rem]">
        {{ pokemon.name }}
      </h1>

      <!-- <p :v-if="types[1].type.name">{{ types[1].type.name }}</p> -->
      <img class="justify-center" :src="imageSrc" alt="" loading="lazy" />
      <div class="flex justify-center bg-green rounded-full w-[4rem]">
        <!-- <img
          class="w-6 h-6"
          src="https://archives.bulbagarden.net/media/upload/7/79/Bug_icon.png"
          alt=""
        /> -->
        <p>{{ type1 }}</p>
        <p :v-if="type2 == ''">{{ type2 }}</p>
      </div>
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
    const type1 = ref('')
    const type2 = ref('')

    onMounted(async () => {
      const response = await getResponse(`https://pokeapi.co/api/v2/pokemon/${id}`)
      pokemon.value = response
      abilities.value = response.abilities
      type1.value = response.types[0].type.name
      type2.value = response.types[1].type.name

      console.log(type1.value)
    })

    return { pokemon, imageSrc, abilities, id, type1, type2 }
  }
}
</script>

<style>
img {
  width: 200px;
  height: 150px;
}
</style>
