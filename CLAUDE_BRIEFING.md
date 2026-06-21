# VoteReederXP — Developer Handoff Briefing
**Last Updated:** June 21, 2026
**Campaign:** Karen Reeder for Texas House District 29
**Live Site:** https://votereederxp.com

> This is the single-source onboarding doc for any developer (or Claude) picking up
> this project. For the running session-by-session log, see `HANDOFF.md`. For a quick
> status pointer, see `NEXT_CLAUDE_BRIEFING.md`. For gameplay/XP design, see
> `GAME_DESIGN_DOCUMENT.md`.

---

## 1. PROJECT OVERVIEW

**VoteReederXP** is a gamified civic-engagement / volunteer-organizing site for the
**Karen Reeder for Texas House District 29** campaign. Supporters create an account,
pick an avatar and alias, earn **XP** for real-world campaign actions (canvassing,
phone banking, voter registration, attending events, social shares, donations), climb
**ranks**, earn **badges**, join one of **7 guilds**, chat in a live District 29
global chat, and track their personal **kanban mission board**.

- **Front end:** static HTML/CSS/vanilla JS (no build step, no framework). One file per page.
- **Auth + data:** Supabase (Postgres + Auth + Realtime + REST).
- **Automation:** Make.com webhooks → Smartsheet / Brevo / Gmail groups.
- **Content source:** a published Google Sheet (missions, events, lessons, admins).
- **Hosting:** Netlify (drag-and-drop deploy).

---

## 2. INFRASTRUCTURE — URLs, KEYS, WEBHOOKS

### Supabase
- **Project URL:** `https://ljxvkdslqxmmedfhrwgu.supabase.co`
- **Dashboard:** https://supabase.com/dashboard/project/ljxvkdslqxmmedfhrwgu
- **Anon (public) key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeHZrZHNscXhtbWVkZmhyd2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NTU0ODQsImV4cCI6MjA5NTMzMTQ4NH0.nUCmAINQ1yL_XdDX9rNBl0gadjyP0ON9rWvb3Tarut4`
  - This is the **anon** key — safe to ship in client JS. The **service-role** key must NEVER be committed.
- The client is created in `shared.js` and exposed as **`window.sb`** (supabase-js v2). Authenticated requests through `window.sb` carry the user JWT (needed for RLS).

### Netlify (hosting)
- Dashboard: https://app.netlify.com
- Deploy method: **drag-and-drop the `Vote Reeder` FOLDER** (the parent), not the `site` subfolder.
- ⚠️ **Do NOT use `netlify.toml`** for redirects — it has broken drag-and-drop deploys twice. Use `_redirects` if needed.

### GitHub
- **Repo:** https://github.com/KarynReal26/votereederxp.git
- **Local folder:** `C:\Vote Reeder\site`  ·  **Branch:** `master`  ·  **Remote:** `origin`
- The `.git` lives in `site/` (NOT in the `Vote Reeder` root). Run all git commands from `site/`.

### Make.com (automation)
- Plan: Core ($9/mo yearly), 10,000 ops/month. Dashboard: https://make.com
- **Newsletter** webhook: `https://hook.us2.make.com/3xzwacpneg8kvthf8r6g5rxjto2bwypq`
- **Volunteer signup** webhook: `https://hook.us2.make.com/22nytlq9h0q8x4t0md8yfblf62r7w7fc`
- **Contact Us** webhook: `https://hook.us2.make.com/fvr224pc97dxwy3tbb7i4cmt34q7qusi`
- **Guild webhooks** — see §10.

### Cloudflare Turnstile (bot protection)
- **Site key:** `0x4AAAAAADlXJRYWrvbYfwji` (dark theme)
- Used on `register.html` and `contact.html`. Script: `https://challenges.cloudflare.com/turnstile/v0/api.js`

### ActBlue (donations)
- Primary link in use: `https://secure.actblue.com/donate/karenreeder`
- Also referenced: `https://secure.actblue.com/donate/votereeder` (donate.html amount buttons)
- ⚠️ Two different slugs are in the codebase — **reconcile to one canonical ActBlue URL.**
- Works in Chrome; **Edge blocks JS on ActBlue.**

