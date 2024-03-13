import { render, screen, userEvent, within } from 'tests/render'

import { TaskList } from './list'

const mockOnDoneItemCallback = vi.fn()
const mockOnRemoveItemCallback = vi.fn()
const mockOnSortListCallback = vi.fn()

describe('TaskList', () => {
  describe('when the task list is rendered', () => {
    test('should render the tasks list correctly', () => {
      const tasks = [
        {
          id: '1',
          title: 'First task',
          done: false,
          createdAt: '2024-03-11T13:03:35.517Z'
        },
        {
          id: '2',
          title: 'Second task',
          done: true,
          createdAt: '2024-03-11T14:03:35.517Z'
        }
      ]

      render(
        <TaskList
          status="success"
          tasks={tasks}
          onDoneItem={mockOnDoneItemCallback}
          onRemoveItem={mockOnRemoveItemCallback}
          onSortList={mockOnSortListCallback}
        />
      )

      const listTitle = screen.getByRole('heading', {
        name: 'Minhas tarefas'
      })
      const listTooltip = screen.getByRole('banner')
      const listSortButton = within(listTooltip).getByRole('button')
      const taskCards = screen.getAllByTestId('task')

      expect(listTitle).toBeInTheDocument()
      expect(listSortButton).toBeInTheDocument()
      expect(taskCards.length).toEqual(tasks.length)
    })

    test('should render the empty list correctly', () => {
      render(
        <TaskList
          status="success"
          tasks={[]}
          onDoneItem={mockOnDoneItemCallback}
          onRemoveItem={mockOnRemoveItemCallback}
          onSortList={mockOnSortListCallback}
        />
      )

      const listTitle = screen.getByRole('heading', {
        name: 'Minhas tarefas'
      })
      const listTooltip = screen.getByRole('banner')
      const listSortButton = within(listTooltip).getByRole('button')
      const taskCards = screen.queryAllByTestId('task')
      const listEmptyText = screen.getByText('Ainda não há tarefas criadas')

      expect(listTitle).toBeInTheDocument()
      expect(listSortButton).toBeInTheDocument()
      expect(listEmptyText).toBeInTheDocument()
      expect(taskCards.length).toEqual(0)
    })

    test('should render the loading list correctly', () => {
      render(
        <TaskList
          status="pending"
          tasks={[]}
          onDoneItem={mockOnDoneItemCallback}
          onRemoveItem={mockOnRemoveItemCallback}
          onSortList={mockOnSortListCallback}
        />
      )

      const listTitle = screen.getByRole('heading', {
        name: 'Minhas tarefas'
      })
      const listTooltip = screen.getByRole('banner')
      const listSortButton = within(listTooltip).getByRole('button')
      const taskCards = screen.queryAllByTestId('task')
      const taskCardSkeletons = screen.getAllByTestId('skeleton-card')

      expect(listTitle).toBeInTheDocument()
      expect(listSortButton).toBeInTheDocument()
      expect(taskCardSkeletons[0]).toBeInTheDocument()
      expect(taskCardSkeletons.length).toEqual(3)
      expect(taskCards.length).toEqual(0)
    })

    test('should render the error correctly', () => {
      render(
        <TaskList
          status="error"
          tasks={[]}
          onDoneItem={mockOnDoneItemCallback}
          onRemoveItem={mockOnRemoveItemCallback}
          onSortList={mockOnSortListCallback}
        />
      )

      const listTitle = screen.getByRole('heading', {
        name: 'Minhas tarefas'
      })
      const listTooltip = screen.getByRole('banner')
      const listSortButton = within(listTooltip).getByRole('button')
      const taskCards = screen.queryAllByTestId('task')
      const listErrorText = screen.getByText('Ops, tivemos um erro interno')

      expect(listTitle).toBeInTheDocument()
      expect(listSortButton).toBeInTheDocument()
      expect(listErrorText).toBeInTheDocument()
      expect(taskCards.length).toEqual(0)
    })
  })

  describe('when we interact with the list ', () => {
    test('should correctly invoke the "onDoneItem" function', async () => {
      const tasks = [
        {
          id: '1',
          title: 'First task',
          done: false,
          createdAt: '2024-03-11T13:03:35.517Z'
        },
        {
          id: '2',
          title: 'Second task',
          done: false,
          createdAt: '2024-03-11T14:03:35.517Z'
        }
      ]

      render(
        <TaskList
          status="success"
          tasks={tasks}
          onDoneItem={mockOnDoneItemCallback}
          onRemoveItem={mockOnRemoveItemCallback}
          onSortList={mockOnSortListCallback}
        />
      )

      const [firstTaskDoneButton, secondTaskDoneButton] =
        screen.getAllByTestId('done-button')

      await Promise.all([
        userEvent.click(firstTaskDoneButton),
        userEvent.click(secondTaskDoneButton)
      ])

      expect(mockOnDoneItemCallback).toHaveBeenCalledWith('1')
      expect(mockOnDoneItemCallback).toHaveBeenCalledWith('2')
      expect(mockOnDoneItemCallback).toHaveBeenCalledTimes(2)
    })

    test('should correctly invoke the "onRemoveItem" function', async () => {
      const tasks = [
        {
          id: '1',
          title: 'First task',
          done: false,
          createdAt: '2024-03-11T13:03:35.517Z'
        },
        {
          id: '2',
          title: 'Second task',
          done: false,
          createdAt: '2024-03-11T14:03:35.517Z'
        }
      ]

      render(
        <TaskList
          status="success"
          tasks={tasks}
          onDoneItem={mockOnDoneItemCallback}
          onRemoveItem={mockOnRemoveItemCallback}
          onSortList={mockOnSortListCallback}
        />
      )

      const [firstTaskRemoveButton, secondTaskRemoveButton] =
        screen.getAllByTestId('remove-button')

      await Promise.all([
        userEvent.click(firstTaskRemoveButton),
        userEvent.click(secondTaskRemoveButton)
      ])

      expect(mockOnRemoveItemCallback).toHaveBeenCalledWith('1')
      expect(mockOnRemoveItemCallback).toHaveBeenCalledWith('2')
      expect(mockOnRemoveItemCallback).toHaveBeenCalledTimes(2)
    })

    test('should correctly invoke the "onSortList" function', async () => {
      const tasks = [
        {
          id: '1',
          title: 'First task',
          done: false,
          createdAt: '2024-03-11T13:03:35.517Z'
        },
        {
          id: '2',
          title: 'Second task',
          done: false,
          createdAt: '2024-03-11T14:03:35.517Z'
        }
      ]

      render(
        <TaskList
          status="success"
          tasks={tasks}
          onDoneItem={mockOnDoneItemCallback}
          onRemoveItem={mockOnRemoveItemCallback}
          onSortList={mockOnSortListCallback}
        />
      )

      const listTooltip = screen.getByRole('banner')
      const listSortButton = within(listTooltip).getByRole('button')

      await userEvent.click(listSortButton)

      expect(mockOnSortListCallback).toHaveBeenCalled()
      expect(mockOnSortListCallback).toHaveBeenCalledTimes(1)
    })
  })
})
