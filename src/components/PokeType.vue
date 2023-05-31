<template>
  <div class="flex flex-wrap text-center">
    <p
      class="rounded-full w-[5rem] m-2 flex-wrap"
      v-for="weaknessTypes in weaknessTypes"
      :key="weaknessTypes"
      :id="weaknessTypes"
    >
      {{ weaknessTypes }}
    </p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import getResponse from '../modules/api'

export default {
  props: ['type1', 'type2'],
  setup(props) {
    const weakness = ref({})
    const weaknessTypes = ref([])

    const fetchTypeData = async () => {
      // Función para obtener las relaciones de daño de un tipo específico
      const fetchType = async (type) => {
        const typeResponse = await getResponse(`https://pokeapi.co/api/v2/type/${type}`)
        return typeResponse.damage_relations
      }

      // Obtener las relaciones de daño para el primer tipo
      const type1DamageRelations = await fetchType(props.type1)

      // Obtener las relaciones de daño para el segundo tipo si está presente
      const type2DamageRelations = props.type2 ? await fetchType(props.type2) : null

      // Obtener los tipos de daño doble para el primer y segundo tipo
      const doubleDamageFrom1 = type1DamageRelations.double_damage_from.map((type) => type.name)
      const doubleDamageFrom2 = type2DamageRelations
        ? type2DamageRelations.double_damage_from.map((type) => type.name)
        : []

      // Obtener los tipos de daño reducido para el primer y segundo tipo
      const halfDamageFrom1 = type1DamageRelations.half_damage_from
        ? type1DamageRelations.half_damage_from.map((type) => type.name)
        : []
      const halfDamageFrom2 =
        type2DamageRelations && type2DamageRelations.half_damage_from
          ? type2DamageRelations.half_damage_from.map((type) => type.name)
          : []

      // Combinar los tipos de daño doble de ambos tipos
      const combinedTypes = doubleDamageFrom1.concat(doubleDamageFrom2)
      console.log('estos son los tipos debiles: ' + combinedTypes)

      // Combinar los tipos de daño reducido de ambos tipos
      const excludedTypes = halfDamageFrom1.concat(halfDamageFrom2)
      console.log('estos son los tipos resistentes: ' + excludedTypes)
      // Iterar sobre los tipos de daño doble combinados y excluir los tipos de daño reducido
      combinedTypes.forEach((type) => {
        if (excludedTypes.includes(type)) {
          console.log(`No es debil contra: ${type}`)
        } else {
          weakness.value[type] = true
        }
      })
      console.log(weakness.value)
      // Obtener la lista de tipos de debilidad resultantes
      weaknessTypes.value = Object.keys(weakness.value)
    }

    onMounted(fetchTypeData)

    return {
      weakness,
      weaknessTypes
    }
  }
}
</script>
