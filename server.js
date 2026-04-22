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
app.use(express.static(__dirname));

// ====================
// RUTA PRINCIPAL
// ====================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ====================
// 🤖 IA ASISTENTE - Endpoint principal
// ====================
app.post('/api/ia', async (req, res) => {
    const { mensaje } = req.body;

    if (!mensaje) {
        return res.status(400).json({
            respuesta: "Por favor, escribe un mensaje para poder ayudarte."
        });
    }

    // Si no hay API key, usar respuestas locales
    if (!process.env.OPENAI_API_KEY) {
        console.log("⚠️ Usando respuestas locales (sin API key)");
        const respuestaLocal = generarRespuestaLocal(mensaje);
        return res.json({ respuesta: respuestaLocal });
    }

    try {
        const fetch = (await import('node-fetch')).default;
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `Eres ZENTRI, un asistente vocacional para estudiantes mexicanos.
                        Das respuestas cortas (máximo 3 párrafos), amigables y útiles.
                        Ayudas a elegir carreras universitarias basándote en intereses y habilidades.
                        Si no sabes algo, lo dices honestamente.`
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
            return res.json({ respuesta: generarRespuestaLocal(mensaje) });
        }

        const respuestaIA = data.choices?.[0]?.message?.content;
        
        if (!respuestaIA) {
            return res.json({ respuesta: generarRespuestaLocal(mensaje) });
        }

        res.json({ respuesta: respuestaIA });

    } catch (error) {
        console.error("Error:", error);
        res.json({ respuesta: generarRespuestaLocal(mensaje) });
    }
});

// ====================
// RESPUESTAS LOCALES (fallback)
// ====================
function generarRespuestaLocal(mensaje) {
    const msg = mensaje.toLowerCase();
    
    if (msg.includes("hola") || msg.includes("buenas")) {
        return "👋 ¡Hola! Soy ZENTRI, tu asistente vocacional. ¿En qué puedo ayudarte? Puedo informarte sobre carreras, áreas de estudio o recomendarte el test vocacional.";
    }
    
    if (msg.includes("test") || msg.includes("vocacional")) {
        return "🎯 El test vocacional te ayuda a descubrir qué carreras se adaptan mejor a tus intereses. ¡Solo son 8 preguntas! Encuéntralo en el menú principal o en la página de inicio.";
    }
    
    if (msg.includes("carreras") && msg.includes("tecnologia")) {
        return "💻 En el área de Tecnología tenemos: Ingeniería en Software, Ingeniería en Sistemas e Inteligencia Artificial. ¿Te gustaría saber más sobre alguna?";
    }
    
    if (msg.includes("carreras") && msg.includes("salud")) {
        return "🏥 En el área de Salud tenemos: Medicina, Enfermería y Psicología. ¿Quieres más información de alguna carrera específica?";
    }
    
    if (msg.includes("carreras") || msg.includes("que estudiar")) {
        return "📚 Tenemos carreras en 6 áreas: Tecnología, Salud, Ciencias Sociales, Negocios, Artes y Ciencias Exactas. ¿Te interesa alguna área en particular? También puedes ver el catálogo completo en la sección 'Carreras'.";
    }
    
    return "🎓 Puedo ayudarte con información sobre carreras, áreas de estudio o el test vocacional. ¿Qué te gustaría saber? También puedes explorar el catálogo de carreras en el menú superior.";
}

// ====================
// INICIAR SERVIDOR
// ====================
app.listen(PORT, () => {
    console.log('==============================');
    console.log('🚀 ZENTRI SERVIDOR ACTIVO');
    console.log(`🌐 http://localhost:${PORT}`);
    console.log('==============================');
});
