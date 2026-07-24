import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import LoginForm from '../components/LoginForm.jsx'
import {
  fetchGuestRegistrations,
  fetchTeamRegistrations,
} from '../api/registrations.js'
import navyLogo from '../assets/nigerian-navy-logo.png'
import eventLogo from '../assets/beach_wrestling_challenge_logo.png'
import { icon } from '../icons.jsx'

function formatDate(value) {
  if (!value) return '—'
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
  if (value === true || value === 'yes' || value === 'true') return 'Yes'
  if (value === false || value === 'no' || value === 'false') return 'No'
  return value == null ? '—' : String(value)
}

function formatCategories(...lists) {
  const values = lists.flatMap((list) => {
    if (Array.isArray(list)) return list
    if (typeof list === 'string' && list.trim()) return [list]
    return []
  })
  return values.length ? values.join(', ') : '—'
}

function teamPlayers(team) {
  return Array.from({ length: 10 }, (_, i) => team[`player_${i + 1}`])
    .map((name) => (typeof name === 'string' ? name.trim() : ''))
    .filter(Boolean)
}

function Registrations() {
  const { openNav } = useOutletContext()
  const { isAuthenticated } = useAuth()
  const [tab, setTab] = useState('guest') // 'guest' | 'team'

  const [guests, setGuests] = useState([])
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(false)
  const [guestError, setGuestError] = useState(null)
  const [teamError, setTeamError] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) {
      setGuests([])
      setTeams([])
      setGuestError(null)
      setTeamError(null)
      return
    }

    let cancelled = false

    async function loadRegistrations() {
      setLoading(true)
      setGuestError(null)
      setTeamError(null)

      const [guestResult, teamResult] = await Promise.allSettled([
        fetchGuestRegistrations(),
        fetchTeamRegistrations(),
      ])

      if (cancelled) return

      if (guestResult.status === 'fulfilled') {
        setGuests(guestResult.value)
      } else {
        setGuests([])
        setGuestError(
          guestResult.reason?.message || 'Unable to load guest registrations.',
        )
      }

      if (teamResult.status === 'fulfilled') {
        setTeams(teamResult.value)
      } else {
        setTeams([])
        setTeamError(
          teamResult.reason?.message || 'Unable to load team registrations.',
        )
      }

      setLoading(false)
    }

    loadRegistrations()
    return () => {
      cancelled = true
    }
  }, [isAuthenticated])

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
                {icon.group} Guests ({loading ? '…' : guests.length})
              </button>
              <button
                type="button"
                className={`reg-type-btn${tab === 'team' ? ' active' : ''}`}
                onClick={() => setTab('team')}
              >
                {icon.teams} Teams ({loading ? '…' : teams.length})
              </button>
            </div>

            <section className="reg-card regs-card">
              {tab === 'guest' ? (
                <>
                  <div className="reg-card-head">
                    <span className="reg-card-icon blue">{icon.user}</span>
                    <div>
                      <h2>GUEST REGISTRATIONS</h2>
                      <p>Live guest &amp; officials list</p>
                    </div>
                  </div>

                  {guestError && (
                    <p className="reg-status err">{guestError}</p>
                  )}

                  {loading ? (
                    <p className="regs-empty">Loading guest registrations…</p>
                  ) : guests.length === 0 && !guestError ? (
                    <p className="regs-empty">No guest registrations yet.</p>
                  ) : guests.length > 0 ? (
                    <div className="team-regs-list">
                      {guests.map((g, index) => (
                        <article
                          className="team-reg-card"
                          key={g.id ?? `${g.full_name}-${index}`}
                        >
                          <div className="team-reg-top">
                            <span className="team-reg-index">{index + 1}</span>
                            <div className="team-reg-meta">
                              <h3>{g.full_name || 'Guest'}</h3>
                              <p>
                                {g.rank_title || '—'}
                                {g.country ? ` · ${g.country}` : ''}
                              </p>
                            </div>
                          </div>

                          <div className="team-reg-stats guest-reg-stats">
                            <div>
                              <span>Organization</span>
                              <strong>{g.organization_unit || '—'}</strong>
                            </div>
                            <div>
                              <span>Appointment</span>
                              <strong>{g.appointment || '—'}</strong>
                            </div>
                            <div>
                              <span>Travel</span>
                              <strong className="caps">{g.travel_mode || '—'}</strong>
                            </div>
                            <div>
                              <span>Stay</span>
                              <strong>{yesNo(g.accommodation)}</strong>
                            </div>
                            <div>
                              <span>Date</span>
                              <strong>{formatDate(g.created_at)}</strong>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <div className="reg-card-head">
                    <span className="reg-card-icon green">{icon.teams}</span>
                    <div>
                      <h2>TEAM REGISTRATIONS</h2>
                      <p>Live team list</p>
                    </div>
                  </div>

                  {teamError && (
                    <p className="reg-status err">{teamError}</p>
                  )}

                  {loading ? (
                    <p className="regs-empty">Loading team registrations…</p>
                  ) : teams.length === 0 && !teamError ? (
                    <p className="regs-empty">No team registrations yet.</p>
                  ) : teams.length > 0 ? (
                    <div className="team-regs-list">
                      {teams.map((t, index) => {
                        const players = teamPlayers(t)
                        return (
                          <article
                            className="team-reg-card"
                            key={t.id ?? `${t.team_captain}-${index}`}
                          >
                            <div className="team-reg-top">
                              <span className="team-reg-index">{index + 1}</span>
                              <div className="team-reg-meta">
                                <h3>{t.organization_unit || 'Team'}</h3>
                                <p>
                                  Captain: <strong>{t.team_captain || '—'}</strong>
                                </p>
                              </div>
                            </div>

                            <div className="team-reg-stats">
                              <div>
                                <span>Male</span>
                                <strong>{t.male_count ?? '—'}</strong>
                              </div>
                              <div>
                                <span>Female</span>
                                <strong>{t.female_count ?? '—'}</strong>
                              </div>
                              <div>
                                <span>Total</span>
                                <strong>{t.total_count ?? '—'}</strong>
                              </div>
                              <div>
                                <span>Travel</span>
                                <strong className="caps">{t.travel_mode || '—'}</strong>
                              </div>
                              <div>
                                <span>Stay</span>
                                <strong>{yesNo(t.accommodation)}</strong>
                              </div>
                              <div>
                                <span>Date</span>
                                <strong>{formatDate(t.created_at)}</strong>
                              </div>
                            </div>

                            <div className="team-reg-cats">
                              <span>Categories</span>
                              <p>
                                {formatCategories(
                                  t.female_categories,
                                  t.male_categories,
                                )}
                              </p>
                            </div>

                            <div className="team-reg-players">
                              <h4>Players ({players.length})</h4>
                              {players.length === 0 ? (
                                <p className="regs-empty">No player names provided.</p>
                              ) : (
                                <ol>
                                  {players.map((name, i) => (
                                    <li key={`${t.id || index}-p${i}`}>
                                      <span className="player-no">{i + 1}</span>
                                      <span className="player-name">{name}</span>
                                    </li>
                                  ))}
                                </ol>
                              )}
                            </div>
                          </article>
                        )
                      })}
                    </div>
                  ) : null}
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
