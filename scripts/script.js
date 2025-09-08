let isChatbotOpen = false;
const chatbot = document.getElementById('chatbot');
const floatingBtn = document.getElementById('floating-btn');
const closeBtn = document.getElementById('close-chatbot');
const sendBtn = document.getElementById('send-btn');
const promptInput = document.getElementById('prompt-input');
const chatbotBody = document.getElementById('chatbot-body');

function toggleChatbot() {
    if (!chatbot) return;

    if (isChatbotOpen) {
        chatbot.classList.replace('flex', 'hidden');
    } else {
        chatbot.classList.replace('hidden', 'flex');
    }

    isChatbotOpen = !isChatbotOpen;
}

floatingBtn.addEventListener('click', toggleChatbot);
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
    userMessage.className = 'self-end bg-slate-200 mb-2 px-3 py-2 rounded-xl max-w-[80%] break-words';
    userMessage.textContent = prompt;
    chatbotBody.appendChild(userMessage);

    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'self-start bg-blue-200 mb-2 px-3 py-2 rounded-xl max-w-[80%] break-words';
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
        aiMessage.className = 'self-start bg-blue-200 mb-2 px-3 py-2 rounded-xl max-w-[80%] break-words';
        aiMessage.textContent = data.response;
        chatbotBody.appendChild(aiMessage);

    } catch (error) {
        loadingMessage.remove();
        const errorMessage = document.createElement('div');
        errorMessage.className = 'self-start bg-red-200 mb-2 px-3 py-2 rounded-xl max-w-[80%] break-words';
        errorMessage.textContent = 'Erro ao conectar com a API.';
        chatbotBody.appendChild(errorMessage);
    }

    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}
