import { CheckIcon, TrashIcon } from '@radix-ui/react-icons'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Task } from '@/types/task.types'

interface TaskItemProps {
  task: Task
  onDone(id: string): void
  onRemove(id: string): void
}

export function TaskItem({ task, onDone, onRemove }: TaskItemProps) {
  const createdAt = useMemo(() => {
    const currentDate = new Date(task.createdAt)

    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    })
      .format(currentDate)
      .replace(', ', ' às ')
  }, [task])

  return (
    <Card data-testid="task">
      <CardHeader className="flex flex-row justify-between">
        <div className="space-y-1.5">
          <CardTitle className={cn(task.done && 'line-through')}>
            {task.title}
          </CardTitle>
          <CardDescription className={cn(task.done && 'line-through')}>
            Criado em {createdAt}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          {!task.done && (
            <Button
              data-testid="done-button"
              variant="outline"
              size="icon"
              onClick={() => onDone(task.id)}>
              <CheckIcon className="h-4 w-4" />
            </Button>
          )}
          <Button
            data-testid="remove-button"
            variant="outline"
            size="icon"
            className="bg-red-700 hover:bg-red-900"
            onClick={() => onRemove(task.id)}>
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}
