// ====================
// IMPORTACIONES
// ====================
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

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
app.use(express.static(__dirname)); // Sirve archivos desde la raíz

// ====================
// RUTA PRINCIPAL
// ====================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
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

    if (!mensaje) {
        return res.status(400).json({
            respuesta: "Debes enviar un mensaje"
        });
    }

    // Verificar que la API key existe
    if (!process.env.OPENAI_API_KEY) {
        console.error("❌ OPENAI_API_KEY no configurada");
        return res.status(500).json({
            respuesta: "Error de configuración del servidor"
        });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // Usa gpt-3.5-turbo que es más económico
                messages: [
                    {
                        role: 'system',
                        content: `Eres ZENTRI, un asistente vocacional para estudiantes mexicanos.
                        Ayudas a elegir carreras universitarias. Das respuestas cortas y útiles.
                        Hablas de manera amigable y motivadora.`
                    },
                    {
                        role: 'user',
                        content: mensaje
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("Error OpenAI:", data.error);
            return res.status(500).json({
                respuesta: `Error: ${data.error.message || "Error con la IA"}`
            });
        }

        if (!data.choices || !data.choices[0]) {
            return res.status(500).json({
                respuesta: "No se pudo generar una respuesta"
            });
        }

        res.json({
            respuesta: data.choices[0].message.content
        });

    } catch (error) {
        console.error("Error servidor:", error);
        res.status(500).json({
            respuesta: "Error interno del servidor. Intenta de nuevo más tarde."
        });
    }
});

// ====================
// MANEJO DE ERRORES
// ====================
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
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
