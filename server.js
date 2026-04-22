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
// 🧪 STATUS (para pruebas)
// ====================
app.get('/api/status', (req, res) => {
    res.json({
        status: 'OK',
        mensaje: 'Servidor funcionando'
    });
});

// ====================
// 🤖 IA ASISTENTE
// ====================
app.post('/api/ia', async (req, res) => {
    const { mensaje } = req.body;

    // 🔴 Validación básica
    if (!mensaje) {
        return res.status(400).json({
            respuesta: "Debes enviar un mensaje"
        });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

                // 🔐 API KEY desde .env
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'Eres un orientador vocacional que ayuda a estudiantes a elegir carrera en México.'
                    },
                    {
                        role: 'user',
                        content: mensaje
                    }
                ]
            })
        });

        const data = await response.json();

        // 🔴 Manejo de error de OpenAI
        if (data.error) {
            console.error("Error OpenAI:", data.error);
            return res.status(500).json({
                respuesta: "Error con la API de IA"
            });
        }

        // 🔴 Validación de estructura
        if (!data.choices || !data.choices[0]) {
            return res.status(500).json({
                respuesta: "Respuesta inválida de la IA"
            });
        }

        // ✅ Respuesta correcta
        res.json({
            respuesta: data.choices[0].message.content
        });

    } catch (error) {
        console.error("Error servidor:", error);
        res.status(500).json({
            respuesta: "Error interno del servidor"
        });
    }
});

// ====================
// MANEJO DE ERRORES
// ====================
app.use((req, res) => {
    res.status(404).send('No encontrado');
});

// ====================
// INICIAR SERVIDOR
// ====================
app.listen(PORT, () => {
    console.log('==============================');
    console.log('🚀 ZENTRI SERVIDOR ACTIVO');
    console.log(`🌐 http://localhost:${PORT}`);
    console.log('==============================');
});