### Facebook Pixel
- **NOT yet installed.** TODO: add the Pixel base code to `shared.js` so it loads on every page (Business Manager → Events Manager → Pixels).

### Other services
- Brevo (email marketing): https://brevo.com
- Smartsheet (volunteer roster): Sheet ID `8360216862084996`
- Google Cloud Console (OAuth): project **VoteReederXP**
- Google Workspace Admin: admin.google.com (domain `votereeder-brazoria.com`)

---

## 3. CRITICAL RULES (do not violate)

1. **Script load order — `xp.js` then `shared.js` MUST be the LAST scripts on the page**, and the inline auth-check block must come AFTER them. `shared.js` is what creates `window.sb`; anything using `window.sb` must wait for it (the code polls `if(!window.sb) return;`). Never move these above page logic.
   ```html
   <!-- ⚠️ CRITICAL: xp.js and shared.js MUST be last -->
   <script src="xp.js"></script>
   <script src="shared.js"></script>
   ```
2. **No gray text.** Body copy must stay high-contrast/readable — do not use dim gray for primary text.
3. **Typography:** **Inter** for body text, **Orbitron** for headers / display / numbers. (Some pages also load Rajdhani/Exo 2 for accents.)
4. **Dashboard `!important` scroll rules are load-bearing** — see §8. Do not strip them.
5. In `game.html`, declare shared globals so they don't collide with `xp.js` (history note: `SUPABASE_URL`/`SUPABASE_KEY` were switched to `var` to avoid duplicate-declaration errors). The current dashboard uses prefixed names `_SB_URL` / `_SB_KEY`.
6. Commit/push from `C:\Vote Reeder\site` on `master`. Never `git init` at the `Vote Reeder` root (creates a nested repo).

---

## 4. FILE STRUCTURE

All site files live in `C:\Vote Reeder\site`.

| File | Purpose |
|---|---|
| `index.html` | Public homepage / landing |
| `game.html` | **The player dashboard** — profile, badges, global chat, kanban mission board, guild panel, leaderboard, Hall of Fame |
| `register.html` | Volunteer signup + account creation + **avatar picker** |
| `shared.js` | Creates `window.sb` (Supabase client), shared nav, login modal, auth helpers — loaded on every page |
| `xp.js` | XP helpers / shared XP logic — loaded just before `shared.js` |
| `style.css` | Global shared styles |
| `admin.html` | Admin dashboard |
| `guild-*.html` | One page per guild (warriors, titans, momentum, democracy=Signal, builders=Miners, rise=Architects, treasury) + `guild-admin.html` |
| `guilds.html` | Guild landing / chooser |
| `learn.html` | Lessons (from Sheets `Lessons` tab) |
| `events.html` | Campaign events (from Sheets `Events` tab) |
| `blog.html` | Blog |
| `about/contact/donate/volunteer/privacy/terms/newsletter-section.html` | Static content + forms |
| `videos.js` | Video links config |
| `images/avatars/` | 72 avatar PNGs (see §7) |
| `images/` | Event + hero imagery (`event-*.png`, `karen-*.png`) |
| `HANDOFF.md` | Full session-by-session technical log + credentials |
| `NEXT_CLAUDE_BRIEFING.md` | Short "current status" pointer |
| `GAME_DESIGN_DOCUMENT.md` | XP values, ranks, gameplay design |
| `CLAUDE_BRIEFING.md` | **This file** |

---

## 5. DATABASE TABLES (Supabase Postgres)

Full table list is in `HANDOFF.md`. The tables actively wired into the current dashboard:

### `profiles` — user accounts (id = auth user id)
| Column | Notes |
|---|---|
| `id` (uuid, PK) | = Supabase auth user id |
| `username` | public alias (privacy rule: NOT real name) |
| `full_name` | from registration (auth metadata) |
| `avatar` | **full relative path** e.g. `images/avatars/avatar-01-women-maya.png` |
| `guild` | guild name or null |
| `guild_joined_at` | timestamp; drives 30-day switch cooldown + Make webhook |
| `total_xp` | used for guild XP totals + join requirement |
| `xp_score` | used by `loadProfile()` for player XP/rank/progress bar |
| `leaderboard_rank` | shown in nav ticker |
> ⚠️ Two XP columns exist (`total_xp` and `xp_score`). Reconcile to one source of truth.

