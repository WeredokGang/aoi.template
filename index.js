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
  code: `$addSelectMenu[2;selectmenu;Меню выбора;1;1;no;Опция:Значение опции:yes]
  $addButton[1;Кнопкa;link;https://discord.io/WeredokGang]
  $addButton[1;Кнопкa;danger;Красная Кнопка]
  $addButton[1;Кнопкa;success;Зелёная Кнопка]
  $addButton[1;Кнопкa;secondary;Серая Кнопка]
  $addButton[1;Кнопкa;primary;Синяя Кнопка]
  Примеры интерактивных взаимодействий`
}); //Создаёт сообщение для взаимодействий

bot.interactionCommand({
  name: "Синяя Кнопка",
  prototype: "button",
  code: `$interactionReply[Это - невидимое сообщение. Его видишь только ты.;;;;;;yes]`
}); //Примпр невидимого интерактивного ответа
