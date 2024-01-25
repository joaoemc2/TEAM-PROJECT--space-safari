export interface PerguntaType {
  id: number,
  pergunta: string
  alternativas: string[]
  respostaCorreta: number
  callback: string[]
}
