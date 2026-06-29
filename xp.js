/* ============================================================
   VoteReederXP — xp.js
   Shared XP + mission functions used across all pages
   NOTE: Does NOT declare SUPABASE_URL/KEY — uses window globals
   set by each page or shared.js to avoid const redeclaration errors
============================================================ */

const _SB_URL = 'https://ljxvkdslqxmmedfhrwgu.supabase.co';
const _SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeHZrZHNscXhtbWVkZmhyd2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NTU0ODQsImV4cCI6MjA5NTMzMTQ4NH0.nUCmAINQ1yL_XdDX9rNBl0gadjyP0ON9rWvb3Tarut4';

// Award XP via Supabase RPC
window.awardXP = async function(action, category, amount) {
  try {
    if (!window.sb) { console.warn('Supabase not ready'); return; }
    const { data: { user } } = await window.sb.auth.getUser();
    if (!user) { console.warn('No user logged in'); return; }

    const { error } = await window.sb.rpc('award_xp', {
      p_user_id: user.id,
      p_action: action,
      p_category: category,
      p_amount: amount
    });

    if (error) { console.error('award_xp error:', error); return; }

    // Refresh XP display
    const { data: profile } = await window.sb
      .from('profiles')
      .select('xp_score')
      .eq('id', user.id)
      .single();

    if (profile) {
      const statXp  = document.getElementById('stat-xp');
      const xpLabel = document.getElementById('xp-current-label');
      const navXp   = document.getElementById('nav-xp-display');
      if (statXp)  statXp.textContent  = profile.xp_score.toLocaleString();
      if (xpLabel) xpLabel.textContent = profile.xp_score.toLocaleString() + ' XP';
      if (navXp)   navXp.textContent   = '⚡ ' + profile.xp_score.toLocaleString() + ' XP';

      // Flash green to confirm XP awarded
      if (statXp) {
        statXp.style.color = '#00ff88';
        setTimeout(() => { statXp.style.color = ''; }, 2000);
      }
    }

    console.log(`✅ +${amount} XP awarded for: ${action}`);
  } catch(e) { console.error('XP award failed:', e); }
};

// Convenience wrappers for specific XP types
window.awardVideoXP = function(lessonTitle) {
  return window.awardXP(lessonTitle, 'Learning', 100);
};

window.awardQuizXP = function(lessonTitle) {
  return window.awardXP(lessonTitle + ' Quiz', 'Learning', 150);
};

window.awardContactXP = function() {
  return window.awardXP('Contact Form Submission', 'Volunteer', 50);
};

// Join a mission from any page — saves to user_missions as in_progress
// then redirects to game.html
window.joinMission = async function(action, category, xp, icon, verification) {
  function showLoginPrompt() {
    const modal = document.getElementById('auth-overlay');
    const title = document.getElementById('auth-modal-title');
    const sub   = document.getElementById('auth-modal-sub');
    if (modal) {
      if (title) title.textContent = '⚡ Join the Game!';
      if (sub)   sub.textContent   = 'Create a free account to start earning XP and make a real difference in District 29!';
      modal.classList.add('open');
    } else {
      window.location.href = '/register2.html';
    }
  }

  if (!window.sb) { showLoginPrompt(); return; }
  const { data: { user } } = await window.sb.auth.getUser();
  if (!user) { showLoginPrompt(); return; }

  try {
    // Check if already in progress
    const res = await fetch(
      `${_SB_URL}/rest/v1/user_missions?user_id=eq.${user.id}&action=eq.${encodeURIComponent(action)}&status=eq.in_progress`,
      { headers: { 'apikey': _SB_KEY, 'Authorization': 'Bearer ' + _SB_KEY } }
    );
    const existing = await res.json();

    if (existing && existing.length > 0) {
      window.location.href = 'game.html';
      return;
    }

    // Save as in_progress
    await fetch(`${_SB_URL}/rest/v1/user_missions`, {
      method: 'POST',
      headers: {
        'apikey': _SB_KEY,
        'Authorization': 'Bearer ' + _SB_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        user_id: user.id,
        action,
        category,
        xp_amount: xp,
        status: 'in_progress'
      })
    });

    window.location.href = 'game.html';
  } catch(e) {
    console.error('joinMission failed:', e);
    window.location.href = 'game.html';
  }
};
