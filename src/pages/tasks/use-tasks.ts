import { useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/components/ui/use-toast'
import { Task } from '@/types/task.types'
import type { TaskFormSubmitEvent } from './form'
import { createTask, doneTask, getTasks, removeTask } from './utils'

export function useTasks() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const [sort, setSort] = useState<'to-do' | 'finished'>('to-do')
  const [error, setError] = useState(false)

  const { data, status } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasks
  })

  const { mutate: createTaskMutate } = useMutation({
    mutationKey: ['create-task'],
    mutationFn: createTask,
    async onMutate(data) {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      const cachedTasks = queryClient.getQueryData<Task[]>(['tasks'])
      const currentTasks = cachedTasks ?? []
      queryClient.setQueryData(['tasks'], [...currentTasks, data])

      return cachedTasks
    },
    onError(_data, _variables, context) {
      queryClient.setQueryData(['tasks'], context)

      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: 'Tente novamente mais tarde.'
      })
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })

  const { mutate: handleRemoveTask } = useMutation({
    mutationKey: ['remove-task'],
    mutationFn: removeTask,
    async onMutate(id) {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      const currentTasks = queryClient.getQueryData<Task[]>(['tasks'])
      const updatedTaskList = currentTasks?.filter(task => task.id !== id)

      queryClient.setQueryData(['tasks'], updatedTaskList)

      return currentTasks
    },
    onError(_data, _variables, context) {
      queryClient.setQueryData(['tasks'], context)

      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: 'Tente novamente mais tarde.'
      })
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })

  const { mutate: handleDoneTask } = useMutation({
    mutationKey: ['done-task'],
    mutationFn: doneTask,
    async onMutate(id) {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })

      const currentTasks = queryClient.getQueryData<Task[]>(['tasks'])
      const updatedTaskList = currentTasks?.map(task => {
        if (task.id === id) return { ...task, done: true }

        return task
      })

      queryClient.setQueryData(['tasks'], updatedTaskList)
    },
    onError() {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: 'Tente novamente mais tarde.'
      })
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })

  const tasks = useMemo(() => {
    if (!data) return []

    return data.sort((currentTask, nextTask) => {
      if (sort === 'to-do') {
        if (currentTask.done === nextTask.done) return 0

        if (currentTask.done) return 1

        return -1
      }

      if (currentTask.done === nextTask.done) return 0

      if (currentTask.done) return -1

      return 1
    })
  }, [data, sort])

  function toggleSort() {
    setSort(currentSort => (currentSort === 'finished' ? 'to-do' : 'finished'))
  }

  function handleCreateTask(event: TaskFormSubmitEvent) {
    event.preventDefault()
    const task = event.currentTarget.elements.task.value

    if (!task) {
      setError(true)
      return
    }

    setError(false)

    createTaskMutate({
      title: task,
      done: false,
      createdAt: new Date().toISOString(),
      id: uuid()
    })

    event.currentTarget.reset()
  }

  return {
    tasks,
    status,
    error,
    toggleSort,
    handleCreateTask,
    handleDoneTask,
    handleRemoveTask
  }
}
