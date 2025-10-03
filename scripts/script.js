let isChatbotOpen = false;
let isMaximum = false;
const chatbot = document.getElementById('chatbot');
const floatingBtn = document.getElementById('floating-btn');
const maximizeBtn = document.getElementById('maximize-chatbot');
const closeBtn = document.getElementById('close-chatbot');
const sendBtn = document.getElementById('send-btn');
const promptInput = document.getElementById('prompt-input');
const chatbotBody = document.getElementById('chatbot-body');

function toggleChatbot() {
    if (!chatbot) return;

    if (isChatbotOpen) {
        chatbot.style.display = 'none';
    } else {
        chatbot.style.display = 'flex';
    }

    isChatbotOpen = !isChatbotOpen;
}

function toggleWidth(){
    if (!chatbot) return;

    if (!isMaximum){
        chatbot.style.width = "75%";
    } else {
        chatbot.style.width = "320px";
    }

    isMaximum = !isMaximum;
}



floatingBtn.addEventListener('click', toggleChatbot);
maximizeBtn.addEventListener('click', toggleWidth);
closeBtn.addEventListener('click', toggleChatbot);
sendBtn.addEventListener('click', sendMessage);
promptInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const prompt = promptInput.value.trim();

    if (!prompt) return;

    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = prompt;
    chatbotBody.appendChild(userMessage);

    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'bot-message';
    loadingMessage.textContent = document.getElementById('chatbot-body').getAttribute('loading-text');
    chatbotBody.appendChild(loadingMessage);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;

    promptInput.value = '';

    try {
        const response = await fetch('/local/chatbot_ai/index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `prompt=${encodeURIComponent(prompt)}&sesskey=${M.cfg.sesskey}`
        });

        const data = await response.json();

        loadingMessage.remove();

        const aiMessage = document.createElement('div');
        aiMessage.className = 'bot-message';
        aiMessage.textContent = data.response;
        chatbotBody.appendChild(aiMessage);

    } catch (error) {
        loadingMessage.remove();
        const errorMessage = document.createElement('div');
        errorMessage.className = 'bot-message';
        errorMessage.style.backgroundColor = "#fecaca"
        errorMessage.textContent = 'Erro ao conectar com a API.';
        chatbotBody.appendChild(errorMessage);
    }

    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}
