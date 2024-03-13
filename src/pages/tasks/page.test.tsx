import { render, screen, userEvent, waitFor } from 'tests/render'

import { Tasks } from './page'

describe('Tasks', () => {
  describe('when the user interacts with the page and encounters errors', () => {
    test('should throw an error when attempting to create a new task', async () => {
      render(<Tasks />)

      const formInput = screen.getByRole('textbox')
      const formButton = screen.getByRole('button', { name: 'Criar' })

      await userEvent.type(formInput, 'New task')
      await userEvent.click(formButton)

      await waitFor(() => {
        const toast = screen.getByText('Ops! Algo deu errado.')
        expect(toast).toBeInTheDocument()
      })
    })

    test('should throw an error when attempting to complete a task', async () => {
      render(<Tasks />)

      const taskDoneButton = await screen.findByTestId('done-button')
      await userEvent.click(taskDoneButton)

      await waitFor(() => {
        const toast = screen.getByText('Ops! Algo deu errado.')
        expect(toast).toBeInTheDocument()
      })
    })

    test('should throw an error when attempting to remove a task', async () => {
      render(<Tasks />)

      const taskRemoveButton = await screen.findByTestId('remove-button')
      await userEvent.click(taskRemoveButton)

      await waitFor(() => {
        const toast = screen.getByText('Ops! Algo deu errado.')
        expect(toast).toBeInTheDocument()
      })
    })
  })
})
