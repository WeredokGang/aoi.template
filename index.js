const {AoiClient} = require("aoi.js");
const bot = new AoiClient({
  token: "DISCORD BOT TOKEN",
  prefix: ["!", "?"],
  intents: ["guilds", "guildMessages"],
  mobilePlatform: false,
});

bot.onMessage();

bot.command({
  name: "ping",
  code: `Pong! $pingms`
})