### `chat_messages` — District 29 global chat (**Realtime ENABLED**)
| Column | Notes |
|---|---|
| `id` | PK |
| `user_id` (uuid) | author |
| `message` | text |
| `username` | denormalized for fast render (realtime handler reads it directly) |
| `guild` | denormalized guild label (nullable) |
| `created_at` | timestamptz |

### `user_tasks` — per-user kanban board
| Column | Notes |
|---|---|
| `id` | PK (used in update + `data-task-id`) |
| `user_id` (uuid) | owner |
| `status` | `in_progress` \| `pending` \| `complete` |
| `task_name` | card title |
| `xp_value` (int) | shown as `+N XP` (**note: `xp_value`, not `xp`**) |
| `verification` | `SELF REPORT` \| `PHOTO PROOF` \| `AUTO` |
| `created_at` | timestamptz (ordering) |

### `hall_of_fame` — Civic Champions marquee/table
| Column | Notes |
|---|---|
| `id` | PK |
| `username` | champion alias |
| `avatar` | emoji or image |
| `month` | label e.g. "June 2026" |
| `xp_amount` | XP that month |
| `guild` | guild label |
| `created_at` | ordering (asc) |
> Needs RLS: `CREATE POLICY "Public can read hall_of_fame" ON hall_of_fame FOR SELECT USING (true);`

**RLS requirement (IMPORTANT):** `user_tasks` and `chat_messages` writes go through the
authenticated `window.sb` client. Policies must allow the logged-in user to
SELECT/INSERT/UPDATE their own `user_tasks` rows (`auth.uid() = user_id`) and INSERT
`chat_messages`. Without these policies the board/chat silently fail.

### RPC functions
- `award_xp(p_user_id, p_action, p_category, p_amount)` — awards XP + logs a transaction.

---

## 6. GOOGLE SHEETS (content source)

**Published spreadsheet ID:**
`2PACX-1vSWflC-rX01G1bhMdahO-tCzkuDRjDmjouukJzC1AyVBPeEVnQmbDIDmGOBAkKUPDnZp-Xo-K1FJd7m`

Base CSV URL pattern:
`https://docs.google.com/spreadsheets/d/e/<ID>/pub?gid=<GID>&single=true&output=csv`

| Tab | GID | Used by |
|---|---|---|
| Events | `0` | events.html, guild pages (⚠️ CORS-blocked from browser — see HANDOFF) |
| Game (missions) | `1810466887` | game.html, guild pages |
| Fun (fun missions) | `15253665` | game.html, guild pages |
| Admin (admin users) | `60615754` | admin.html, guild-admin.html |
| Lessons | `95972679` | learn.html |
| (game.html secondary) | `114264924` | referenced in `apply-proxy-patches.sh` for game.html — likely Rank/secondary; verify |

Column layouts per tab are documented in `HANDOFF.md` §"GOOGLE SHEETS".

---

## 7. AVATAR SYSTEM

- **72 avatars** in `images/avatars/`, named: `avatar-NN-CATEGORY-name.png`
  - `NN` = zero-padded index 01–72
  - `CATEGORY` = `women` (01–24), `men` (25–48), `symbol` (49–72)
  - examples: `avatar-01-women-maya.png`, `avatar-25-men-jaxon.png`, `avatar-72-symbol-progress.png`
- **Picker** (in `register.html`, `// Create Your Account` section, above username):
  - 3 tabs — **Women** (01–24), **Men** (25–48), **Symbolic** (49–72), generated from a JS filename array.
  - Click selects with a **glowing cyan border** (+ ✓ badge). **Required** to submit.
  - Selection stored as the **full relative path** (`images/avatars/avatar-XX-...png`).
  - Written on signup to **3 places**: Supabase **auth metadata** (`options.data.avatar`), a **`profiles`** upsert (`avatar` column), and the **Make volunteer webhook** body.
- **Display:** `game.html` `loadProfile()` renders `<img src="${p.avatar}">` **verbatim** — which is why the stored value must be the full `images/avatars/...` path, not a bare filename. No path rewriting anywhere.

---

## 8. DASHBOARD LAYOUT (`game.html`)

