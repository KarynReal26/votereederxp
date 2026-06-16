# VoteReederXP — Session Handoff Document
**Last Updated:** June 14, 2026  
**Campaign:** Karen Reeder for Texas House District 29

---

## 🌐 LIVE SITE
- **URL:** https://votereederxp.com
- **Host:** Netlify (drag-and-drop deploy from Vote Reeder folder on desktop)
- **Important:** Deploy the Vote Reeder FOLDER (not the site subfolder)
- **After deploy:** Delete `netlify.toml` from site folder once Make webhooks are confirmed working

---

## 🗄️ SUPABASE
- **Project URL:** https://ljxvkdslqxmmedfhrwgu.supabase.co
- **Anon Key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeHZrZHNscXhtbWVkZmhyd2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NTU0ODQsImV4cCI6MjA5NTMzMTQ4NH0.nUCmAINQ1yL_XdDX9rNBl0gadjyP0ON9rWvb3Tarut4

### Tables:
- `profiles` — user accounts, XP, rank, guild
- `missions` — mission definitions
- `user_missions` — player mission progress (status: todo/in_progress/review/done)
- `xp_transactions` — XP history log
- `user_badges` — earned badges
- `badges` — badge definitions
- `guilds` — guild data
- `guild_members` — guild membership
- `guild_messages` — live guild chat (Realtime enabled)
- `volunteers` — volunteer signups
- `contact_submissions` — contact form data
- `newsletter_signups` — newsletter subscribers
- `events` — campaign events
- `event_checkins` — event attendance

### RPC Functions:
- `award_xp(p_user_id, p_action, p_category, p_amount)` — awards XP and logs transaction

---

## 📊 GOOGLE SHEETS (Data Source)
**Spreadsheet ID:** 2PACX-1vSWflC-rX01G1bhMdahO-tCzkuDRjDmjouukJzC1AyVBPeEVnQmbDIDmGOBAkKUPDnZp-Xo-K1FJd7m

### Tabs:
- **Game** — missions (columns: Category, Action, XP, Verification, Active, Icon, Description, End Date, Repeatable, Guild)
- **Fun** — fun missions (same columns as Game)
- **Events** — campaign events (columns: Type, Title, Date, Location, Description, YouTube, Image, Event Code, Guild)
- **Rank** — rank definitions
- **Admin** — admin users (columns: Name, Email, Password, Role, Active, Guild, Guild Role)
- **Newsletter** — newsletter signups
- **Contact Us** — contact form submissions
- **Site Videos** — video links by page (row 15 = Welcome video for onboarding)
- **Lessons** — lesson content

---

## 🤖 MAKE.COM
**Plan:** Core ($9/month, paid yearly)  
**Operations:** 10,000/month

### Active Scenarios:
1. **Newsletter** — Webhook → Smartsheet → Brevo (Create Contact)
   - Webhook: https://hook.us2.make.com/3xzwacpneg8kvthf8r6g5rxjto2bwypq
2. **Volunteer Signup** — Webhook → Smartsheet (Add Row) + Supabase XP award (NEEDS XP MODULES)
   - Webhook: https://hook.us2.make.com/22nytlq9h0q8x4t0md8yfblf62r7w7fc

### Still to Build in Make:
3. **Contact Us** — Webhook → Smartsheet
   - Webhook created: https://hook.us2.make.com/fvr224pc97dxwy3tbb7i4cmt34q7qusi
   - Needs: wired into contact.html + Smartsheet module added
4. **Guild Emails** — Webhook → Gmail → Google Group
   - One scenario with router for all 8 guilds
   - See guild webhook URLs below

---

## 🏰 GUILDS — Complete Reference

| Guild | Page | Webhook | Google Group | Max |
|---|---|---|---|---|
| 🔥 District Warriors | guild-warriors.html | https://hook.us2.make.com/g1pa5yb4en22koh65mgvhl543jktc8qp | field@votereeder-brazoria.com | 50 |
| 🌊 Turnout Titans | guild-titans.html | https://hook.us2.make.com/ykwbdeczfmnu1xjdq51ta1ywtta6pg5n | outreach@votereeder-brazoria.com | 50 |
| ⚡ The Momentum | guild-momentum.html | https://hook.us2.make.com/o9zblb7bmbmort5ea0g2vcogmci5i1hi | operations@votereeder-brazoria.com | 50 |
| 📡 The Signal | guild-democracy.html | https://hook.us2.make.com/nhpp3kykh3k8e3wmtldiibeks222y1ry | comms@votereeder-brazoria.com | 30 |
| ⛏️ The Miners | guild-builders.html | https://hook.us2.make.com/1zaj6aw4xvrs8wji6qbqqpk9rfg5pjzw | data@votereeder-brazoria.com | 15 |
| 🏛️ The Architects | guild-rise.html | https://hook.us2.make.com/9zoz0ikr9bjr4caja8c6s9pegbv7ts77 | pc@votereeder-brazoria.com | 10 |
| 💎 The Treasury | guild-treasury.html | https://hook.us2.make.com/48suqc7n06s3frpa32kkex7r60gmnwwf | finance@votereeder-brazoria.com | 15 |
| 🛡️ Admin | guild-admin.html | https://hook.us2.make.com/bpin13esoqm8ymmwhzyiy81uhomhb5ye | leadership@votereeder-brazoria.com | — |

### Guild Features Built:
- ✅ Live two-way chat (Supabase Realtime)
- ✅ Guild leaderboard (top 10 members by XP)
- ✅ Upcoming events filtered by guild
- ✅ Guild missions with Join button → adds to game.html In Progress
- ✅ Email guild (leaders only) → fires Make webhook → Gmail group
- ✅ Member limit with "Guild Full" button when at capacity
- ✅ Announcement posts (leaders only)
- ✅ Admin guild — hidden from players, email all admins or all guild members

---

## 📧 GOOGLE WORKSPACE GROUPS
- all@votereeder-brazoria.com — All members (31)
- comms@votereeder-brazoria.com — The Signal (5)
- data@votereeder-brazoria.com — The Miners (3)
- field@votereeder-brazoria.com — District Warriors (1)
- finance@votereeder-brazoria.com — The Treasury (3)
- leadership@votereeder-brazoria.com — Admin (7)
- operations@votereeder-brazoria.com — The Momentum (8)
- outreach@votereeder-brazoria.com — Turnout Titans (3)
- pc@votereeder-brazoria.com — The Architects (0)

---

## 🎮 GAME SYSTEM

### XP & Ranks:
| Rank | XP Required | Perks |
|---|---|---|
| Supporter | 0 | Campaign badge + welcome pack |
| Organizer | 300 | Guild access + mission unlocks |
| Advocate | 1,000 | Leaderboard featured + certificate |
| Builder | 3,500 | VIP event invites + name on site |
| Catalyst | 8,000 | Guild leadership + campaign role |
| Change Champion | 15,000 | Hall of Fame + Campaign Legacy |

