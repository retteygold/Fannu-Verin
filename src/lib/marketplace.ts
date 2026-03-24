import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from './firebase'
import type { Booking, SkillListing } from './types'

function nowIso() {
  return new Date().toISOString()
}

export async function listActiveListings(): Promise<SkillListing[]> {
  const q = query(collection(db, 'listings'), where('active', '==', true))
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data() as SkillListing)
}

export async function upsertListing(listing: SkillListing): Promise<void> {
  await setDoc(doc(db, 'listings', listing.id), listing, { merge: true })
}

export async function createBooking(input: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> {
  const id = `b_${Math.random().toString(16).slice(2)}`
  const booking: Booking = { ...input, id, createdAt: nowIso(), status: 'requested' }
  await setDoc(doc(db, 'bookings', id), booking)
  return booking
}

