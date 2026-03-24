# Changelog

All notable changes to Fannu Varin are documented here.

## [Unreleased]

### Added
- Rebrand to **Fannu Varin** across app title, manifest, and UI
- Firebase authentication integration (email/password + Google)
- Firestore profile role flow
- New marketplace modules:
  - Skill listings (`listings`)
  - Booking requests (`bookings`)
- Cloudinary image upload helper and listing image support
- New role-oriented routes:
  - `/seeker`
  - `/provider`
- New components:
  - `SkillListingForm`
  - `SkillBrowse`
  - `SeekerLayout`
  - `ProviderLayout`

### Changed
- Replaced Supabase runtime usage in app with Firebase + local DB hybrid logic
- Updated role model from `customer/worker` to `seeker/provider`
- Refreshed dashboard visuals with cleaner glass-style UI, pill tabs, and improved navigation styling
- Updated setup documentation for Vercel + Firebase + Cloudinary deployment

### Fixed
- Production blank-page risk caused by missing/legacy env assumptions
- Type mismatches after role rename during route/dashboard migration

## [1.0.0] - 2026-02-26

### Added
- Initial marketplace release with role-based dashboards and service workflow
- PWA support
- Admin controls

---

## Release Checklist

- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md`
- [ ] Run `npm run build`
- [ ] Verify Vercel env variables
- [ ] Update docs (`README.md`, `SETUP.md`, handbook)
- [ ] Tag release on GitHub
