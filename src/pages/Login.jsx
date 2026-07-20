import { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import navyLogo from '../assets/nigerian-navy-logo.png'
import eventLogo from '../assets/beach_wrestling_challenge_logo.png'
import { icon } from '../icons.jsx'

function Login() {
  const navigate = useNavigate()
  const { openNav } = useOutletContext()
  const { login, isAuthenticated, user } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)

    if (!email.trim() || !password) {
      setError('Email and password are required.')
      return
    }

    setSubmitting(true)
    try {
      await login(email.trim(), password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setSubmitting(false)
    }
  }

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
          <section className="reg-card login-card">
            <div className="reg-card-head">
              <span className="reg-card-icon blue">{icon.login}</span>
              <div>
                <h2>ADMIN LOGIN</h2>
                <p>
                  {isAuthenticated
                    ? `Signed in as ${user?.email || 'user'}`
                    : 'Enter your credentials to continue'}
                </p>
              </div>
            </div>

            {isAuthenticated ? (
              <div className="login-already">
                <p>You are already signed in.</p>
                <Link className="reg-btn primary" to="/dashboard">
                  Go to Dashboard {icon.arrow}
                </Link>
              </div>
            ) : (
              <form className="login-form" onSubmit={handleSubmit} noValidate>
                <div className="reg-field">
                  <label htmlFor="login-email">Email <span className="req">*</span></label>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@navalwrestle.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="reg-field">
                  <label htmlFor="login-password">Password <span className="req">*</span></label>
                  <input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && <p className="reg-status err">{error}</p>}

                <button
                  className="reg-btn primary login-submit"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? 'Signing in…' : 'Login'} {icon.login}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Login
