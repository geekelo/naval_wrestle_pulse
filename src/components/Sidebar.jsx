import { NavLink } from 'react-router-dom'
import navyLogo from '../assets/nigerian-navy-logo.png'
import eventLogo from '../assets/beach_wrestling_challenge_logo.png'
import { icon } from '../icons.jsx'
import './Sidebar.css'

const NAV = [
  { label: 'Registration', to: '/register', ic: icon.registration },
  { label: 'Dashboard', to: '/dashboard', ic: icon.dashboard },
  { label: 'Matches', to: '/matches', ic: icon.matches },
  { label: 'Teams', to: '/teams', ic: icon.teams },
  { label: 'Leaderboard', to: '/leaderboard', ic: icon.leaderboard },
  { label: 'Schedule', to: '/schedule', ic: icon.schedule },
  { label: 'Officials', to: '/officials', ic: icon.officials },
  { label: 'Messages', to: '/messages', ic: icon.messages },
  { label: 'Settings', to: '/settings', ic: icon.settings },
]

function Sidebar({ open = false, onNavigate }) {
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

      <div className="nwp-help">
        {icon.help}
        <div>
          <div className="nwp-help-title">Need Help?</div>
          <a className="nwp-help-link" href="#support">Contact Support</a>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