- **Top row grid:** `.top-row { display:grid; grid-template-columns: 3fr 3.8fr 5.2fr; gap:12px; }`
  → **Profile card | Badges card | Global Chat card**. Cards are `#111827` with `rgba(255,255,255,0.07)` borders.
- **Kanban ("My Board"):** 3 columns — `.kin` In Progress, `.kpe` Pending Review, `.kco` Complete. Scroll containers have ids `#col-in-progress`, `#col-pending`, `#col-complete`. Count badges: `#count-in` (`.kn-in`), `#count-pending` (`.kn-pe`), `#count-complete` (`.kn-co`).

### ⚠️ Gemini's `!important` scroll rules — NEVER REMOVE
These fix the kanban column scrolling and were hard-won. Keep them exactly:
```css
.kcol{ height:450px !important; overflow:hidden !important; }
.kcol-scroll{
  flex:1 !important; overflow-y:scroll !important; overflow-x:hidden !important;
  min-height:0 !important; display:block !important;
}
.kcol-scroll::-webkit-scrollbar{ width:8px !important; display:block !important; }
.kcol-scroll::-webkit-scrollbar-track{ background:rgba(255,255,255,0.03) !important; }
.kcol-scroll::-webkit-scrollbar-thumb{ background:rgba(255,255,255,0.3) !important; border-radius:4px !important; }
```
Removing the `!important`s collapses the columns / kills the scrollbars.

---

## 9. SUPABASE WIRING (`game.html` functions)

All run after `window.sb` exists (polled via interval). Key helpers:

- **`sbFetch(path, opts)`** — thin REST wrapper using the **anon** key. Tolerant of empty/204 responses. Used for **public reads** (Hall of Fame, chat history join, ranks). NOT used for owner-scoped writes anymore.
- **`loadProfile()`** — `window.sb.auth.getUser()` → reads `profiles` row → fills nav (XP, rank, username, avatar), XP progress bar, profile card, guild, and the avatar `<img>`. Caches `CURRENT_USER` / `CURRENT_PROFILE`.
- **`initChat()`** — loads last 50 `chat_messages` (joined to `profiles`) then subscribes via **`window.sb.channel('chat')`** to Realtime INSERTs, appending new messages live (handler reads `username`/`guild` off the inserted row).
- **`sendChat()`** — inserts to `chat_messages` via **`window.sb`** with `{ user_id, message, username, guild }` (username/guild from cached profile). Realtime echoes it back.
- **`loadMissions()`** — reads `user_tasks` for the current user via **`window.sb`**, buckets by `status`, renders cards into the 3 kanban columns, updates the 3 count badges.
- **`markTaskComplete(id, btn)`** — `window.sb.from('user_tasks').update({status:'complete'}).eq('id', id)` then reloads the board.
- **`addTaskToBoard(task, btn)`** — `window.sb.from('user_tasks').insert({ user_id, status:'in_progress', task_name, xp_value, verification })` (triggered by sidebar "Tap to Add to Board" `.t-btn`), then reloads.

> Why `window.sb` for writes: it sends the user's JWT, so owner-scoped RLS passes. The
> anon-key `sbFetch` path cannot satisfy `auth.uid() = user_id` policies.

---

## 10. GUILD SYSTEM (7 player guilds + Admin)

**Join rules** (enforced in `game.html` `joinGuild()`): need **300 XP (Organizer)** to join;
can switch guilds every **30 days**; leaving sets `guild = null` and stamps `guild_joined_at`.
A guild change updates `profiles` and fires the guild's Make webhook (→ Gmail group).

