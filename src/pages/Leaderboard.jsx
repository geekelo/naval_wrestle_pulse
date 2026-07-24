import { useMemo, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import {
  FEMALE_RESULTS,
  MALE_RESULTS,
  buildStandings,
  teamShort,
} from '../data/competition.js'
import navyLogo from '../assets/nigerian-navy-logo.png'
import eventLogo from '../assets/beach_wrestling_challenge_logo.png'
import { icon } from '../icons.jsx'

const TABS = [
  { id: 'overall', label: 'Overall' },
  { id: 'female', label: 'Female' },
  { id: 'male', label: 'Male' },
]

function rankClass(rank) {
  if (rank === 1) return 'gold'
  if (rank === 2) return 'silver'
  if (rank === 3) return 'bronze'
  return ''
}

function Leaderboard() {
  const { openNav } = useOutletContext()
  const [tab, setTab] = useState('overall')

  const overall = useMemo(() => buildStandings(), [])
  const female = useMemo(() => buildStandings([FEMALE_RESULTS]), [])
  const male = useMemo(() => buildStandings([MALE_RESULTS]), [])

  const standings =
    tab === 'female' ? female : tab === 'male' ? male : overall

  return (
    <div className="reg-main">
      <header className="reg-topbar">
        <div className="reg-topbar-lead">
          <img className="reg-topbar-logo" src={navyLogo} alt="Nigerian Navy" />
          <img className="reg-topbar-logo" src={eventLogo} alt="Beach Wrestling Challenge" />
          <div className="reg-topbar-title">
            <h1>LEADERBOARD</h1>
            <p>CDS Beach Wrestling standings · 24–25 Jul 2026</p>
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

      <div className="reg-body lb-body">
        <div className="reg-type-toggle lb-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`reg-type-btn${tab === t.id ? ' active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <section className="reg-card regs-card">
          <div className="reg-card-head">
            <span className="reg-card-icon green">{icon.leaderboard}</span>
            <div>
              <h2>
                {tab === 'female'
                  ? 'FEMALE STANDINGS'
                  : tab === 'male'
                    ? 'MALE STANDINGS'
                    : 'OVERALL STANDINGS'}
              </h2>
              <p>
                Ranked by wins, then point difference ·{' '}
                <Link to="/match-fixtures">View fixtures</Link>
              </p>
            </div>
          </div>

          {tab === 'male' && MALE_RESULTS.length === 0 ? (
            <p className="regs-empty">Male results will appear here when available.</p>
          ) : (
            <div className="regs-table-wrap">
              <table className="regs-table lb-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>P</th>
                    <th>W</th>
                    <th>L</th>
                    <th>PF</th>
                    <th>PA</th>
                    <th>+/−</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((row, index) => {
                    const rank = index + 1
                    return (
                      <tr key={row.code} className={rankClass(rank)}>
                        <td data-label="Rank">
                          <span className={`lb-rank ${rankClass(rank)}`}>{rank}</span>
                        </td>
                        <td data-label="Team">
                          <span className="lb-team">
                            <span className="fx-code sm">{row.code}</span>
                            <span>
                              <strong>{row.short}</strong>
                              <span className="lb-team-full">{row.name}</span>
                            </span>
                          </span>
                        </td>
                        <td data-label="Played">{row.played}</td>
                        <td data-label="Won">{row.wins}</td>
                        <td data-label="Lost">{row.losses}</td>
                        <td data-label="Points For">{row.pointsFor}</td>
                        <td data-label="Points Against">{row.pointsAgainst}</td>
                        <td data-label="Diff">
                          {row.diff > 0 ? `+${row.diff}` : row.diff}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {tab !== 'male' && (
          <section className="reg-card">
            <div className="reg-card-head">
              <span className="reg-card-icon blue">{icon.matches}</span>
              <div>
                <h2>FEMALE CATEGORY RESULTS</h2>
                <p>Navy vs Air Force</p>
              </div>
            </div>

            <div className="fx-results">
              {FEMALE_RESULTS.map((r) => {
                const navy = r.scores.B
                const air = r.scores.C
                const winner = navy > air ? 'B' : air > navy ? 'C' : null
                return (
                  <div className="fx-result" key={r.weight}>
                    <div className="fx-result-weight">
                      {r.weight}
                      {winner && (
                        <span className="lb-winner">Winner: {teamShort(winner)}</span>
                      )}
                    </div>
                    <div className="fx-result-score">
                      <span className="fx-side">
                        <span className="fx-code sm">B</span>
                        Navy
                        <strong>{navy}</strong>
                      </span>
                      <span className="fx-vs-label">–</span>
                      <span className="fx-side">
                        <span className="fx-code sm">C</span>
                        Air Force
                        <strong>{air}</strong>
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
