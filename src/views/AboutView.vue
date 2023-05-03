<template>
  <div>
    <h1>Tecnologias usadas:</h1>

    <ul>
      <li class="my-6 flex p-4 hover:bg-emerald-100">
        <img src="@/assets/logo.svg" alt="Logo" />
        <p>
          Vue (pronunciado /vjuː/, como view) es un framework progresivo para construir interfaces
          de usuario. A diferencia de otros frameworks monolíticos, Vue está diseñado desde cero
          para ser utilizado incrementalmente. La librería central está enfocada solo en la capa de
          visualización, y es fácil de utilizar e integrar con otras librerías o proyectos
          existentes. Por otro lado, Vue también es perfectamente capaz de impulsar sofisticadas
          Single-Page Applications cuando se utiliza en combinación con herramientas modernas y
          librerías de apoyo.
        </p>
        <a
          class="m-auto flex-shrink-0 text-green-500 hover:text-green-700"
          href="https://vuejs.org/guide/introduction.html"
          >Documentacion de Vue.js</a
        >
      </li>
      <li class="my-6 flex p-4 hover:bg-[#badaf2]">
        <img
          src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-dark.svg"
          alt="Logo"
        />
        <p>
          Vuetify es un framework de componentes de interfaz de usuario para Vue.js. Ofrece una
          amplia variedad de componentes preconstruidos y personalizables, como botones, tablas,
          tarjetas, menús, formularios y muchos otros. Vuetify está diseñado para ayudar a los
          desarrolladores a crear aplicaciones web modernas y atractivas con una estructura y diseño
          coherentes.
        </p>
        <a
          class="m-auto flex-shrink-0 text-green-500 hover:text-green-700"
          href="https://vuetifyjs.com/en/"
          >Documentacion de Vuetify</a
        >
      </li>
      <li class="my-6 flex p-4 hover:bg-[#c5e7ed]">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/768px-Tailwind_CSS_Logo.svg.png"
          alt="Logo"
        />
        <p>
          Con Tailwind puedes diseñar rápidamente una interfaz de usuario atractiva y coherente sin
          tener que escribir CSS personalizado. Tailwind proporciona clases CSS predefinidas para
          estilos comunes, como margen, relleno, tamaño de fuente, colores, fondos y más. Además,
          Tailwind utiliza una metodología de diseño centrada en las utilidades, lo que significa
          que cada clase CSS está diseñada para hacer una sola cosa y hacerla bien.
          <a
            class="m-auto flex-shrink-0 text-green-500 hover:text-green-700"
            href="https://tailwindcss.com/"
            >Documentacion de Tailwind Css</a
          >
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  setup() {}
}
</script>

<!-- <style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style> -->