| Guild | Emoji | Page | Gradient colors | Max | Google Group | Make webhook |
|---|---|---|---|---|---|---|
| District Warriors | 🔥 | guild-warriors.html | `#ff6600 → #ffd700` | 50 | field@votereeder-brazoria.com | `https://hook.us2.make.com/g1pa5yb4en22koh65mgvhl543jktc8qp` |
| Turnout Titans | 🌊 | guild-titans.html | `#ffd700 → #00f0ff` | 50 | outreach@votereeder-brazoria.com | `https://hook.us2.make.com/ykwbdeczfmnu1xjdq51ta1ywtta6pg5n` |
| The Momentum | ⚡ | guild-momentum.html | `#00f0ff → #bf00ff` | 50 | operations@votereeder-brazoria.com | `https://hook.us2.make.com/o9zblb7bmbmort5ea0g2vcogmci5i1hi` |
| The Signal | 📡 | guild-democracy.html | `#00aaff → #bf00ff` | 30 | comms@votereeder-brazoria.com | `https://hook.us2.make.com/nhpp3kykh3k8e3wmtldiibeks222y1ry` |
| The Miners | ⛏️ | guild-builders.html | `#00ff88 → #00f0ff` | 15 | data@votereeder-brazoria.com | `https://hook.us2.make.com/1zaj6aw4xvrs8wji6qbqqpk9rfg5pjzw` |
| The Architects | 🏛️ | guild-rise.html | `#9b59b6 → #ffd700` | 10 | pc@votereeder-brazoria.com | `https://hook.us2.make.com/9zoz0ikr9bjr4caja8c6s9pegbv7ts77` |
| The Treasury | 💎 | guild-treasury.html | `#00d4aa → #ffd700` | 15 | finance@votereeder-brazoria.com | `https://hook.us2.make.com/48suqc7n06s3frpa32kkex7r60gmnwwf` |
| Admin (hidden) | 🛡️ | guild-admin.html | — | — | leadership@votereeder-brazoria.com | `https://hook.us2.make.com/bpin13esoqm8ymmwhzyiy81uhomhb5ye` |

**Guild features built:** live two-way chat (Supabase Realtime), top-10 leaderboard, guild-filtered events, guild missions with Join→adds to board, leader-only email-guild + announcements, member-limit "Guild Full" button, hidden admin guild.

---

## 11. MAKE.COM SCENARIOS

**Built / active:**
1. **Newsletter** — Webhook → Smartsheet → Brevo (Create Contact).
2. **Volunteer Signup** — Webhook → Smartsheet (Add Row) + Supabase XP award. (Confirm XP modules.)
3. **Guild Emails** — per-guild webhooks → Gmail → Google Group (see §10).

**Still to build / finish:**
- **Contact Us** — webhook exists (`fvr224pc...`), needs wiring into `contact.html` + Smartsheet module.
- Confirm Volunteer Signup XP modules are present.
- Donation tracking (ActBlue confirmation # → XP) — design only.

---

## 12. STATUS — DONE vs TO DO

### ✅ Done (recent)
- New `game.html` dashboard design (`#111827` cards, cyan/purple neon).
- Avatar picker (72 avatars, 3 tabs, required) wired into all 3 registration write paths.
- `chat_messages` + `user_tasks` Supabase tables; **Realtime enabled** on `chat_messages`.
- Kanban wired to `user_tasks`; chat wired to `chat_messages`; all writes via authenticated `window.sb`.
- Guild join/leave with 300-XP gate + 30-day cooldown.
- Volunteer/newsletter forms → Make webhooks; Turnstile on register + contact.

### ⬜ To do
- **Add RLS policies** for `user_tasks` (owner CRUD) + `chat_messages` (auth insert / read) + `hall_of_fame` (public read). Then live-test add task, mark complete, send chat.
- **Reconcile the two XP columns** (`total_xp` vs `xp_score`) and the two ActBlue slugs.
- **Add Facebook Pixel** to `shared.js`.
- Finish **Contact Us** Make scenario + wire into `contact.html`.
- **Events page CORS** — gid=0 tab blocked from browser JS; use a republished tab or Supabase `events` table (DO NOT use `netlify.toml`).
- Change nav **Donate** button (`shared.js`) to link the canonical ActBlue URL directly.
- Live guild member counts from Supabase (currently hardcoded).

---

## 13. GIT

- **Repo:** https://github.com/KarynReal26/votereederxp.git
- **Local folder:** `C:\Vote Reeder\site` (the `.git` is here, NOT in `Vote Reeder` root)
- **Branch:** `master`  ·  **Remote:** `origin`
- **Workflow (run from `site/`):**
  ```bash
  git add -A
  git commit -m "your message"
  git push origin master
  ```
- Do **not** `git init` at `C:\Vote Reeder` — the repo already exists in `site/`; doing so creates a nested repo.
- Windows note: Git will warn `LF will be replaced by CRLF` on commit — harmless.
