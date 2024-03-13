import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { CaretSortIcon } from '@radix-ui/react-icons'

import { Task } from '@/types/task.types'

import { TaskItem } from './item'
import { TaskLoader } from './loader'

interface TaskListProps {
  tasks: Task[]
  status: 'success' | 'pending' | 'error'
  onSortList(): void
  onDoneItem(id: string): void
  onRemoveItem(id: string): void
}

export function TaskList({
  tasks,
  status,
  onSortList,
  onDoneItem,
  onRemoveItem
}: TaskListProps) {
  return (
    <section className="flex flex-col items-center gap-7 w-full md:w-1/2">
      <header className="flex flex-row justify-between w-full">
        <h1 className="text-2xl font-bold">Minhas tarefas</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onSortList}>
                <CaretSortIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Alterar ordenação</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </header>

      {!!tasks.length && status === 'success' && (
        <ul className="flex flex-col gap-4 w-full">
          {tasks.map(task => (
            <li key={task.id}>
              <TaskItem
                task={task}
                onDone={onDoneItem}
                onRemove={onRemoveItem}
              />
            </li>
          ))}
        </ul>
      )}

      {!tasks.length && status === 'success' && (
        <p>Ainda não há tarefas criadas</p>
      )}

      {status === 'pending' && <TaskLoader />}

      {status === 'error' && <p>Ops, tivemos um erro interno</p>}
    </section>
  )
}
