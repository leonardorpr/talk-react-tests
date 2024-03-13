import { TaskForm } from './form'
import { TaskList } from './list'

import { useTasks } from './use-tasks'

export function Tasks() {
  const {
    tasks,
    status,
    error,
    toggleSort,
    handleCreateTask,
    handleDoneTask,
    handleRemoveTask
  } = useTasks()

  return (
    <main className="container mx-auto flex flex-col items-center gap-14 py-10">
      <TaskForm error={error} onSubmit={handleCreateTask} />
      <TaskList
        tasks={tasks}
        status={status}
        onSortList={toggleSort}
        onDoneItem={handleDoneTask}
        onRemoveItem={handleRemoveTask}
      />
    </main>
  )
}
