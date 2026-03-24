import { useMemo, useState } from 'react'
import { useListings, useCreateBooking } from '../lib/marketplaceHooks'
import type { SkillListing } from '../lib/types'

export default function SkillBrowse({ seekerId }: { seekerId: string }) {
  const { listings, loading, error, refresh } = useListings()
  const { submit, loading: bookingLoading } = useCreateBooking()
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return listings
    return listings.filter((l) => {
      return (
        l.title.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        (l.location ?? '').toLowerCase().includes(q) ||
        l.tags.join(',').toLowerCase().includes(q)
      )
    })
  }, [listings, query])

  if (loading) return <div className="text-white">Loading skills...</div>
  if (error) return <div className="text-white">{error}</div>

  const request = async (l: SkillListing) => {
    await submit({
      listingId: l.id,
      seekerId,
      providerId: l.providerId,
      message: message.trim() || undefined,
    })
    alert('Request sent')
    setMessage('')
  }

  return (
    <div className="grid gap-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-semibold">Browse Skills</div>
          <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10" onClick={() => void refresh()}>
            Refresh
          </button>
        </div>
        <input
          className="mt-3 w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2 text-sm"
          placeholder="Search (e.g. tutoring, AC, design, Male')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <textarea
          className="mt-3 min-h-[70px] w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2 text-sm"
          placeholder="Message to provider (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70">No skills found.</div>
      ) : (
        filtered.map((l) => (
          <div key={l.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-white">
            {l.images?.[0] ? <img src={l.images[0]} alt="" className="h-40 w-full object-cover" loading="lazy" /> : null}
            <div className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold">{l.title}</div>
                  <div className="mt-1 text-xs text-white/60">
                    {l.category}
                    {l.location ? ` • ${l.location}` : ''}
                    {l.priceFrom ? ` • from ${l.priceFrom}` : ''}
                  </div>
                </div>
                <button
                  className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-50"
                  disabled={bookingLoading}
                  onClick={() => void request(l)}
                >
                  Request
                </button>
              </div>
              <div className="mt-3 text-sm text-white/80">{l.description}</div>
              {l.tags.length ? <div className="mt-2 text-xs text-white/60">Tags: {l.tags.join(', ')}</div> : null}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

