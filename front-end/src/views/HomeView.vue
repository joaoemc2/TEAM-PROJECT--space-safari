<script setup lang="ts">
import { ref } from 'vue'
import CardTemas from '../components/CardTemas.vue'
import HeaderBar from '../components/HeaderBar.vue'
import MenuLateral from '../components/MenuLateral.vue'

const dadosCards = ref([
  {
    titulo: 'Descobrindo o caminho das águas',
    texto: 'Descobra todo o percurso da água, da nascente a sua casa.',
    passosConcluidos: 0,
    passosTotais: 12,
    componente: 0,
    imagem: 'home/ciclo-da-agua.png',
    corTema: 'laranja'
  },
  {
    titulo: 'Cada gotinha é especial',
    texto: 'Economizar água é como um superpoder. Use só o que você precisa!',
    passosConcluidos: 0,
    passosTotais: 7,
    componente: 1,
    imagem: 'home/economize-agua.png',
    corTema: 'vermelho'
  },
  {
    titulo: 'Água: O líquido mágico da natureza',
    texto:
      'A ciência da água nos ensina como ela é especial. A água é como um líquido mágico que dá vida a todas as coisas na Terra.',
    passosConcluidos: 0,
    passosTotais: 8,
    componente: 2,
    imagem: 'home/molecula.png',
    corTema: 'azul'
  }
])

const mostrarMenu = ref(true)
</script>
<template>
  <MenuLateral v-if="mostrarMenu" />
  <main class="home-container">
    <HeaderBar />
    <h1 class="titulo">Vamos Começar!</h1>
    <ul class="cards">
      <li class="card" v-for="(dadosCard, i) in dadosCards" :key="i">
        <CardTemas
          :titulo="dadosCard.titulo"
          :texto="dadosCard.texto"
          :passos-concluidos="dadosCard.passosConcluidos"
          :passos-totais="dadosCard.passosTotais"
          :redirect="dadosCard.componente"
          :imagem="dadosCard.imagem"
          :tema="dadosCard.corTema"
        />
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $cor-primaria;
  min-height: 100vh;
  height: auto;
  width: 100vw;
  padding-bottom: 32px;
  .titulo {
    text-align: left;
    width: 100%;
    padding-left: 22px;
    box-sizing: border-box;
    margin-bottom: 22px;
    color: $cor-branca;
    font-size: $fonte-subtitulo;
    font-weight: $peso-bold;
  }
  .cards {
    padding: 0px 22px;
    .card {
      margin-bottom: 20px;
    }
  }
}
</style>
