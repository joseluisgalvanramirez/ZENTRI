import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = 3000;

// Necesario para rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 🔥 RUTA DE IA
app.post("/api/ia", async (req, res) => {
    try {
        const { mensaje } = req.body;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Eres un asistente vocacional que ayuda a elegir carreras." },
                    { role: "user", content: mensaje }
                ]
            })
        });

        const data = await response.json();

        res.json({
            respuesta: data.choices[0].message.content
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en IA" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
