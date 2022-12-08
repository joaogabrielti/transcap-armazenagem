import './Form.css'

type FormProps = {
  onSubmit: (values: FormValues) => void
}

export type FormValues = {
  periodo: number
  freetime: number
  valor: number
  entrada: string
  peso: number
  dias: number
}

export default function Form({ onSubmit }: FormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    onSubmit({
      periodo: Number(formData.get('periodo')),
      freetime: Number(formData.get('freetime')),
      valor: Number(formData.get('valor')),
      entrada: String(formData.get('entrada')),
      peso: Number(formData.get('peso')),
      dias: Number(formData.get('dias')),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Período</span>
        <input type="number" name="periodo" min={1} />
        <span>dia(s)</span>
      </label>

      <label>
        <span>Período Livre</span>
        <input type="number" name="freetime" min={1} />
        <span>dia(s)</span>
      </label>

      <label>
        <span>Valor (R$)</span>
        <input type="number" name="valor" min={1} step={.01} />
      </label>

      <label>
        <span>Data de Entrada</span>
        <input type="date" name="entrada" />
      </label>

      <label>
        <span>Peso</span>
        <input type="number" name="peso" min={1} />
      </label>

      <label>
        <span>Dias Armazenados</span>
        <input type="number" name="dias" min={1} />
      </label>

      <button type="submit">Calcular Armazenagem</button>
      <button type="reset">Limpar</button>
    </form>
  )
}