### Key Files:
- `game.html` — main dashboard (XP, missions, badges, leaderboard, guilds)
- `xp.js` — shared XP functions, `joinMission()` function
- `shared.js` — nav, footer, auth modal, Supabase client

### Mission Board:
- 4 columns: Available / In Progress / Pending Review / Complete
- Available column scrollable with sticky header
- Desktop: drag and drop between columns
- Mobile: tap card to select, tap column header to move
- One-and-done missions disappear after completion
- Missions saved as in_progress persist via Supabase `user_missions` table

### Badges (12 total — grayed until earned):
First Knock, Community Builder, Rally Warrior, Turnout Titan, Social Amplifier, Recruit Master, Catalyst, Change Maker, Neighborhood Champ, Civic Scholar, On Fire Streak, Voter Guardian

---

## ✅ COMPLETED THIS SESSION

### Pages Built/Updated:
- `volunteer.html` — native cyberpunk form, Supabase save, Make webhook, multi-select teams, XP award
- `game.html` — compact mission cards, scrollable Available column, badges at top full-width, mini Top 5 leaderboard in hero, mobile tap-to-select pattern
- `shared.js` — ⚡ My XP nav link (shows when logged in), login redirects to game.html, Facebook Sign In button
- `xp.js` — `awardXP()` and `joinMission()` functions
- `index.html` — Activate buttons wired to joinMission(), guild cards link to guild pages
- `guild-warriors.html` — District Warriors
- `guild-titans.html` — Turnout Titans
- `guild-momentum.html` — The Momentum
- `guild-democracy.html` — The Signal (renamed from Democracy XP)
- `guild-builders.html` — The Miners (renamed from Vote Builders)
- `guild-rise.html` — The Architects (renamed from Rise Collective)
- `guild-treasury.html` — The Treasury (new)
- `guild-admin.html` — Admin Command (hidden from players)

### Database:
- `guild_messages` table created with RLS policies + Realtime enabled
- `volunteers` table updated with new columns: current_stage, profession, organization, privacy_agreed, notes, username
- `user_missions` table used for cross-page mission persistence

### Google Sheets:
- Guild column added to Game, Fun, and Events tabs
- Game sheet — all missions assigned to guilds
- Fun sheet — cleaned up (duplicates removed), all assigned to guilds
- Events sheet — Guild column added with formula

### Google OAuth:
- Published to Production (was in Testing)
- Domain verification attempted via DNS TXT record and HTML file method
- Still pending — see below

---

## ⬜ STILL TO DO (Priority Order)

### Immediate:
1. **Google domain verification** — upload `google820d4ccbbf560afb.html` to site root, click Verify in Search Console, then go to Google Cloud Console → Branding → "I have fixed the issues" → Proceed. This fixes the Supabase URL showing on Google Sign In screen.
2. **Delete netlify.toml** — after webhooks confirmed working, remove from site folder
3. **Test volunteer form → Smartsheet** — submit test, check if row appears in Smartsheet
4. **Update index.html guild section** — use `guild-section-update.html` provided in this session

### Make.com Scenarios to Build:
5. **Volunteer XP modules** — after Smartsheet module in volunteer scenario, add:
   - HTTP GET → Supabase profiles table → look up username → get user_id
   - HTTP POST → Supabase RPC `award_xp` → award +200 XP
   - Filter: only if username field is not empty
6. **Contact Us scenario** — Webhook (fvr224pc97dxwy3tbb7i4cmt34q7qusi) → Smartsheet Add Row
   - Wire webhook URL into contact.html form submit
7. **Guild Email scenario** — one scenario with Router:
   - Trigger: Custom Webhook
   - Router: 8 paths (one per guild) filtering by `guild` field
   - Each path: Gmail → Send Email → TO: guild's Google Group email
   - Also add: Supabase log that email was sent

### New Pages/Features to Build:
8. **Onboarding flow** — first-time player experience:
   - Screen 1: Cinematic intro with particles and music
   - Screen 2: Karen's welcome video (URL in Google Sheet row 15)
   - Screen 3: How to Play (4 steps)
   - Screen 4: Choose Your Guild
   - Screen 5: First mission assigned
   - Triggered once per account (stored in localStorage/Supabase)
9. **Guild join welcome modal** — shows after joining a guild:
   - Welcome message with guild name
   - Mission briefing (check email, hit chat, one guild only)
   - "Let's go!" CTA
10. **Guild member auto-add to Google Groups** — when profile.guild is updated:
    - Make scenario: Supabase webhook → HTTP POST to Google Groups API
    - OR: Karen manually adds from volunteer Smartsheet

### Social Login:
11. **Facebook Sign In** — button is in auth modal but OAuth not configured in Supabase yet:
    - Go to Supabase → Authentication → Providers → Facebook
    - Add Facebook App ID and Secret
    - Configure Facebook Developer App with OAuth redirect URL

### Testing:
12. **Full flow test:**
    - Sign up (email + Google)
    - Complete a mission
    - Submit screenshot for review
    - Award XP
    - Join a guild
    - Send guild message
    - Check leaderboard updates

---

## 📋 GOOGLE SHEETS STILL TO UPDATE
- Game tab — change Democracy XP → The Signal, Vote Builders → The Miners, Rise Collective → The Architects
- Fun tab — same changes
- Admin tab — update Guild column names if needed

---

## 🔗 KEY URLs
- Site: https://votereederxp.com
- Netlify: app.netlify.com
- Supabase: supabase.com/dashboard/project/ljxvkdslqxmmedfhrwgu
- Make: make.com
- Google Cloud Console: console.cloud.google.com (Project: VoteReederXP)
- Google Search Console: search.google.com/search-console
- Google Workspace Admin: admin.google.com
- Smartsheet: Volunteer Sign Up / Roster (Sheet ID: 8360216862084996)
- Brevo: brevo.com (email marketing)

---

## 💡 FUTURE IDEAS (Parking Lot)
- Karen records welcome video for onboarding (30-60 seconds)
- Guild member count pulled live from Supabase instead of hardcoded
- Notification to Karen when someone joins a guild (email with username + email)
- 30-day guild switch cooldown enforcement
- The Architects guild — invite-only, Karen approves members
- Civic Champion of the Month — auto-populated from leaderboard #1
- Mobile app version
- Push notifications for new missions and events

---

## 📝 SESSION UPDATE — June 14, 2026 (Afternoon)

