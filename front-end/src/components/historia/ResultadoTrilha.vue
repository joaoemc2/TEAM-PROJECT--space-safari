<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BotaoPequeno from '@/components/shared/BotaoPequeno.vue'
import { useRouter } from 'vue-router'
import { dadosPerguntas } from '@/stores/dadosPerguntas'

const props = defineProps<{
  trilha: string
  acertos: number
  total: number
}>()

const router = useRouter()
const storePerguntas = dadosPerguntas()

const porcentagem = ref<number>()

function calcularPorcentagem() {
  porcentagem.value = (props.acertos * 100) / props.total
}

function voltarParaHome() {
  router.push('home')
}

onMounted(() => {
  calcularPorcentagem()
  storePerguntas.alterarValor(1,0,1,true)
})
</script>

<template>
  <main class="resultado">
    <h2 class="titulo">Parabens! Voce chegou ao final da trilha: {{ trilha }}!</h2>
    <div class="acertos">
      <div class="barra-porcentagem">
        <div class="preencher" :style="{ width: porcentagem + '%' }"></div>
      </div>
      <p>{{ acertos }} acertos de {{ total }} questoes</p>
    </div>
    <BotaoPequeno
      class="proximo-btn"
      :texto="'Proximo desafio'"
      :inverter="true"
      @click="voltarParaHome()"
    />
  </main>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.resultado {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: $cor-roxa;
  border-radius: 12px;
  margin: 0 8px;
  padding: 42px 0;
  .titulo {
    color: $cor-branca;
    text-align: center;
    padding: 0 11%;
    font-size: $fonte-subtitulo;
    font-weight: $peso-bold;
  }
  .acertos {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    margin-top: 14px;
    margin-bottom: 22px;
    width: 100%;
  }
  .barra-porcentagem {
    background-color: $cor-secundaria;
    width: 70%;
    height: 20px;
    margin: 0 auto;
    box-sizing: border-box;
    border-radius: 100px;
    .preencher {
      height: 100%;
      background-color: $cor-verde;
      border-radius: 100px;
    }
  }
  p {
    text-align: center;
    font-size: $fonte-media;
    color: $cor-branca;
  }
  .proximo-btn {
    width: 70%;
    text-align: center;
  }
}
</style>
