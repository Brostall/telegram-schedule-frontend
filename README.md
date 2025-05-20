# Telegram Schedule Frontend

Веб-приложение для Telegram, отображающее расписание занятий техникума.

## Технологии

- React
- TypeScript
- Telegram Web App API
- Material-UI

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/Brostall/telegram-schedule-frontend.git
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите проект:
```bash
$env:HOST="0.0.0.0"; npm start
```
4. Запустить хостинг ngrok в PowerShell:
```
ngrok http 3000 
```

## Функциональность

- Просмотр расписания по группам
- Поиск групп
- Темная/светлая тема
- Адаптивный дизайн

## Структура проекта

```
src/
  ├── components/     # React компоненты
  ├── pages/         # Страницы приложения
  ├── api/           # API клиент
  ├── types/         # TypeScript типы
  └── assets/        # Статические ресурсы
```

## Лицензия

MIT