### Completed:
- ✅ Google Search Console — domain verified (HTML file method)
- ✅ award_xp function fixed — was blocking repeatable missions with "already earned today" error. Updated to 1-hour cooldown for non-repeatable categories
- ✅ XP now recording in xp_transactions table and updating profiles.total_xp
- ✅ xp.js updated — awardXP() now refreshes dashboard display after awarding, flashes green
- ✅ Guild pages — all 8 updated with correct webhook URLs and Google Group emails
- ✅ Guild names finalized: Democracy XP → The Signal, Vote Builders → The Miners, Rise Collective → The Architects, new guild The Treasury added
- ✅ game.html — all 4 mission board columns now scrollable with color-coded scrollbars, newest completed missions at top
- ✅ game.html — 3-column hero layout: stats left, Civic Champion center, Top 5 leaderboard right
- ✅ game.html — guild status in hero (shows guild name or "Join a Guild" link that scrolls to guild section)
- ✅ xp.js — joinMission() now shows friendly "⚡ Join the Game!" modal for non-logged-in users
- ✅ index.html — leaderboard section replaced with live Supabase data (players + guild rankings)
- ✅ guild-treasury.html — fully built and corrected
- ✅ GAMEPLAY_GUIDE.md — comprehensive player + admin operations guide created

### Guild Final Reference:
| Guild | File | Old Name | Google Group |
|---|---|---|---|
| District Warriors | guild-warriors.html | Same | field@ |
| Turnout Titans | guild-titans.html | Same | outreach@ |
| The Momentum | guild-momentum.html | Same | operations@ |
| The Signal | guild-democracy.html | Democracy XP | comms@ |
| The Miners | guild-builders.html | Vote Builders | data@ |
| The Architects | guild-rise.html | Rise Collective | pc@ |
| The Treasury | guild-treasury.html | New | finance@ |
| Admin | guild-admin.html | Same | leadership@ |

### Still To Do:
1. Google Cloud Console → Branding → "I have fixed the issues" → Proceed (fixes Google Sign In screen)
2. Make.com volunteer scenario — add HTTP modules for Supabase username lookup + award_xp
3. Make.com — build guild email scenario (Webhook → Router → Gmail → Google Group)
4. Contact.html — wire in webhook URL: https://hook.us2.make.com/fvr224pc97dxwy3tbb7i4cmt34q7qusi
5. Onboarding flow — new player welcome experience (Karen video + how to play)
6. Guild join welcome modal
7. Facebook Sign In — configure in Supabase Auth providers
8. Admin screenshot review page
9. Update Game/Fun Google Sheet — change Democracy XP → The Signal, Vote Builders → The Miners, Rise Collective → The Architects

---

## 📝 SESSION UPDATE — June 14, 2026 (Evening — Pre-Launch)

### Completed:
- ✅ Google Search Console — domain verified (HTML file method) — `google820d4ccbbf560afb.html` must stay in site root forever
- ✅ award_xp SQL function fixed — was blocking repeatable missions. Now uses 1-hour cooldown per action
- ✅ XP recording confirmed — xp_transactions table has data, profiles.total_xp updating
- ✅ xp.js — awardXP() now refreshes XP display after awarding (flashes green)
- ✅ xp.js — joinMission() shows "⚡ Join the Game!" modal for non-logged-in users
- ✅ game.html — 3-column hero: stats left, Civic Champion + Guild status center, Top 5 right
- ✅ game.html — all 4 mission columns scrollable with color-coded scrollbars
- ✅ game.html — newest completed missions appear at top of Complete column
- ✅ guild-treasury.html — fully built and corrected
- ✅ index.html — leaderboard section pulls live from Supabase (players + guilds)
- ✅ index.html — guild modal fixed (removed duplicate openGuildModal, fixed closeGuildModal)
- ✅ blog.html — rebuilt with two Substack posts hardcoded. RSS auto-feed attempted but Substack blocks all CORS proxies with 403. Needs Netlify serverless function for true auto-feed (post-launch)
- ✅ ActBlue donation page confirmed working in Chrome (Edge blocks JS on ActBlue)
- ✅ GAMEPLAY_GUIDE.md — comprehensive player + admin guide created

### Blog Update Instructions:
To add a new Substack post to blog.html:
1. Open `blog.html` in Notepad++
2. Find the `const POSTS = [` array at the bottom
3. Add new post object AT THE TOP of the array (becomes featured post)
4. Copy this template:
```javascript
{
  title: "Your Post Title",
  date: "June 15, 2026",
  link: "https://votereeder.substack.com/p/your-post-slug",
  image: "paste-substack-image-url-here",
  excerpt: "Short summary shown on the card (150 chars)...",
  body: `<p>Full post content here...</p><p>More paragraphs...</p>`
},
```
5. Save and deploy to Netlify

**Substack RSS Note:** Substack blocks all third-party RSS proxies (rss2json, allorigins, corsproxy all return 403). True auto-feed requires a Netlify serverless function — build post-launch.

**Substack URL:** https://votereeder.substack.com
**Blog Google Doc:** https://docs.google.com/document/d/e/2PACX-1vQY5scTXEIUomy_H2QcWez7BHIU5d_BRzidAC9uLWtHAxltTk2FYekcDW4wvBmKdAFHu88A_625ARYY/pub

### Events Sheet Fix:
Events not loading because "Restrict access to votereeder-brazoria.com" was checked in Google Sheets publish settings. **Uncheck that box** in File → Share → Publish to web → Published content and settings.

### ActBlue:
- URL: https://secure.actblue.com/donate/votereeder
- Works in Chrome, Edge blocks JavaScript on ActBlue
- Donate button in nav links to donate.html — update shared.js to link directly to ActBlue URL

### Key Files Reference:
| File | Purpose | Data Source |
|---|---|---|
| index.html | Home page | Supabase (leaderboard), Google Sheet (volunteer count) |
| game.html | Player dashboard | Supabase (XP, profile, badges), Google Sheets (missions, events, ranks) |
| volunteer.html | Volunteer form | Supabase volunteers table + Make webhook |
| blog.html | Campaign blog | Hardcoded POSTS array (update manually per post) |
| events.html | Events page | Google Sheet Events tab (must be published, no restrictions) |
| learn.html | Lessons | Google Sheet Lessons + Site Videos tabs |
| register.html | Voting 101 | Hardcoded content |
| contact.html | Contact form | Make webhook (needs wiring) |
| donate.html | Donation page | Links to ActBlue |
| gallery.html | Photo gallery | Facebook embed (consider Juicer.io for full-width auto-feed) |
| shared.js | Nav + Auth | Supabase auth |
| xp.js | XP functions | Supabase RPC award_xp |
| style.css | All styling | N/A |
| guild-warriors.html | District Warriors guild | Supabase guild_messages, profiles |
| guild-titans.html | Turnout Titans guild | Supabase guild_messages, profiles |
| guild-momentum.html | The Momentum guild | Supabase guild_messages, profiles |
| guild-democracy.html | The Signal guild | Supabase guild_messages, profiles |
| guild-builders.html | The Miners guild | Supabase guild_messages, profiles |
| guild-rise.html | The Architects guild | Supabase guild_messages, profiles |
| guild-treasury.html | The Treasury guild | Supabase guild_messages, profiles |
| guild-admin.html | Admin Command | Supabase guild_messages, Google Sheet Admin tab |

