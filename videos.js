/* ============================================================
   VoteReederXP — videos.js
   Loads YouTube video links from the Site Videos sheet column F
   Column E = Page name, Column F = YouTube URL
   Pages: Voting 101, Gallery, Learn & Earn, Learn 1-10
============================================================ */

const VIDEOS_CSV = 'https://api.allorigins.win/raw?url=https://docs.google.com/spreadsheets/d/e/2PACX-1vSWflC-rX01G1bhMdahO-tCzkuDRjDmjouukJzC1AyVBPeEVnQmbDIDmGOBAkKUPDnZp-Xo-K1FJd7m/pub?gid=538338089';

function extractYouTubeID(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : (url.length === 11 ? url : null);
}

async function loadVideos() {
  try {
    const res = await fetch(VIDEOS_CSV);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const text = await res.text();
    const lines = text.trim().split('\n').slice(1); // skip header row
    window.siteVideos = {};
    lines.forEach(line => {
      const cols = []; let cur = '', inQ = false;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') inQ = !inQ;
        else if (line[i] === ',' && !inQ) { cols.push(cur); cur = ''; }
        else cur += line[i];
      }
      cols.push(cur);
      const page = (cols[4] || '').replace(/^"|"$/g,'').trim(); // column E
      const link = (cols[5] || '').replace(/^"|"$/g,'').trim(); // column F
      if (page) window.siteVideos[page] = extractYouTubeID(link);
    });
  } catch(err) {
    window.siteVideos = {};
    console.warn('Could not load video links:', err);
  }
}

function renderVideo(containerId, videoKey, fallbackText) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const videoId = window.siteVideos && window.siteVideos[videoKey];
  if (videoId) {
    container.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"></iframe>`;
  } else {
    container.innerHTML = `
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;background:rgba(10,5,30,0.9);">
        <div style="font-size:3rem;">🎬</div>
        <div style="font-family:var(--font-display);font-size:.8rem;color:var(--text-dim);letter-spacing:.15em;text-align:center;">${fallbackText}</div>
      </div>`;
  }
}
