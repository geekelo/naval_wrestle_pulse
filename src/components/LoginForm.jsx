import { useState } from 'react'
import { useAuth } from '../auth/AuthContext.jsx'
import { icon } from '../icons.jsx'

function LoginForm({
  title = 'ADMIN LOGIN',
  subtitle = 'Enter your credentials to continue',
  onSuccess,
}) {
  const { login } = useAuth()
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
      onSuccess?.()
    } catch (err) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="reg-card login-card">
      <div className="reg-card-head">
        <span className="reg-card-icon blue">{icon.login}</span>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>

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
    </section>
  )
}

export default LoginForm
