<script setup lang="ts">
import Cookies from 'js-cookie'
import { dadosListagem } from '@/stores/dadosListagem'
import { dadosPerguntas } from '@/stores/dadosPerguntas'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import BotaoIconeRow from '@/components/shared/BotaoIconeRow.vue'
import SobreHistoria from '@/components/historia/SobreHistoria.vue'
import GaleriaImagens from '@/components/historia/GaleriaImagens.vue'
import QuizHistoria from '@/components/historia/QuizHistoria.vue'
import BotaoPequeno from '@/components/shared/BotaoPequeno.vue'
import ResultadoTrilha from '@/components/historia/ResultadoTrilha.vue'

const router = useRouter()
const store = dadosListagem()
const storeDadosPerguntas = dadosPerguntas()

// variáveis
const paginaSelecionada = ref<any>(0)
const finalizado = ref<boolean>(false)
const habilitarBotaoProximo = ref<boolean>(false)
const perguntasTotais = ref<number>(0)
const acertosTotais = ref<number>(0)
const historiaUrl = ref<number>(0)
let perguntasId: number[] = []

verificarHistoriaSelecionada()

if (Cookies.get('paginaSelecionada')) {
  paginaSelecionada.value = Cookies.get('paginaSelecionada')
}

const ultimaPagina = ref(store.listagem[historiaUrl.value].length)

// life cycle
const listagem = computed(() => {
  return store.listagem[historiaUrl.value][paginaSelecionada.value]
})

watch(listagem, () => {
  verificarRespondido()
})

watch(router.currentRoute, () => {
  verificarHistoriaSelecionada()
})

const questoesRestantes = ref<any>(0)
questoesRestantes.value = listagem.value.perguntas?.length

// funções
function toggleFullscreen() {
  const element = document.documentElement

  if (document.fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    }
  }
}

function verificarHistoriaSelecionada() {
  historiaUrl.value = parseInt(router.currentRoute.value.params.numeroHistoria.toLocaleString())
}

function proximaPagina() {
  if (paginaSelecionada.value + 1 < ultimaPagina.value) {
    paginaSelecionada.value++
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    Cookies.set('paginaSelecionada', paginaSelecionada.value, { expires: 7 })
  } else if (!(paginaSelecionada.value + 1 < ultimaPagina.value)) {
    finalizado.value = true
    verificarAcertos()
  }
  atualizarIdPerguntas()
}

function voltarPagina() {
  if (paginaSelecionada.value > 0) {
    paginaSelecionada.value--
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    Cookies.set('paginaSelecionada', paginaSelecionada.value, { expires: 7 })
  }
  atualizarIdPerguntas()
}

function voltarParaHome() {
  router.push('home')
}

function getImageUrl(name: string) {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href
}

function atualizarIdPerguntas() {
  perguntasId = []
  listagem.value.perguntas?.forEach((element) => {
    perguntasId.push(element.id)
  })
}

function verificarRespondido() {
  const totalPerguntas = perguntasId.length
  let perguntasRespondidas = 0
  perguntasId.forEach((element) => {
    if (storeDadosPerguntas.perguntasTrilhaUm[element].respondida) {
      perguntasRespondidas++
    }
  })
  if (totalPerguntas == perguntasRespondidas) {
    habilitarBotaoProximo.value = true
  } else {
    habilitarBotaoProximo.value = false
  }
  console.log('totalPerguntas', totalPerguntas)
  console.log('perguntasRespondidas', perguntasRespondidas)
  console.log('habilitarBotaoProximo', habilitarBotaoProximo.value)
}

function verificarAcertos() {
  perguntasTotais.value = storeDadosPerguntas.perguntasTrilhaUm.length
  acertosTotais.value = 0
  storeDadosPerguntas.perguntasTrilhaUm.forEach((element) => {
    if (element.respostaCorreta == true) {
      acertosTotais.value++
    }
  })
}
atualizarIdPerguntas()
</script>

<template>
  <main class="historia">
    <header class="header">
      <BotaoIconeRow
        class="btn-home"
        :icone="'house'"
        :texto="'Inicio'"
        :cor-tema="'primaria'"
        @click="voltarParaHome()"
      />
      <h1>{{ listagem.titulo }}</h1>
    </header>
    <div v-if="!finalizado">
      <section class="imagem-container">
        <img :src="getImageUrl(listagem.imagem)" alt="" />
      </section>
      <SobreHistoria
        :titulo="listagem.subTitulo"
        :texto-um="listagem.textoPrincipal"
        :texto-dois="listagem.textoSecundario"
        :curiosidades="listagem.curiosidades"
      />
      <GaleriaImagens :imagens="listagem.galeria" />
      <ul>
        <h3 class="titulo">Quiz</h3>
        <li v-for="(pergunta, i) in listagem.perguntas" :key="i">
          <QuizHistoria
            :quiz="pergunta"
            :trilha="historiaUrl + 1"
            @questao-respondida="verificarRespondido"
          />
        </li>
      </ul>
      <section class="paginator">
        <BotaoPequeno :texto="'Voltar'" :inverter="true" @click="voltarPagina()" />
        <BotaoPequeno
          :texto="'Avançar'"
          :inverter="true"
          @click="proximaPagina()"
          :disabled="!habilitarBotaoProximo"
        />
      </section>
    </div>
    <div v-if="finalizado">
      <ResultadoTrilha
        :trilha="listagem.titulo"
        :acertos="acertosTotais"
        :total="perguntasTotais"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.historia {
  width: 100vw;
  .header {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
    .btn-home {
      position: absolute;
      left: 8px;
      top: 8px;
    }
    h1 {
      padding-top: 16px;
      color: $cor-primaria;
      text-align: center;
      font-size: $fonte-titulo;
      font-weight: $peso-bold;
      max-width: 70%;
    }
  }
  .imagem-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 42px;
    img {
      width: 200px;
    }
  }
  .titulo {
    font-size: $fonte-titulo;
    text-align: center;
    color: $cor-primaria;
    font-weight: $peso-bold;
    margin-bottom: 22px;
  }
  .paginator {
    display: flex;
    background-color: $cor-primaria;
    border-radius: 30px 30px 0px 0px;
    padding: 38px 16px;
    justify-content: space-between;
  }
}
</style>