### ⬜ POST-LAUNCH TO-DO:
1. **Google Cloud Console → Branding** → "I have fixed the issues" → Proceed (fixes Google Sign In showing Supabase URL)
2. **Make.com volunteer scenario** — add HTTP GET (Supabase username lookup) + HTTP POST (award_xp) after Smartsheet module
3. **Make.com guild email scenario** — Webhook → Router (8 paths) → Gmail → Google Group
4. **contact.html** — wire in webhook: https://hook.us2.make.com/fvr224pc97dxwy3tbb7i4cmt34q7qusi
5. **shared.js Donate button** — change href to https://secure.actblue.com/donate/votereeder directly
6. **Netlify serverless function** — for Substack RSS auto-feed on blog
7. **Juicer.io** — replace Facebook gallery embed with full-width auto-updating photo grid
8. **Onboarding flow** — new player welcome (Karen video + how to play + guild selection)
9. **Guild join welcome modal** — shows after joining guild with mission briefing
10. **Facebook Sign In** — configure in Supabase Auth → Providers → Facebook
11. **Admin screenshot review page** — approve pending missions, award XP
12. **Google Sheets Events tab** — uncheck "Restrict access" in Publish settings
13. **Google Sheets Game/Fun tabs** — update guild names: Democracy XP → The Signal, Vote Builders → The Miners, Rise Collective → The Architects

### Guild Webhook URLs (for Make guild email scenario):
- District Warriors: https://hook.us2.make.com/g1pa5yb4en22koh65mgvhl543jktc8qp
- Turnout Titans: https://hook.us2.make.com/ykwbdeczfmnu1xjdq51ta1ywtta6pg5n
- The Momentum: https://hook.us2.make.com/o9zblb7bmbmort5ea0g2vcogmci5i1hi
- The Signal: https://hook.us2.make.com/nhpp3kykh3k8e3wmtldiibeks222y1ry
- The Miners: https://hook.us2.make.com/1zaj6aw4xvrs8wji6qbqqpk9rfg5pjzw
- The Architects: https://hook.us2.make.com/9zoz0ikr9bjr4caja8c6s9pegbv7ts77
- The Treasury: https://hook.us2.make.com/48suqc7n06s3frpa32kkex7r60gmnwwf
- Admin: https://hook.us2.make.com/bpin13esoqm8ymmwhzyiy81uhomhb5ye

### Supabase Key Info:
- Project URL: https://ljxvkdslqxmmedfhrwgu.supabase.co
- Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeHZrZHNscXhtbWVkZmhyd2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NTU0ODQsImV4cCI6MjA5NTMzMTQ4NH0.nUCmAINQ1yL_XdDX9rNBl0gadjyP0ON9rWvb3Tarut4
- award_xp function: EXISTS and working ✅
- guild_messages Realtime: ENABLED ✅
- RLS: ENABLED on all tables ✅

### Make.com:
- Plan: Core ($9/month, paid yearly) — 10,000 ops/month
- Reset date: 7th of each month
- Newsletter scenario: ACTIVE ✅
- Volunteer scenario: ACTIVE (missing XP modules) ⚠️
- Contact scenario: webhook created, NOT wired into contact.html ⚠️
- Guild email scenario: NOT BUILT YET ⬜

---

## 🚨 KNOWN ISSUES — EVENTS & BLOG (Fix Post-Launch)

### EVENTS PAGE — Not Loading
**Root cause:** Google Sheets published CSV returns 401 CORS error when fetched from browser JavaScript. The sheet IS published and accessible directly in a browser, but cross-origin requests from votereederxp.com are blocked by Google.

**What was tried:**
- Unchecking "Restrict access" in publish settings — didn't fix it
- Netlify `_redirects` proxy — didn't work for Google Sheets URLs
- `corsproxy.io` and other CORS proxies — blocked by Google (403)

**CSV URL that works in browser but not in code:**
`https://docs.google.com/spreadsheets/d/e/2PACX-1vSWflC-rX01G1bhMdahO-tCzkuDRjDmjouukJzC1AyVBPeEVnQmbDIDmGOBAkKUPDnZp-Xo-K1FJd7m/pub?gid=0&single=true&output=csv`

**Google Sheet Events columns:**
`Type | Date | Time | Comments | Link | Status | Photos | Event Code | Guild`

**Supabase events table columns (already exists):**
`id | title | description | date | location | xp_reward | qr_code | type | event_code | guild | image_url | youtube_url | active | time | comments | link | status | photos`

**Best fix — Supabase approach:**
1. The Supabase `events` table already exists with extra columns added
2. Need to import events data — CSV import failed due to column name mismatch
3. **Solution A:** Manually enter events via Supabase Table Editor → Insert Row
4. **Solution B:** Build Make.com scenario: Google Sheets Watch Rows → Supabase Insert Row
5. **Solution C:** Build Netlify serverless function to proxy the Google Sheets request
6. Once data is in Supabase, update `events.html` fetch URL to:
   `https://ljxvkdslqxmmedfhrwgu.supabase.co/rest/v1/events?select=*&order=date.asc`

**Current state:** events.html shows "Unable to load events. Check back soon."

---

### BLOG PAGE — Not Auto-Loading from Substack
**Root cause:** Substack blocks all cross-origin RSS feed requests. Returns 403 Forbidden for all proxy services tried (rss2json, allorigins, corsproxy, Google Doc mirror fetch).

**What was tried:**
- rss2json.com API → 403 Forbidden
- allorigins.win → 403 Forbidden  
- corsproxy.io → 403 Forbidden
- Google Doc RSS mirror fetch → CORS blocked
- Netlify `_redirects` → didn't proxy correctly

**Substack RSS URL:** `https://votereeder.substack.com/feed`
**Google Doc RSS Mirror:** `https://docs.google.com/document/d/e/2PACX-1vTsDpdB5RuhN2Re4VtiF2xBY0C3kf2S1lLgY_LQfLNdpfsld70bh_hXkRehKQ4DJfm6PraSnBhLxv2C/pub`

**Current state:** blog.html uses hardcoded POSTS array with 3 posts:
1. "Most campaigns ask for your vote. Karen Reeder built you a whole game." (June 14, 2026)
2. "Why I am Running for TX HD 29" (June 6, 2026)
3. "Hey, Texas! We Demand Better." (May 25, 2026)

