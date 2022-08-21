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
  **Процессор**: \`$cpu %\`
  **Пинг**: \`$ping мс\`]
  $addField[1;Стартер AoiClient;**Автор**: $getObjectProperty[author]
  **Описание**: $getObjectProperty[description]
  **Версия**: $getObjectProperty[version]]
  $title[Информация о боте $userTag[$clientID]]
  $createObject[$readFile[package.json]]`
}); //Утилита информации о боте

bot.joinCommand({
  code: `$sendDm[Добро пожаловать на сервер $serverName! Ты стал $membersCount участником для нас!;$authorId] 
  $onlyIf[$isUserDMEnabled==true;]`
}); //Приветствие пользователя в ЛС

bot.readyCommand({
  code: `$log[Запущено $userTag: $serverCount серверов]`
}); //Информация о запуске клиента

bot.guildJoin({
  code: `$sendDm[Я присоединился на сервер $serverName;$botOwnerID]
  $onlyIf[$isUserDMEnabled[$botOwnerID]==true;]`
}); //Уведомление о присоединении бота к серверy

bot.command({
  name: "int",
  code: `$addButton[1;Кнопкa;1;button]
  $addButton[1;Кнопкa;2;button]
  $addButton[1;Кнопкa;3;button]
  $addButton[1;Кнопкa;4;button]
  $addButton[1;Кнопкa;5;https://discord.io/WeredokGang]
  $addSelectMenu[2;selectmenu;Меню выбора;1;1;no;Опция:Значение опции;
