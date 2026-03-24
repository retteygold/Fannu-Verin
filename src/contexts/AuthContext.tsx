import { createContext, useContext, useEffect, useState } from 'react'
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, googleProvider } from '../lib/firebase'
import type { Role } from '../lib/types'

interface AuthState {
  user: User | null
  role: Role | null
  loading: boolean
  needsRoleSelection: boolean
}

type AuthContextError = Error | null

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, role: Role, name: string) => Promise<{ error: AuthContextError }>
  signIn: (email: string, password: string) => Promise<{ error: AuthContextError }>
  signInWithGoogle: () => Promise<{ error: AuthContextError }>
  signOut: () => Promise<void>
  updateRole: (role: Role) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    role: null,
    loading: true,
    needsRoleSelection: false,
  })

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({ user: null, role: null, loading: false, needsRoleSelection: false })
        return
      }
      try {
        const profile = await readUserProfile(user.uid)
        if (profile) {
          setState({ user, role: profile.role, loading: false, needsRoleSelection: false })
        } else {
          setState({ user, role: null, loading: false, needsRoleSelection: true })
        }
      } catch (e) {
        console.error('[Auth] Failed to read profile; falling back to role selection', e)
        setState({ user, role: null, loading: false, needsRoleSelection: true })
      }
    })
    return () => unsub()
  }, [])

  async function readUserProfile(uid: string): Promise<{ role: Role; name?: string } | null> {
    try {
      const snap = await getDoc(doc(db, 'profiles', uid))
      if (!snap.exists()) return null
      const data = snap.data() as { role?: Role; name?: string }
      if (data.role === 'admin' || data.role === 'provider' || data.role === 'seeker') {
        return { role: data.role, name: data.name }
      }
      return null
    } catch (e) {
      console.error('[Auth] readUserProfile error:', e)
      return null
    }
  }

  async function writeUserProfile(user: User, role: Role, name?: string) {
    await setDoc(
      doc(db, 'profiles', user.uid),
      {
        id: user.uid,
        email: user.email ?? null,
        name: name ?? user.displayName ?? user.email ?? 'User',
        role,
        active: true,
      },
      { merge: true },
    )
  }

  async function signUp(email: string, password: string, role: Role, name: string) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(cred.user, { displayName: name })
      await writeUserProfile(cred.user, role, name)
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  async function signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  async function signInWithGoogle() {
    try {
      const cred = await signInWithPopup(auth, googleProvider)
      const existing = await readUserProfile(cred.user.uid)
      if (!existing) {
        setState((prev) => ({ ...prev, needsRoleSelection: true }))
      }
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  async function signOut() {
    await firebaseSignOut(auth)
  }

  async function updateRole(role: Role) {
    if (!state.user) return
    await writeUserProfile(state.user, role)
    setState((prev) => ({ ...prev, role, needsRoleSelection: false }))
  }

  const value: AuthContextType = {
    ...state,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
