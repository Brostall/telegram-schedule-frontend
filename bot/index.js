const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = '8067470896:AAE9ck6Z81LZdQ9zw_TKzwj1iG6W0JMNl8g'; // Замените на ваш токен от BotFather
const webAppUrl = 'http://localhost:3000'; // В продакшене замените на ваш домен

// Добавляем обработку ошибок при создании бота
const bot = new TelegramBot(token, { 
  polling: true,
  // Добавляем обработку ошибок polling
  onlyFirstMatch: true,
  request: {
    timeout: 30000
  }
});

const app = express();

app.use(express.json());
app.use(cors());

// Логируем запуск бота
console.log('Bot is starting...');

// Обработка ошибок бота
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

bot.on('error', (error) => {
  console.error('Bot error:', error);
});

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  console.log('Received /start command from chat:', chatId);
  
  try {
    bot.sendMessage(chatId, 'Добро пожаловать! Нажмите кнопку ниже, чтобы открыть расписание:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Открыть расписание', web_app: { url: webAppUrl } }]
        ]
      }
    }).then(() => {
      console.log('Message sent successfully to chat:', chatId);
    }).catch((error) => {
      console.error('Error sending message:', error);
    });
  } catch (error) {
    console.error('Error in /start command handler:', error);
  }
});

// Добавляем обработчик для всех сообщений, чтобы видеть, что бот их получает
bot.on('message', (msg) => {
  console.log('Received message:', msg);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Bot username:', bot.getMe().then(me => console.log('Bot info:', me)));
}); 