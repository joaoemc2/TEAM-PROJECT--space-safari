import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type HistoriaType } from '@/types/HistoriaType'
import caminhoDasAguas from '@/stores/dadosHistorias/caminhoDasAguas.json'
import historiaDois from '@/stores/dadosHistorias/historiaDois.json'

export const dadosListagem = defineStore('dadosListagem', () => {
  const listagem = ref<HistoriaType[][]>([caminhoDasAguas, historiaDois])
  return { listagem }
})
