import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import LoginForm from '../components/LoginForm.jsx'
import { DEMO_GUESTS, DEMO_TEAMS } from '../data/demoRegistrations.js'
import navyLogo from '../assets/nigerian-navy-logo.png'
import eventLogo from '../assets/beach_wrestling_challenge_logo.png'
import { icon } from '../icons.jsx'

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return value
  }
}

function yesNo(value) {
  return value ? 'Yes' : 'No'
}

function Registrations() {
  const { openNav } = useOutletContext()
  const { isAuthenticated } = useAuth()
  const [tab, setTab] = useState('guest') // 'guest' | 'team'

  return (
    <div className="reg-main">
      <header className="reg-topbar">
        <div className="reg-topbar-lead">
          <img className="reg-topbar-logo" src={navyLogo} alt="Nigerian Navy" />
          <img className="reg-topbar-logo" src={eventLogo} alt="Beach Wrestling Challenge" />
          <div className="reg-topbar-title">
            <h1>REGISTRATIONS</h1>
            <p>
              {isAuthenticated
                ? 'View guest and team registrations'
                : 'Sign in to view registrations'}
            </p>
          </div>
        </div>
        <button
          className="reg-mobile-menu"
          type="button"
          onClick={openNav}
          aria-label="Toggle menu"
        >
          {icon.menu}
        </button>
      </header>

      <div className="reg-body">
        {!isAuthenticated ? (
          <div className="login-wrap">
            <LoginForm
              title="LOGIN REQUIRED"
              subtitle="Sign in to view guest and team registrations"
            />
          </div>
        ) : (
          <>
            <div className="reg-type-toggle">
              <button
                type="button"
                className={`reg-type-btn${tab === 'guest' ? ' active' : ''}`}
                onClick={() => setTab('guest')}
              >
                {icon.group} Guests ({DEMO_GUESTS.length})
              </button>
              <button
                type="button"
                className={`reg-type-btn${tab === 'team' ? ' active' : ''}`}
                onClick={() => setTab('team')}
              >
                {icon.teams} Teams ({DEMO_TEAMS.length})
              </button>
            </div>

            <section className="reg-card regs-card">
              {tab === 'guest' ? (
                <>
                  <div className="reg-card-head">
                    <span className="reg-card-icon blue">{icon.user}</span>
                    <div>
                      <h2>GUEST REGISTRATIONS</h2>
                      <p>Demo guest &amp; officials list</p>
                    </div>
                  </div>
                  <div className="regs-table-wrap">
                    <table className="regs-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Country</th>
                          <th>Rank / Title</th>
                          <th>Organization</th>
                          <th>Appointment</th>
                          <th>Travel</th>
                          <th>Stay</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DEMO_GUESTS.map((g) => (
                          <tr key={g.id}>
                            <td>{g.id}</td>
                            <td>{g.full_name}</td>
                            <td>{g.country}</td>
                            <td>{g.rank_title}</td>
                            <td>{g.organization_unit}</td>
                            <td>{g.appointment}</td>
                            <td className="caps">{g.travel_mode}</td>
                            <td>{yesNo(g.accommodation)}</td>
                            <td>{formatDate(g.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <div className="reg-card-head">
                    <span className="reg-card-icon green">{icon.teams}</span>
                    <div>
                      <h2>TEAM REGISTRATIONS</h2>
                      <p>Demo team list</p>
                    </div>
                  </div>
                  <div className="regs-table-wrap">
                    <table className="regs-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Captain</th>
                          <th>Organization</th>
                          <th>Male</th>
                          <th>Female</th>
                          <th>Total</th>
                          <th>Categories</th>
                          <th>Travel</th>
                          <th>Stay</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DEMO_TEAMS.map((t) => (
                          <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.team_captain}</td>
                            <td>{t.organization_unit}</td>
                            <td>{t.male_count}</td>
                            <td>{t.female_count}</td>
                            <td>{t.total_count}</td>
                            <td>
                              <span className="regs-cats">
                                {[...t.female_categories, ...t.male_categories].join(', ')}
                              </span>
                            </td>
                            <td className="caps">{t.travel_mode}</td>
                            <td>{yesNo(t.accommodation)}</td>
                            <td>{formatDate(t.created_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  )
}

export default Registrations
