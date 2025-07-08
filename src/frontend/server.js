const express = require('express');
const cors = require('cors');
const { Ollama } = require('ollama');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const ollama = new Ollama({ url: 'http://localhost:11434' });

// Endpoint for text queries
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await ollama.chat({
            model: 'llama3.1:8b',
            messages: [{ role: 'user', content: message }],
        });
        res.json({ response: response.message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});