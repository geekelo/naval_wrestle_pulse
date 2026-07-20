import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import LoginForm from '../components/LoginForm.jsx'
import navyLogo from '../assets/nigerian-navy-logo.png'
import eventLogo from '../assets/beach_wrestling_challenge_logo.png'
import { icon } from '../icons.jsx'

function Login() {
  const navigate = useNavigate()
  const { openNav } = useOutletContext()
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="reg-main">
      <header className="reg-topbar">
        <div className="reg-topbar-lead">
          <img className="reg-topbar-logo" src={navyLogo} alt="Nigerian Navy" />
          <img className="reg-topbar-logo" src={eventLogo} alt="Beach Wrestling Challenge" />
          <div className="reg-topbar-title">
            <h1>LOGIN</h1>
            <p>Sign in to manage the challenge</p>
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
        <div className="login-wrap">
          {isAuthenticated ? (
            <section className="reg-card login-card">
              <div className="reg-card-head">
                <span className="reg-card-icon blue">{icon.login}</span>
                <div>
                  <h2>ADMIN LOGIN</h2>
                  <p>Signed in as {user?.email || 'user'}</p>
                </div>
              </div>
              <div className="login-already">
                <p>You are already signed in.</p>
                <Link className="reg-btn primary" to="/registrations">
                  View Registrations {icon.arrow}
                </Link>
              </div>
            </section>
          ) : (
            <LoginForm onSuccess={() => navigate('/registrations')} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
