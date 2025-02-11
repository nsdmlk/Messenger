# Messenger — Real-Time Chat Application

[![Java](https://img.shields.io/badge/Java-17%2B-blue)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.0-brightgreen)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14%2B-informational)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](https://opensource.org/licenses/MIT)

Полнофункциональный мессенджер с поддержкой групповых чатов, шифрованием и веб-интерфейсом. Реализована микросервисная архитектура с использованием современных Java-технологий.

![Messenger Demo](screenshots/chat-preview.gif) *Пример работы интерфейса*

## 🌟 Основные возможности

### 👥 Пользователи
- Регистрация с валидацией данных
- JWT-аутентификация с refresh-токенами
- Ролевая модель (USER, ADMIN)
- Профиль пользователя с аватаркой
- Поиск по username/email

### 💬 Чат
- Личные и групповые чаты
- Редактирование/удаление сообщений
- Вложения файлов (до 5 МБ)
- Уведомления о наборе текста
- История сообщений с пагинацией
- Поиск по истории переписки

### 🔒 Безопасность
- Шифрование сообщений (AES-256)
- HTTPS поддержка
- Защита от XSS и SQL-инъекций
- Логирование действий
- Ограничение запросов (Rate Limiting)

### 🎛 Администрирование
- Модерация контента
- Статистика активности
- Управление пользователями
- Экспорт данных в CSV
- Системные метрики (Prometheus)

---

## 🛠 Технологический стек

### Backend
| Технология               | Назначение                          | Версия   |
|--------------------------|-------------------------------------|----------|
| Java                     | Основной язык                       | 17+      |
| Spring Boot              | Framework core                      | 3.1.0    |
| Spring Security          | Аутентификация/авторизация         | 6.0+     |
| Spring Data JPA          | Работа с БД                         | 3.0+     |
| WebSocket (STOMP)        | Реальный времени                    | RFC 6455 |
| MapStruct                | Маппинг DTO <-> Entity             | 1.5.3    |
| Liquibase                | Миграции БД                        | 4.15     |
| JUnit 5 + Mockito        | Тестирование                       | 5.8+     |

### Базы данных
- **PostgreSQL** - основное хранилище
- **Redis** - кэширование сессий
- **Elasticsearch** - полнотекстовый поиск

### Frontend
- Thymeleaf (шаблонизация)
- Bootstrap 5 + jQuery
- SockJS + Stomp.js
- Chart.js (для статистики)

### Инфраструктура
- Docker + Docker Compose
- Nginx (обратный прокси)
- Prometheus + Grafana (мониторинг)
- GitHub Actions (CI/CD)

---

## 🏗 Архитектура

### Модульная структура

messenger/
├── api-gateway - Входная точка для запросов
├── auth-service - Аутентификация/регистрация
├── chat-service - Логика чатов и сообщений
├── file-service - Управление файлами
├── notification-service - WebSocket/email/push
└── shared-lib - Общие DTO/конфиги


### Схема взаимодействия
```mermaid
sequenceDiagram
    participant Client
    participant API_Gateway
    participant Auth_Service
    participant Chat_Service
    
    Client->>API_Gateway: HTTP/WebSocket
    API_Gateway->>Auth_Service: Проверка JWT
    Auth_Service-->>API_Gateway: 200/401
    API_Gateway->>Chat_Service: Маршрутизация
    Chat_Service->>Redis: Кэш
    Chat_Service->>PostgreSQL: Основные данные
    Chat_Service-->>Client: Ответ

🚀 Запуск проекта
Требования
Java 17 (Amazon Corretto)

Maven 3.8+

Docker 23.0+

4 GB свободной памяти

Локальная установка
Клонировать репозиторий:

bash
git clone --recurse-submodules https://github.com/nsdmlk/Messenger.git
cd Messenger

Настройка переменных окружения:
cp .env.example .env
# Отредактируйте .env файл

Запуск через Docker Compose:

docker-compose -f docker-compose.dev.yml up --build

Доступные endpoints:

API: http://localhost:8080/api/v1/

Swagger: http://localhost:8080/swagger-ui/

Grafana: http://localhost:3000 (admin/admin)

Профили Spring
dev - H2 in-memory база + debug logging

prod - PostgreSQL + оптимизации

docker - Конфиг для контейнеризации

📚 Документация API
Полная спецификация доступна в Swagger UI после запуска:

Swagger Preview

Пример запроса через cURL:

# Отправка сообщения
curl -X POST "http://localhost:8080/api/v1/messages" \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{"chatId": 123, "content": "Hello World!"}'

🧪 Тестирование
Запуск всех тестов:

bash
mvn test

Структура тестов:

Unit-тесты (JUnit 5) - 80% покрытия

Интеграционные тесты (Testcontainers)

API-тесты (Postman Collection)

Нагрузочное тестирование (JMeter)

🤝 Руководство для контрибьюторов
Правила
Следуйте Conventional Commits

Все PR должны содержать:

Описание изменений

Тесты

Документацию

Используйте Checkstyle с конфигом Google Java Style

Начало работы
Форкните репозиторий

Установите pre-commit хуки:


bash
pre-commit install

bash
git checkout -b feat/your-feature

📄 Лицензия
Распространяется под лицензией MIT. Подробности в файле LICENSE.

🌍 Дорожная карта
Базовая реализация чата

Голосовые сообщения

Видеозвонки (WebRTC)

Мобильное приложение (React Native)

Поддержка плагинов