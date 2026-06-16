// Netlify serverless function — proxies any published Google Sheet CSV tab
// Usage: /.netlify/functions/sheets-proxy?gid=0
// Supports all tabs in the VoteReederXP workbook

const BASE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSWflC-rX01G1bhMdahO-tCzkuDRjDmjouukJzC1AyVBPeEVnQmbDIDmGOBAkKUPDnZp-Xo-K1FJd7m/pub';

// Allowed GIDs to prevent abuse
const ALLOWED_GIDS = [
  '0',           // Events
  '95972679',    // Lessons
  '538338089',   // Config / Volunteer Count
  '1810466887',  // Game
  '114264924',   // Rank
  '15253665',    // Fun missions
];

exports.handler = async function(event) {
  const gid = event.queryStringParameters?.gid || '0';

  if (!ALLOWED_GIDS.includes(gid)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid gid' }) };
  }

  const csvUrl = `${BASE_URL}?gid=${gid}&single=true&output=csv`;

  try {
    const response = await fetch(csvUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VoteReederXP/1.0)',
        'Accept': 'text/csv,text/plain,*/*'
      }
    });

    if (!response.ok) {
      return { statusCode: response.status, body: JSON.stringify({ error: 'Sheet fetch failed: ' + response.status }) };
    }

    const csv = await response.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300' // 5 min cache
      },
      body: csv
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
