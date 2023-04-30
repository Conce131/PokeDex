<template>
  <div>
    <p>this is my anotherview</p>
    <ul>
      <li v-for="(item, index) in pokeList" :key="index">
        <RouterLink :to="'/pokemon/' + (index + 1)">
          {{ item.name }}
        </RouterLink>
        <RouterView />
      </li>
    </ul>
  </div>
</template>

<script type="module">
import { ref, onMounted } from 'vue'
import getResponse from '../modules/api.js'
export default {
  setup() {
    const pokeList = ref([])
    onMounted(async () => {
      const response = await getResponse(`https://pokeapi.co/api/v2/pokemon?limit=151`) // Usar $api.getResponse()
      pokeList.value = response.results
    })
    return { pokeList }
  }
}
</script>
