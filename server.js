// server.js
const express = require('express');
const util = require('minecraft-server-util');

const app = express();
const HOST = '91.197.5.218';
const PORT = 27390;

app.get('/status', async (req, res) => {
  try {
    const result = await util.status(HOST, PORT, { timeout: 5000 });
    res.json({
      online: true,
      motd: result.motd?.clean || result.motd?.raw || "—",
      version: result.version?.name || "—",
      players: result.players,
    });
  } catch (e) {
    res.json({ online: false });
  }
});

app.listen(3000, () => {
  console.log('✅ Proxy en ligne sur http://localhost:3000/status');
});
