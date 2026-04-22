/**
 * Dashboard de Zentri
 * Maneja la visualización y progreso del usuario en su ruta de aprendizaje
 */

// ========== VARIABLES GLOBALES ==========
let rutaActual = null;
let progresoActual = {
    modulosCompletados: [],
    porcentaje: 0
};

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('📊 Dashboard Zentri inicializado');
    
    // Cargar ruta guardada
    rutaActual = zentriAI.cargarRuta();
    
    if (!rutaActual) {
        // Si no hay ruta, redirigir a la página principal
        window.location.href = 'index.html';
        return;
    }

    // Cargar progreso guardado
    cargarProgresoGuardado();
    
    // Inicializar dashboard
    inicializarDashboard();
});

// ========== FUNCIONES PRINCIPALES ==========

/**
 * Inicializa el dashboard con los datos del usuario
 */
function inicializarDashboard() {
    if (!rutaActual) return;

    // Actualizar estadísticas
    actualizarEstadisticas();
    
    // Renderizar módulos
    renderizarModulos();
    
    // Actualizar barra de progreso
    actualizarBarraProgreso();
    
    // Mostrar recomendaciones
    mostrarRecomendaciones();
}

/**
 * Actualiza las tarjetas de estadísticas
 */
function actualizarEstadisticas() {
    const statsContainer = document.getElementById('stats');
    if (!statsContainer) return;

    const modulosCompletados = progresoActual.modulosCompletados.length;
    const totalModulos = rutaActual.modulos.length;
    const progreso = (modulosCompletados / totalModulos) * 100;

    statsContainer.innerHTML = `
        <div class="stat-card">
            <h3>Progreso general</h3>
            <div class="number">${Math.round(progreso)}%</div>
            <div class="progreso-container">
                <div class="barra-progreso" id="barra-stats" style="width: ${progreso}%"></div>
            </div>
        </div>
        <div class="stat-card">
            <h3>Módulos</h3>
            <div class="number">${modulosCompletados}/${totalModulos}</div>
        </div>
        <div class="stat-card">
            <h3>Intensidad</h3>
            <div class="number">${rutaActual.intensidad}</div>
        </div>
        <div class="stat-card">
            <h3>Nivel</h3>
            <div class="number">${rutaActual.nivelActual.charAt(0).toUpperCase() + rutaActual.nivelActual.slice(1)}</div>
        </div>
    `;
}

/**
 * Renderiza los módulos de aprendizaje
 */
function renderizarModulos() {
    const contenedor = document.getElementById('modulos');
    if (!contenedor || !rutaActual) return;

    contenedor.innerHTML = '';

    rutaActual.modulos.forEach((modulo, index) => {
        const completado = progresoActual.modulosCompletados.includes(modulo.id);
        
        const div = document.createElement('div');
        div.className = 'modulo-card';
        
        // Determinar ícono según el área
        const icono = obtenerIconoModulo(modulo.titulo, rutaActual.area);
        
        div.innerHTML = `
            <span class="badge ia">${icono} Módulo ${index + 1} • ${modulo.nivel}</span>
            <h3>${modulo.titulo}</h3>
            <p>${modulo.descripcion}</p>
            <div style="margin-bottom: 1rem;">
                <span style="background: #e2e8f0; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">
                    ⏱️ ${modulo.duracion}
                </span>
            </div>
            <button onclick="completarModulo(${modulo.id}, ${index})" 
                    id="btn-${modulo.id}"
                    ${completado ? 'disabled' : ''}
                    class="${completado ? 'completado' : ''}">
                ${completado ? '✓ Completado' : 'Marcar como completado'}
            </button>
        `;
        
        contenedor.appendChild(div);
    });
}

/**
 * Obtiene icono para el módulo según su título y área
 */
function obtenerIconoModulo(titulo, area) {
    if (titulo.includes('Programación') || titulo.includes('Desarrollo')) return '💻';
    if (titulo.includes('Base de Datos')) return '🗄️';
    if (titulo.includes('Inteligencia Artificial')) return '🤖';
    if (titulo.includes('Anatomía')) return '🫀';
    if (titulo.includes('Primeros Auxilios')) return '🚑';
    if (titulo.includes('Salud Pública')) return '🏥';
    if (titulo.includes('Administración')) return '📊';
    if (titulo.includes('Marketing')) return '📱';
    if (titulo.includes('Finanzas')) return '💰';
    if (titulo.includes('Emprendimiento')) return '🚀';
    return '📚';
}

/**
 * Marca un módulo como completado
 * @param {number} moduloId - ID del módulo
 * @param {number} index - Índice del módulo
 */
function completarModulo(moduloId, index) {
    if (!rutaActual) return;

    // Verificar si ya está completado
    if (progresoActual.modulosCompletados.includes(moduloId)) {
        return;
    }

    // Agregar a completados
    progresoActual.modulosCompletados.push(moduloId);
    
    // Calcular nuevo progreso
    progresoActual.porcentaje = (progresoActual.modulosCompletados.length / rutaActual.modulos.length) * 100;
    
    // Guardar progreso
    guardarProgreso();
    
    // Actualizar UI
    actualizarUICompletado(moduloId);
    
    // Mostrar mensaje de éxito
    mostrarMensajeExito('✅ Módulo completado. ¡Sigue así!');
    
    // Verificar si completó todos
    if (progresoActual.modulosCompletados.length === rutaActual.modulos.length) {
        setTimeout(() => {
            mostrarFelicitaciones();
        }, 500);
    }
}

