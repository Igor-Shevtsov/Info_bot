require('dotenv').config();
const { Telegraf } = require('telegraf');
const { getMainMenu, yesNoKeyboard, yesNoKeyboard2, getStart } = require('./keyboard');
const { dbConnect } = require('./db')
const data = require('./index');
const User = require('./models/users')


dbConnect();

const bot = new Telegraf(process.env.BOT_TOKEN) //сюда помещается токен, который дал botFather
// bot.start((ctx) => ctx.reply(`${ctx.from.first_name}`)) //ответ бота на команду /start
bot.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log('Response time: %sms', ms)
})


bot.hears('Начать',async ctx => {
  
  let user = await new User({
    id: ctx.from.id,
    name: ctx.from.first_name,
    name2: ctx.from.username,
  })
  await user.save()
  ctx.replyWithHTML(
      `Привет, <b>${ctx.from.first_name}</b>\n\n`+
      'Чтобы узнать информацию о количестве зараженных COVID,\n\n' + 
      'просто выберите кнопку ниже ⇩⇩⇩',
      getMainMenu())
})




bot.hears('Диагноз ➕', async (ctx) => {
  const a = await data()
 return ctx.reply(`Заболевших: ${a[0].confirmed} человек`)
}) 

bot.hears('новости', async ctx => {
  const a = await data()
  ctx.replyWithHTML(
     `https://russian.rt.com/russia/article/809250-sobyanin-vakcinaciya-moskva-regiony`
  )
})

bot.hears('Выздоровели', async (ctx) => {
  const a = await data()
 return ctx.reply(`Выздоровели: ${a[0].recovered} человек`)
}) 

bot.hears('В критическом состоянии', async (ctx) => {
  const a = await data()
 return ctx.reply(`В критическом состоянии: ${a[0].critical} человек`)
}) 



bot.hears('Летальные исходы ☠️', async (ctx) => {
  const a = await data()
  ctx.replyWithHTML(
      `Вы действительно хотите знать:\n\n`+
      `<i>${ctx.message.text}</i>`,
      yesNoKeyboard()
  )
})
bot.hears('new`s', async (ctx) => {
  const a = await data()
  ctx.replyWithHTML(
      `Где именно:\n\n`,
      yesNoKeyboard2()
  )
})


bot.hears('Смотивируй меня', ctx => {
  ctx.replyWithPhoto(
      'https://img2.goodfon.ru/wallpaper/nbig/7/ec/justdoit-dzhastduit-motivaciya.jpg',
      {
          caption: 'Не вздумай сдаваться!'
      }
  )
})



bot.help((ctx) => ctx.reply('Send me a sticker')) 

bot.on('sticker', async (ctx) => {
  return ctx.replyWithPhoto({
    url: 'https://picsum.photos/200/300/?random',
    filename: 'kitten.jpg'
  })
})
bot.on('voice', ctx => {
  ctx.reply('${ctx.from.first_name}, у тебя не очень голос((')
})

bot.hears('hi', (ctx) => ctx.reply('Hey there')) // bot.hears это обработчик конкретного текста, данном случае это - "hi"
bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('hipster', Telegraf.reply('λ'))
// bot.use((ctx) => {
//   console.log(ctx.message)
// })
// bot.on('text', ctx => {
//   ctx.replyWithHTML(
//       `Вы действительно хотите добавить задачу:\n\n`+
//       `<i>${ctx.message.text}</i>`,
//       yesNoKeyboard()
//   )
// })

bot.action(['yes', 'no'], async (ctx) => {
  const a = await data()
  if (ctx.callbackQuery.data === 'yes') {
      ctx.editMessageText(`Умерло: ${a[0].critical} человек`)
  } else {
    ctx.editMessageText('Правильный выбор!')
  }
})

bot.action(['mos', 'rus', 'world'], async (ctx) => {
  const a = await data()
  if (ctx.callbackQuery.data === 'mos') {
    ctx.replyWithHTML(
      `https://russian.rt.com/russia/article/809250-sobyanin-vakcinaciya-moskva-regiony`
   )
  } else  if (ctx.callbackQuery.data === 'rus') {
    ctx.replyWithHTML(
      `https://www.bbc.com/russian/media-55169482`
   )
  } else {
    ctx.replyWithHTML(
      `https://ria.ru/20201129/koronavirus-1586798940.html`
   )
  }
})

bot.on('text', ctx => {
  ctx.replyWithHTML(
      `Вот такое: ➞  `+
      `<b><i>${ctx.message.text}</i></b> ,` +
      ` не надо вводить, \n\n` +
      `просто нажми ≪Начать≫  ⇩⇩⇩  чтобы начать`,
      getStart()
  )
})

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})
bot.launch() // запуск бота





