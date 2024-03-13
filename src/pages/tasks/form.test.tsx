import { render, screen, userEvent } from 'tests/render'

import { TaskForm } from './form'

const mockOnSubmitCallback = vi.fn()

describe('TaskForm', () => {
  test('should render correctly', () => {
    render(<TaskForm error={false} onSubmit={mockOnSubmitCallback} />)

    const formInput = screen.getByRole('textbox')
    const formButton = screen.getByRole('button', { name: 'Criar' })
    const formError = screen.queryByText('Nome da tarefa é obrigatório')

    expect(formInput).toBeInTheDocument()
    expect(formButton).toBeInTheDocument()
    expect(formError).not.toBeInTheDocument()
  })

  test('should render correctly when there is an error in the form', () => {
    render(<TaskForm error onSubmit={mockOnSubmitCallback} />)

    const formInput = screen.getByRole('textbox')
    const formButton = screen.getByRole('button', { name: 'Criar' })
    const formError = screen.getByText('Nome da tarefa é obrigatório')

    expect(formInput).toBeInTheDocument()
    expect(formButton).toBeInTheDocument()
    expect(formError).toBeInTheDocument()
  })

  test('should correctly invoke the "onSubmit" function', async () => {
    render(<TaskForm error onSubmit={mockOnSubmitCallback} />)

    const formButton = screen.getByRole('button', { name: 'Criar' })
    await userEvent.click(formButton)

    expect(mockOnSubmitCallback).toHaveBeenCalled()
  })
})
