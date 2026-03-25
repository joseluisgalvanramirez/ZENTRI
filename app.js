/**
 * Archivo principal de la aplicación Zentri
 * Maneja la lógica de la interfaz de usuario y la interacción con el motor de IA
 */

// ========== VARIABLES GLOBALES ==========
let usuarioActual = null;
let preguntaActual = null;

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Zentri App inicializada');
    
    // Verificar si hay usuario en localStorage
    const usuarioGuardado = localStorage.getItem('zentri_usuario');
    if (usuarioGuardado) {
        usuarioActual = JSON.parse(usuarioGuardado);
        actualizarUIUsuario();
    }
    
    // Inicializar event listeners
    inicializarEventListeners();
});

// ========== FUNCIONES DE UI ==========

/**
 * Muestra el formulario de evaluación
 */
function mostrarEvaluacion() {
    const evaluacionSection = document.getElementById('evaluacion');
    if (evaluacionSection) {
        evaluacionSection.classList.remove('hidden');
        evaluacionSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Genera ruta de aprendizaje usando el motor de IA
 */
function generarRutaIA() {
    // Obtener valores del formulario
    const horas = document.getElementById('horas')?.value;
    const nivel = document.getElementById('nivel')?.value;
    const area = document.getElementById('area')?.value;
    const situacion = document.getElementById('situacion')?.value || 'normal';

    // Validaciones
    if (!horas || horas < 1) {
        mostrarError('Por favor ingresa las horas disponibles (mínimo 1 hora)');
        return;
    }

    if (!nivel || !area) {
        mostrarError('Por favor completa todos los campos');
        return;
    }

    // Mostrar loading
    mostrarLoading(true);

    try {
        // Usar el motor de IA para generar la ruta
        const rutaGenerada = zentriAI.generarRuta(
            parseInt(horas), 
            nivel, 
            area, 
            situacion
        );

        // Guardar ruta en localStorage
        zentriAI.guardarRuta(rutaGenerada);

        // Guardar preferencias del usuario
        const usuario = {
            horasDisponibles: horas,
            nivel: nivel,
            area: area,
            situacion: situacion,
            fechaRegistro: new Date().toISOString()
        };
        localStorage.setItem('zentri_usuario', JSON.stringify(usuario));
        usuarioActual = usuario;

        // Mostrar resultado
        mostrarResultadoIA(rutaGenerada);

        // Redirigir al dashboard después de 3 segundos
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 3000);

    } catch (error) {
        mostrarError(error.message);
    } finally {
        mostrarLoading(false);
    }
}

/**
 * Muestra el resultado generado por la IA
 * @param {Object} ruta - Ruta generada
 */
function mostrarResultadoIA(ruta) {
    const resultadoDiv = document.getElementById('resultadoIA');
    if (!resultadoDiv) return;

    const tiempoTotal = ruta.estadisticas.tiempoTotal;
    const semanasEstimadas = ruta.estadisticas.semanasEstimadas;

    let recomendacionesHTML = '';
    if (ruta.recomendacionesIA && ruta.recomendacionesIA.length > 0) {
        recomendacionesHTML = `
            <div style="margin-top: 1rem; padding: 1rem; background: #f0f4f8; border-radius: 8px;">
                <h4 style="color: #2d3748; margin-bottom: 0.5rem;">🤖 Recomendaciones de IA:</h4>
                <ul style="list-style: none; padding: 0;">
                    ${ruta.recomendacionesIA.map(rec => `<li style="margin-bottom: 0.5rem;">${rec}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    resultadoDiv.innerHTML = `
        <div style="text-align: left; animation: slideIn 0.5s ease;">
            <h3 style="color: #2d3748; margin-bottom: 1rem; font-size: 1.5rem;">
                ✨ Ruta personalizada generada para ${ruta.area}
            </h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div style="background: linear-gradient(135deg, #667eea10, #764ba210); padding: 1rem; border-radius: 8px;">
                    <strong>Intensidad:</strong> ${ruta.intensidad}
                </div>
                <div style="background: linear-gradient(135deg, #667eea10, #764ba210); padding: 1rem; border-radius: 8px;">
                    <strong>Nivel:</strong> ${ruta.nivelActual.charAt(0).toUpperCase() + ruta.nivelActual.slice(1)}
                </div>
                <div style="background: linear-gradient(135deg, #667eea10, #764ba210); padding: 1rem; border-radius: 8px;">
                    <strong>Módulos:</strong> ${ruta.modulos.length}
                </div>
                <div style="background: linear-gradient(135deg, #667eea10, #764ba210); padding: 1rem; border-radius: 8px;">
                    <strong>Tiempo total:</strong> ${tiempoTotal} horas
                </div>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <strong>📋 Módulos a cursar:</strong>
                <ol style="margin-top: 0.5rem; margin-left: 1.5rem;">
                    ${ruta.modulos.map(m => `<li>${m.titulo} (${m.duracion})</li>`).join('')}
                </ol>
            </div>
            
            <div style="color: #667eea; margin: 1rem 0; font-style: italic;">
                ${ruta.recomendacion}
            </div>
            
            ${recomendacionesHTML}
            
            <p style="margin-top: 1.5rem; color: #718096; text-align: center;">
                ⏳ Redirigiendo a tu dashboard personalizado en 3 segundos...
            </p>
        </div>
    `;

    resultadoDiv.classList.remove('hidden');
}

/**
 * Actualiza la UI con información del usuario
 */
function actualizarUIUsuario() {
    // Actualizar elementos de UI que muestran información del usuario
    const userElements = document.querySelectorAll('.user-name');
    userElements.forEach(el => {
        if (el) el.textContent = usuarioActual?.nombre || 'Estudiante';
    });
}

/**
 * Muestra un mensaje de error
 * @param {string} mensaje - Mensaje de error
 */
function mostrarError(mensaje) {
    // Crear toast de error
    const toast = document.createElement('div');
    toast.className = 'toast error';
    toast.innerHTML = `
        <strong>❌ Error</strong>
        <p>${mensaje}</p>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/**
 * Muestra/oculta el indicador de loading
 * @param {boolean} mostrar - Si debe mostrar el loading
 */
function mostrarLoading(mostrar) {
    let loadingEl = document.getElementById('loading-spinner');
    
    if (mostrar) {
        if (!loadingEl) {
            loadingEl = document.createElement('div');
            loadingEl.id = 'loading-spinner';
            loadingEl.className = 'spinner';
            document.querySelector('.card')?.appendChild(loadingEl);
        }
    } else {
        if (loadingEl) {
            loadingEl.remove();
        }
    }
}

/**
 * Inicializa todos los event listeners
 */
function inicializarEventListeners() {
    // Formulario de perfil
    const perfilForm = document.getElementById('perfilForm');
    if (perfilForm) {
        perfilForm.addEventListener('submit', (e) => {
            e.preventDefault();
            procesarFormularioPerfil();
        });
    }

    // Botón de comenzar en hero
    const comenzarBtn = document.querySelector('.hero button');
    if (comenzarBtn) {
        comenzarBtn.addEventListener('click', mostrarEvaluacion);
    }

    // Smooth scroll para enlaces del navbar
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Procesa el formulario de perfil alternativo
 */
function procesarFormularioPerfil() {
    const situacion = document.getElementById('situacion')?.value;
    const interes = document.getElementById('interes')?.value;
    const resultado = document.getElementById('resultado');

    if (!situacion || !interes) {
        mostrarError('Por favor completa todos los campos');
        return;
    }

    // Generar recomendación simple
    let recomendacion = generarRecomendacionSimple(interes, situacion);
    
    if (resultado) {
        resultado.innerHTML = `
            <div style="padding: 1rem; background: #f0f4f8; border-radius: 8px;">
                <strong>📚 Ruta personalizada IA:</strong>
                <p style="margin-top: 0.5rem;">${recomendacion}</p>
            </div>
        `;
    }
}

/**
 * Genera recomendación simple (para el formulario alternativo)
 * @param {string} interes - Área de interés
 * @param {string} situacion - Situación personal
 * @returns {string} Recomendación
 */
function generarRecomendacionSimple(interes, situacion) {
    const recomendacionesBase = {
        tecnologia: "Iniciar con Programación Web, luego Bases de Datos y finalmente Inteligencia Artificial.",
        salud: "Anatomía básica, Primeros Auxilios y después Especialización en Enfermería.",
        negocios: "Administración, Finanzas Personales y luego Emprendimiento Digital."
    };

    const recomendacionesSituacion = {
        trabaja: " Se recomienda estudiar 1 hora diaria en modalidad flexible.",
        economica: " Se priorizarán recursos gratuitos y certificaciones accesibles.",
        orientacion: " Incluiremos un módulo de orientación vocacional antes de iniciar.",
        normal: " Seguiremos el plan estándar de aprendizaje."
    };

    return recomendacionesBase[interes] + (recomendacionesSituacion[situacion] || recomendacionesSituacion.normal);
}

// ========== EXPORTAR FUNCIONES GLOBALES ==========
window.mostrarEvaluacion = mostrarEvaluacion;
window.generarRutaIA = generarRutaIA;