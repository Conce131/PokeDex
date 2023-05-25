<template>
  <div class="d-flex flex-row flex-wrap align-center justify-center pa-2">
    <v-card
      @click="showDialog(item)"
      v-for="item in pokeList"
      :key="item.id"
      class="ma-4 !important"
    >
      <v-card-title>
        <p class="capitalize">{{ item.name }}</p>
      </v-card-title>
      <img :src="imageSrc + item.id + '.png'" alt="Pokemon" loading="lazy" />
      <v-card-text> {{ item.types }} </v-card-text>
    </v-card>
    <v-dialog v-model="dialogVisible" width="auto">
      <v-card class="flex items-center">
        <v-card-title class="flex flex-wrap capitalize">
          <p class="capitalize">{{ selectedPokemon.name }}</p>
          <v-btn @click="dialogVisible = false">X</v-btn>
        </v-card-title>

        <img :src="selectedPokemon.image" loading="lazy" />
        <v-card-text class="flex w-full text-center"
          ><p :id="selectedPokemon.type1" class="rounded-full justify-center w-[6rem]">
            {{ selectedPokemon.type1 }}
          </p>
          <p :id="selectedPokemon.type2" class="rounded-full justify-center w-[6rem] ml-2">
            {{ selectedPokemon.type2 }}
          </p>
        </v-card-text>

        <RouterLink :to="'/pokemon/' + selectedPokemon.id"> Mas informacion</RouterLink>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script type="module">
import { useRoute } from 'vue-router'

import { ref, onMounted, watch } from 'vue'
import getResponse from '../modules/api.js'
import axios from 'axios'
import { split } from 'postcss/lib/list'
export default {
  setup() {
    const route = useRoute()
    let region = ref(route.params.region)
    const pokeList = ref([])
    const imageSrc =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'
    const selectedPokemon = ref(null)
    const dialogVisible = ref(false)
    console.log(region)

    const fetchData = async () => {
      let url = ''
      if (region.value === 'Kanto') {
        url = `https://pokeapi.co/api/v2/pokemon?limit=151`
      } else if (region.value === 'Hoen') {
        url = `https://pokeapi.co/api/v2/pokemon?limit=100&offset=151`
      }
      const response = await getResponse(url)
      console.log(response)
      pokeList.value = []
      response.results.forEach((pokemon) => {
        pokeList.value.push({
          id: split(pokemon.url, '/')
            .filter((part) => !!part)
            .pop(),
          name: pokemon.name,
          type1: pokemon.types,
          url: pokemon.url
        })
      })
    }
    onMounted(fetchData)

    watch(() => {
      region.value = route.params.region
      fetchData()
    })

    async function showDialog(pokemon) {
      const response = await axios.get(pokemon.url)
      selectedPokemon.value = response.data
      selectedPokemon.value.image = imageSrc + selectedPokemon.value.id + '.png'
      dialogVisible.value = true
      selectedPokemon.value.type1 = selectedPokemon.value.types[0].type.name
      selectedPokemon.value.type2 = selectedPokemon.value.types[1].type.name
    }
    function saveSelectedPokemon() {
      localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemon.value))
    }

    return {
      region,
      pokeList,
      imageSrc,
      selectedPokemon,
      dialogVisible,
      showDialog,
      saveSelectedPokemon
    }
  }
}
</script>

<style>
#grass {
  background-color: theme('colors.grass');
}
#fire {
  background-color: theme('colors.fire');
}
#normal {
  background-color: theme('colors.normal');
}
#water {
  background-color: theme('colors.water');
}
#electric {
  background-color: theme('colors.electric');
}
#ice {
  background-color: theme('colors.ice');
}
#fighting {
  background-color: theme('colors.fighting');
}
#poison {
  background-color: theme('colors.poison');
}
#ground {
  background-color: theme('colors.ground');
}
#flying {
  background-color: theme('colors.flying');
}
#psychic {
  background-color: theme('colors.psychic');
}
#bug {
  background-color: theme('colors.bug');
}
#rock {
  background-color: theme('colors.rock');
}
#ghost {
  background-color: theme('colors.ghost');
}
#dragon {
  background-color: theme('colors.dragon');
}
#dark {
  background-color: theme('colors.dark');
}
#steel {
  background-color: theme('colors.steel');
}
#fairy {
  background-color: theme('colors.fairy');
}
</style>
