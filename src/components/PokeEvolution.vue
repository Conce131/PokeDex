<template>
  <div>{{ species.evolution_chain }}</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import getResponse from '../modules/api'
export default {
  props: ['species'],
  setup(props) {
    const evo = ref({})
    const species = ref([props.species])
    console.log(species)
    const fetchEvoData = async () => {
      console.log(props.species)
      const response = await getResponse(`https://pokeapi.co/api/v2/evolution-chain`)

      return { response }
    }
    onMounted(fetchEvoData)
    return {
      evo
    }
  }
}
</script>
