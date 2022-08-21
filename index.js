const {AoiClient} = require("aoi.js");
const bot = new AoiClient({
  token: "DISCORD BOT TOKEN",
  prefix: ["!", "?"],
  intents: ["guilds", "guildMessages"],
  mobilePlatform: false,
});

bot.onMessage();

bot.command({
  name: "bot",
  code: `
  
  
  $addField[1;Стартер AoiClient;**Автор**: $getsssSSS|
  $title[Информация о боте $userTag[$clientID]]
  $createObject[$readFile[package.json]]`
})
