/**
 * ZENTRI VOCACIONAL - Página de resultados
 */

document.addEventListener('DOMContentLoaded', function() {
    if (!window.vocacionalAI) {
        console.error('VocacionalAI no disponible');
        return;
    }

    const perfil = window.vocacionalAI.cargarResultados();
    const recomendaciones = window.vocacionalAI.recomendaciones;
    const container = document.getElementById('resultados-container');
    
    if (!container) return;

    if (!perfil || !recomendaciones || recomendaciones.length === 0) {
        container.innerHTML = `
            <div class="no-resultados">
                <div style="font-size: 4rem; margin-bottom: 2rem;">😕</div>
                <h2>No has realizado el test aún</h2>
                <p>Completa el test vocacional para descubrir tu perfil y obtener recomendaciones personalizadas.</p>
                <a href="test-vocacional.html" class="btn-hero-primary" style="margin-top: 2rem;">
                    Realizar test ahora
                </a>
            </div>
        `;
        return;
    }

    const perfilInfo = window.PERFILES_VOCACIONALES[perfil.principal] || {
        nombre: "Personalizado",
        descripcion: "Perfil único determinado por IA",
        icono: "🎯"
    };

    // Ordenar puntajes de mayor a menor
    const puntajesOrdenados = Object.entries(perfil.puntajes)
        .sort((a, b) => b[1] - a[1]);

    let puntajesHTML = '';
    puntajesOrdenados.forEach(([tipo, puntaje]) => {
        const nombrePerfil = window.PERFILES_VOCACIONALES[tipo]?.nombre || tipo;
        puntajesHTML += `
            <div class="puntaje-item">
                <div class="puntaje-header">
                    <span class="puntaje-nombre">${nombrePerfil}</span>
                    <span class="puntaje-valor">${puntaje}%</span>
                </div>
                <div class="puntaje-barra">
                    <div class="puntaje-fill" style="width: ${puntaje}%"></div>
                </div>
            </div>
        `;
    });

    let carrerasHTML = '';
    recomendaciones.slice(0, 6).forEach(carrera => {
        carrerasHTML += `
            <div class="carrera-card" onclick="verCarrera('${carrera.id}')">
                <div class="carrera-header">
                    <span class="carrera-nombre">${carrera.nombre}</span>
                    <span class="recomendacion-badge ${carrera.nivel_recomendacion}">
                        ${carrera.nivel_recomendacion === 'alto' ? '⭐ Alta' : '📌 Media'}
                    </span>
                </div>
                <p class="carrera-descripcion">${carrera.descripcion.substring(0, 120)}...</p>
                <div class="carrera-metadata">
                    <span>⏱️ ${carrera.duracion}</span>
                    <span>💰 ${carrera.salario_promedio}</span>
                </div>
                <div class="carrera-area" style="background: ${carrera.area_color}20; color: ${carrera.area_color};">
                    ${carrera.area_icono} ${carrera.area}
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="perfil-header">
            <div class="perfil-icon">${perfilInfo.icono}</div>
            <h1 class="perfil-titulo">Perfil ${perfilInfo.nombre}</h1>
            <p class="perfil-descripcion">${perfilInfo.descripcion}</p>
        </div>

        <h2 style="text-align: center; margin: 2rem 0;">Tus áreas de fortaleza</h2>
        <div class="puntajes-grid">
            ${puntajesHTML}
        </div>

        <div class="recomendaciones-section">
            <h2>🎓 Carreras recomendadas para ti</h2>
            <div class="carreras-grid">
                ${carrerasHTML}
            </div>
        </div>

        <div class="acciones" style="display: flex; gap: 1rem; justify-content: center; margin-top: 3rem;">
            <a href="test-vocacional.html" class="btn-hero-primary">
                Reintentar test
            </a>
            <a href="carreras.html" class="btn-secundario" style="background: white; color: #4158D0; padding: 1rem 2rem; border-radius: 50px; text-decoration: none; font-weight: 600; border: 2px solid #4158D0;">
                Explorar todas las carreras
            </a>
        </div>
    `;
});

function verCarrera(id) {
    window.location.href = `carrera.html?id=${id}`;
}