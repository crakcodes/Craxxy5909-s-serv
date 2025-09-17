const express = require('express');
const util = require('minecraft-server-util');
const cors = require('cors');

const app = express();
app.use(cors()); // autorise toutes les requêtes cross-origin

const PORT = process.env.PORT || 3000;
const HOST = '91.197.5.218';
const MC_PORT = 27390;

app.get('/status', async (req, res) => {
  try {
    const result = await util.status(HOST, MC_PORT, { timeout: 5000 });

    // Sanitize MOTD et version
    const motd = result.motd?.clean || result.motd?.raw || "—";
    const version = result.version?.name || "—";

    // Sanitize joueurs
    const players = {
      online: result.players.online,
      max: result.players.max,
      sample: Array.isArray(result.players.sample)
        ? result.players.sample.map(p => ({ name: String(p.name) })) 
        : []
    };

    res.json({
      online: true,
      motd: String(motd),
      version: String(version),
      players
    });

  } catch (err) {
    res.json({ 
      online: false,
      motd: "—",
      version: "—",
      players: { online: 0, max: 0, sample: [] }
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy Minecraft en ligne sur le port ${PORT}`);
});
