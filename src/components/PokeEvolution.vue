<template>
  <div>{{ evo1 }}, {{ evo2 }}, {{ evo3 }}</div>
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
    // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id.value}.png
    console.log(species)
    const fetchEvoData = async () => {
      const chainResponse = await getResponse(props.species.evolution_chain.url)
      console.log(chainResponse)
      evoChain.value = chainResponse
      evo1.value = chainResponse.chain.species.name
      evo2.value = chainResponse.chain.evolves_to[0].species.name
      evo3.value = chainResponse.chain.evolves_to[0].evolves_to[0].species.name
      const getNumberUrl = (url) => {
        const parts = url.split('/')
        return parts[parts.length - 2]
      }
      const evo1Id = getNumberUrl(chainResponse.chain.species.url)
      console.log(chainResponse.chain.species.url)
      console.log()
      console.log((evo1, evo2, evo3))
    }
    onMounted(fetchEvoData)
    return {
      evo,
      evo1,
      evo2,
      evo3
    }
  }
}
</script>
