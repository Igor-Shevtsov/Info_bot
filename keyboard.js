const Markup =  require('telegraf/markup.js')


function getStart() {
  return Markup.keyboard([
      ['Начать'],
  ]).resize().extra()
}

function getMainMenu() {
    return Markup.keyboard([
        ['Диагноз ➕', 'Выздоровели'], ['В критическом состоянии'],
        ['Летальные исходы ☠️', 'new`s'],
    ]).resize().extra()
}


function yesNoKeyboard() {
  return Markup.inlineKeyboard([
      Markup.callbackButton('Да', 'yes'),
      Markup.callbackButton('Нет', 'no')
  ], {columns: 2}).extra()
}
function yesNoKeyboard2() {
  return Markup.inlineKeyboard([
      Markup.callbackButton('Москва', 'mos'),
      Markup.callbackButton('Россия', 'rus'),
      Markup.callbackButton('Во всем мире', 'world')
  ], {columns: 2}).extra()
}
module.exports = { getMainMenu, yesNoKeyboard, yesNoKeyboard2, getStart };
