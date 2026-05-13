import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import { SkeletonCard } from '@/shared/components/Skeleton'

// Route-level code splitting with React.lazy
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'))
const SessionDetailPage = lazy(() => import('@/features/sessions/pages/SessionDetailPage'))

const PageFallback = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
)

const router = createBrowserRouter([
  {
    element: (
      <AppLayout>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </AppLayout>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'sessions/:id', element: <SessionDetailPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
