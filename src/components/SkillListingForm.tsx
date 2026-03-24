import { useMemo, useState } from 'react'
import type { SkillCategory, SkillListing } from '../lib/types'
import { uploadImageToCloudinary } from '../lib/cloudinary'
import { upsertListing } from '../lib/marketplace'

const CATEGORIES: SkillCategory[] = ['HomeRepair', 'Cleaning', 'Beauty', 'Tutoring', 'IT', 'Design', 'Events', 'Fitness', 'Other']

function nowIso() {
  return new Date().toISOString()
}

export default function SkillListingForm({ providerId, onSaved }: { providerId: string; onSaved?: () => void }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<SkillCategory>('HomeRepair')
  const [description, setDescription] = useState('')
  const [priceFrom, setPriceFrom] = useState<number>(0)
  const [location, setLocation] = useState('')
  const [tagsRaw, setTagsRaw] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const tags = useMemo(
    () =>
      tagsRaw
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    [tagsRaw],
  )

  const addImage = async (file?: File) => {
    if (!file) return
    try {
      setUploading(true)
      const url = await uploadImageToCloudinary(file)
      setImages((prev) => [url, ...prev].slice(0, 6))
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async () => {
    const id = `l_${Math.random().toString(16).slice(2)}`
    const listing: SkillListing = {
      id,
      providerId,
      title: title.trim() || 'New listing',
      category,
      description: description.trim(),
      priceFrom: Number.isFinite(priceFrom) && priceFrom > 0 ? priceFrom : undefined,
      location: location.trim() || undefined,
      tags,
      images,
      active: true,
      createdAt: nowIso(),
    }

    setSaving(true)
    try {
      await upsertListing(listing)
      setTitle('')
      setDescription('')
      setPriceFrom(0)
      setLocation('')
      setTagsRaw('')
      setImages([])
      onSaved?.()
      alert('Listing published')
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to publish listing')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="text-sm font-semibold">Publish a Skill</div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs text-white/70">Title</label>
          <input className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2 text-sm" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. AC servicing, Maths tutoring, Logo design" />
        </div>

        <div>
          <label className="mb-1 block text-xs text-white/70">Category</label>
          <select className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2 text-sm" value={category} onChange={(e) => setCategory(e.target.value as SkillCategory)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-white/70">Price from (optional)</label>
          <input type="number" min={0} className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2 text-sm" value={priceFrom} onChange={(e) => setPriceFrom(Number(e.target.value))} />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs text-white/70">Description</label>
          <textarea className="min-h-[90px] w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2 text-sm" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What you offer, availability, what’s included..." />
        </div>

        <div>
          <label className="mb-1 block text-xs text-white/70">Location (optional)</label>
          <input className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2 text-sm" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City / Island" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-white/70">Tags (comma separated)</label>
          <input className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2 text-sm" value={tagsRaw} onChange={(e) => setTagsRaw(e.target.value)} placeholder="ac, repair, same-day" />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs text-white/70">Images (optional)</label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-xs text-white/70 file:mr-3 file:rounded-lg file:border file:border-white/10 file:bg-white/10 file:px-3 file:py-2 file:text-white"
            onChange={(e) => void addImage(e.target.files?.[0])}
          />
          {uploading ? <div className="mt-1 text-xs text-cyan-300">Uploading to Cloudinary...</div> : null}
          {images.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {images.map((url) => (
                <img key={url} src={url} alt="" className="h-16 w-16 rounded-xl border border-white/10 object-cover" />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <button
        className="mt-4 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-50"
        disabled={saving || uploading || !title.trim()}
        onClick={() => void onSubmit()}
      >
        {saving ? 'Publishing...' : 'Publish'}
      </button>
    </div>
  )
}

