import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Register from './pages/Register.jsx'
import EventCountdown from './pages/EventCountdown.jsx'

const countdown = (title, subtitle) => (
  <EventCountdown title={title} subtitle={subtitle} />
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: countdown('Home', 'Countdown to the main event') },
      { path: 'register', element: <Register /> },
      { path: 'dashboard', element: countdown('Dashboard', 'Overview & event countdown') },
      { path: 'matches', element: countdown('Matches', 'Fixtures coming soon') },
      { path: 'teams', element: countdown('Teams', 'Registered teams coming soon') },
      { path: 'leaderboard', element: countdown('Leaderboard', 'Standings coming soon') },
      { path: 'schedule', element: countdown('Schedule', 'Full schedule coming soon') },
      { path: 'officials', element: countdown('Officials', 'Officials coming soon') },
      { path: 'messages', element: countdown('Messages', 'Messages coming soon') },
      { path: 'settings', element: countdown('Settings', 'Settings coming soon') },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
