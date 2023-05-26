<template>
  <div>
    {{ weakness }}
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import getResponse from '../modules/api'
export default {
  props: ['type1', 'type2'],
  setup(props) {
    const typeInfo = ref([])
    const typeInfo2 = ref([])
    const type1 = ref(props.type1)
    const type2 = ref(props.type2)
    const weakness = ref({})
    const fetchTypeData = async () => {
      console.log(type1.value)
      const typeResponse = await getResponse(`https://pokeapi.co/api/v2/type/${type1.value}`)
      typeInfo.value = typeResponse
      weakness.value = typeResponse.damage_relations.double_damage_from
      if (type2.value) {
        const typeResponse2 = await getResponse(`https://pokeapi.co/api/v2/type/${type2.value}`)
        typeInfo2.value = typeResponse2

        console.log(weakness.value)
      }
    }
    onMounted(fetchTypeData)
    return {
      typeInfo,
      typeInfo2,
      weakness
    }
  }
}
</script>
