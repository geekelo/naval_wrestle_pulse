import { useOutletContext } from 'react-router-dom'
import navyLogo from '../assets/nigerian-navy-logo.png'
import eventLogo from '../assets/beach_wrestling_challenge_logo.png'
import { icon } from '../icons.jsx'

const YOUTUBE_LIVE_ID = 'yg4_fuevp4o'
const YOUTUBE_EMBED_SRC = `https://www.youtube.com/embed/${YOUTUBE_LIVE_ID}?autoplay=0&rel=0`
const YOUTUBE_WATCH_URL = `https://youtube.com/live/${YOUTUBE_LIVE_ID}`

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
        <section className="reg-card live-card">
          <div className="reg-card-head">
            <span className="reg-card-icon blue">{icon.live}</span>
            <div>
              <h2>CDS BEACH WRESTLING · LIVE</h2>
              <p>
                Stream on YouTube ·{' '}
                <a href={YOUTUBE_WATCH_URL} target="_blank" rel="noreferrer">
                  Open in YouTube
                </a>
              </p>
            </div>
          </div>

          <div className="live-player">
            <iframe
              src={YOUTUBE_EMBED_SRC}
              title="CDS Beach Wrestling Live Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default LiveStream
