import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import '../dashboard.css'

function DashboardLayout() {
  const [navOpen, setNavOpen] = useState(false)
  const closeNav = () => setNavOpen(false)

  useEffect(() => {
    if (!navOpen) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') setNavOpen(false)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [navOpen])

  return (
    <div className={`reg${navOpen ? ' nav-open' : ''}`}>
      <div className="reg-scrim" onClick={closeNav} />
      <Sidebar open={navOpen} onNavigate={closeNav} />
      <Outlet context={{ openNav: () => setNavOpen(true) }} />
    </div>
  )
}

export default DashboardLayout
