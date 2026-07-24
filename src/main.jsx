import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './auth/AuthContext.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Register from './pages/Register.jsx'
import Registrations from './pages/Registrations.jsx'
import Login from './pages/Login.jsx'
import Schedule from './pages/Schedule.jsx'
import MatchFixtures from './pages/MatchFixtures.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import LiveStream from './pages/LiveStream.jsx'
import EventCountdown from './pages/EventCountdown.jsx'

const countdown = (title, subtitle) => (
  <EventCountdown title={title} subtitle={subtitle} />
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Register /> },
      { path: 'register', element: <Register /> },
      { path: 'registrations', element: <Registrations /> },
      { path: 'registerations', element: <Registrations /> },
      { path: 'login', element: <Login /> },
      { path: 'live', element: <LiveStream /> },
      { path: 'dashboard', element: countdown('Dashboard', 'Overview & event countdown') },
      { path: 'match-fixtures', element: <MatchFixtures /> },
      { path: 'matches', element: <MatchFixtures /> },
      { path: 'teams', element: countdown('Teams', 'Registered teams coming soon') },
      { path: 'leaderboard', element: <Leaderboard /> },
      { path: 'schedule', element: <Schedule /> },
      { path: 'officials', element: countdown('Officials', 'Officials coming soon') },
      { path: 'messages', element: countdown('Messages', 'Messages coming soon') },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
