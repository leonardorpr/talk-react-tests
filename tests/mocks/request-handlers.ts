import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('http://localhost:3000/tasks', () => {
    return HttpResponse.json([
      {
        id: '1',
        title: 'First task',
        done: false,
        createdAt: '2024-03-11T13:03:35.517Z'
      }
    ])
  }),
  http.post('http://localhost:3000/tasks', () => {
    return new HttpResponse(null, { status: 500 })
  }),
  http.patch('http://localhost:3000/tasks/:id', () => {
    return new HttpResponse(null, { status: 500 })
  }),
  http.delete('http://localhost:3000/tasks/:id', () => {
    return new HttpResponse(null, { status: 500 })
  })
]
