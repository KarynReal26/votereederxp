#!/bin/bash
# VoteReederXP — Apply Google Sheets proxy patches
# Run this from your site root directory

PROXY="/.netlify/functions/sheets-proxy"
BASE="https://docs.google.com/spreadsheets/d/e/2PACX-1vSWflC-rX01G1bhMdahO-tCzkuDRjDmjouukJzC1AyVBPeEVnQmbDIDmGOBAkKUPDnZp-Xo-K1FJd7m/pub"

# learn.html
sed -i "s|$BASE?gid=95972679&single=true&output=csv|$PROXY?gid=95972679|g" learn.html && echo "✓ learn.html patched"

# game.html  
sed -i "s|$BASE?gid=114264924&single=true&output=csv|$PROXY?gid=114264924|g" game.html
sed -i "s|$BASE?gid=1810466887&single=true&output=csv|$PROXY?gid=1810466887|g" game.html
sed -i "s|$BASE?gid=15253665&single=true&output=csv|$PROXY?gid=15253665|g" game.html
sed -i "s|$BASE?gid=0&single=true&output=csv|$PROXY?gid=0|g" game.html && echo "✓ game.html patched"

# events.html (already done but just in case)
sed -i "s|$BASE?gid=0&single=true&output=csv|$PROXY?gid=0|g" events.html && echo "✓ events.html patched"

echo "All patches applied!"
