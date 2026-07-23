import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import navyLogo from '../assets/nigerian-navy-logo.png'
import eventLogo from '../assets/beach_wrestling_challenge_logo.png'
import { icon } from '../icons.jsx'
import './Sidebar.css'

const NAV = [
  { label: 'Schedule', to: '/schedule', ic: icon.schedule },
  { label: 'Register', to: '/register', ic: icon.registration },
  { label: 'Registrations', to: '/registrations', ic: icon.list },
  { label: 'Match Fixtures', to: '/match-fixtures', ic: icon.matches },
  { label: 'Leaderboard', to: '/leaderboard', ic: icon.leaderboard },
  // { label: 'Teams', to: '/teams', ic: icon.teams },
  // { label: 'Officials', to: '/officials', ic: icon.officials },
  // { label: 'Dashboard', to: '/dashboard', ic: icon.dashboard },
]

function userInitials(user) {
  const name = user?.name || user?.full_name || user?.email || '?'
  if (user?.email && !user?.name && !user?.full_name) {
    return user.email.slice(0, 1).toUpperCase()
  }
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || '?'
}

function Sidebar({ open = false, onNavigate }) {
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    onNavigate?.()
    navigate('/login')
  }

  return (
    <aside className={`nwp-sidebar${open ? ' open' : ''}`}>
      <div className="nwp-brand">
        <button
          className="nwp-close"
          type="button"
          onClick={onNavigate}
          aria-label="Close menu"
        >
          {icon.x}
        </button>
        <div className="nwp-logos">
          <img className="nwp-brand-mark" src={navyLogo} alt="Nigerian Navy" />
          <img className="nwp-brand-mark" src={eventLogo} alt="Beach Wrestling Challenge" />
        </div>
        <span className="nwp-brand-text">ARMED FORCES BEACH WRESTLING CHALLENGE 2026</span>
      </div>

      <nav className="nwp-nav">
        {NAV.map(({ label, to, ic }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={onNavigate}
          >
            {ic}
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="nwp-account">
        {isAuthenticated ? (
          <>
            <div className="nwp-account-user">
              <span className="nwp-avatar" aria-hidden="true">
                {userInitials(user)}
              </span>
              <div className="nwp-account-meta">
                <div className="nwp-account-label">Signed in</div>
                <div className="nwp-account-email">
                  {user?.email || user?.name || 'Admin'}
                </div>
              </div>
            </div>
            <button className="nwp-account-btn" type="button" onClick={handleLogout}>
              {icon.logout}
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => `nwp-account-btn${isActive ? ' active' : ''}`}
            onClick={onNavigate}
          >
            <span className="nwp-avatar placeholder" aria-hidden="true">
              {icon.user}
            </span>
            Login
          </NavLink>
        )}
      </div>

      {/* <div className="nwp-help">
        {icon.help}
        <div>
          <div className="nwp-help-title">Need Help?</div>
          <a className="nwp-help-link" href="#support">Contact Support</a>
        </div>
      </div> */}
    </aside>
  )
}

export default Sidebar
