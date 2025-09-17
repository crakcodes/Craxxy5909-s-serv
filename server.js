// server.js
const express = require('express');
const util = require('minecraft-server-util');

const app = express();
const PORT = process.env.PORT || 3000;

// Ton serveur Minecraft moddé
const HOST = '91.197.5.218';
const MC_PORT = 27390;

app.get('/status', async (req, res) => {
  try {
    const result = await util.status(HOST, MC_PORT, { timeout: 5000 });
    res.json({
      online: true,
      motd: result.motd?.clean || result.motd?.raw || "—",
      version: result.version?.name || "—",
      players: result.players
    });
  } catch (err) {
    res.json({ online: false });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy Minecraft en ligne sur le port ${PORT}`);
});