/**
 * Actualiza la UI después de completar un módulo
 */
function actualizarUICompletado(moduloId) {
    // Deshabilitar botón
    const btn = document.getElementById(`btn-${moduloId}`);
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '✓ Completado';
    }
    
    // Actualizar estadísticas
    actualizarEstadisticas();
    
    // Actualizar barra de progreso principal
    actualizarBarraProgreso();
}

/**
 * Actualiza la barra de progreso principal
 */
function actualizarBarraProgreso() {
    const barra = document.getElementById('barra');
    if (barra) {
        barra.style.width = progresoActual.porcentaje + '%';
    }
}

/**
 * Muestra las recomendaciones personalizadas
 */
function mostrarRecomendaciones() {
    const recomendacionDiv = document.getElementById('recomendacion');
    if (!recomendacionDiv || !rutaActual) return;

    const completados = progresoActual.modulosCompletados.length;
    const total = rutaActual.modulos.length;
    
    if (completados === total) {
        recomendacionDiv.innerHTML = `
            <strong>🎉 ¡Felicidades! Has completado todos los módulos.</strong>
            <p style="margin-top: 0.5rem;">¿Listo para el siguiente nivel? Vuelve al inicio para generar una nueva ruta más avanzada.</p>
        `;
    } else {
        // Recomendar siguiente módulo
        const siguiente = rutaActual.modulos.find(m => !progresoActual.modulosCompletados.includes(m.id));
        
        if (siguiente) {
            recomendacionDiv.innerHTML = `
                <strong>✨ Próximo módulo recomendado:</strong>
                <p style="margin-top: 0.5rem;">${siguiente.titulo} - ${siguiente.descripcion}</p>
                <p style="margin-top: 0.5rem; color: #667eea;">⏱️ Duración estimada: ${siguiente.duracion}</p>
            `;
        } else {
            recomendacionDiv.innerHTML = `
                <strong>📝 Continúa con tu ruta de aprendizaje</strong>
                <p>Mantén el ritmo y completa todos los módulos para alcanzar tu meta.</p>
            `;
        }
    }
}

/**
 * Guarda el progreso en localStorage
 */
function guardarProgreso() {
    try {
        localStorage.setItem('zentri_progreso', JSON.stringify(progresoActual));
        
        // También guardar en el backend si está disponible
        if (usuarioActual && usuarioActual.id) {
            guardarProgresoBackend();
        }
    } catch (error) {
        console.error('Error guardando progreso:', error);
    }
}

/**
 * Guarda el progreso en el backend (simulado)
 */
async function guardarProgresoBackend() {
    // Esta función se implementaría con fetch al backend real
    console.log('Progreso guardado en backend');
}

/**
 * Carga el progreso guardado
 */
function cargarProgresoGuardado() {
    try {
        const progresoGuardado = localStorage.getItem('zentri_progreso');
        if (progresoGuardado) {
            const prog = JSON.parse(progresoGuardado);
            
            // Validar que el progreso corresponda a la ruta actual
            if (rutaActual && prog.modulosCompletados) {
                const modulosValidos = prog.modulosCompletados.every(id => 
                    rutaActual.modulos.some(m => m.id === id)
                );
                
                if (modulosValidos) {
                    progresoActual = prog;
                }
            }
        }
    } catch (error) {
        console.error('Error cargando progreso:', error);
    }
}

/**
 * Muestra un mensaje de éxito temporal
 */
function mostrarMensajeExito(mensaje) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = mensaje;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/**
 * Muestra felicitaciones por completar todos los módulos
 */
function mostrarFelicitaciones() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 2000;
        text-align: center;
        animation: fadeIn 0.5s ease;
    `;
    
    modal.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
        <h2 style="margin-bottom: 1rem;">¡Felicidades!</h2>
        <p style="margin-bottom: 2rem; color: #718096;">Has completado todos los módulos de tu ruta de aprendizaje.</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button onclick="reiniciarRuta()" class="btn-secondary" style="padding: 0.8rem 2rem;">Nueva Ruta</button>
            <button onclick="cerrarModal(this)" class="btn" style="padding: 0.8rem 2rem;">Seguir Practicando</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 1999;
        animation: fadeIn 0.3s ease;
    `;
    overlay.onclick = () => {
        modal.remove();
        overlay.remove();
    };
    
    document.body.appendChild(overlay);
}

/**
 * Reinicia la ruta actual
 */
function reiniciarRuta() {
    // Limpiar progreso
    progresoActual = {
        modulosCompletados: [],
        porcentaje: 0
    };
    
    localStorage.removeItem('zentri_progreso');
    
    // Recargar dashboard
    window.location.reload();
}

/**
 * Cierra un modal
 */
function cerrarModal(elemento) {
    const modal = elemento.closest('div[style*="fixed"]');
    const overlay = document.querySelector('div[style*="background: rgba(0,0,0,0.5)"]');
    if (modal) modal.remove();
    if (overlay) overlay.remove();
}

/**
 * Navega de vuelta al inicio
 */
function volverInicio() {
    window.location.href = 'index.html';
}

// ========== EXPORTAR FUNCIONES GLOBALES ==========
window.completarModulo = completarModulo;
window.reiniciarRuta = reiniciarRuta;
window.volverInicio = volverInicio;
window.cerrarModal = cerrarModal;