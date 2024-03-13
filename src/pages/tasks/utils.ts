import { Task } from '@/types/task.types'

async function delay() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}

export async function getTasks() {
  await delay()

  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`)

  return response.json()
}

export async function removeTask(id: string) {
  await delay()

  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
    method: 'DELETE'
  })

  return response.json()
}

export async function doneTask(id: string) {
  await delay()

  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ done: true })
  })

  return response.json()
}

export async function createTask(task: Task) {
  await delay()

  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
    method: 'POST',
    body: JSON.stringify({
      title: task.title,
      createdAt: task.createdAt,
      done: task.done
    })
  })

  return response.json()
}
