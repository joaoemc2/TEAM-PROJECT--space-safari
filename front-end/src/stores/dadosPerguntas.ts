import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { StorePerguntasType } from '@/types/StorePerguntasType'
import Cookies from 'js-cookie'

export const dadosPerguntas = defineStore('dadosPerguntas', () => {
  const perguntasTrilhaUm = ref<StorePerguntasType[]>([])


  function alterarValor(trilha: number, id: number, opcaoSelecionada: number, respostaCorreta: boolean) {
    if (trilha == 1) {
      if (!perguntasTrilhaUm.value[0]) {
        for (let i = 0; i <= 11; i++) {
          perguntasTrilhaUm.value.push({
            id: i,
            respondida: false,
            opcaoSelecionada: null,
            respostaCorreta: null
          })
        }
      }
      perguntasTrilhaUm.value[id].respondida = true;
      perguntasTrilhaUm.value[id].opcaoSelecionada = opcaoSelecionada;
      perguntasTrilhaUm.value[id].respostaCorreta = respostaCorreta;
      Cookies.set('perguntasTrilha' + trilha, JSON.stringify(perguntasTrilhaUm.value), { expires: 7 })

    }
  }

  return { perguntasTrilhaUm, alterarValor }
})


