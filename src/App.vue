<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="">
    <div class="flex justify-center bg-[#34495E]">
      <img
        alt="Pokedex logo"
        class="w-[27rem] rounded-tl-lg rounded bg-emerald-600"
        src="@/assets/PokeDex.png"
      />
    </div>
    <div class="wrapper">
      <nav class="bg-emerald-600 border-y-black border-x-emerald-600 border-2 py-2">
        <RouterLink class="px-6 hover:bg-emerald-800 hover:rounded-full hover:py-1" to="/"
          >Home</RouterLink
        >
        <RouterLink class="px-6 hover:bg-emerald-800 hover:rounded-full hover:py-1" to="/about"
          >About</RouterLink
        >
        <RouterLink class="px-6 hover:bg-emerald-800 hover:rounded-full hover:py-1" to="/cards"
          >Kanto</RouterLink
        >
      </nav>
    </div>
  </header>
  <div
    class="flex justify-center bg-[#34495E] bg-center bg-[url('./assets/pokeballBackground.png')] bg-repeat w-full min-h-screen"
  >
    <RouterView class="w-[70rem] bg-white" />
  </div>
</template>
