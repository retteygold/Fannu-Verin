import { useEffect, useState } from 'react'
import { getDB, subscribe } from './db'
import type { DB } from './types'

export function useDB() {
  const [db, setDb] = useState<DB>(() => getDB())
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    return subscribe(() => setDb(getDB()))
  }, [])

  const refetch = async () => {
    setDb(getDB())
  }

  return { db, loading, error, refetch }
}