**To add new posts manually:**
1. Open `blog.html` in Notepad++
2. Find `const POSTS = [`
3. Add new post object AT THE TOP of array
4. Template:
```javascript
{
  title: "Post Title",
  date: "Month DD, YYYY",
  link: "https://votereeder.substack.com/p/post-slug",
  image: "https://substackcdn.com/...",
  excerpt: "Short description...",
  body: `<p>Full content...</p>`
},
```

**Best fix — Netlify Function:**
Create `netlify/functions/rss.js`:
```javascript
const fetch = require('node-fetch');
exports.handler = async () => {
  const res = await fetch('https://votereeder.substack.com/feed');
  const text = await res.text();
  return { statusCode: 200, headers: {'Content-Type':'application/xml','Access-Control-Allow-Origin':'*'}, body: text };
};
```
Then in blog.html fetch from `/.netlify/functions/rss` instead of Substack directly.
This runs server-side so no CORS issues!

---

### EVENTS TABLE — SQL to add missing columns (already run):
```sql
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS type text,
ADD COLUMN IF NOT EXISTS event_code text,
ADD COLUMN IF NOT EXISTS guild text,
ADD COLUMN IF NOT EXISTS image_url text,
ADD COLUMN IF NOT EXISTS youtube_url text,
ADD COLUMN IF NOT EXISTS active boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS time text,
ADD COLUMN IF NOT EXISTS comments text,
ADD COLUMN IF NOT EXISTS link text,
ADD COLUMN IF NOT EXISTS status text,
ADD COLUMN IF NOT EXISTS photos text;
```

### QUICKEST FIX FOR EVENTS (do this first):
Manually insert a few events via Supabase → Table Editor → events → Insert Row. Then events.html will show them immediately since it's already set up to read from Supabase (just needs data).

---

## 📝 FINAL SESSION UPDATE — June 14, 2026 (Night — Launch Day)

### Completed This Session:
- ✅ Google Search Console domain verified (HTML file method)
- ✅ award_xp SQL function fixed — 1 hour cooldown, repeatable categories bypass
- ✅ XP confirmed working — Karen Reeder has 400 XP in profiles table
- ✅ game.html hero — 4 equal sticky panels: Personal | Guild | Civic Champion | Top 5
- ✅ Hall of Fame built — marquee + grid cards, pulls from Supabase hall_of_fame table
- ✅ hall_of_fame table — avatar column added, 8 champions inserted
- ✅ guild-treasury.html — built and corrected
- ✅ blog.html — 3 hardcoded posts (RSS auto-feed blocked by Substack CORS)
- ✅ events.html — restored to Google Sheets CSV fetch (was working before)
- ✅ All guild pages updated with correct webhook URLs and Google Group emails
- ✅ Guild names finalized: The Signal, The Miners, The Architects, The Treasury
- ✅ joinGuild() fixed — was crashing due to missing stat-guild element
- ✅ xp.js — login prompt for non-logged-in users clicking missions

### Hall of Fame:
- **Supabase table:** hall_of_fame (id, username, month, xp_amount, guild, avatar, created_at)
- **8 champions inserted:** Svetlana Valonis, Crissy Roper, Yolanda Norman, Robert Howard, Imani Hicks, Heidy Li, Abigail Scott, Ty Taplin
- **To add new champion:** Supabase → Table Editor → hall_of_fame → Insert Row
- **Displays:** scrolling marquee + grid cards at bottom of game.html
- **Note:** Names are real names as placeholders — should be updated to usernames for privacy

### Known Bugs Fixed:
- stat-guild element removed from hero but still referenced in JS — caused missions not loading AND joinGuild not working
- Guild modal on index.html had duplicate openGuildModal function and wrong closeGuildModal

### ⬜ STILL TO DO (Next Claude Priority Order):

**Critical:**
1. Google Cloud Console → Branding → "I have fixed the issues" → fix Google Sign In screen
2. Make.com volunteer scenario — add Supabase HTTP modules for XP award
3. Make.com guild email scenario — Webhook → Router → Gmail → Google Group
4. contact.html — wire webhook: https://hook.us2.make.com/fvr224pc97dxwy3tbb7i4cmt34q7qusi
5. Donate button in nav (shared.js) — change to direct ActBlue URL: https://secure.actblue.com/donate/votereeder

**Events & Blog:**
6. Events page — still pulling from Google Sheets CSV (CORS issue on gid=0 tab). Fix options:
   - Netlify serverless function to proxy request
   - Make.com scenario: Google Sheets → Supabase events table sync
   - Manual entry via Supabase Table Editor
7. Blog — Substack RSS blocked by CORS. Fix: Netlify Function at netlify/functions/rss.js

**Features:**
8. Onboarding flow — new player welcome (Karen video + how to play + guild selection)
9. Guild join welcome modal
10. Facebook Sign In — Supabase Auth → Providers → Facebook
11. Juicer.io — replace gallery.html Facebook embed
12. Admin screenshot review page
13. Google Sheets Game/Fun tabs — update guild names (Democracy XP → The Signal, Vote Builders → The Miners, Rise Collective → The Architects)
14. Hall of Fame — update real names to usernames for privacy
15. Guild pages — add Hall of Fame marquee (same component as game.html)

### Files Changed This Session:
- game.html — hero layout, Hall of Fame, guild fixes
- xp.js — login prompt, XP refresh
- blog.html — 3 hardcoded posts
- events.html — restored Google Sheets fetch
- guild-treasury.html — new guild page
- All guild pages — webhook URLs, Google Group emails, member limits
- HANDOFF.md — this document

### Supabase Tables Summary:
| Table | Purpose | Status |
|---|---|---|
| profiles | Users, XP, guild | ✅ Working |
| hall_of_fame | Civic Champions | ✅ 8 records |
| xp_transactions | XP history | ✅ Recording |
| user_missions | Mission progress | ✅ Working |
| guild_messages | Live chat | ✅ Realtime on |
| volunteers | Volunteer signups | ✅ Working |
| events | Campaign events | ⚠️ Empty - needs data |
| missions | Mission definitions | ⚠️ Empty - using Google Sheets |

---

## ➕ ADDITIONAL TO-DO ITEMS (Added End of Session)

### 🔴 High Priority:

**1. Merge Volunteer Signup + Game Signup into ONE flow**
- Currently: volunteer.html and game signup (auth modal) are separate
- Should be: ONE process — fill out volunteer form → account created → in the game
- How to build:
  - On volunteer.html form submit → create Supabase auth account (email + password)
  - Save volunteer data to volunteers table
  - Save profile data to profiles table (username, guild = null)
  - Award +200 XP for signing up
  - Redirect to game.html with welcome message
  - Remove separate "Login / Sign Up" for volunteers — they sign up via volunteer form
  - Keep Google/Facebook OAuth as alternative login method

