<template>
  <main class="flex justify-center">
    <div
      class="flex flex-wrap items-center justify-center mt-4 mb-10 w-[45rem] p-6 py-0 bg-emerald-50 border border-gray-200 rounded-lg shadow hover:bg-gray-100"
    >
      <div class="-mx-6 flex flex-shrink-1 w-[30rem] self-start">
        <button
          class="h-[3rem] transition-all duration-500 active:border-8 active:text-base w-50 hover:text-xl bg-emerald-800 text-green-200 hover:text-green-800 hover:bg-emerald-200 hover:border-x-4 hover:border-y-4 border-4 border-solid hover:border-solid border-emerald-800 rounded-tl-lg"
          @click="goToPreviousPokemon"
        >
          Previous
        </button>
        <button
          class="h-[3rem] transition-all duration-500 active:border-8 active:text-base w-50 hover:text-xl bg-emerald-800 text-green-200 hover:text-green-800 hover:bg-emerald-200 hover:border-x-4 hover:border-y-4 border-4 border-solid hover:border-solid border-emerald-800 rounded-tr-lg"
          @click="goToNextPokemon"
        >
          Next
        </button>
      </div>
      <div class="flex mt-4">
        <div
          class="flex justify-center items-center text-white text-[1.5rem] w-[4rem] h-[4rem] mr-2 bg-emerald-700 rounded-full p-2 w-16"
        >
          #{{ id }}
        </div>
        <h1 class="text-green-800 text-[2.5rem] mr-[5rem] capitalize">
          {{ pokemon.name }}
        </h1>
      </div>

      <!-- <p :v-if="types[1].type.name">{{ types[1].type.name }}</p> -->
      <img class="w-[30rem] h-[35rem] justify-center" :src="imageSrc" alt="" loading="lazy" />

      <div class="flex text-center">
        <!-- <img
          class="w-6 h-6"
          src="https://archives.bulbagarden.net/media/upload/7/79/Bug_icon.png"
          alt=""
        /> -->
        <!--  -->
        <p :id="type1" class="rounded-full w-[4rem]">
          {{ type1 }}
        </p>
        <div :v-if="type2">
          <p :id="type2" class="ml-2 rounded-full w-[4rem]">{{ type2 }}</p>
        </div>
      </div>

      <div v-for="(Description, index) in pokeDescription" :key="index">
        <p
          v-if="Description.language.name === 'es' && Description.version.name === 'alpha-sapphire'"
        >
          {{ Description.flavor_text }}
        </p>
      </div>
      <poke-chart
        class="border-solid border-emerald-800 border-4 rounded-3x1"
        v-if="pokemon.stats"
        :pokemonStats="pokemon.stats"
        :key="pokemon"
      />

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
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue'
import getResponse from '../modules/api'
import PokeChart from '@/components/PokeChart.vue'

export default {
  components: {
    PokeChart
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const pokemon = ref([])
    const species = ref([])
    const pokeDescription = ref([])
    let id = ref(route.params.id)
    const imageSrc = ref(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id.value}.png`
    )
    const abilities = ref([])
    const type1 = ref('')
    const type2 = ref('')

    const goToNextPokemon = () => {
      id.value = id.value === 1010 ? 1 : parseInt(id.value) + 1
      router.replace(`/pokemon/${id.value}`)
    }
    const goToPreviousPokemon = () => {
      id.value = id.value <= 1 ? 1010 : parseInt(id.value) - 1
      router.replace(`/pokemon/${id.value}`)
    }

    const fetchData = async () => {
      const pokeResponse = await getResponse(`https://pokeapi.co/api/v2/pokemon/${id.value}`)
      const speciesResponse = await getResponse(
        `https://pokeapi.co/api/v2/pokemon-species/${id.value}`
      )
      species.value = speciesResponse
      pokeDescription.value = speciesResponse.flavor_text_entries
      pokemon.value = pokeResponse
      abilities.value = pokeResponse.abilities
      type1.value = pokeResponse.types[0].type.name
      type2.value = pokeResponse.types[1] ? pokeResponse.types[1].type.name : ''
      imageSrc.value = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id.value}.png`
    }

    onMounted(fetchData)

    watch(id, fetchData)

    const BgType = computed(() => `bg-${type1.value}`)
    return {
      pokemon,
      imageSrc,
      abilities,
      id,
      type1,
      type2,
      pokeDescription,
      BgType,
      goToPreviousPokemon,
      goToNextPokemon
    }
  }
}
</script>

<style>
img {
  width: 200px;
  height: 150px;
}

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
