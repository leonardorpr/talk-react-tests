import { Skeleton } from '@/components/ui/skeleton'

export function TaskLoader() {
  return (
    <ul className="flex flex-col gap-4 w-full">
      {Array.from({ length: 3 }).map(() => (
        <li key={Date.now() + Math.random()}>
          <Skeleton
            data-testid="skeleton-card"
            className="h-[90px] w-full rounded-xl"
          />
        </li>
      ))}
    </ul>
  )
}
