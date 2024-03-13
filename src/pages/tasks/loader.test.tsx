import { render, screen } from 'tests/render'

import { TaskLoader } from './loader'

describe('TaskLoader', () => {
  test('should render correctly', () => {
    render(<TaskLoader />)

    const taskCardSkeletons = screen.getAllByTestId('skeleton-card')

    expect(taskCardSkeletons.length).toEqual(3)
    expect(taskCardSkeletons[0]).toBeInTheDocument()
  })
})
