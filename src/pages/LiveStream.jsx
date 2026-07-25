import { useOutletContext } from 'react-router-dom'
import navyLogo from '../assets/nigerian-navy-logo.png'
import eventLogo from '../assets/beach_wrestling_challenge_logo.png'
import { icon } from '../icons.jsx'

const SESSIONS = [
  {
    id: 'UXknzd3YGi8',
    title: 'CDS BEACH WRESTLING · SECOND DAY | FINALS',
  },
  {
    id: 'UXuRKqq6QNM',
    title: 'CDS BEACH WRESTLING · FIRST DAY * AFTERNOON SESSION',
  },
  {
    id: 'yg4_fuevp4o',
    title: 'CDS BEACH WRESTLING · FIRST DAY * MORNING SESSION',
  },
]

function sessionEmbed(id) {
  return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0`
}

function sessionWatch(id) {
  return `https://www.youtube.com/live/${id}`
}

function LiveStream() {
  const { openNav } = useOutletContext()

  return (
    <div className="reg-main">
      <header className="reg-topbar">
        <div className="reg-topbar-lead">
          <img className="reg-topbar-logo" src={navyLogo} alt="Nigerian Navy" />
          <img className="reg-topbar-logo" src={eventLogo} alt="Beach Wrestling Challenge" />
          <div className="reg-topbar-title">
            <h1>LIVE STREAM</h1>
            <p>Watch CDS Beach Wrestling live</p>
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

      <div className="reg-body live-body">
        {SESSIONS.map((session) => (
          <section className="reg-card live-card" key={session.id}>
            <div className="reg-card-head">
              <span className="reg-card-icon blue">{icon.live}</span>
              <div>
                <h2>{session.title}</h2>
                <p>
                  Stream on YouTube ·{' '}
                  <a href={sessionWatch(session.id)} target="_blank" rel="noreferrer">
                    Open in YouTube
                  </a>
                </p>
              </div>
            </div>

            <div className="live-player">
              <iframe
                src={sessionEmbed(session.id)}
                title={session.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default LiveStream
