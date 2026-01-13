# EditVerse Backend (Local JSON Storage)

High-end API/Server for EditVerse using:
- Fastify + TypeScript
- JWT (access + refresh) with rotation
- Argon2id password hashing
- Local JSON file storage (no Postgres/SQLite/DB)
- RBAC + fine-grained permissions
- Sessions/Devices: list, revoke one, revoke all
- Password reset (local token return for dev), password change
- Private profiles + follow requests (accept/deny)
- Blocks system (user block/unblock)
- Audit log, admin moderation (bans/roles/reports)
- Edits showcase: edits, tags, likes, comments, collections, follows, notifications, reports
- Rate limiting, CORS, Helmet, OpenAPI/Swagger

## Quickstart
```bash
npm i
cp .env.example .env
npm run dev
```

Swagger UI: http://localhost:4000/docs  
Health: http://localhost:4000/health

## Data storage
Data is stored in `./data/db.json`. Atomic writes + write queue.

## Dev seed
If `ENABLE_DEV_SEED=true`, the server creates an admin + demo editor on first start:
- admin: admin@editverse.local / AdminPass!2345
- editor: demo@editverse.local / DemoPass!2345


## New in v2.2.0
- Pretty logs in dev (pino-pretty)
- Request ID header (x-request-id) + requestId in errors
- Feed endpoints: /v1/feed (auth), /v1/feed/public
- Global search: /v1/search
- Messaging (DMs): /v1/messages/threads
- System info: /v1/system/info
- Admin stats + moderation helpers
















## New in v2.9.0
- Major platform expansion: Private accounts with follow-request workflow (incoming list + accept/reject)
- Full user settings API (interaction toggles, privacy, notifications) + enforcement in likes/comments
- Reporting system: users can report content; admin/moderators can triage, assign, note, and resolve
- RBAC plugin improved for MODERATOR role support


## New in v3.0.0
- Emails removed from public/user settings: showEmailPublicly eliminated
- Auth now uses handle-based register/login/reset request (no email needed)
- TOTP otpauth label uses handle


## New in v3.1.0
- Server upgrade: trust proxy support + production-friendly health/readiness endpoints
- Background maintenance (local JSON): auto cleanup tokens/sessions/notifications + audit compaction
- Admin endpoint to trigger maintenance manually


## New in v3.2.0
- Problem+JSON error responses with requestId + validation details
- Admin backup export/import endpoints (dangerous import requires X-Confirm-Import: YES)
- Admin integrity report endpoint scanning for orphan references
- User safety keywords (blockedKeywords) + enforcement for comments/messages


