import { useOutletContext } from 'react-router-dom'
import {
  TEAMS,
  FIXTURES,
  THURSDAY_SESSIONS,
  FRIDAY_SESSIONS,
  FEMALE_RESULTS,
  MALE_RESULTS,
  teamName,
} from '../data/competition.js'
import navyLogo from '../assets/nigerian-navy-logo.png'
import eventLogo from '../assets/beach_wrestling_challenge_logo.png'
import { icon } from '../icons.jsx'

function ResultCards({ results }) {
  return (
    <div className="fx-results">
      {results.map((r) => (
        <div className="fx-result" key={r.weight}>
          <div className="fx-result-weight">{r.weight}</div>
          <div className="fx-result-score">
            <span className="fx-side">
              <span className="fx-code sm">B</span>
              Navy
              <strong>{r.scores.B}</strong>
            </span>
            <span className="fx-vs-label">–</span>
            <span className="fx-side">
              <span className="fx-code sm">C</span>
              Air Force
              <strong>{r.scores.C}</strong>
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function MatchFixtures() {
  const { openNav } = useOutletContext()

  return (
    <div className="reg-main">
      <header className="reg-topbar">
        <div className="reg-topbar-lead">
          <img className="reg-topbar-logo" src={navyLogo} alt="Nigerian Navy" />
          <img className="reg-topbar-logo" src={eventLogo} alt="Beach Wrestling Challenge" />
          <div className="reg-topbar-title">
            <h1>MATCH FIXTURES</h1>
            <p>CDS Beach Wrestling fixtures · 24–25 Jul 2026</p>
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

      <div className="reg-body fx-body">
        <section className="reg-card fx-hero">
          <div className="reg-card-head">
            <span className="reg-card-icon blue">{icon.matches}</span>
            <div>
              <h2>CDS BEACH WRESTLING</h2>
              <p>General pairing for 24–25 Jul 2026</p>
            </div>
          </div>

          <div className="fx-teams">
            {TEAMS.map((team) => (
              <div className="fx-team" key={team.code}>
                <span className="fx-code">{team.code}</span>
                <span className="fx-name">{team.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="reg-card">
          <div className="reg-card-head">
            <span className="reg-card-icon green">{icon.leaderboard}</span>
            <div>
              <h2>FIXTURES (NORDIC SYSTEM)</h2>
              <p>Each team competes against every other team</p>
            </div>
          </div>

          <ol className="fx-list">
            {FIXTURES.map((f) => (
              <li key={f.round} className="fx-bout">
                <span className="fx-round">Match {f.round}</span>
                <div className="fx-vs">
                  <span className="fx-side">
                    <span className="fx-code sm">{f.left}</span>
                    {teamName(f.left)}
                  </span>
                  <span className="fx-vs-label">vs</span>
                  <span className="fx-side">
                    <span className="fx-code sm">{f.right}</span>
                    {teamName(f.right)}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="reg-card">
          <div className="reg-card-head">
            <span className="reg-card-icon green">{icon.leaderboard}</span>
            <div>
              <h2>FEMALE FIXTURES · RESULTS</h2>
              <p>Navy vs Air Force · Thu 24 Jul 2026</p>
            </div>
          </div>
          <ResultCards results={FEMALE_RESULTS} />
        </section>

        <section className="reg-card">
          <div className="reg-card-head">
            <span className="reg-card-icon blue">{icon.leaderboard}</span>
            <div>
              <h2>MALE FIXTURES · RESULTS</h2>
              <p>Navy vs Air Force (NAF) · Thu 24 Jul 2026</p>
            </div>
          </div>
          <ResultCards results={MALE_RESULTS} />
        </section>

        <section className="reg-card fx-note-card">
          <div className="reg-card-head">
            <span className="reg-card-icon blue">{icon.info}</span>
            <div>
              <h2>BRIEF EXPLANATION</h2>
              <p>Nordic System · UWW / CISM best practice</p>
            </div>
          </div>
          <div className="fx-note">
            <p>
              In the Nordic System, each team/wrestler competes against every other
              team/wrestler.
            </p>
            <p>
              This is the rule applied by UWW/CISM as best practice. It is used when
              the number of teams/athletes is below 6. When there are 6 athletes and
              above, the competition is done in a Group Stage format.
            </p>
          </div>
        </section>

        <div className="fx-days">
          <section className="reg-card">
            <div className="reg-card-head">
              <span className="reg-card-icon blue">{icon.schedule}</span>
              <div>
                <h2>THU 24 JUL 2026</h2>
                <p>Round 1 wrestling sessions</p>
              </div>
            </div>
            <ul className="fx-session">
              {THURSDAY_SESSIONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="reg-card">
            <div className="reg-card-head">
              <span className="reg-card-icon green">{icon.schedule}</span>
              <div>
                <h2>FRI 25 JUL 2026</h2>
                <p>Finals and closing</p>
              </div>
            </div>
            <ul className="fx-session">
              {FRIDAY_SESSIONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default MatchFixtures
