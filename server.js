const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5501;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la raíz del proyecto
app.use(express.static(path.join(__dirname)));

// También servir desde la carpeta public (si existe)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
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

app.post('/api/guardar-resultados', (req, res) => {
    const { perfil, recomendaciones } = req.body;
    console.log('Resultados recibidos:', { perfil, recomendaciones });
    res.json({
        mensaje: 'Resultados guardados correctamente',
        perfil,
        recibido: true
    });
});

app.get('/api/carreras/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        id,
        nombre: 'Carrera ejemplo',
        mensaje: 'API funcionando correctamente'
    });
});

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