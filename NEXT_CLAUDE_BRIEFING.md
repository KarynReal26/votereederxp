# VoteReederXP — Next Claude Briefing
**Date:** June 16, 2026
**Campaign:** Karen Reeder for Texas House District 29
**Site:** https://votereederxp.com

---

## 📁 WHERE TO FIND EVERYTHING

All documentation lives in the GitHub repo. Store and update these files there:
- `HANDOFF.md` — technical reference, credentials, to-do list
- `GAMEPLAY_GUIDE.md` — how the site works, admin + player instructions
- `NEXT_CLAUDE_BRIEFING.md` — this file, current status for next Claude
- `guild-join-fix.js` — guild join function reference

**Keep these files updated as you go** — don't wait until the end of a session!

---

## 🔴 WHAT BROKE TODAY & HOW IT WAS FIXED

### 1. Events Page (CORS issue)
- **Problem:** Google Sheet Events tab (gid=0) returns 401 CORS error when fetched from browser JS
- **What was tried:** netlify.toml redirects (BROKE THE SITE TWICE — DO NOT USE), CORS proxies (all blocked), _redirects file (didn't work for Google)
- **DO NOT:** Try netlify.toml again. It breaks drag-and-drop deploys every time
- **Real fix:** Create a NEW tab in Google Sheets called Events2, copy data there, publish it — gets a new GID that isn't blocked. OR manually enter events in Supabase events table

### 2. Game Page Not Showing (script loading order)
- **Problem:** Auth check ran before shared.js created window.sb
- **Fix:** Auth check script MUST be in a SEPARATE script block AFTER shared.js
- **Critical order at bottom of game.html:**
```html
<script src="xp.js"></script>
<script src="shared.js"></script>
<script>
  // Auth check HERE — after shared.js
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

### 3. SUPABASE_URL Duplicate Declaration
- **Problem:** Both game.html and xp.js declared `const SUPABASE_URL` — conflict
- **Fix:** Use `var` not `const` in game.html. xp.js uses `var SUPABASE_URL = SUPABASE_URL || '...'`
- **Never use `const` for SUPABASE_URL or SUPABASE_KEY in game.html**

---

## 🔴 WEBHOOKS — WHERE WE ARE

### What's built in Make.com:
1. ✅ **Newsletter scenario** — Webhook → Smartsheet → Brevo (WORKING)
2. ✅ **Volunteer scenario** — Webhook → Smartsheet (WORKING, needs XP modules)
3. ✅ **Guild join scenario** — Built but NOT fully configured yet:
   - Supabase Database Webhook (`guild_join`) watches profiles table for UPDATE
   - Make scenario has: Webhook trigger → Router (8 paths) → 8 HTTP modules (Google Admin SDK)
   - Google Admin SDK authenticated ✅
   - **NEEDS:** Test data to flow through so filters can be set

### What's NOT done yet:
- Router filters not set (need guild name from webhook data)
- HTTP module email fields not mapped (need to see actual webhook payload)
- Contact Us webhook not wired into contact.html
- Guild email scenario (leader emails guild members) not built

### How to get test data into Make:
1. Deploy the new `guild-join-fix.js` code into game.html (see below)
2. Run this SQL in Supabase first:
```sql
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS guild_joined_at timestamptz;
```
3. Go to game.html → join a guild
4. This updates `profiles.guild` AND `profiles.guild_joined_at` — triggers the Supabase webhook
5. Check Make.com → Guild join scenario → History tab — you should see data
6. Use that data to set router filters and map email field

### Make.com Webhook URLs:
- Newsletter: https://hook.us2.make.com/3xzwacpneg8kvthf8r6g5rxjto2bwypq
- Volunteer: https://hook.us2.make.com/22nytlq9h0q8x4t0md8yfblf62r7w7fc
- Contact: https://hook.us2.make.com/fvr224pc97dxwy3tbb7i4cmt34q7qusi (NOT wired into contact.html yet)
- District Warriors: https://hook.us2.make.com/g1pa5yb4en22koh65mgvhl543jktc8qp
- Turnout Titans: https://hook.us2.make.com/ykwbdeczfmnu1xjdq51ta1ywtta6pg5n
- The Momentum: https://hook.us2.make.com/o9zblb7bmbmort5ea0g2vcogmci5i1hi
- The Signal: https://hook.us2.make.com/nhpp3kykh3k8e3wmtldiibeks222y1ry
- The Miners: https://hook.us2.make.com/1zaj6aw4xvrs8wji6qbqqpk9rfg5pjzw
- The Architects: https://hook.us2.make.com/9zoz0ikr9bjr4caja8c6s9pegbv7ts77
- The Treasury: https://hook.us2.make.com/48suqc7n06s3frpa32kkex7r60gmnwwf
- Admin: https://hook.us2.make.com/bpin13esoqm8ymmwhzyiy81uhomhb5ye

### Google Groups (guild email lists):
- District Warriors: field@votereeder-brazoria.com
- Turnout Titans: outreach@votereeder-brazoria.com
- The Momentum: operations@votereeder-brazoria.com
- The Signal: comms@votereeder-brazoria.com
- The Miners: data@votereeder-brazoria.com
- The Architects: pc@votereeder-brazoria.com
- The Treasury: finance@votereeder-brazoria.com
- Admin: leadership@votereeder-brazoria.com
- All: all@votereeder-brazoria.com

---

## 🔴 GUILD JOIN FIX — Deploy This Now

The guild join on game.html was broken — no confirmation, no leave button, no webhook trigger.

### Step 1 — SQL:
```sql
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS guild_joined_at timestamptz;
```

### Step 2 — In game.html replace the joinGuild function:
See `guild-join-fix.js` in the repo for the complete replacement code.

### Step 3 — In updateDashboard function add these 2 lines above `document.getElementById('stat-xp')`:
```javascript
showGuildStatus(guild, null);
refreshGuildButtons(guild);
```

### What the fix does:
- Asks for confirmation before joining
- Updates both `guild` AND `guild_joined_at` fields (triggers Supabase webhook)
- Shows gold toast "Welcome to [Guild]!" 
- Changes button to "✓ Your Guild · Leave"
- Clicking again = leave guild (sets guild to null)
- Updates hero panel instantly

---

## 🟡 PRIORITY TO-DO LIST

### Fix First:
1. Deploy guild-join-fix.js into game.html
2. Run `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS guild_joined_at timestamptz;`
3. Test joining a guild — verify data appears in Make.com History
4. Set router filters in Make guild join scenario
5. Map email field in each HTTP module
6. Fix Events page — create Events2 tab in Google Sheets OR enter events in Supabase
7. Fix Photos/Gallery page — Facebook embed not displaying
8. Hall of Fame RLS: `CREATE POLICY "Public can read hall_of_fame" ON hall_of_fame FOR SELECT USING (true);`
9. Google Cloud Console → Branding → "I have fixed the issues" → Proceed

### Make.com Scenarios to Build:
10. Contact Us → Smartsheet (wire webhook into contact.html)
11. Volunteer XP modules (HTTP GET username → HTTP POST award_xp)
12. Guild email scenario (leader sends → Router → Gmail → Google Group)

### Game Page Polish:
13. Hero — 4 equal panels, bigger stat numbers
14. Progress bar above badges, full width, 20px tall
15. Mission color coding (green=auto, gold=self-report, purple=screenshot, blue=event code)
16. "How to Play" instructions toggle
17. ⚡ My XP nav → show "Login to see My XP" when logged out

### New Features:
18. Merge volunteer signup + game signup into ONE flow
19. Profile edit page (username, avatar emoji)
20. Facebook Pixel (add to shared.js)
21. Onboarding flow (Karen video + how to play + choose guild)
22. Admin screenshot review page

---

## 📋 HOW TO KEEP DOCS UPDATED ON GIT

Store these files in the repo root:
```
votereederxp/
├── HANDOFF.md           ← technical details, credentials
├── GAMEPLAY_GUIDE.md    ← how site works, admin + player guide
├── NEXT_CLAUDE_BRIEFING.md  ← this file, current status
├── guild-join-fix.js    ← code fixes reference
└── [all site files]
```

**After every session update and push:**
```bash
git add HANDOFF.md GAMEPLAY_GUIDE.md NEXT_CLAUDE_BRIEFING.md
git commit -m "docs: update handoff and briefing"
git push
```

**At start of every new Claude session:**
1. Share the GitHub repo URL
2. Claude reads NEXT_CLAUDE_BRIEFING.md first
3. Then HANDOFF.md for full details
4. No more copy/paste — Claude reads directly from GitHub!

---

## 🔑 KEY CREDENTIALS

### Supabase:
- URL: https://ljxvkdslqxmmedfhrwgu.supabase.co
- Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeHZrZHNscXhtbWVkZmhyd2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NTU0ODQsImV4cCI6MjA5NTMzMTQ4NH0.nUCmAINQ1yL_XdDX9rNBl0gadjyP0ON9rWvb3Tarut4

### Key URLs:
- Site: https://votereederxp.com
- Netlify: app.netlify.com
- Supabase: supabase.com/dashboard/project/ljxvkdslqxmmedfhrwgu
- Make: make.com (Core plan, 10k ops/month)
- Google Cloud Console: console.cloud.google.com (Project: VoteReederXP)
- Substack: https://votereeder.substack.com
- ActBlue: https://secure.actblue.com/donate/votereeder
- Juicer: juicer.io (feed ID: elect-karen-reeder)
- Brevo: brevo.com

### Guild File Mapping:
| Guild | HTML File |
|---|---|
| District Warriors | guild-warriors.html |
| Turnout Titans | guild-titans.html |
| The Momentum | guild-momentum.html |
| The Signal | guild-democracy.html |
| The Miners | guild-builders.html |
| The Architects | guild-rise.html |
| The Treasury | guild-treasury.html |
| Admin | guild-admin.html |

