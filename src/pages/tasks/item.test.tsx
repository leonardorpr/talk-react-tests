import { render, screen, userEvent } from 'tests/render'

import { TaskItem } from './item'

const mockOnDoneCallback = vi.fn()
const mockOnRemoveCallback = vi.fn()

describe('TaskItem', () => {
  test('should correctly render an unfinished task', () => {
    // Arrange
    render(
      <TaskItem
        task={{
          id: '1',
          title: 'Task name',
          done: false,
          createdAt: '2024-03-11T13:03:35.517Z'
        }}
        onDone={mockOnDoneCallback}
        onRemove={mockOnRemoveCallback}
      />
    )

    // Act
    const taskTitle = screen.getByRole('heading', {
      name: 'Task name'
    })
    const taskCreatedAt = screen.getByText('Criado em 11/03/2024 às 10:03')
    const taskDoneButton = screen.getByTestId('done-button')
    const taskRemoveButton = screen.getByTestId('remove-button')

    // Assert
    expect(taskTitle).toBeInTheDocument()
    expect(taskTitle).not.toHaveClass('line-through')
    expect(taskCreatedAt).toBeInTheDocument()
    expect(taskCreatedAt).not.toHaveClass('line-through')
    expect(taskDoneButton).toBeInTheDocument()
    expect(taskRemoveButton).toBeInTheDocument()
  })

  test('should correctly render an finished task', () => {
    render(
      <TaskItem
        task={{
          id: '1',
          title: 'Task name',
          done: true,
          createdAt: '2024-03-11T13:03:35.517Z'
        }}
        onDone={mockOnDoneCallback}
        onRemove={mockOnRemoveCallback}
      />
    )

    const taskTitle = screen.getByRole('heading', {
      name: 'Task name'
    })
    const taskCreatedAt = screen.getByText('Criado em 11/03/2024 às 10:03')
    const taskDoneButton = screen.queryByTestId('done-button')
    const taskRemoveButton = screen.getByTestId('remove-button')

    expect(taskTitle).toBeInTheDocument()
    expect(taskTitle).toHaveClass('line-through')
    expect(taskCreatedAt).toBeInTheDocument()
    expect(taskCreatedAt).toHaveClass('line-through')
    expect(taskDoneButton).not.toBeInTheDocument()
    expect(taskRemoveButton).toBeInTheDocument()
  })

  test('should correctly invoke the "onDone" function', async () => {
    render(
      <TaskItem
        task={{
          id: '1',
          title: 'Task name',
          done: false,
          createdAt: '2024-03-11T13:03:35.517Z'
        }}
        onDone={mockOnDoneCallback}
        onRemove={mockOnRemoveCallback}
      />
    )

    const taskDoneButton = screen.getByTestId('done-button')
    await userEvent.click(taskDoneButton)

    expect(mockOnDoneCallback).toHaveBeenCalledWith('1')
  })

  test('should correctly invoke the "onRemove" function', async () => {
    render(
      <TaskItem
        task={{
          id: '1',
          title: 'Task name',
          done: false,
          createdAt: '2024-03-11T13:03:35.517Z'
        }}
        onDone={mockOnDoneCallback}
        onRemove={mockOnRemoveCallback}
      />
    )

    const taskRemoveButton = screen.getByTestId('remove-button')
    await userEvent.click(taskRemoveButton)

    expect(mockOnRemoveCallback).toHaveBeenCalledWith('1')
  })
})
