// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.getElementById('notificationContainer').appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
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
    showChat();
}

function handleRegister() {
    const password = document.querySelectorAll('#registerForm input[type="password"]')[0].value;
    const confirmPassword = document.querySelectorAll('#registerForm input[type="password"]')[1].value;
    
    if(password !== confirmPassword) {
        showNotification('Пароли не совпадают!', 'error');
        return;
    }
    
    showNotification('Аккаунт успешно создан!');
    setTimeout(() => {
        showLogin();
        document.getElementById('registerContainer').classList.add('hidden');
        document.getElementById('loginContainer').classList.remove('hidden');
    }, 1500);
}

function showChat() {
    document.getElementById('authScreens').classList.add('hidden');
    document.getElementById('chatInterface').classList.remove('hidden');
}

function logout() {
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
    
    if(text) {
        addMessage(text, true);
        input.value = '';
        
        setTimeout(() => {
            addMessage('Это демо-сообщение от системы', false);
        }, 1000);
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

// Search Functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.chat-item').forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(searchTerm) 
            ? 'block' 
            : 'none';
    });
});