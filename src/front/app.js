// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.getElementById('notificationContainer').appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Глобальная переменная для хранения информации о текущем пользователе
let currentUser = null;

// Массив зарегистрированных пользователей
let registeredUsers = [];

// Массив чатов
let chats = [];

// Функция для загрузки чатов из базы данных
function loadChats() {
    fetch('/api/chats/all')
        .then(response => response.json())
        .then(data => {
            chats = data; // Обновляем массив чатов
            populateChatList(); // Заполняем список чатов
        })
        .catch(error => {
            console.error('Ошибка при загрузке чатов:', error);
        });
}

// Функция для заполнения списка чатов
function populateChatList() {
    const chatList = document.getElementById('chatList');
    chatList.innerHTML = ''; // Очищаем текущий список

    if (chats.length === 0) {
        const noChatsMessage = document.createElement('div');
        noChatsMessage.className = 'no-chats-message';
        noChatsMessage.textContent = 'У вас нет чатов. Начните общаться!';
        chatList.appendChild(noChatsMessage);
    } else {
        chats.forEach(chat => {
            const chatItem = document.createElement('div');
            chatItem.className = 'chat-item';
            chatItem.textContent = chat.name; // Предполагается, что у чата есть поле name
            chatList.appendChild(chatItem);
        });
    }
}

// Изменяем функцию showChat
function showChat() {
    document.getElementById('authScreens').classList.add('hidden');
    document.getElementById('chatInterface').classList.remove('hidden');
    updateChatHeader(); // Обновляем заголовок чата при входе
    loadMessages(); // Загружаем сообщения
    loadUsers(); // Загружаем пользователей
    loadChats(); // Загружаем чаты
}

// Auth Logic
function showRegister() {
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('registerContainer').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('registerContainer').classList.add('hidden');
    document.getElementById('loginContainer').classList.remove('hidden');
}

// Form Handling
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    handleLogin();
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    handleRegister();
});

function handleLogin() {
    const nickname = document.querySelector('#loginForm input[type="email"]').value;
    // Здесь можно добавить проверку на существование пользователя
    currentUser = nickname; // Сохраняем никнейм
    showChat();
    updateChatHeader(); // Обновляем заголовок чата
}

function handleRegister() {
    const nickname = document.querySelector('#registerForm input[type="text"]').value;
    const email = document.querySelector('#registerForm input[type="email"]').value;
    const password = document.querySelectorAll('#registerForm input[type="password"]')[0].value;
    const confirmPassword = document.querySelectorAll('#registerForm input[type="password"]')[1].value;
    
    if (password !== confirmPassword) {
        showNotification('Пароли не совпадают!', 'error');
        return;
    }

    // Создаем объект пользователя
    const newUser = {
        nickname: nickname,
        email: email,
        password: password
    };

    // Отправляем данные на сервер
    fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser) // Отправляем объект пользователя
    })
    .then(response => {
        if (response.ok) {
            showNotification('Аккаунт успешно создан!');
            setTimeout(() => {
                showLogin();
                document.getElementById('registerContainer').classList.add('hidden');
                document.getElementById('loginContainer').classList.remove('hidden');
            }, 1500);
        } else {
            showNotification('Ошибка при регистрации!', 'error');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        showNotification('Ошибка при регистрации!', 'error');
    });
}

// Функция для обновления заголовка чата
function updateChatHeader() {
    const chatHeader = document.getElementById('chatHeader');
    chatHeader.textContent = `Чат с: ${currentUser}`; // Отображаем никнейм пользователя
}

function logout() {
    currentUser = null; // Сбрасываем информацию о текущем пользователе
    document.getElementById('chatInterface').classList.add('hidden');
    document.getElementById('authScreens').classList.remove('hidden');
    showLogin();
}

// Chat Logic
document.getElementById('sendMessage').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if(e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (text) {
        // Отправка сообщения на сервер
        fetch('/api/messages/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: text, sender: currentUser }) // Отправляем текст сообщения и никнейм отправителя
        })
        .then(response => {
            if (response.ok) {
                addMessage(text, true); // Добавляем сообщение в интерфейс
                input.value = ''; // Очищаем поле ввода
            } else {
                showNotification('Ошибка при отправке сообщения!', 'error');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            showNotification('Ошибка при отправке сообщения!', 'error');
        });
    } else {
        showNotification('Введите сообщение перед отправкой!', 'error');
    }
}

function addMessage(text, isOwn) {
    const container = document.getElementById('messagesContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isOwn ? 'own' : 'other'}`;
    messageDiv.textContent = text;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

// Функция для заполнения списка пользователей
function populateUserList() {
    const chatList = document.getElementById('chatList');
    chatList.innerHTML = ''; // Очищаем текущий список

    if (registeredUsers.length === 0) {
        // Если нет зарегистрированных пользователей
    } else {
        registeredUsers.forEach(user => {
            if (user !== currentUser) { // Убираем возможность чата с самим собой
                const userItem = document.createElement('div');
                userItem.className = 'chat-item';
                userItem.textContent = user;
                chatList.appendChild(userItem);
            }
        });
    }
}

// Добавим обработчик для панели поиска
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(searchTerm) 
            ? 'block' 
            : 'none';
    });
});

// Добавим обработчик для кнопки поиска
document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const chatItems = document.querySelectorAll('.chat-item');
    let found = false; // Флаг для отслеживания, найден ли пользователь

    chatItems.forEach(item => {
        if (item.textContent.toLowerCase().includes(searchTerm)) {
            item.style.display = 'block'; // Показываем элемент, если найден
            found = true;
        } else {
            item.style.display = 'none'; // Скрываем элемент, если не найден
        }
    });

    // Если ничего не найдено, показываем уведомление
    if (!found) {
        showNotification('Пользователь не найден!', 'error');
    }
});

function loadMessages() {
    fetch('/api/messages/get')
        .then(response => response.json())
        .then(messages => {
            messages.forEach(message => {
                addMessage(message.content, message.sender === currentUser);
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке сообщений:', error);
        });
}