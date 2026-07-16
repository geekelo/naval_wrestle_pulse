import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import navyLogo from '../assets/nigerian-navy-logo.png'
import eventLogo from '../assets/beach_wrestling_challenge_logo.png'
import { icon } from '../icons.jsx'

const COUNTRIES = [
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt', 'United States',
  'United Kingdom', 'India', 'Brazil', 'France', 'Germany', 'Other',
]

const RANKS = [
  'Gen or equivalent', 'Lt Gen or equivalent', 'Maj Gen', 'Brig Gen',
  'Col', 'Lt Col', 'Maj', 'Capt', 'Lt', 'AWIO', 'NWO', 'SSgt', 'Sgt',
  'Cpl', 'LCpl', 'Pte or equivalent', 'Prof', 'Dr', 'Mr', 'Mrs', 'Ms',
]

const FEMALE_CATS = ['50kg', '60kg', '70kg', '+70kg']
const MALE_CATS = ['70kg', '80kg', '90kg', '+90kg']

const STEPS = ['Select Type', 'Fill Details', 'Review & Submit']

function Register() {
  const navigate = useNavigate()
  const { openNav } = useOutletContext()
  const [type, setType] = useState('guest') // 'guest' | 'team'

  const [guest, setGuest] = useState({
    country: '', name: '', rank: '', org: '', appointment: '',
    travel: 'air', accommodation: 'yes',
  })

  const [team, setTeam] = useState({
    captain: '', org: '', male: 0, female: 0,
    players: Array(10).fill(''),
    femaleCats: [], maleCats: [],
    travel: 'air', accommodation: 'yes',
  })

  const setG = (k, v) => setGuest((p) => ({ ...p, [k]: v }))
  const setT = (k, v) => setTeam((p) => ({ ...p, [k]: v }))

  const step = (n, d) =>
    setT(n, Math.max(0, team[n] + d))

  const setPlayer = (i, v) =>
    setTeam((p) => {
      const players = [...p.players]
      players[i] = v
      return { ...p, players }
    })

  const toggleCat = (key, val) =>
    setTeam((p) => {
      const list = p[key].includes(val)
        ? p[key].filter((c) => c !== val)
        : [...p[key], val]
      return { ...p, [key]: list }
    })

  const handleNext = () => {
    // Hook up real submission / step navigation here.
    console.log(type === 'guest' ? guest : team)
  }

  return (
    <div className="reg-main">
        <header className="reg-topbar">
          <div className="reg-topbar-lead">
            <img className="reg-topbar-logo" src={navyLogo} alt="Nigerian Navy" />
            <img className="reg-topbar-logo" src={eventLogo} alt="Beach Wrestling Challenge" />
            <div className="reg-topbar-title">
              <h1>REGISTRATION</h1>
              <p>Choose a registration type and complete the form</p>
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

          <div className="reg-steps">
            {STEPS.map((label, i) => (
              <div className="reg-step-wrap" key={label} style={{ display: 'flex', alignItems: 'center' }}>
                <div className={`reg-step${i === 0 ? ' active' : ''}`}>
                  <span className="reg-step-dot">{i + 1}</span>
                  <span className="reg-step-label">{label}</span>
                </div>
                {i < STEPS.length - 1 && <span className="reg-step-line" />}
              </div>
            ))}
          </div>
        </header>

        <div className="reg-body">
          <p className="reg-hint">Select registration type to continue</p>

          {/* Type toggle */}
          <div className="reg-type-toggle">
            <button
              type="button"
              className={`reg-type-btn${type === 'guest' ? ' active' : ''}`}
              onClick={() => setType('guest')}
            >
              {icon.group} Guests &amp; Officials
            </button>
            <button
              type="button"
              className={`reg-type-btn${type === 'team' ? ' active' : ''}`}
              onClick={() => setType('team')}
            >
              {icon.teams} Team Registration
            </button>
          </div>

          <div className="reg-cards">
            {/* ===== Guests & Officials ===== */}
            {type === 'guest' && (
            <section className="reg-card card-guest">
                <div className="reg-card-head">
                  <span className="reg-card-icon blue">{icon.user}</span>
                  <div>
                    <h2>GUESTS &amp; OFFICIALS</h2>
                    <p>Register as a guest or official</p>
                  </div>
                </div>

                <div className="reg-grid-2">
                  <div className="reg-field">
                    <label>Country <span className="req">*</span></label>
                    <select value={guest.country} onChange={(e) => setG('country', e.target.value)}>
                      <option value="">Select Country</option>
                      {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="reg-field">
                    <label>Name in Full <span className="req">*</span></label>
                    <input
                      placeholder="Enter full name"
                      value={guest.name}
                      onChange={(e) => setG('name', e.target.value)}
                    />
                  </div>
                </div>

                <div className="reg-field">
                  <label>Rank / Title <span className="req">*</span></label>
                  <select value={guest.rank} onChange={(e) => setG('rank', e.target.value)}>
                    <option value="">Select Rank or Title</option>
                    {RANKS.map((r) => <option key={r}>{r}</option>)}
                  </select>
                  <p className="reg-help-text">
                    Gen or equivalent, Lt Gen or equivalent, Maj Gen, Brig Gen, Col, Lt Col, Maj,
                    Capt, Lt, AWIO, NWO, SSgt, Sgt, Cpl, LCpl, Pte or equivalent,
                    Prof, Dr, Mr, Mrs, Ms...
                  </p>
                </div>

                <div className="reg-grid-2">
                  <div className="reg-field">
                    <label>Organization / Unit <span className="req">*</span></label>
                    <input
                      placeholder="Enter organization or unit"
                      value={guest.org}
                      onChange={(e) => setG('org', e.target.value)}
                    />
                  </div>
                  <div className="reg-field">
                    <label>Appointment / Position <span className="req">*</span></label>
                    <input
                      placeholder="Enter appointment or position"
                      value={guest.appointment}
                      onChange={(e) => setG('appointment', e.target.value)}
                    />
                  </div>
                </div>

                <div className="reg-grid-2">
                  <div className="reg-field">
                    <label>Travel Mode <span className="req">*</span></label>
                    <div className="reg-seg">
                      <button type="button" className={guest.travel === 'air' ? 'active' : ''} onClick={() => setG('travel', 'air')}>{icon.plane} Air</button>
                      <button type="button" className={guest.travel === 'road' ? 'active' : ''} onClick={() => setG('travel', 'road')}>{icon.car} Road</button>
                    </div>
                  </div>
                  <div className="reg-field">
                    <label>Accommodation <span className="req">*</span></label>
                    <div className="reg-seg green">
                      <button type="button" className={guest.accommodation === 'yes' ? 'active' : ''} onClick={() => setG('accommodation', 'yes')}>{icon.check} Yes</button>
                      <button type="button" className={guest.accommodation === 'no' ? 'active' : ''} onClick={() => setG('accommodation', 'no')}>{icon.x} No</button>
                    </div>
                  </div>
                </div>

                <div className="reg-note">
                  {icon.info}
                  <span><strong>Note:</strong> Accommodation will be arranged based on availability.</span>
                </div>
            </section>
            )}

            {/* ===== Team Registration ===== */}
            {type === 'team' && (
            <section className="reg-card card-team">
                <div className="reg-card-head">
                  <span className="reg-card-icon green">{icon.teams}</span>
                  <div>
                    <h2>TEAM REGISTRATION</h2>
                    <p>Register your team and details</p>
                  </div>
                </div>

                <div className="reg-grid-2">
                  <div className="reg-field">
                    <label>Team Captain <span className="req">*</span></label>
                    <input
                      placeholder="Enter team captain name"
                      value={team.captain}
                      onChange={(e) => setT('captain', e.target.value)}
                    />
                  </div>
                  <div className="reg-field">
                    <label>Organization / Unit <span className="req">*</span></label>
                    <input
                      placeholder="Enter organization or unit"
                      value={team.org}
                      onChange={(e) => setT('org', e.target.value)}
                    />
                  </div>
                </div>

                <div className="reg-field">
                  <label>Number of Team <span className="req">*</span></label>
                  <div className="reg-count-row">
                    <div className="reg-count male">
                      <div className="reg-count-icon">{icon.user}</div>
                      <div className="reg-count-label">Male</div>
                      <div className="reg-stepper">
                        <button type="button" onClick={() => step('male', -1)} disabled={team.male === 0}>−</button>
                        <span>{team.male}</span>
                        <button type="button" onClick={() => step('male', 1)}>+</button>
                      </div>
                    </div>
                    <div className="reg-count female">
                      <div className="reg-count-icon">{icon.user}</div>
                      <div className="reg-count-label">Female</div>
                      <div className="reg-stepper">
                        <button type="button" onClick={() => step('female', -1)} disabled={team.female === 0}>−</button>
                        <span>{team.female}</span>
                        <button type="button" onClick={() => step('female', 1)}>+</button>
                      </div>
                    </div>
                    <div className="reg-count total">
                      <div className="reg-count-icon">{icon.group}</div>
                      <div className="reg-count-label">Total</div>
                      <span>{team.male + team.female}</span>
                    </div>
                  </div>
                </div>

                <div className="reg-section-title">TEAM PLAYERS (10 REQUIRED)</div>
                <div className="reg-players">
                  {team.players.map((val, i) => (
                    <div className="reg-player" key={i}>
                      <span className="reg-player-no">{i + 1}</span>
                      <span className="reg-player-lbl">Player {i + 1} <span className="req">*</span></span>
                      <input
                        placeholder="Enter full name"
                        value={val}
                        onChange={(e) => setPlayer(i, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div className="reg-section-title">CATEGORIES COMPETING IN <span className="req">*</span></div>
                <div className="reg-cat-grid">
                  <div className="reg-cat f">
                    <div className="reg-cat-title">{icon.user} Female Categories</div>
                    <div className="reg-checks">
                      {FEMALE_CATS.map((c) => (
                        <label className="reg-check" key={c}>
                          <input
                            type="checkbox"
                            checked={team.femaleCats.includes(c)}
                            onChange={() => toggleCat('femaleCats', c)}
                          />
                          {c}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="reg-cat m">
                    <div className="reg-cat-title">{icon.user} Male Categories</div>
                    <div className="reg-checks">
                      {MALE_CATS.map((c) => (
                        <label className="reg-check" key={c}>
                          <input
                            type="checkbox"
                            checked={team.maleCats.includes(c)}
                            onChange={() => toggleCat('maleCats', c)}
                          />
                          {c}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="reg-grid-2" style={{ marginTop: '18px' }}>
                  <div className="reg-field">
                    <label>Travel Mode <span className="req">*</span></label>
                    <div className="reg-seg">
                      <button type="button" className={team.travel === 'air' ? 'active' : ''} onClick={() => setT('travel', 'air')}>{icon.plane} Air</button>
                      <button type="button" className={team.travel === 'road' ? 'active' : ''} onClick={() => setT('travel', 'road')}>{icon.car} Road</button>
                    </div>
                  </div>
                  <div className="reg-field">
                    <label>Accommodation <span className="req">*</span></label>
                    <div className="reg-seg green">
                      <button type="button" className={team.accommodation === 'yes' ? 'active' : ''} onClick={() => setT('accommodation', 'yes')}>{icon.check} Yes</button>
                      <button type="button" className={team.accommodation === 'no' ? 'active' : ''} onClick={() => setT('accommodation', 'no')}>{icon.x} No</button>
                    </div>
                  </div>
                </div>
            </section>
            )}
          </div>
        </div>

        <footer className="reg-footer">
          <button className="reg-btn ghost" type="button" onClick={() => navigate('/')}>
            {icon.x} Cancel
          </button>
          <button className="reg-btn primary" type="button" onClick={handleNext}>
            Submit {icon.arrow}
          </button>
        </footer>
    </div>
  )
}

export default Register
