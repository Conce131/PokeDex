<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

export default {
  props: ['pokemonStats'],
  setup(props) {
    const chartCanvas = ref(null)

    onMounted(() => {
      const ctx = chartCanvas.value.getContext('2d')
      const maxStatValue = 150

      const datasets = props.pokemonStats.map((stat) => ({
        label: stat.stat.name,
        data: [stat.base_stat],
        backgroundColor: getBackgroundColor(stat.stat.name),
        borderColor: getBorderColor(stat.stat.name),
        borderWidth: 1
      }))

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [''],
          datasets: datasets
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: maxStatValue,
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false // Oculta la leyenda del gráfico
            }
          }
        }
      })
    })

    function getBackgroundColor(statName) {
      // Asigna un color diferente a cada estadística
      // Puedes personalizar esta lógica con tus propios colores
      switch (statName) {
        case 'hp':
          return 'rgba(75, 192, 192, 0.2)'
        case 'attack':
          return 'rgba(255, 99, 132, 0.2)'
        case 'defense':
          return 'rgba(54, 162, 235, 0.2)'
        case 'special-attack':
          return 'rgba(255, 206, 86, 0.2)'
        case 'special-defense':
          return 'rgba(153, 102, 255, 0.2)'
        case 'speed':
          return 'rgba(255, 159, 64, 0.2)'
        default:
          return 'rgba(0, 0, 0, 0.2)' // Color predeterminado
      }
    }

    function getBorderColor(statName) {
      // Asigna un color de borde correspondiente al color de fondo de cada estadística
      // Puedes personalizar esta lógica con tus propios colores
      switch (statName) {
        case 'hp':
          return 'rgba(75, 192, 192, 1)'
        case 'attack':
          return 'rgba(255, 99, 132, 1)'
        case 'defense':
          return 'rgba(54, 162, 235, 1)'
        case 'special-attack':
          return 'rgba(255, 206, 86, 1)'
        case 'special-defense':
          return 'rgba(153, 102, 255, 1)'
        case 'speed':
          return 'rgba(255, 159, 64, 1)'
        default:
          return 'rgba(0, 0, 0, 1)' // Color de borde predeterminado
      }
    }

    return {
      chartCanvas
    }
  }
}
</script>
