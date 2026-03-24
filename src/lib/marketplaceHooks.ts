import { useCallback, useEffect, useState } from 'react'
import type { Booking, SkillListing } from './types'
import { createBooking, listActiveListings } from './marketplace'

export function useListings() {
  const [listings, setListings] = useState<SkillListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listActiveListings()
      setListings(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load listings')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { listings, loading, error, refresh }
}

export function useCreateBooking() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = useCallback(async (input: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    setLoading(true)
    setError(null)
    try {
      const booking = await createBooking(input)
      return booking
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to create booking'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { submit, loading, error }
}

