/* ============================================================
   VoteReederXP — shared.js
   Injects nav, footer, auth modal on every page
   - Logged in → home page, XP shown in nav
   - Logged out → Login button goes to volunteer.html
   - My XP only navigates when clicked
============================================================ */
(function () {

const SUPABASE_URL = 'https://ljxvkdslqxmmedfhrwgu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeHZrZHNscXhtbWVkZmhyd2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NTU0ODQsImV4cCI6MjA5NTMzMTQ4NH0.nUCmAINQ1yL_XdDX9rNBl0gadjyP0ON9rWvb3Tarut4';

const page = location.pathname.split('/').pop() || 'index.html';

// ── NAV ──────────────────────────────────────────────────
// Inject the NEW topbar nav, but ONLY on pages that don't already have a .topbar
// in their own HTML. Guard wraps just the injection — window.sb / footer / auth
// modal are created further down and must still run on every page.
if (!document.querySelector('.topbar')) {
  const navStyle = document.createElement('style');
  navStyle.textContent = `
.topbar{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(5,1,15,0.82);backdrop-filter:blur(10px);border-bottom:1px solid rgba(0,240,255,0.22);font-family:'Rajdhani','Inter',sans-serif;}
.topbar .nav-row{display:flex;align-items:center;justify-content:space-between;padding:11px 26px;gap:16px;flex-wrap:wrap;max-width:1280px;margin:0 auto;}
.topbar .nav-left{display:flex;align-items:center;gap:30px;}
.topbar .nav-logo{font-family:'Orbitron',sans-serif;font-size:20px;font-weight:900;letter-spacing:1px;text-decoration:none;background:linear-gradient(90deg,#00f0ff,#bf00ff,#ff00aa);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}
.topbar .nav-links{display:flex;gap:24px;list-style:none;margin:0;padding:0;}
.topbar .nl{font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:700;letter-spacing:.5px;color:rgba(255,255,255,0.62);cursor:pointer;transition:.15s;text-decoration:none;}
.topbar .nl:hover{color:#fff;}
.topbar .nl.active{color:#00f0ff;text-shadow:0 0 10px rgba(0,240,255,.5);}
.topbar .nav-right{display:flex;align-items:center;gap:16px;}
.topbar .nav-donate{font-family:'Rajdhani',sans-serif;font-size:14px;font-weight:700;letter-spacing:.5px;color:#ffcf3f;text-decoration:none;border:1px solid rgba(255,207,63,0.45);border-radius:7px;padding:6px 14px;transition:.15s;white-space:nowrap;}
.topbar .nav-donate:hover{background:rgba(255,207,63,0.12);}
.topbar .nav-login{font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:700;color:#00f0ff;text-decoration:none;cursor:pointer;white-space:nowrap;}
.topbar .nav-login:hover{text-decoration:underline;}
.topbar .avatar-wrap{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);border-radius:24px;padding:4px;cursor:pointer;}
.topbar .av-ring{width:32px;height:32px;border-radius:8px;background:conic-gradient(from 0deg,#00f0ff,#bf00ff,#ff00aa,#00f0ff);padding:2px;}
.topbar .av-in{width:100%;height:100%;border-radius:7px;background:#0a1230;display:flex;align-items:center;justify-content:center;font-family:'Orbitron',sans-serif;font-size:10px;font-weight:900;color:#5fa8ff;overflow:hidden;}
.topbar .av-in img{width:100%;height:100%;object-fit:cover;object-position:top center;border-radius:7px;display:block;}
.topbar .nav-acct{display:flex;align-items:center;gap:14px;}
.topbar .nav-bell{font-size:18px;line-height:1;cursor:pointer;opacity:.8;}
.topbar .nav-bell:hover{opacity:1;}
.topbar .acct-meta{display:flex;flex-direction:column;line-height:1.12;}
.topbar .acct-name{font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:700;color:#fff;white-space:nowrap;}
.topbar .acct-score{font-family:'Rajdhani',sans-serif;font-size:11px;font-weight:600;color:#ffcf3f;white-space:nowrap;}
@media(max-width:680px){.topbar .nav-links{display:none;}}
`;
  document.head.appendChild(navStyle);

  const navEl = document.createElement('div');
  navEl.className = 'topbar';
  navEl.innerHTML = `
  <div class="nav-row">
    <div class="nav-left">
      <a class="nav-logo" href="index.html">VoteReederXP</a>
      <div class="nav-links">
        <span class="nl ${page==='game.html'?'active':''}" onclick="location.href='/game.html'">Dashboard</span>
        <span class="nl ${page==='leaderboard.html'?'active':''}" onclick="location.href='/leaderboard.html'">Leaderboard</span>
        <span class="nl ${page==='guilds.html'?'active':''}" onclick="location.href='/guilds.html'">Guilds</span>
        <span class="nl ${page==='events.html'?'active':''}" onclick="location.href='/events.html'">Events</span>
        <span class="nl ${page==='learn.html'?'active':''}" onclick="location.href='/learn.html'">Learn</span>
        <span class="nl ${page==='blog.html'?'active':''}" onclick="location.href='/blog.html'">Blog</span>
      </div>
    </div>
    <div class="nav-right">
      <a class="nav-donate" href="https://secure.actblue.com/donate/votereeder" target="_blank">Donate ▸</a>
      <a class="nav-login" href="#" id="nav-auth-btn">Login / Sign Up</a>
      <div class="nav-acct" id="nav-account" style="display:none;">
        <div class="nav-bell" title="Notifications">🔔</div>
        <div class="avatar-wrap" title="Your profile" onclick="location.href='/profile.html'">
          <div class="av-ring"><div class="av-in" id="nav-avatar">KR</div></div>
          <div class="acct-meta">
            <span class="acct-name" id="nav-username">My Account</span>
            <span class="acct-score" id="nav-score">0 XP · Supporter</span>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  document.body.prepend(navEl);
} // end nav-injection guard (skipped when a .topbar already exists)

// ── MOBILE NAV HAMBURGER + DROPDOWN (added to whatever .topbar exists, every page) ──
(function(){
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;
  const host = topbar.querySelector('.nav-right') || topbar.querySelector('.nav-row') || topbar;

  const st = document.createElement('style');
  st.textContent = `
.nav-burger{display:none;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);color:#fff;font-size:20px;line-height:1;width:40px;height:40px;border-radius:8px;cursor:pointer;align-items:center;justify-content:center;flex-shrink:0;}
.nav-menu{position:fixed;top:54px;right:14px;z-index:3000;background:#111827;border:1px solid rgba(0,229,255,0.45);border-radius:12px;padding:8px;min-width:220px;box-shadow:0 14px 44px rgba(0,0,0,0.65);display:none;flex-direction:column;font-family:'Inter',sans-serif;}
.nav-menu.open{display:flex;}
.nav-menu a{display:block;padding:11px 14px;color:rgba(255,255,255,0.82);text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;}
.nav-menu a:hover{background:rgba(0,229,255,0.1);color:#00e5ff;}
.nav-menu .nm-donate{color:#ffd700;}
.nav-menu hr{border:none;border-top:1px solid rgba(255,255,255,0.08);margin:6px 4px;}
@media(max-width:900px){ .topbar .nav-links{display:none !important;} .nav-burger{display:flex;} }
`;
  document.head.appendChild(st);

  const burger = document.createElement('button');
  burger.className = 'nav-burger';
  burger.type = 'button';
  burger.setAttribute('aria-label','Open menu');
  burger.textContent = '☰';
  host.appendChild(burger);

  const menu = document.createElement('div');
  menu.className = 'nav-menu';
  menu.innerHTML = `
<a href="#" onclick="document.getElementById('auth-overlay').classList.add('open');this.closest('.nav-menu').classList.remove('open');return false;">🔑 Log In / Sign Up</a>
<hr>
<a href="/game.html">Dashboard</a>
<a href="/leaderboard.html">Leaderboard</a>
<a href="/guilds.html">Guilds</a>
<a href="/events.html">Events</a>
<a href="/learn.html">Learn</a>
<a href="/blog.html">Blog</a>
<a href="/about.html">About</a>
<a href="/how-to-play.html">How to Play</a>
<hr>
<a href="/volunteer.html">Join Campaign</a>
<a href="/contact.html">Contact Us</a>
<a class="nm-donate" href="https://secure.actblue.com/donate/votereeder" target="_blank">💛 Donate</a>`;
  document.body.appendChild(menu);

  burger.addEventListener('click', function(e){ e.stopPropagation(); menu.classList.toggle('open'); });
  document.addEventListener('click', function(e){ if(!menu.contains(e.target) && e.target !== burger) menu.classList.remove('open'); });
})();

// ── FOOTER (skip if the page already has its own <footer>) ──
if (!document.querySelector('footer')) {
const footerEl = document.createElement('footer');
footerEl.innerHTML = `
<div class="footer-logo">⚡ VoteReederXP</div>
<div class="footer-tag">Level Up Democracy · Texas House District 29 · Brazoria County</div>
<ul class="footer-links">
  <li><a href="index.html">Home</a></li>
  <li><a href="game.html">Missions</a></li>
  <li><a href="game.html#leaderboard">Leaderboard</a></li>
  <li><a href="game.html#guilds">Guilds</a></li>
  <li><a href="how-to-play.html">How to Play</a></li>
  <li><a href="/learn.html">Voting 101</a></li>
  <li><a href="volunteer.html">Join the Campaign</a></li>
  <li><a href="https://secure.actblue.com/donate/votereeder" target="_blank">Donate</a></li>
  <li><a href="about.html">Karen's Platform</a></li>
  <li><a href="contact.html">Contact Us</a></li>
</ul>
<div class="footer-copy">
  <div style="display:flex;justify-content:center;gap:1.5rem;margin:1.5rem 0;flex-wrap:wrap;">
    <a href="https://www.facebook.com/profile.php?id=61585655412560" target="_blank" style="color:#aaaacc;text-decoration:none;font-family:Rajdhani,sans-serif;font-size:.95rem;">📘 Facebook</a>
    <a href="https://www.instagram.com/electkarenreeder/" target="_blank" style="color:#aaaacc;text-decoration:none;font-family:Rajdhani,sans-serif;font-size:.95rem;">📸 Instagram</a>
    <a href="https://www.youtube.com/@electkarenreeder" target="_blank" style="color:#aaaacc;text-decoration:none;font-family:Rajdhani,sans-serif;font-size:.95rem;">▶️ YouTube</a>
    <a href="https://votereeder.substack.com" target="_blank" style="color:#aaaacc;text-decoration:none;font-family:Rajdhani,sans-serif;font-size:.95rem;">📬 Substack</a>
  </div>
  © 2026 Karen Reeder for Texas House District 29. Paid for by Karen Reeder Campaign.<br>
  VoteReederXP — "Earn XP. Build Change. Every Action Counts."<br>
  <span style="font-size:.85rem;">
    <a href="privacy.html" style="color:#aaaacc;text-decoration:none;font-family:Rajdhani,sans-serif;">Privacy Policy</a>
    &nbsp;·&nbsp;
    <a href="terms.html" style="color:#aaaacc;text-decoration:none;font-family:Rajdhani,sans-serif;">Terms of Use</a>
    &nbsp;·&nbsp;
    <a href="/learn.html" style="color:#aaaacc;text-decoration:none;font-family:Rajdhani,sans-serif;">Voting 101</a>
  </span>
</div>`;

// Inject self-contained footer CSS (mirrors navStyle) so the injected footer is
// styled on every page even when style.css doesn't load. Brand colors hardcoded.
const footerStyle = document.createElement('style');
footerStyle.textContent = `
footer{border-top:1px solid rgba(0,240,255,0.20);padding:46px 24px 40px;text-align:center;background:rgba(5,1,15,0.72);position:relative;z-index:3;font-family:'Exo 2','Inter',sans-serif;}
footer .footer-logo{font-family:'Orbitron',sans-serif;font-size:20px;font-weight:900;letter-spacing:1px;background:linear-gradient(90deg,#00e5ff,#bf00ff,#ff0080);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px;}
footer .footer-tag{font-family:'Orbitron',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.60);margin-bottom:22px;}
footer .footer-links{display:flex;flex-wrap:wrap;justify-content:center;gap:14px 22px;list-style:none;padding:0;margin:0 0 22px;}
footer .footer-links li{list-style:none;}
footer .footer-links a{font-family:'Rajdhani',sans-serif;font-weight:600;font-size:14px;color:rgba(255,255,255,0.70);text-decoration:none;}
footer .footer-links a:hover{color:#00e5ff;}
footer .footer-copy{font-family:'Rajdhani',sans-serif;font-size:13px;color:rgba(255,255,255,0.60);line-height:1.8;}
footer .footer-copy a{color:#00e5ff;text-decoration:none;}
footer .footer-copy a:hover{text-decoration:underline;}
`;
document.head.appendChild(footerStyle);

// On the fixed-viewport dashboard app-shell (game.html) the whole .layout is
// position:fixed with html/body overflow:hidden, so a footer appended to <body>
// lands at the document origin and overlaps the panels. Drop it at the end of the
// scrollable main column instead, so it sits at the BOTTOM (below the board) and
// scrolls into view rather than covering the dashboard.
const dashMain = document.querySelector('.layout .main .main-inner');
if (dashMain) {
  footerEl.style.marginTop = '24px';
  dashMain.appendChild(footerEl);
} else {
  document.body.appendChild(footerEl);
}
} // end footer guard (skipped when the page already has its own <footer>)

// ── AUTH MODAL ───────────────────────────────────────────
const authEl = document.createElement('div');
authEl.id = 'auth-overlay';
authEl.className = 'auth-overlay';
authEl.innerHTML = `
<div style="padding:2rem 0;">
  <div class="auth-box">
    <button onclick="document.getElementById('auth-overlay').classList.remove('open')"
      style="position:absolute;top:.75rem;right:.9rem;background:none;border:none;color:#aaaacc;font-size:1.4rem;cursor:pointer;">✕</button>
    <div class="auth-title" id="auth-modal-title">Welcome Back</div>
    <div class="auth-sub" id="auth-modal-sub">Log in to your VoteReederXP account</div>

    <div id="social-login-section" style="display:flex;flex-direction:column;gap:.6rem;margin-bottom:1.25rem;">
      <button onclick="signInWithGoogle()" style="width:100%;display:flex;align-items:center;justify-content:center;gap:.75rem;padding:.75rem;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:var(--text-primary);font-family:var(--font-ui);font-size:.95rem;font-weight:600;cursor:pointer;transition:all .2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">
        <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/><path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/><path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/><path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/></svg>
        Continue with Google
      </button>
      <button onclick="signInWithFacebook()" style="width:100%;display:flex;align-items:center;justify-content:center;gap:.75rem;padding:.75rem;border-radius:8px;border:1px solid rgba(24,119,242,0.4);background:rgba(24,119,242,0.1);color:#4a9fff;font-family:var(--font-ui);font-size:.95rem;font-weight:600;cursor:pointer;transition:all .2s;" onmouseover="this.style.background='rgba(24,119,242,0.2)'" onmouseout="this.style.background='rgba(24,119,242,0.1)'">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        Continue with Facebook
      </button>
    </div>

    <div id="social-divider" style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;">
      <div style="flex:1;height:1px;background:rgba(255,255,255,0.1);"></div>
      <span style="font-family:var(--font-ui);font-size:.8rem;color:var(--text-dim);">or use email</span>
      <div style="flex:1;height:1px;background:rgba(255,255,255,0.1);"></div>
    </div>

    <!-- LOGIN ONLY — new accounts go through volunteer/register page -->
    <form class="auth-form active" id="form-login" onsubmit="handleLogin(event)">
      <div class="form-group"><label>Email</label><input type="email" id="login-email" placeholder="you@example.com" required></div>
      <div class="form-group"><label>Password</label><input type="password" id="login-password" placeholder="Your password" required></div>
      <span class="forgot-link" onclick="showResetForm()">Forgot password?</span>
      <button type="submit" class="form-submit" id="login-btn">Log In</button>
      <div class="auth-msg" id="login-msg"></div>
      <div style="text-align:center;margin-top:1rem;font-family:var(--font-ui);font-size:.85rem;color:var(--text-dim);">
        New here? <a href="volunteer.html" style="color:var(--neon-blue);">Join the campaign →</a>
      </div>
    </form>

    <div id="form-reset" style="display:none;">
      <div class="back-to-login" onclick="hideResetForm()">← Back to Login</div>
      <div style="font-family:'Orbitron',monospace;font-size:.9rem;font-weight:700;margin-bottom:.5rem;">Reset Password</div>
      <div style="color:var(--dim);font-size:.85rem;margin-bottom:1.5rem;">Enter your email and we'll send a reset link.</div>
      <div class="form-group"><label>Email</label><input type="email" id="reset-email" placeholder="you@example.com"></div>
      <button class="form-submit" onclick="handlePasswordReset()">Send Reset Link</button>
      <div class="auth-msg" id="reset-msg"></div>
    </div>

    <div id="form-new-password" style="display:none;">
      <div style="font-family:'Orbitron',monospace;font-size:.9rem;font-weight:700;margin-bottom:.5rem;color:var(--neon-blue);">🔐 Set New Password</div>
      <div style="color:var(--dim);font-size:.85rem;margin-bottom:1.5rem;">Choose a strong new password for your account.</div>
      <div class="form-group">
        <label>New Password</label>
        <input type="password" id="new-password" placeholder="Create a strong password" required minlength="8"
          oninput="checkPasswordStrength2(this.value);document.getElementById('pw-requirements2').style.display='block'">
        <div class="pw-requirements" id="pw-requirements2" style="display:none;">
          <ul class="pw-req-list">
            <li class="pw-req-item" id="req2-length">At least 8 characters</li>
            <li class="pw-req-item" id="req2-upper">One uppercase letter (A-Z)</li>
            <li class="pw-req-item" id="req2-lower">One lowercase letter (a-z)</li>
            <li class="pw-req-item" id="req2-number">One number (0-9)</li>
            <li class="pw-req-item" id="req2-special">One special character (!@#$%^&*)</li>
          </ul>
        </div>
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
        <input type="password" id="new-password-confirm" placeholder="Repeat your password" required minlength="8">
      </div>
      <button class="form-submit" id="new-password-btn" onclick="handleSetNewPassword()">Set New Password</button>
      <div class="auth-msg" id="new-password-msg"></div>
    </div>
  </div>
</div>`;

// Inject self-contained auth-modal CSS (mirrors navStyle) so the login pop-up
// is styled on every page even when style.css doesn't load. Scoped to #auth-overlay.
const authStyle = document.createElement('style');
authStyle.textContent = `
#auth-overlay.auth-overlay{
  --text-primary:#fff; --text-dim:rgba(255,255,255,.72); --dim:rgba(255,255,255,.6);
  --neon-blue:#00f0ff; --neon-pink:#ff00aa; --neon-purple:#bf00ff;
  --font-ui:'Rajdhani','Inter',sans-serif;
  position:fixed; inset:0; z-index:5000; display:none;
  align-items:flex-start; justify-content:center;
  background:rgba(3,1,12,0.80); backdrop-filter:blur(6px);
  overflow-y:auto; padding:0 16px;
  font-family:'Exo 2','Inter',sans-serif;
}
#auth-overlay.auth-overlay.open{display:flex;}
#auth-overlay .auth-box{
  position:relative; width:100%; max-width:420px; margin:auto;
  background:linear-gradient(180deg, rgba(18,10,48,0.97), rgba(8,4,22,0.98));
  border:1px solid rgba(0,240,255,0.25); border-radius:18px;
  padding:2.2rem 1.8rem 1.8rem;
  box-shadow:0 30px 80px rgba(0,0,0,0.6), 0 0 50px rgba(0,240,255,0.10);
}
#auth-overlay .auth-title{font-family:'Orbitron',sans-serif;font-size:1.5rem;font-weight:900;color:#fff;text-align:center;margin-bottom:.35rem;}
#auth-overlay .auth-sub{font-family:var(--font-ui);font-size:.95rem;color:var(--text-dim);text-align:center;margin-bottom:1.5rem;}
#auth-overlay .auth-form{display:none;flex-direction:column;}
#auth-overlay .auth-form.active{display:flex;}
#auth-overlay .form-group{margin-bottom:1rem;display:flex;flex-direction:column;gap:.35rem;}
#auth-overlay .form-group label{font-family:var(--font-ui);font-size:.85rem;font-weight:600;color:var(--neon-blue);letter-spacing:.03em;}
#auth-overlay input{width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(0,240,255,0.25);border-radius:9px;padding:.72rem 1rem;color:#fff;font-family:var(--font-ui);font-size:.95rem;outline:none;transition:border-color .2s, box-shadow .2s;}
#auth-overlay input::placeholder{color:rgba(255,255,255,0.32);}
#auth-overlay input:focus{border-color:var(--neon-blue);box-shadow:0 0 0 3px rgba(0,240,255,0.10);}
#auth-overlay .forgot-link{font-family:var(--font-ui);font-size:.85rem;color:var(--neon-blue);cursor:pointer;align-self:flex-end;margin:-.15rem 0 .9rem;}
#auth-overlay .forgot-link:hover{text-decoration:underline;}
#auth-overlay .form-submit{width:100%;font-family:var(--font-ui);font-weight:700;font-size:1rem;letter-spacing:.04em;text-transform:uppercase;color:#04121a;background:linear-gradient(135deg,var(--neon-blue),var(--neon-purple));border:none;border-radius:9px;padding:.85rem;cursor:pointer;transition:.2s;box-shadow:0 0 18px rgba(0,240,255,0.2);}
#auth-overlay .form-submit:hover{transform:translateY(-1px);filter:brightness(1.05);}
#auth-overlay .form-submit:disabled{opacity:.5;cursor:not-allowed;transform:none;}
#auth-overlay .auth-msg{text-align:center;font-family:var(--font-ui);font-size:.9rem;margin-top:.75rem;min-height:1.2em;}
#auth-overlay .auth-msg.success{color:#00ff88;}
#auth-overlay .auth-msg.error{color:#ff6a6a;}
#auth-overlay .back-to-login{font-family:var(--font-ui);font-size:.88rem;color:var(--neon-blue);cursor:pointer;margin-bottom:1rem;display:inline-block;}
#auth-overlay .back-to-login:hover{text-decoration:underline;}
#auth-overlay .pw-requirements{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:.7rem 1rem;margin-top:.5rem;}
#auth-overlay .pw-req-list{list-style:none;padding:0;margin:0;}
#auth-overlay .pw-req-item{font-family:var(--font-ui);font-size:.82rem;color:#ff6a6a;padding:.12rem 0;}
#auth-overlay .pw-req-item::before{content:'✗ ';}
#auth-overlay .pw-req-item.met{color:#00ff88;}
#auth-overlay .pw-req-item.met::before{content:'✓ ';}
@media(max-width:480px){
  #auth-overlay .auth-box{padding:1.8rem 1.2rem 1.4rem;}
  #auth-overlay .auth-title{font-size:1.3rem;}
}
`;
document.head.appendChild(authStyle);

document.body.appendChild(authEl);

// close on background click
authEl.addEventListener('click', e => { if (e.target === authEl) authEl.classList.remove('open'); });

// Land /index.html?login=1 (e.g. redirect from a gated page like game.html) on the
// login pop-up so logged-out users get an immediate prompt to log in or join.
if (/[?&]login=1/.test(location.search)) {
  authEl.classList.add('open');
}

// Nav auth button — opens login modal. Guard: it doesn't exist on pages whose own
// .topbar suppressed the injected nav, and this runs BEFORE window.sb is created,
// so a null here would abort the whole script (and window.sb would never load).
const _navAuthBtn = document.getElementById('nav-auth-btn');
if (_navAuthBtn) _navAuthBtn.addEventListener('click', e => {
  e.preventDefault();
  authEl.classList.add('open');
});

// ── NAV TOGGLE ───────────────────────────────────────────
window.toggleNav = function() {
  document.getElementById('nav-links-list').classList.toggle('open');
};

// ── SUPABASE ─────────────────────────────────────────────
const sbScript = document.createElement('script');
sbScript.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
sbScript.onload = () => {
  window.sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  checkForRecoveryToken();

  // Rank thresholds — identical to game.html's dashboard so the nav number matches.
  function rankFromXp(xp){xp=xp||0;return xp>=2500?'Champion':xp>=2000?'Catalyst':xp>=1500?'Builder':xp>=1000?'Advocate':xp>=500?'Organizer':'Supporter';}
  function navInitials(name){if(!name)return'KR';const p=String(name).trim().split(/\s+/);return (p.length<2?p[0].slice(0,2):(p[0][0]+p[1][0])).toUpperCase();}

  window.sb.auth.onAuthStateChange(async (event, session) => {
    const authBtn = document.getElementById('nav-auth-btn');
    const acct    = document.getElementById('nav-account');

    if (session && session.user) {
      const user = session.user;
      const metaName = user.user_metadata?.username || user.user_metadata?.full_name || null;

      // OAuth user without a username yet → prompt for one first
      if (!metaName && event === 'SIGNED_IN') { showUsernamePrompt(user); return; }

      // Logged-in: show the account cluster (bell + avatar + score), hide the login
      // link. The gold Donate button stays visible in BOTH states.
      if (authBtn) authBtn.style.display = 'none';
      if (acct) acct.style.display = 'flex';

      // Load profile OUTSIDE the auth callback. Supabase holds the auth lock during
      // onAuthStateChange; awaiting a token-bearing query here deadlocks on
      // TOKEN_REFRESHED and freezes later requests. setTimeout(0) runs it after release.
      const _uid = user.id;
      setTimeout(async () => {
        try {
          const { data: p } = await window.sb.from('profiles')
            .select('username, avatar, xp_score, guild, onboarded').eq('id', _uid).maybeSingle();
          // ── ONBOARDING GATE ── un-onboarded accounts may browse public pages, but the
          // gated app pages route them to finish the volunteer form first. (register2 is
          // never in this list — it IS the form, so gating it would loop.)
          const GATED_PAGES = ['game.html','leaderboard.html','guilds.html','events.html','profile.html'];
          if ((!p || !p.onboarded) && GATED_PAGES.includes(page)) {
            window.location.replace('/register2.html?finish=1');
            return;
          }
          const name = (p && p.username) || metaName || 'My Account';
          const xp   = (p && p.xp_score) || 0;            // xp_score — same column the dashboard reads
          const nm = document.getElementById('nav-username'); if (nm) nm.textContent = name;
          const sc = document.getElementById('nav-score');    if (sc) sc.textContent = xp.toLocaleString() + ' XP · ' + rankFromXp(xp);
          const av = document.getElementById('nav-avatar');
          if (av) {
            // profiles.avatar holds a full path (images/avatars/…png) saved by the
            // register/profile flows — use it as-is; fall back to initials if empty.
            if (p && p.avatar) av.innerHTML = '<img src="' + p.avatar + '" alt="' + name + '">';
            else av.textContent = navInitials(name);
          }
        } catch(e) {}
      }, 0);

    } else {
      // Logged-out: hide the account cluster, show Login / Sign Up (Donate stays visible)
      if (acct) acct.style.display = 'none';
      if (authBtn) {
        authBtn.style.display = '';
        authBtn.textContent = 'Login / Sign Up';
        authBtn.style.color = '';
        authBtn.onclick = (e) => { e.preventDefault(); document.getElementById('auth-overlay').classList.add('open'); };
      }
    }
  });
};

  // ── VOLUNTEER COUNTER (for volunteer.html tracker) ────────────
  // Fetches count via proxy to avoid Google Sheets CORS issues
  if (page === 'volunteer.html') {
    fetch('/.netlify/functions/sheets-proxy?gid=538338089')
      .then(r => r.text())
      .then(text => {
        const lines = text.trim().split('\n');
        const cols = lines[1] ? lines[1].split(',') : [];
        const count = parseInt(cols[1]) || 0;
        const goal  = parseInt(cols[2]) || 1000;
        const el    = document.getElementById('vol-count');
        const bar   = document.getElementById('vol-bar');
        const pct   = document.getElementById('vol-pct');
        const goalEl= document.getElementById('vol-goal');
        if (el)    el.textContent    = count.toLocaleString();
        if (goalEl) goalEl.textContent = goal.toLocaleString();
        if (bar)   bar.style.width   = Math.min((count/goal)*100, 100).toFixed(1) + '%';
        if (pct)   pct.textContent   = ((count/goal)*100).toFixed(1) + '% to goal';
      })
      .catch(() => {});
  }

document.head.appendChild(sbScript);

// ── USERNAME PROMPT FOR OAUTH USERS ─────────────────────
function showUsernamePrompt(user) {
  const overlay = document.getElementById('auth-overlay');
  overlay.classList.add('open');
  document.getElementById('social-login-section').style.display = 'none';
  document.getElementById('social-divider').style.display = 'none';
  document.getElementById('form-login').classList.remove('active');
  document.getElementById('form-reset').style.display = 'none';
  document.getElementById('form-new-password').style.display = 'none';
  document.getElementById('auth-modal-title').textContent = 'One Last Step!';
  document.getElementById('auth-modal-sub').textContent = 'Choose your VoteReederXP username';

  let promptDiv = document.getElementById('form-username-prompt');
  if (!promptDiv) {
    promptDiv = document.createElement('div');
    promptDiv.id = 'form-username-prompt';
    promptDiv.innerHTML = `
      <div style="font-size:.85rem;color:var(--dim);margin-bottom:1rem;">
        Welcome! You're signed in as <strong style="color:var(--neon-blue)">${user.email}</strong>.<br>
        Pick a username — this is your public civic identity.
      </div>
      <div class="form-group">
        <label>Username <span style="color:var(--neon-pink)">*</span></label>
        <input type="text" id="prompt-username" placeholder="e.g. TexasTechVoter" maxlength="30" oninput="checkUsernamePrompt(this.value)">
        <div style="font-size:.78rem;color:var(--text-dim);margin-top:.35rem;">🛡️ Do NOT use your real name. Choose an alias.</div>
        <div id="prompt-username-msg" style="font-size:.8rem;margin-top:.3rem;min-height:1.1em;"></div>
      </div>
      <button class="form-submit" id="prompt-username-btn" onclick="saveOAuthUsername()">Save Username & Enter</button>
      <div class="auth-msg" id="prompt-username-result"></div>`;
    document.querySelector('#auth-overlay .auth-box').appendChild(promptDiv);
  }
  promptDiv.style.display = 'block';
}

window.checkUsernamePrompt = function(val) {
  const msg = document.getElementById('prompt-username-msg');
  if (!val) { msg.textContent = ''; return; }
  if (val.length < 3) { msg.style.color='#ff4444'; msg.textContent='Too short'; return; }
  if (!/^[a-zA-Z0-9_]+$/.test(val)) { msg.style.color='#ff4444'; msg.textContent='Letters, numbers, underscores only'; return; }
  msg.style.color='#00ff88'; msg.textContent='✓ Available!';
};

window.saveOAuthUsername = async function() {
  const username = document.getElementById('prompt-username').value.trim();
  const btn      = document.getElementById('prompt-username-btn');
  const result   = document.getElementById('prompt-username-result');
  if (username.length < 3) { result.className='auth-msg error'; result.textContent='✗ Username too short.'; return; }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) { result.className='auth-msg error'; result.textContent='✗ Letters, numbers, underscores only.'; return; }
  btn.disabled=true; btn.textContent='Saving...';
  try {
    const {error} = await window.sb.auth.updateUser({data:{username}});
    if (error) throw error;
    result.className='auth-msg success'; result.textContent='✓ Username set! Welcome to VoteReederXP!';
    const authBtn = document.getElementById('nav-auth-btn');
    if (authBtn) { authBtn.textContent='👤 '+username; authBtn.style.color='#00ff88'; }
    setTimeout(() => {
      document.getElementById('auth-overlay').classList.remove('open');
      window.location.href = 'index.html';
    }, 1200);
  } catch(err) {
    result.className='auth-msg error'; result.textContent='✗ '+err.message;
    btn.disabled=false; btn.textContent='Save Username & Enter';
  }
};

// ── PASSWORD RECOVERY ────────────────────────────────────
function checkForRecoveryToken() {
  const hash = window.location.hash;
  if (!hash) return;
  const params = new URLSearchParams(hash.replace('#',''));
  if (params.get('type') === 'recovery' && params.get('access_token')) {
    window.sb.auth.setSession({
      access_token: params.get('access_token'),
      refresh_token: params.get('refresh_token') || ''
    }).then(() => {
      showNewPasswordForm();
      history.replaceState(null, '', window.location.pathname);
    });
  }
}

function showNewPasswordForm() {
  const overlay = document.getElementById('auth-overlay');
  overlay.classList.add('open');
  document.getElementById('social-login-section').style.display = 'none';
  document.getElementById('social-divider').style.display = 'none';
  document.getElementById('form-login').classList.remove('active');
  document.getElementById('form-reset').style.display = 'none';
  document.getElementById('auth-modal-title').textContent = 'Reset Your Password';
  document.getElementById('auth-modal-sub').textContent = 'Almost there — choose a new password';
  document.getElementById('form-new-password').style.display = 'block';
}

// ── AUTH FUNCTIONS ────────────────────────────────────────
window.signInWithGoogle = async function() {
  if (!window.sb) return;
  await window.sb.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/game.html',
      queryParams: { prompt: 'select_account' }   // always show the account picker (no silent re-login)
    }
  });
};

window.signInWithFacebook = async function() {
  if (!window.sb) return;
  await window.sb.auth.signInWithOAuth({
    provider: 'facebook',
    options: { redirectTo: window.location.origin + '/game.html' }
  });
};

window.showResetForm = function() {
  document.getElementById('form-login').classList.remove('active');
  document.getElementById('form-reset').style.display = 'block';
};

window.hideResetForm = function() {
  document.getElementById('form-reset').style.display = 'none';
  document.getElementById('form-login').classList.add('active');
};

window.handleLogin = async function(e) {
  e.preventDefault();
  const email    = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const btn      = document.getElementById('login-btn');
  const msg      = document.getElementById('login-msg');
  btn.disabled=true; btn.textContent='Logging In...';
  try {
    if (!window.sb) throw new Error('Auth loading, please try again');
    const {error} = await window.sb.auth.signInWithPassword({email, password});
    if (error) throw error;
    msg.className='auth-msg success'; msg.textContent='✓ Welcome back!';
    setTimeout(() => {
      document.getElementById('auth-overlay').classList.remove('open');
      window.location.href = 'index.html';
    }, 800);
  } catch(err) {
    msg.className='auth-msg error'; msg.textContent='✗ '+err.message;
  } finally {
    btn.disabled=false; btn.textContent='Log In';
  }
};

window.handlePasswordReset = async function() {
  const email = document.getElementById('reset-email').value.trim();
  const msg   = document.getElementById('reset-msg');
  if (!email) { msg.className='auth-msg error'; msg.textContent='✗ Please enter your email.'; return; }
  try {
    const {error} = await window.sb.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/game.html'
    });
    if (error) throw error;
    msg.className='auth-msg success'; msg.textContent='✓ Reset link sent! Check your email.';
  } catch(err) {
    msg.className='auth-msg error'; msg.textContent='✗ '+err.message;
  }
};

window.checkPasswordStrength2 = function(pw) {
  const set = (id,met) => { const el=document.getElementById(id); if(el) el.classList.toggle('met',met); };
  set('req2-length', pw.length>=8);
  set('req2-upper',  /[A-Z]/.test(pw));
  set('req2-lower',  /[a-z]/.test(pw));
  set('req2-number', /[0-9]/.test(pw));
  set('req2-special',/[^a-zA-Z0-9]/.test(pw));
};

window.isPasswordStrong = function(pw) {
  return pw.length>=8 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw) && /[^a-zA-Z0-9]/.test(pw);
};

window.handleSetNewPassword = async function() {
  const pw      = document.getElementById('new-password').value;
  const confirm = document.getElementById('new-password-confirm').value;
  const btn     = document.getElementById('new-password-btn');
  const msg     = document.getElementById('new-password-msg');
  if (!isPasswordStrong(pw)) { msg.className='auth-msg error'; msg.textContent='✗ Password must meet all requirements.'; return; }
  if (pw !== confirm) { msg.className='auth-msg error'; msg.textContent='✗ Passwords do not match.'; return; }
  btn.disabled=true; btn.textContent='Saving...';
  try {
    const {error} = await window.sb.auth.updateUser({password:pw});
    if (error) throw error;
    msg.className='auth-msg success'; msg.textContent='✓ Password updated! Redirecting...';
    setTimeout(() => { window.location.href='index.html'; }, 1500);
  } catch(err) {
    msg.className='auth-msg error'; msg.textContent='✗ '+err.message;
    btn.disabled=false; btn.textContent='Set New Password';
  }
};

// Expose auth trigger for other pages
window.openAuthModal = function() {
  document.getElementById('auth-overlay').classList.add('open');
};

// ── FACEBOOK PIXEL ───────────────────────────────────────
(function(f,b,e,v,n,t,s){
  if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)
})(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','2119498482334653');
fbq('track','PageView');
// noscript fallback
const fbNoscript = document.createElement('noscript');
fbNoscript.innerHTML = '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2119498482334653&ev=PageView&noscript=1"/>';
document.body.appendChild(fbNoscript);

})();
