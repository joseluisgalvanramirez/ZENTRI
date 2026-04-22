// ====================
// IMPORTACIONES
// ====================
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// 👉 NECESARIO para usar fetch en Node.js
const fetch = require('node-fetch'); // <-- // PEGA ESTO (para API de IA)

// ====================
// CONFIGURACIÓN
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

// Servir archivos desde raíz
app.use(express.static(path.join(__dirname)));

// Servir archivos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// ====================
// RUTA PRINCIPAL
// ====================
app.get('/', (req, res) => {
    const rootIndex = path.join(__dirname, 'index.html');
    const publicIndex = path.join(__dirname, 'public', 'index.html');
    
    res.sendFile(rootIndex, err => {
        if (err) {
            res.sendFile(publicIndex);
        }
    });
});

// ====================
// RUTAS API
// ====================

// ====================
// 🤖 IA ASISTENTE
// ====================
// 👉 AQUÍ ES DONDE USAS LA API DE IA
// 👉 SOLO CAMBIA TU API KEY EN EL .env
app.post('/api/ia', async (req, res) => {
    const { mensaje } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
                // 🔐 USA TU API KEY AQUÍ (desde .env)
                'Authorization': `Bearer ${process.env.sk-ZXk1HaolLp6BU68B236e1eF237B24fFf9910E4CbEd619a9e}` // <-- // PEGA TU API KEY EN .env
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'Eres un orientador vocacional experto que ayuda a estudiantes a elegir carrera.'
                    },
                    {
                        role: 'user',
                        content: mensaje
                    }
                ]
            })
        });

        const data = await response.json();

        // 👉 RESPUESTA QUE SE ENVÍA AL FRONTEND
        res.json({
            respuesta: data.choices[0].message.content
        });

    } catch (error) {
        console.error('Error IA:', error);
        res.status(500).json({ error: 'Error con la IA' });
    }
});

// ====================
// GUARDAR RESULTADOS
// ====================
app.post('/api/guardar-resultados', (req, res) => {
    const { perfil, recomendaciones } = req.body;
    console.log('Resultados recibidos:', { perfil, recomendaciones });

    res.json({
        mensaje: 'Resultados guardados correctamente',
        perfil,
        recibido: true
    });
});

// ====================
// OBTENER CARRERAS
// ====================
app.get('/api/carreras/:id', (req, res) => {
    const { id } = req.params;

    res.json({
        id,
        nombre: 'Carrera ejemplo',
        mensaje: 'API funcionando correctamente'
    });
});

// ====================
// STATUS SERVIDOR
// ====================
app.get('/api/status', (req, res) => {
    res.json({
        status: 'OK',
        mensaje: 'Servidor funcionando correctamente'
    });
});

// ====================
// MANEJO DE ERRORES
// ====================
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// ====================
// INICIAR SERVIDOR
// ====================
app.listen(PORT, () => {
    console.log('=================================');
    console.log('🚀 SERVIDOR ZENTRI VOCACIONAL');
    console.log('=================================');
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
    console.log('=================================');
});