**2. Profile Edit Page (profile.html)**
- Players need to be able to:
  - Change username
  - Choose avatar emoji (from a set of options: 🦁 🔥 ⚡ 🌊 ⛏️ 🏛️ 💎 📡 🌟 🎯 🦋 🐉)
  - View full XP history
  - See all badges earned
  - See guild membership
  - Leave guild option
- Add link to profile page in nav (click username → profile page)
- Store avatar in profiles table (add avatar column)

**3. Home Page Leaderboard — Fix Fake Data**
- Current: hardcoded fake players (XxVoteCatalystxX, BrazoniaBuilder etc.)
- Fix: replace with leaderboard-section-update.html (already built this session)
- File is in downloads from this session
- Replace entire <!-- LEADERBOARD --> section in index.html with that file's contents
- Pulls live from Supabase profiles table ordered by total_xp

### 🟡 Medium Priority:

**4. Add avatar column to profiles table:**
```sql
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar text DEFAULT '⚡';
```

**5. Update volunteer.html Make scenario to award XP:**
- Make.com → Volunteer scenario → after Smartsheet module add:
  - HTTP GET: Supabase profiles?username=eq.{{username}}&select=id
  - HTTP POST: Supabase rpc/award_xp with p_amount:200

**6. Hall of Fame — update real names to usernames for privacy**
- Current champions have real names as placeholders
- Update via Supabase → Table Editor → hall_of_fame → edit username column


---

## 📝 FINAL FINAL UPDATE — End of Launch Day Session

