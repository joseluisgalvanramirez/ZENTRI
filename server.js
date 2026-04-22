// ====================
// IMPORTACIONES
// ====================
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const fetch = require('node-fetch'); // <-- IA

// ====================
// CONFIG
// ====================
const app = express();
const PORT = process.env.PORT || 5501;

// ====================
// MIDDLEWARES
// ====================
app.use(cors());
app.use(express.json());

// ====================
// ARCHIVOS ESTÁTICOS
// ====================
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));

// ====================
// RUTA PRINCIPAL
// ====================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ====================
// 🤖 IA ASISTENTE
// ====================
app.post('/api/ia', async (req, res) => {
    const { mensaje } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 🔐 API KEY
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // <-- PON TU KEY EN .env
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'Eres un orientador vocacional para estudiantes.' },
                    { role: 'user', content: mensaje }
                ]
            })
        });

        const data = await response.json();

        if (!data.choices) {
            return res.json({ respuesta: "Error con la IA (API KEY o conexión)" });
        }

        res.json({
            respuesta: data.choices[0].message.content
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ respuesta: "Error del servidor" });
    }
});

// ====================
// API EXTRA
// ====================
app.get('/api/status', (req, res) => {
    res.json({ status: 'OK' });
});

// ====================
// ERRORES
// ====================
app.use((req, res) => {
    res.status(404).send('No encontrado');
});

// ====================
// INICIAR
// ====================
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
