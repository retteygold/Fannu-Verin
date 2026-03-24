import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LanguageToggle from './LanguageToggle'
import PwaInstallButton from './PwaInstallButton'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children?: ReactNode }) {
  const { user, role, signOut } = useAuth()

  return (
    <div className="app-bg min-h-screen text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#101a33]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <img src="/logo.png" alt="Fannu Varin" className="h-10 w-10 rounded-xl border border-white/10 bg-white/20 object-contain" />
            <div>
              <div className="text-lg font-semibold">Fannu Varin</div>
              <div className="text-xs text-white/60">Skills marketplace</div>
            </div>
          </div>
          <div className="flex max-w-full flex-wrap items-center justify-end gap-2">
            <LanguageToggle />
            <PwaInstallButton />
            {role === 'admin' || role === 'provider' ? (
              <Link
                className="pill-tab hidden px-3 py-2 text-sm text-white sm:inline-flex"
                to="/seeker"
              >
                Seeker
              </Link>
            ) : null}
            {role === 'admin' || role === 'provider' ? (
              <Link
                className="pill-tab hidden px-3 py-2 text-sm text-white sm:inline-flex"
                to="/provider"
              >
                Provider
              </Link>
            ) : null}
            {role === 'admin' ? (
              <Link
                className="pill-tab hidden px-3 py-2 text-sm text-white sm:inline-flex"
                to="/admin"
              >
                Admin
              </Link>
            ) : null}
            <div className="min-w-0 text-right">
              <div className="max-w-[12rem] truncate rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white/80">
                {role} • {user?.displayName ?? user?.email}
              </div>
            </div>
            <button
              className="pill-tab px-3 py-2 text-sm text-white"
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 pb-20">
        {children ?? <Outlet />}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#101a33]/75 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-3 text-center">
          <div className="text-xs text-white/60">Powered by Retts Web Dev</div>
        </div>
      </footer>
    </div>
  )
}
