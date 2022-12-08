import dayjs from 'dayjs'
import { useRef } from 'react'
import Form from './Form'
import './App.css'

import type { FormValues } from './Form'

export default function App() {
  const output = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (values: FormValues) => {
    if (!output.current) return

    const { periodo, freetime, valor, entrada, peso, dias } = values
    const data_entrada = dayjs(entrada)
    const data_final_freetime = data_entrada.add(freetime, 'day')

    clear()
    println(`PERIODO LIVRE: ${data_entrada.format('DD/MM/YYYY')} ATE ${data_final_freetime.format('DD/MM/YYYY')}`)

    if (periodo > 0 && dias > 0) {
      let restante = dias
      let ult_inicio = data_final_freetime

      do {
        const inicio_periodo = ult_inicio.add(1, 'day')
        const fim_periodo = inicio_periodo.add(periodo, 'day')
        const vlr = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        const total = ((peso * valor) / 1000).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        println(`\nPERIODO: DE ${inicio_periodo.format('DD/MM/YYYY')} ATE ${fim_periodo.format('DD/MM/YYYY')}`)
        println(`${peso} x ${vlr} = ${total}`)

        restante -= periodo
        ult_inicio = fim_periodo
      } while(restante > 0)
    }
  }

  const println = (text: string) => {
    output.current!.value += text + '\n'
  }

  const clear = () => {
    output.current!.value = ''
  }

  return (
    <main>
      <h1>Transcap Armazenagem</h1>
      <Form onSubmit={handleSubmit} />
      <textarea ref={output} rows={10} readOnly />
    </main>
  )
}