## New in v3.2.0
- Admin Ops Suite: JSON backups (create/list/restore) for local storage
- Integrity scanner + optional auto-fix: purge orphans, recompute user/edit/tag stats
- Persistent Job system (local JSON) with inline execution + status tracking
- Admin endpoints:
  - /v1/system/admin/backups
  - /v1/system/admin/integrity/*
  - /v1/system/admin/jobs


## New in v3.3.0
- Media system: multipart uploads, local file storage, dedupe by sha256, attach media to edits, static serving via /uploads/
- Real-time-ish SSE streams (no DB): notifications stream and admin jobs stream
- Job Runner: executes queued jobs automatically on interval (single-process worker loop)


## New in v3.4.0
- High-end Search system: persistent inverted index (local JSON), /v1/search with relevance/newest/popular sorting
- Search indexing can be rebuilt via job type search.reindex or admin endpoint /v1/system/search/reindex
- Moderation suite: ban/unban, shadowban/unshadowban, admin notes, hide/restore edits (ADMIN/MODERATOR)
- Store v8: added searchIndex collection + migrations


## New in v3.5.0
- Organizations/Teams system (local JSON): orgs, members, invites, roles (OWNER/ADMIN/MEMBER)
- Org edits: optional orgId on edit creation + org edits listing
- Feature Flags system: admin CRUD + runtime evaluation with percent rollout + allow/deny lists
- Job runner improved: processes multiple queued jobs per tick


## New in v3.7.0
- Ultra-modern DM/Messages upgrades: embed cards, message reactions, message edit/delete, thread read receipts (readState)
- Organization system upgraded: org settings, org thread (team hub), invite delivery modes (notification/dm/both), invite revoke, leave org, transfer ownership
- Premium embed card invites via DM (org_invite embed with actions)
- Store v10 migration: thread readState + org settings defaults


## New in v3.8.0
- Crews system expanded massively: channels (crew_channel threads), join policies (invite_only/request_to_join/open), join requests workflow, invite links with expiry/maxUses, crew settings endpoint
- Default #general channel auto-created on crew create
- Crew channels support public/private + allow-list; message ACL enforced server-side for crew_channel threads
- Search indexing includes crews


## New in v3.9.0
- Crews evolved into **Clans** (next-level): new primary APIs under `/v1/clans`. Crews endpoints remain as deprecated aliases.
- Full clan stack: clans, members, invites (notifications + premium DM embed cards), clan hub threads, channels, join requests, invite links, clan edits listing.
- Edits now use `clanId` (legacy `crewId/orgId` accepted).
- Store v12 migration mirrors crews -> clans and upgrades edits/threads.
- Server hardening: global rate limiting via `@fastify/rate-limit` (env: RATE_LIMIT_MAX, RATE_LIMIT_WINDOW).


## New in v4.0.0
- Clan system rebuilt to **enterprise-grade**: custom roles & permissions, bans, member management, applications workflow, announcements.
- Server improvements: stronger rate-limiting defaults, more permission-based authorization (beyond simple roles).
- Store v13 adds: clanRoles, clanBans, clanApplications, clanAnnouncements with automatic migrations.


## New in v4.1.0 (Studio-style Clans)
- Clan system pivoted away from chat/Discord-like behavior: channels are deprecated.
- Added collaboration primitives: projects, submissions, review workflow, and shared asset library.
- Added request IDs + pretty console logging (x-request-id).
- Store v14 adds: clanProjects, clanProjectMembers, clanSubmissions, clanSubmissionReviews, clanAssets.


## New in v5.0.0
- **Clan + Studio** modules removed/pivoted out.
- Introduced a **fully built Groups system** (simple concept, powerful backend): groups, members, roles/permissions, invites (premium DM embed cards), join requests, announcements, moderation.
- Store v15 migrates existing clans -> groups and maps edits clanId -> groupId.


## New in v5.1.0
- Massive backend expansion: fixed and rebuilt Social + Reports systems.
- Social: follows (private follow requests), blocks, mutes, collections (public/private), bookmarks, notifications mark.
- Groups: featured edits + group stats endpoints.
- Admin: reports review endpoints fixed & expanded.
- Store v16 adds bookmarks + groupFeaturedEdits.


## New in v5.2.0
- Feed rebuilt: unified `/v1/feed` with modes (for_you/following/trending/new) + public `/v1/feed/trending`.
- Admin super-view: `/v1/admin/users/:userId/inspect` (sessions, warnings, audits, reports, social graph, recent edits).
- Admin warnings system: create/list/update warnings + user self-service `/v1/me/warnings` + ack.
- Groups: simple multi-person chat thread (group DM) with edit-share embeds.
- Messaging: read receipts storage (`threadReads`) + request IDs kept.
- Security upgrades: suspicious-login notification + per-route rate limit helper + health endpoints.
- Storage: admin snapshot/info/compact endpoints.


## New in v5.3.0
- Massive DM/Messages upgrades: attachments, replies, per-user receipts, message search, anti-spam scoring, per-route rate limits.
- Security upgrades: login lockout, refresh token rotation with session binding, user session management endpoints.
- Admin upgrades: deep user inspect, global message search, session listing/revocation.
- Store upgrades: v20 adds userSessions/refreshTokens/loginAttempts/messageReceipts/messageIndex/abuseScores.


## New in v5.4.0
- Massive Settings system: defaults, JSON-patch updates, reset scopes, reauth for sensitive changes, session policy enforcement.
- Admin Settings: inspect, patch, lock/unlock paths, history.
- Full wiring: DM thread creation permission, mentions rules, group invites policy, search indexing filter, feed visibility filter, notifications toggles.
- Store v21 adds userSettings + userSettingsHistory.


## New in v5.5.0
- Settings system massively expanded (version 2) with deep allowlisted validation, more categories (privacy/notifications/security/messaging/feed/moderation/profile).
- Full wiring across platform: follow permissions, DM rules (links/attachments/embeds limits), trusted devices security gate on login, public settings exposure, notifications gating by kind.
- Trusted devices management endpoints for users + admin device view.
- Store v22 adds userDevices.


## New in v5.6.0
- Profile system massively rebuilt: richer profile schema (spotlight, theme bannerStyle, more socials/skills/portfolio), safer limits.
- Public profile is now settings-driven (privacy/account visibility, prefs for showing counts/badges), computed stats (followers/following/edits), featured edits expanded.
- New endpoints: GET /v1/me/profile, PATCH /v1/me/profile, GET /v1/users/:userId/settings/public.
- Admin profile moderation: set badges, verify/unverify, add internal profile notes.
- Store v23 adds adminNotes.


## New in v5.7.0
- New Song Detection system (fully local, Shazam-like fingerprints): ffmpeg-static audio extraction + landmark hashing + hash index matching.
- Song library: ADMIN/MOD/CREATOR can register songs with reference media; server fingerprints and indexes automatically.
- Edit uploads enqueue detection jobs; results stored as editAudioMeta and included in edit fetch.
- Worker plugin processes fingerprint/detection jobs (JSON store queue) without external services.
- Store v24 adds songs/songHashes/songHashIndex/songDetectionJobs/editAudioMeta.


## New in v5.8.0 (External Song Recognition)
- Song detection now uses external recognition providers (no local song library): ACRCloud + AudD built-in.
- On edit upload, server extracts an mp3 snippet and sends to providers in configured order; stores unified match object.
- Admin can set provider order via /v1/admin/song-detection/providers.
- ENV:
  - AUDD_API_TOKEN
  - ACRCLOUD_HOST, ACRCLOUD_ACCESS_KEY, ACRCLOUD_ACCESS_SECRET
- Store v25 cleans up legacy songs/songHashes/songHashIndex and adds songProviderCache.


## New in v5.9.0 (Song Detection — Massive Upgrade)
- Multi-snippet recognition (offsets) + multi-provider fallback with confidence threshold.
- Provider health tracking (EWMA latency, ok/fail counts, last errors) + admin endpoints.
- Detection runs history per edit, job-based worker, caching results per media for huge performance.
- Raw provider responses are **never returned to normal users**; only staff can request `?raw=true`.
- ENV:
  - ACRCLOUD_HOST, ACRCLOUD_ACCESS_KEY, ACRCLOUD_ACCESS_SECRET
  - AUDD_API_TOKEN
  - Optional: SONG_PROVIDER_ORDER="acrc,audd", SONG_SNIPPETS="0:12,10:12,25:12", SONG_PROVIDER_TIMEOUT_MS=9000, SONG_MIN_CONFIDENCE=0.62


## New in v6.0.0 (Song Detection + Track Pages + Feed Pills)
- Adaptive snippet planning (energy-based window selection), multi-provider ensemble, circuit breaker, budgets, caching (per media + per snippet hash), inflight dedupe, metrics.
- Automatic Track entities from detections (no manual creation). Enrichment fetches cover + preview via iTunes/Deezer.
- Track pages: GET /v1/tracks/:id and /v1/tracks/:id/edits.
- Edit details include `track`, and Feed items include `trackPill` (for Vertical Feed UI).
- Store v27 adds tracks/trackProviderRefs/editTrackLinks/songDetectInflight/songDetectBudgets/songDetectMetrics.


## Server Dashboard (local-only)
- Enable: set `DASHBOARD_TOKEN` env var.
- Restrict IPs: `DASHBOARD_ALLOW_IPS="127.0.0.1,::1"` (default).
- Visit `/dashboard` and login using Dashboard Token + singleton admin handle/password.
- System page is available at `/` and JSON at `/system.json`.


## v6.2.0 (Server Dashboard Ultra + Logs + Jobs + Config Overrides)
- Dashboard tabs: Overview/Providers/Tracks/Jobs/Logs/Security Radar/Config/Actions.
- Captured system logs (HTTP + events) stored in JSON with retention cap.
- Job control: list/requeue/cancel song detection jobs.
- Runtime song-detection overrides via dashboard (timeout/conf/circuit/failThreshold/concurrency).
- Trending tracks widget via trackStats.
- System page adds /system.json.
- Server banner uses package version and shows root/dashboard.


## v6.3.0 (Dashboard Control Center + Panic + Worker Controls + SSE Logs)
- Dashboard: Provider order/budgets UI, storage analyzer, worker pause/resume/tick, logs export + SSE live stream, panic/unpanic auth kill-switch.
- Song detect budgets can be overridden at runtime via dashboard (stored in songDetectOverrides).
- Worker exposes songDetectTick and respects dashboard pause flag.
- Added .env.full and .env.example.


## v6.3.2
- Fixed feed.routes.ts: removed duplicate 'items' declaration inside paginate(), refactored attachTrackPills().


## v6.3.6
- Fixed jsonStore.ts broken CollectionName union (replaced with string type to prevent syntax corruption).
- Added missing src/modules/auth/passwords.ts (verifyPassword/hashPassword helpers) to satisfy settings import.
