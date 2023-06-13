<template>
  <div
    class="flex flex-row space-x-6 my-6 py-6 bg-emerald-400 bg-[url('./assets/body_bg.png')] bg-repeat w-[95%] justify-center rounded-3xl"
  >
    <div class="flex flex-wrap justify-center" v-for="level in evolutions" :key="level.level">
      <div id="arrow" v-if="level.level > 0" class="shrink-0 flex align-center pl-8 w-[3rem] h-[100%]">
        <span ></span>
        <span ></span>
        <span ></span>
      </div>

      <div><div class="p-2 max-h-[15rem]" v-for="evolution in level.evolutions" :key="evolution.id">

        <div class="flex shrink-1 flex-col items-center">
          <div
            class="flex shrink align-center border-emerald-800 border-8 rounded-full w-[13rem] h-[13rem] bg-emerald-50 hover:bg-gray-100 justify-center"
          >
            <img
              id="evo"
              class="cursor-pointer shrink max-w-[11wm] max-h-[11wm]"
              :src="evolution.image"
              @click="goToEvo(evolution.id)"
            />
          </div>
          <div class="overflow-hidden text-center">
            {{ evolution.name }}
          </div>
        </div>
      </div></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import getResponse from '../modules/api'
import { useRouter } from 'vue-router'

export default {
  props: ['species'],
  setup(props) {
    const router = useRouter()
    const evolutions = ref([])

    const fetchEvoData = async () => {
      const chainResponse = await getResponse(props.species.evolution_chain.url)
      const chain = chainResponse.chain

      const getNumberUrl = (url) => {
        const parts = url.split('/')
        return parts[parts.length - 2]
      }

      const getEvolutionData = (evolution) => {
        const id = getNumberUrl(evolution.species.url)
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        return { id, name: evolution.species.name, image }
      }

      const evolutionsData = []

      const processEvolutionChain = (evolution, level) => {
        if (!evolutionsData[level]) {
          evolutionsData[level] = { level: level, evolutions: [] }
        }

        const evolutionData = getEvolutionData(evolution)
        evolutionsData[level].evolutions.push(evolutionData)

        if (evolution.evolves_to.length > 0) {
          for (const nestedEvolution of evolution.evolves_to) {
            processEvolutionChain(nestedEvolution, level + 1)
          }
        }
      }
      processEvolutionChain(chain, 0)

      evolutions.value = evolutionsData
      console.log(evolutions.value)
    }

    const goToEvo = (id) => {
      router.replace(`/pokemon/${id}`)
    }

    onMounted(fetchEvoData)

    return {
      evolutions,
      goToEvo
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

#arrow {
  cursor: pointer;
}

#arrow span {
  width: 1vw;
  height: 1vw;
  border-top: 5px solid white;
  border-left: 5px solid white;
  transform: rotate(0deg);
  margin: -10px;
  animation: animate 2s infinite reverse;
}

#arrow span:nth-child(2) {
  animation-delay: 0.2s;
}

#arrow span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: rotate(135deg) translate(0px, 0px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(135deg) translate(20px, 20px);
  }
}
</style>
