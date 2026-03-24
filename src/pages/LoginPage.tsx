import { useState } from 'react'
import { Navigate, Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import type { Role } from '../lib/types'
import { ArrowLeft, User, Briefcase, CheckCircle } from 'lucide-react'

export default function LoginPage() {
  const { user, role } = useAuth()
  const { signIn, signUp, signInWithGoogle } = useAuth()
  const { t, language } = useLanguage()
  const [searchParams] = useSearchParams()
  const isSignup = searchParams.get('signup') === 'true'

  const [mode, setMode] = useState<'login' | 'signup'>(isSignup ? 'signup' : 'login')
  const [signupRole, setSignupRole] = useState<Role>('seeker')
  const [signupName, setSignupName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (user && role) {
    return <Navigate to="/" replace />
  }

  if (mode === 'signup') {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 ${language === 'dv' ? 'dhivehi-font' : ''}`}>
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Fannu Varin" className="h-10 w-10 rounded-xl border border-white/20 bg-white/10 object-contain" />
              <span className="text-xl font-bold text-white">Fannu Varin</span>
            </Link>
            <button
              onClick={() => setMode('login')}
              className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm text-white transition-all hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('auth.backToLogin')}
            </button>
          </div>
        </nav>

        {/* Signup Form */}
        <div className="flex min-h-screen items-center justify-center px-4 pt-20">
          <div className="relative z-10 w-full max-w-md">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-2xl">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500">
                  <User className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">{t('auth.createAccount')}</h1>
                <p className="mt-2 text-sm text-white/60">{t('auth.signupSubtitle')}</p>
              </div>

              {/* Name Input */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-white/80">{t('auth.fullName')}</label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-blue-500 focus:bg-white/10 focus:outline-none"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder={t('auth.namePlaceholder')}
                />
              </div>

              {/* Role Selection */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-white/80">{t('auth.selectRole')}</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSignupRole('seeker')}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                      signupRole === 'seeker'
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <User className={`h-6 w-6 ${signupRole === 'seeker' ? 'text-blue-400' : 'text-white/60'}`} />
                    <span className={`text-sm font-medium ${signupRole === 'seeker' ? 'text-white' : 'text-white/60'}`}>
                      Skill Seeker
                    </span>
                  </button>
                  <button
                    onClick={() => setSignupRole('provider')}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                      signupRole === 'provider'
                        ? 'border-cyan-500 bg-cyan-500/20'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <Briefcase className={`h-6 w-6 ${signupRole === 'provider' ? 'text-cyan-400' : 'text-white/60'}`} />
                    <span className={`text-sm font-medium ${signupRole === 'provider' ? 'text-white' : 'text-white/60'}`}>
                      Skill Provider
                    </span>
                  </button>
                </div>
              </div>

              {/* Role Description */}
              <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-400" />
                  <div>
                    <h3 className="text-sm font-medium text-white">
                      {signupRole === 'seeker' ? 'Skill Seeker' : 'Skill Provider'}
                    </h3>
                    <p className="mt-1 text-xs text-white/60">
                      {signupRole === 'seeker'
                        ? t('roles.customerDesc')
                        : t('roles.workerDesc')}
                    </p>
                  </div>
                </div>
              </div>

              <form
                className="space-y-3"
                onSubmit={async (e) => {
                  e.preventDefault()
                  setError('')
                  const res = await signUp(email, password, signupRole, signupName)
                  if (res.error) setError(res.error.message)
                }}
              >
                <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 font-medium text-white">
                  {t('auth.signUp')}
                </button>
              </form>
              <button
                onClick={async () => {
                  setError('')
                  const res = await signInWithGoogle()
                  if (res.error) setError(res.error.message)
                }}
                className="mt-3 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white"
              >
                Continue with Google
              </button>
              {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}

              <div className="mt-6 text-center">
                <p className="text-sm text-white/60">
                  {t('auth.alreadyHaveAccount')}{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="font-medium text-blue-400 hover:text-blue-300"
                  >
                    {t('auth.signIn')}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 ${language === 'dv' ? 'dhivehi-font' : ''}`}>
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Fannu Varin" className="h-10 w-10 rounded-xl border border-white/20 bg-white/10 object-contain" />
            <span className="text-xl font-bold text-white">Fannu Varin</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/60">{t('auth.noAccount')}</span>
            <button
              onClick={() => setMode('signup')}
              className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50"
            >
              {t('auth.signUp')}
            </button>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex min-h-screen items-center justify-center px-4 pt-20">
        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-2xl">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
                <img src="/logo.png" alt="Maraamathu" className="h-10 w-10 rounded-lg" />
              </div>
              <h1 className="text-2xl font-bold text-white">{t('auth.welcomeBack')}</h1>
              <p className="mt-2 text-sm text-white/60">{t('auth.signInSubtitle')}</p>
            </div>

            <form
              className="space-y-3"
              onSubmit={async (e) => {
                e.preventDefault()
                setError('')
                const res = await signIn(email, password)
                if (res.error) setError(res.error.message)
              }}
            >
              <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white" value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              <button className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 font-medium text-white">
                {t('auth.signIn')}
              </button>
            </form>
            <button
              onClick={async () => {
                setError('')
                const res = await signInWithGoogle()
                if (res.error) setError(res.error.message)
              }}
              className="mt-3 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white"
            >
              Continue with Google
            </button>
            {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}

            <div className="mt-6 text-center">
              <p className="text-sm text-white/60">
                {t('auth.noAccount')}{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  {t('auth.signUp')}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
