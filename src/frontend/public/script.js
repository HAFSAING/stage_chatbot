document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const imageUpload = document.getElementById('imageUpload');
    const sendButton = document.getElementById('sendButton');

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = userInput.value.trim();
        const image = imageUpload.files[0];

        if (!message && !image) return;

        // Display user message
        addMessageToChat('user', message);
        userInput.value = '';

        // Prepare form data
        const formData = new FormData();
        if (message) formData.append('message', message);
        if (image) formData.append('image', image);

        try {
            // Note: For simplicity, we use the text API here
            // In production, integrate with a Python server endpoint
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            addMessageToChat('chatbot', data.response);
        } catch (error) {
            console.error('Error:', error);
            addMessageToChat('chatbot', 'Erreur lors de l'envoi du message.');
        }

        // Reset image input
        imageUpload.value = '';
    }

    function addMessageToChat(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});