### Last Round of Changes to game.html:
- ✅ Removed duplicate Leaderboard panel from bottom (it's in hero Top 5)
- ✅ Removed duplicate Civic Champion panel from bottom (it's in hero)
- ✅ Added Guild Chat Feed to right column — shows last 10 messages from your guild
- ✅ Added Facebook Campaign Updates panel (link to Facebook page)
- ✅ Completed missions now show NEWEST at TOP (prepend instead of append)
- ✅ Hall of Fame marquee fixed — proper wrapper classes, seamless loop animation
- ✅ Guild modal fixed — deleted old openGuildModal function that was crashing on gModalMembers
- ✅ Guild modal now opens correctly and Enter Guild HQ navigates to guild page

### Facebook Feed Note:
A real Facebook feed widget requires Facebook's oEmbed API or a third party service like Juicer.io. Currently showing a placeholder link. To add real feed:
- Option A: Juicer.io (connects Facebook + Instagram, displays as grid) — free plan available
- Option B: Facebook Page Plugin embed code (limited functionality)
- Option C: Elfsight Social Feed widget ($6/month)

### To-Do Added:
- Merge volunteer signup + game signup into ONE flow
- Profile edit page (username, avatar emoji, XP history)
- Fix home page leaderboard fake data → use leaderboard-section-update.html
- Add avatar column to profiles table
- Add real Facebook/social feed to game page sidebar
- Update Hall of Fame real names → usernames for privacy

### guilds.html — New Guild Landing Page
- Full page explaining each guild with Karen's team descriptions
- 7 guild cards + "Not Sure Yet?" card
- Commitment section (time, virtual/in-person, XP earning)
- Join button saves guild to Supabase then redirects to guild page
- If not logged in → shows auth modal → saves pending guild → joins after login
- Update shared.js nav "GUILDS" link to point to guilds.html instead of index.html#guilds
- Update index.html guild "View Guild" buttons to go to guilds.html instead of opening modal

---

## 📝 guilds.html — Complete Reference

### What it is:
A full landing page where visitors learn about each guild before joining. Replaces the home page guild modal as the primary guild discovery experience.

### File location: `guilds.html` (in site root, same level as index.html)

### How it works:
1. Visitor reads about each guild (descriptions, virtual/in-person, commitment, member limits)
2. Clicks "Join [Guild Name]" button
3. If NOT logged in → auth modal opens → pending guild saved to localStorage → after login, guild is auto-saved and user redirected to guild page
4. If logged in → guild saved to Supabase profiles table → redirected to guild HQ page

### Links to update (3 places):

**1. shared.js — Nav "GUILDS" link:**
Find: `href="index.html#guilds"` or `href="#guilds"`
Replace with: `href="guilds.html"`

**2. index.html — Guild card "View Guild" buttons:**
Find each: `onclick="openGuildModal(...)"` on the View Guild buttons
Replace with direct links to guilds.html:
```html
onclick="window.location.href='guilds.html'"
```
Or just change the button text and link to: `<a href="guilds.html">Browse All Guilds →</a>`

**3. game.html — Guild section "Join Your Team" description:**
Add a link: `<a href="guilds.html">Learn more about each guild →</a>`

### Guild page file mapping:
| Guild | File |
|---|---|
| District Warriors | guild-warriors.html |
| Turnout Titans | guild-titans.html |
| The Momentum | guild-momentum.html |
| The Signal | guild-democracy.html |
| The Miners | guild-builders.html |
| The Architects | guild-rise.html |
| The Treasury | guild-treasury.html |

---

## 📝 Home Page — Guild Section Update Needed

The home page (`index.html`) guild section still has:
- Old "View Guild" buttons that open a modal
- Should instead link to `guilds.html`

**Quick fix for index.html guild section:**
Change each "View Guild" button from:
```html
<button class="mission-btn" onclick="event.stopPropagation();openGuildModal(...)">🔥 View Guild</button>
```
To:
```html
<a href="guilds.html" class="mission-btn" style="display:block;text-align:center;text-decoration:none;">🔥 Explore Guilds</a>
```

Or even simpler — change the entire guild section CTA to one button:
```html
<div style="text-align:center;margin-top:2rem;">
  <a href="guilds.html" class="btn btn-primary">⚔️ Browse All Guilds & Join Your Team →</a>
</div>
```


---

## 📝 LATE SESSION UPDATE

### Changes made to game.html:
- ✅ XP total + rank now show in nav bar when logged in
- ✅ Mission board — color coded by verification type (green=auto, gold=self-report, purple=screenshot, blue=event code)
- ✅ Mission board — "How to Play" toggle button with instructions
- ✅ Mission board — legend showing color codes
- ✅ Completed missions — newest at top (prepend)
- ✅ Removed duplicate leaderboard + civic champion from bottom panels
- ✅ Added guild chat feed to right column
- ✅ Added Facebook Campaign Updates placeholder panel

### Changes made to shared.js:
- ✅ Nav bar now shows XP total and rank when logged in
- ✅ nav-rank-li element added (hidden when logged out)

### Still to do on game.html:
- ⬜ District site links (Karen to provide URLs)
- ⬜ Progress bar above achievement badges
- ⬜ Guild scoreboard in hero (4th panel)
- ⬜ Bigger stat numbers in hero
- ⬜ Real Facebook + Instagram feed (needs Juicer.io or API)
- ⬜ Events list at bottom (replace with Supabase events or hardcoded)
- ⬜ One mission per day enforcement in award_xp SQL function

### One mission per day SQL fix:
The award_xp function currently has 1-hour cooldown. To enforce once-per-day per category:
```sql
CREATE OR REPLACE FUNCTION award_xp(
  p_user_id uuid, p_action text, p_category text, p_amount int
) RETURNS json AS $$
DECLARE v_existing int;
BEGIN
  SELECT COUNT(*) INTO v_existing
  FROM xp_transactions
  WHERE user_id = p_user_id
    AND action = p_action
    AND created_at > now() - interval '24 hours';
  IF v_existing > 0 AND p_category NOT IN ('Events','Field Work') THEN
    RETURN json_build_object('success',false,'reason','already_earned_today');
  END IF;
  INSERT INTO xp_transactions (user_id,action,category,xp_amount)
  VALUES (p_user_id,p_action,p_category,p_amount);
  UPDATE profiles SET total_xp = total_xp + p_amount WHERE id = p_user_id;
  RETURN json_build_object('success',true,'amount',p_amount);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 📝 FINAL HANDOFF UPDATE — End of Session

### Juicer.io Social Feed:
- **Feed ID:** elect-karen-reeder
- **Embed URL:** https://www.juicer.io/api/feeds/elect-karen-reeder/iframe
- **Added to:** game.html (bottom, under Hall of Fame)
- **Still to add:** index.html (use social-feed-section.html drop-in file)
- **Plan:** Slider layout, 1000x1000 iframe, no ads issue with slider
- **Free plan** — one feed, works on all pages with same embed code

### Facebook Ads & Pixel:
- Karen has updated Facebook for ads
- **Need to add Facebook Pixel to website:**
  1. Go to Facebook Business Manager → Events Manager → Pixels
  2. Create a pixel → get the pixel code snippet
  3. Add to shared.js in the `<head>` injection OR add to every HTML file `<head>`
  4. Best approach: add to shared.js so it loads on every page automatically
  5. Pixel tracks: page views, signups, donations, volunteer form submissions
- **Facebook API:** Updated and ready — regenerate token if needed (old one was exposed in chat)

### Email Setup (Still To Do):
- **Brevo** — currently handles newsletter emails
- **info@votereeder-brazoria.com** — needs to be set up as sender for game notifications
- **Issues to fix:**
  1. Update sender name that shows in email (currently may show Brevo or raw email)
  2. Set up game notification emails (XP awarded, guild joined, mission approved)
  3. Decide: Brevo for marketing emails, info@ for transactional game emails
  4. Google Workspace — domain verified ✅ — can now send from info@ via Gmail
  5. In Make.com scenarios — update sender to info@votereeder-brazoria.com

### Google Domain Verified ✅
- Google Search Console — votereederxp.com verified via HTML file
- Google Cloud Console → Branding → STILL NEEDS "I have fixed the issues" → Proceed
- This fixes Google Sign In showing Supabase URL instead of VoteReederXP

---

## 🔴 PRIORITY TO-DO LIST FOR NEXT CHAT

### Critical — Fix First:
1. **Test XP is working** — complete missions, verify points add up in Supabase profiles table
2. **Test all guild HQ links** — game.html guild cards now have 🏰 HQ buttons → verify they go to correct pages
3. **Hall of Fame RLS** — run this SQL if names still not showing:
   ```sql
   CREATE POLICY "Public can read hall_of_fame" ON hall_of_fame FOR SELECT USING (true);
   ```
4. **Google Cloud Console** → Branding → "I have fixed the issues" → Proceed (fixes Google Sign In)
5. **Make.com volunteer XP** — add HTTP modules to volunteer scenario for Supabase XP award

### Guild Pages — Beef Up:
6. **Add guild descriptions** to each guild page using Karen's language from guilds.html
7. **Add "Why Join" section** to each guild page
8. **Add commitment details** (virtual/in-person, time commitment) to each guild page
9. **Fix guild links on ALL pages** — check index.html, game.html, shared.js footer all point to correct guild pages
10. **guilds.html** — add to nav in shared.js (change href to guilds.html)

### Facebook & Social:
11. **Add Facebook Pixel** to shared.js (loads on every page)
12. **Add Juicer feed** to index.html using social-feed-section.html drop-in file
13. **Facebook API** — regenerate token (old one exposed in chat session)
14. **Gallery page** — consider replacing Facebook embed with Juicer grid for better photo display

### Email:
15. **Update Make.com sender name** — change from default to "Karen Reeder Campaign" or "VoteReederXP"
16. **Set up info@votereeder-brazoria.com** in Make.com as sender
17. **Game notification emails** — build Make scenario for:
    - Welcome email when someone signs up
    - XP milestone email (hit Organizer rank, etc.)
    - Guild join confirmation email
    - Mission approved email

### Make.com Scenarios Still to Build:
18. **Contact Us** — wire webhook into contact.html
19. **Guild email** — Webhook → Router → Gmail → Google Group (8 paths)
20. **Volunteer XP** — HTTP GET (Supabase username lookup) + HTTP POST (award_xp)

### New Features:
21. **Merge volunteer + game signup** into ONE flow
22. **Profile edit page** — username change, avatar emoji picker
23. **Fix home page leaderboard** — still shows fake data, replace with leaderboard-section-update.html
24. **Onboarding flow** — new player welcome (Karen video + how to play + guild selection)
25. **Admin screenshot review page** — approve pending missions, award XP
26. **Facebook Sign In** — configure in Supabase Auth → Providers → Facebook
27. **Netlify serverless function** — for Substack RSS auto-feed on blog

### Google Sheets Still to Update:
28. Game tab — change Democracy XP → The Signal, Vote Builders → The Miners, Rise Collective → The Architects
29. Fun tab — same changes
30. Events tab — CORS issue on gid=0, consider Make.com sync to Supabase events table

---

## 🔑 KEY CREDENTIALS & URLS

### Supabase:
- URL: https://ljxvkdslqxmmedfhrwgu.supabase.co
- Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeHZrZHNscXhtbWVkZmhyd2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NTU0ODQsImV4cCI6MjA5NTMzMTQ4NH0.nUCmAINQ1yL_XdDX9rNBl0gadjyP0ON9rWvb3Tarut4

### Make.com Webhooks:
- Newsletter: https://hook.us2.make.com/3xzwacpneg8kvthf8r6g5rxjto2bwypq
- Volunteer: https://hook.us2.make.com/22nytlq9h0q8x4t0md8yfblf62r7w7fc
- Contact: https://hook.us2.make.com/fvr224pc97dxwy3tbb7i4cmt34q7qusi
- District Warriors: https://hook.us2.make.com/g1pa5yb4en22koh65mgvhl543jktc8qp
- Turnout Titans: https://hook.us2.make.com/ykwbdeczfmnu1xjdq51ta1ywtta6pg5n
- The Momentum: https://hook.us2.make.com/o9zblb7bmbmort5ea0g2vcogmci5i1hi
- The Signal: https://hook.us2.make.com/nhpp3kykh3k8e3wmtldiibeks222y1ry
- The Miners: https://hook.us2.make.com/1zaj6aw4xvrs8wji6qbqqpk9rfg5pjzw
- The Architects: https://hook.us2.make.com/9zoz0ikr9bjr4caja8c6s9pegbv7ts77
- The Treasury: https://hook.us2.make.com/48suqc7n06s3frpa32kkex7r60gmnwwf
- Admin: https://hook.us2.make.com/bpin13esoqm8ymmwhzyiy81uhomhb5ye

### Google Groups:
- field@votereeder-brazoria.com — District Warriors
- outreach@votereeder-brazoria.com — Turnout Titans
- operations@votereeder-brazoria.com — The Momentum
- comms@votereeder-brazoria.com — The Signal
- data@votereeder-brazoria.com — The Miners
- pc@votereeder-brazoria.com — The Architects
- finance@votereeder-brazoria.com — The Treasury
- leadership@votereeder-brazoria.com — Admin
- all@votereeder-brazoria.com — Everyone

### Juicer:
- Feed ID: elect-karen-reeder
- Embed: https://www.juicer.io/api/feeds/elect-karen-reeder/iframe

### Key URLs:
- Site: https://votereederxp.com
- Netlify: app.netlify.com
- Supabase: supabase.com/dashboard/project/ljxvkdslqxmmedfhrwgu
- Make: make.com
- Google Cloud Console: console.cloud.google.com (Project: VoteReederXP)
- Google Search Console: search.google.com/search-console
- Google Workspace Admin: admin.google.com
- Substack: https://votereeder.substack.com
- ActBlue: https://secure.actblue.com/donate/votereeder
- Juicer: juicer.io
- Brevo: brevo.com
- Smartsheet Volunteer: Sheet ID 8360216862084996

### Guild Files:
| Guild | HTML File | Google Group |
|---|---|---|
| District Warriors | guild-warriors.html | field@ |
| Turnout Titans | guild-titans.html | outreach@ |
| The Momentum | guild-momentum.html | operations@ |
| The Signal | guild-democracy.html | comms@ |
| The Miners | guild-builders.html | data@ |
| The Architects | guild-rise.html | pc@ |
| The Treasury | guild-treasury.html | finance@ |
| Admin | guild-admin.html | leadership@ |

---

## 📝 VERY FINAL UPDATE — End of All Sessions

### Last fixes made:
- ✅ game.html — fixed `const SUPABASE_URL` duplicate declaration (changed to `var`)
- ✅ xp.js — fixed duplicate declaration conflict with game.html
- ✅ game.html — moved auth check AFTER shared.js loads so window.sb is available
- ✅ game.html — not-logged-in div now shows by default
- ✅ Juicer feed — added to all guild pages + guilds.html + game.html
- ✅ Juicer height fixed to 500px across all pages
- ✅ guilds.html — celebration modal with confetti + horn sound on guild join
- ✅ guild cards on game.html — added 🏰 HQ buttons linking to guild pages
- ✅ Fixed Rise Collective → The Architects, Democracy XP → The Signal in game.html

### Still needed in next chat:
1. **⚡ My XP nav button** — add "Login or Join to see your XP Dashboard" tooltip/text for non-logged-in users
2. **Hero dashboard layout** — 4 equal panels still needs refinement (Personal | Guild | Civic Champion | Top 5)
3. **Mission board color coding** — green=auto, gold=self-report, purple=screenshot, blue=event code (CSS added but needs testing)
4. **Mission board instructions** — "How to Play" toggle button (added but needs testing)
5. **Progress bar** — move above achievement badges, make it wide and prominent
6. **Stat numbers** — make Total XP, Rank, Badges, Board numbers bigger
7. **Guild scoreboard** — add to hero panel
8. **Photos/gallery page** — not displaying, needs fix (Facebook embed issue)
9. **Hall of Fame RLS** — run SQL: `CREATE POLICY "Public can read hall_of_fame" ON hall_of_fame FOR SELECT USING (true);`
10. **Facebook Pixel** — add to shared.js for all pages
11. **Google Cloud Console** → Branding → "I have fixed the issues" → Proceed

### My XP nav fix for next chat:
In `shared.js` find the not-logged-in state and update the nav to show:
```html
<li><a href="game.html" style="color:var(--neon-gold);font-size:.75rem;">⚡ Login to see My XP</a></li>
```
When logged in it shows XP total, when logged out it says "Login to see My XP"

---

## 🚨 CRITICAL — game.html Script Loading Order

**This breaks the dashboard every time someone edits game.html:**

The auth check MUST be in a separate `<script>` block AFTER `shared.js` loads.
Never move it above the shared.js script tag!

### Correct order at bottom of game.html:
```html
<script src="xp.js"></script>
<script src="shared.js"></script>
<script>
  // Auth check MUST be here AFTER shared.js
  const check = setInterval(() => {
    if(!window.sb) return;
    clearInterval(check);
    window.sb.auth.getSession().then(({ data: { session } }) => {
      if(session) {
        window.sb.from('profiles').select('*').eq('id', session.user.id).single()
          .then(({ data: profile }) => updateDashboard(session.user, profile));
      } else {
        document.getElementById('not-logged-in').style.display = 'flex';
        document.getElementById('dashboard').style.display = 'none';
      }
    });
    window.sb.auth.onAuthStateChange((event, session) => {
      if(session) {
        window.sb.from('profiles').select('*').eq('id', session.user.id).single()
          .then(({ data: profile }) => updateDashboard(session.user, profile));
      } else {
        document.getElementById('not-logged-in').style.display = 'flex';
        document.getElementById('dashboard').style.display = 'none';
      }
    });
  }, 200);
</script>
```

### Also critical:
- `var SUPABASE_URL` and `var SUPABASE_KEY` in game.html (NOT const — causes duplicate declaration error with xp.js)
- `not-logged-in` div must have NO inline display:none — shows by default, hides when logged in
- `dashboard` div MUST have `style="display:none"` — hidden by default, shows when logged in

### If dashboard not showing — checklist:
1. F12 Console — any errors?
2. Check script order (xp.js → shared.js → auth script)
3. Check `var` not `const` for SUPABASE_URL
4. Check auth script is AFTER shared.js
5. Check `not-logged-in` div has no inline display:none
