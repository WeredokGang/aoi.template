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
  
  $addField[1;Система;**Оперативная память**: \`$ram\ MB` / \`$maxRam MB\`
  $addField[1;Стартер AoiClient;**Автор**: $getObjectProperty[author]
  **Описание**: $getObjectProperty[description]
  **Версия**: $getObjectProperty[version]]
  $title[Информация о боте $userTag[$clientID]]
  $createObject[$readFile[package.json]]`
})
