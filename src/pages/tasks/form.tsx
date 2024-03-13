import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TaskFormElements extends HTMLFormControlsCollection {
  task: HTMLInputElement
}

interface TaskFormEvent extends HTMLFormElement {
  elements: TaskFormElements
}

export type TaskFormSubmitEvent = React.FormEvent<TaskFormEvent>

interface TaskFormProps {
  error: boolean
  onSubmit(event: TaskFormSubmitEvent): void
}

export function TaskForm({ error, onSubmit }: TaskFormProps) {
  return (
    <form
      className="flex flex-row item-center justify-center gap-2 w-full md:w-1/2"
      onSubmit={onSubmit}>
      <fieldset className="flex flex-col gap-2 w-full">
        <Input name="task" type="text" placeholder="Nome da tarefa" />
        {error && (
          <small className="text-red-500">Nome da tarefa é obrigatório</small>
        )}
      </fieldset>
      <Button type="submit">Criar</Button>
    </form>
  )
}
