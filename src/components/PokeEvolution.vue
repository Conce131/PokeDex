<template>
  <div
    class="flex flex-row space-x-6 my-6 py-6 bg-emerald-400 bg-[url('./assets/body_bg.png')] bg-repeat w-[95%] justify-center rounded-3xl"
  >
    <div>
      <div
        class="flex align-center border-emerald-800 border-8 rounded-full w-[13rem] h-[13rem] bg-emerald-50 hover:bg-gray-100"
      >
        <img id="evo" :src="evo1Img" />
      </div>
      {{ evo1 }}
    </div>
    <div>
      <div
        class="flex align-center border-emerald-800 border-8 rounded-full w-[13rem] h-[13rem] bg-emerald-50 hover:bg-gray-100"
        v-if="evo2"
      >
        <img id="evo" :src="evo2Img" />
      </div>
      {{ evo2 }}
    </div>
    <div>
      <div
        class="flex align-center border-emerald-800 border-8 rounded-full w-[13rem] h-[13rem] bg-emerald-50 hover:bg-gray-100 justify-center"
        v-if="evo3"
      >
        <img id="evo" :src="evo3Img" />
      </div>
      {{ evo3 }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import getResponse from '../modules/api'
export default {
  props: ['species'],
  setup(props) {
    const evo = ref({})
    const species = ref([props.species])
    const evoChain = ref([])
    const evo1 = ref('')
    const evo2 = ref('')
    const evo3 = ref('')
    const evo1Id = ref('')
    const evo2Id = ref('')
    const evo3Id = ref('')
    const evo1Img = ref('')
    const evo2Img = ref('')
    const evo3Img = ref('')
    // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id.value}.png
    console.log(species)
    const fetchEvoData = async () => {
      const chainResponse = await getResponse(props.species.evolution_chain.url)
      console.log(chainResponse)
      evoChain.value = chainResponse
      evo1.value = chainResponse.chain.species.name
      evo2.value = chainResponse.chain.evolves_to[0].species.name
        ? chainResponse.chain.evolves_to[0].species.name
        : null
      evo3.value =
        chainResponse.chain.evolves_to[0].evolves_to[0] !== undefined
          ? chainResponse.chain.evolves_to[0].evolves_to[0].species.name
          : null
      const getNumberUrl = (url) => {
        const parts = url.split('/')
        return parts[parts.length - 2]
      }
      evo1Id.value = getNumberUrl(chainResponse.chain.species.url)
      evo2Id.value = chainResponse.chain.evolves_to[0].species.name
        ? getNumberUrl(chainResponse.chain.evolves_to[0].species.url)
        : null

      evo3Id.value = evo3.value
        ? getNumberUrl(chainResponse.chain.evolves_to[0].evolves_to[0].species.url)
        : null
      console.log(evo1Id.value)
      console.log(evo2Id.value)
      console.log(evo3Id.value)
      evo1Img.value = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo1Id.value}.png`
      evo2Img.value = evo2.value
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo2Id.value}.png`
        : null
      evo3Img.value = chainResponse.chain.evolves_to[0].evolves_to[0].species.name
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo3Id.value}.png`
        : null
    }
    onMounted(fetchEvoData)
    return {
      evo,
      evo1,
      evo2,
      evo3,
      evo1Img,
      evo2Img,
      evo3Img
    }
  }
}
</script>

<style>
#evo:hover {
  animation: bounce 1s linear;
}

@keyframes bounce {
  20%,
  50%,
  80%,
  to {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  70% {
    transform: translateY(-15px);
  }
  90% {
    transform: translateY(4px);
  }
}
</style>
