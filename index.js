const {AoiClient} = require("aoi.js");
const bot = new AoiClient({
  token: process.env.token,
  prefix: ["!", "?"],
  intents: ["guilds", "guildMessages", "guildMembers"],
  mobilePlatform: false,
});

bot.onMessage();
bot.onGuildJoin();
bot.onJoin();
bot.onInteractionCreate();

bot.command({
  name: "bot",
  code: `
  $addField[1;Система;**Оперативная память**: \`$ram\ MB\` \`$maxRam MB\`
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
  code: `$log[Запущено $userTag[$clientID]: $serverCount серверов]`
}); //Информация о запуске клиента

bot.guildJoinCommand({
  code: `$sendDm[Я присоединился на сервер $serverName;$botOwnerID]
  $onlyIf[$isUserDMEnabled[$botOwnerID]==true;]`
}); //Уведомление о присоединении бота к серверy

bot.command({
  name: "int",
  code: `$createApplicationCommand[$guildID;int;Создаёт сообщение для интерактивных взаимодействий;;slash]`
}); //Создаёт слэш-команду для интерактивных взаимодействий

bot.interactionCommand({
  name: "int",
  prototype: "slash",
  code: `$addSelectMenu[2;selectMenu;Меню выбора;1;1;no;Опция:Описание опции:Значение опции]
  $addButton[1;Кнопкa;link;https://discord.io/WeredokGang]
  $addButton[1;Кнопкa;danger;Красная Кнопка]
  $addButton[1;Кнопкa;success;Зелёная Кнопка]
  $addButton[1;Кнопкa;secondary;Серая Кнопка]
  $addButton[1;Кнопка;primary;Синяя Кнопка]
  Примеры интерактивных взаимодействий
  $interactionReply[Ниже - почти все виды и примеры для интерактивных взаимодействий. Ты можешь их смешивать так как тебе захочется, всё будет работать если в твоих задумках будет логика. Чтобы не было **Ошибки Взаимодействия** используй функцию, при помощи которой сделан этот ответ.]`
}); //Создаёт сообщение для взаимодействий + ответ на слэш-команду

bot.interactionCommand({
  name: "Синяя Кнопка",
  prototype: "button",
  code: `$interactionReply[Это - невидимое сообщение. Его видишь только ты.;;;;;yes]`
}); //Пример невидимого интерактивного ответа

bot.interactionCommand({
  name: "Серая Кнопка",
  prototype: "button",
  code: `$interactionUpdate[Это - обновление сообщения по нажатию кнопки.]`
}); //Обновление сообщение при помощи нажатая кнопки

bot.interactionCommand({
  name: "Зелёная Кнопка",
  prototype: "button",
  code: `$interactionUpdate[Это - отключение всех кнопок. Ты должен их указать в опции components.;;{actionRow:{button:Кнопка:primary:Синяя Кнопка:yes}{button:Кнопка:secondary:Серая Кнопка:yes}{button:Кнопка:success:Зелёная Кнопка:yes}{button:Кнопка:danger:Красная Кнопка:yes}}]`
}); //Отключение всех кнопок при нажатии на кнопку 

bot.interactionCommand({
  name: "Красная Кнопка",
  prototype: "button",
  code: `$interactionModal[Заголовок;Модальное Окно;{actionRow:{textInput:Название поля:1:Поле:no:Надпись на поле:12:180:Заполнение поля}}]`
}); //Создание модального окна при нажатии кнопки

bot.interactionCommand({
  name: "Модальное Окно",
  prototype: "modal",
  code: `$interactionReply[$textInputValue[Поле]]`
}); //Ответ модального окна после того как пользователь отправит форму

bot.interactionCommand({
  name: "Меню выбора",
  prototype: "selectMenu",
  code: `$interactionReply[Вы выбрали опцию \`$message\`]`
}); //Ответ меню выбора после выбора опции. Опция выводится в $message.
