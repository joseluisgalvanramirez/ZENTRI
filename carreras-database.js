/**
 * ZENTRI VOCACIONAL - Base de datos de carreras profesionales
 * Versión completa con todas las carreras
 */

const CARRERAS_DB = {
    tecnologia: {
        nombre: "Tecnología",
        icono: "💻",
        color: "#4158D0",
        descripcion: "Carreras enfocadas en innovación, desarrollo de software, sistemas y transformación digital",
        carreras: [
            {
                id: "ing-software",
                nombre: "Ingeniería en Software",
                duracion: "4-5 años",
                descripcion: "Diseño, desarrollo y mantenimiento de sistemas de software",
                descripcion_larga: "Aprenderás a crear aplicaciones web, móviles y de escritorio. Dominarás lenguajes de programación, bases de datos y metodologías ágiles.",
                campo_laboral: [
                    "Desarrollador de aplicaciones",
                    "Arquitecto de software",
                    "Gerente de proyectos TI",
                    "Ingeniero de calidad",
                    "Consultor tecnológico"
                ],
                salario_promedio: "$25,000 - $60,000 MXN",
                habilidades_requeridas: ["Lógica matemática", "Inglés técnico", "Pensamiento analítico", "Resolución de problemas"],
                habilidades_blandas: ["Trabajo en equipo", "Comunicación", "Creatividad", "Adaptabilidad"],
                universidades: ["TEC de Monterrey", "UNAM", "IPN", "Universidad Iberoamericana", "ITESO"],
                testimonial: "Lo mejor de Ing. en Software es que puedes crear soluciones que impactan a millones de personas desde tu computadora"
            },
            {
                id: "ing-sistemas",
                nombre: "Ingeniería en Sistemas",
                duracion: "4 años",
                descripcion: "Gestión de infraestructura tecnológica y redes",
                descripcion_larga: "Te especializarás en administrar servidores, redes, seguridad informática y la infraestructura tecnológica de las organizaciones.",
                campo_laboral: [
                    "Administrador de redes",
                    "Consultor TI",
                    "Seguridad informática",
                    "Arquitecto de infraestructura",
                    "DevOps"
                ],
                salario_promedio: "$22,000 - $50,000 MXN",
                habilidades_requeridas: ["Redes", "Sistemas operativos", "Seguridad", "Cloud computing"],
                habilidades_blandas: ["Análisis", "Toma de decisiones", "Trabajo bajo presión"],
                universidades: ["UNAM", "IPN", "Universidad Anáhuac", "TEC de Monterrey"],
                testimonial: "Ser ingeniero en sistemas es ser el arquitecto de la infraestructura digital de las empresas"
            },
            {
                id: "ia",
                nombre: "Inteligencia Artificial",
                duracion: "4 años",
                descripcion: "Desarrollo de sistemas inteligentes y machine learning",
                descripcion_larga: "Aprenderás a crear algoritmos que aprenden, redes neuronales, procesamiento de lenguaje natural y visión por computadora.",
                campo_laboral: [
                    "Ingeniero de machine learning",
                    "Científico de datos",
                    "Especialista en IA",
                    "Investigador",
                    "Desarrollador de chatbots"
                ],
                salario_promedio: "$30,000 - $80,000 MXN",
                habilidades_requeridas: ["Matemáticas avanzadas", "Estadística", "Programación", "Algoritmos"],
                habilidades_blandas: ["Curiosidad", "Pensamiento crítico", "Innovación"],
                universidades: ["TEC de Monterrey", "UNAM", "IPN", "ITAM"],
                testimonial: "La IA está transformando el mundo y tú puedes ser parte de esa transformación"
            }
        ]
    },
    
    salud: {
        nombre: "Salud",
        icono: "🏥",
        color: "#4CAF50",
        descripcion: "Carreras dedicadas al cuidado de la salud y el bienestar humano",
        carreras: [
            {
                id: "medicina",
                nombre: "Medicina",
                duracion: "6-7 años",
                descripcion: "Prevención, diagnóstico y tratamiento de enfermedades",
                descripcion_larga: "Te convertirás en un profesional capacitado para diagnosticar, tratar y prevenir enfermedades, mejorando la calidad de vida de las personas.",
                campo_laboral: [
                    "Médico general",
                    "Especialista (cardiología, pediatría, etc.)",
                    "Investigador clínico",
                    "Salud pública",
                    "Docencia universitaria"
                ],
                salario_promedio: "$25,000 - $80,000 MXN",
                habilidades_requeridas: ["Ciencias biológicas", "Memoria", "Empatía", "Toma de decisiones bajo presión"],
                habilidades_blandas: ["Empatía", "Comunicación", "Trabajo en equipo", "Resiliencia"],
                universidades: ["UNAM", "IPN", "Universidad Anáhuac", "La Salle", "Universidad Autónoma Metropolitana"],
                testimonial: "Ser médico es un privilegio, cada vida que tocas te transforma y te hace más humano"
            },
            {
                id: "enfermeria",
                nombre: "Enfermería",
                duracion: "4 años",
                descripcion: "Cuidado integral de pacientes y asistencia en procedimientos médicos",
                descripcion_larga: "Aprenderás a proporcionar cuidados de calidad a pacientes, asistir en procedimientos médicos y promover la salud comunitaria.",
                campo_laboral: [
                    "Enfermero general",
                    "Enfermero especializado",
                    "Gestor de cuidados",
                    "Salud comunitaria",
                    "Docencia"
                ],
                salario_promedio: "$15,000 - $35,000 MXN",
                habilidades_requeridas: ["Biología", "Procedimientos clínicos", "Empatía", "Resistencia física"],
                habilidades_blandas: ["Paciencia", "Compasión", "Trabajo en equipo", "Comunicación"],
                universidades: ["UNAM", "IPN", "Universidades públicas", "Universidad Autónoma de Guadalajara"],
                testimonial: "La enfermería es el corazón de la medicina, somos quienes pasamos más tiempo con los pacientes"
            },
            {
                id: "psicologia",
                nombre: "Psicología",
                duracion: "4-5 años",
                descripcion: "Estudio de la mente humana y el comportamiento",
                descripcion_larga: "Comprenderás la mente humana, las emociones y el comportamiento, ayudando a las personas a superar sus dificultades y alcanzar su bienestar.",
                campo_laboral: [
                    "Psicólogo clínico",
                    "Psicólogo educativo",
                    "Psicólogo organizacional",
                    "Terapeuta",
                    "Investigador"
                ],
                salario_promedio: "$12,000 - $30,000 MXN",
                habilidades_requeridas: ["Comprensión lectora", "Análisis", "Escucha activa", "Empatía"],
                habilidades_blandas: ["Escucha activa", "Empatía", "Paciencia", "Ética profesional"],
                universidades: ["UNAM", "Universidad Iberoamericana", "TEC de Monterrey", "Universidad Autónoma Metropolitana"],
                testimonial: "Ser psicólogo es ayudar a las personas a encontrar su propio camino hacia el bienestar"
            }
        ]
    },
    
    sociales: {
        nombre: "Ciencias Sociales",
        icono: "📚",
        color: "#FF6B6B",
        descripcion: "Estudio de la sociedad, la cultura y el comportamiento humano",
        carreras: [
            {
                id: "derecho",
                nombre: "Derecho",
                duracion: "5 años",
                descripcion: "Estudio y aplicación de las leyes",
                descripcion_larga: "Conocerás el sistema jurídico, aprenderás a interpretar leyes y defender los derechos de las personas y organizaciones.",
                campo_laboral: [
                    "Abogado litigante",
                    "Asesor jurídico",
                    "Juez",
                    "Notario",
                    "Consultor legal empresarial"
                ],
                salario_promedio: "$18,000 - $50,000 MXN",
                habilidades_requeridas: ["Argumentación", "Memoria", "Redacción", "Análisis"],
                habilidades_blandas: ["Oratoria", "Negociación", "Ética", "Persuasión"],
                universidades: ["UNAM", "Universidad Iberoamericana", "TEC de Monterrey", "Universidad Panamericana"],
                testimonial: "El derecho es la herramienta para construir una sociedad más justa y equitativa"
            },
            {
                id: "comunicacion",
                nombre: "Comunicación",
                duracion: "4 años",
                descripcion: "Estudio de los procesos de comunicación en medios y organizaciones",
                descripcion_larga: "Aprenderás a comunicar ideas efectivamente a través de diferentes medios y plataformas, creando contenido de impacto.",
                campo_laboral: [
                    "Periodista",
                    "Community manager",
                    "Productor de medios",
                    "Relaciones públicas",
                    "Creador de contenido"
                ],
                salario_promedio: "$12,000 - $35,000 MXN",
                habilidades_requeridas: ["Redacción", "Creatividad", "Expresión oral", "Curiosidad"],
                habilidades_blandas: ["Creatividad", "Comunicación", "Trabajo en equipo", "Adaptabilidad"],
                universidades: ["UNAM", "Universidad Iberoamericana", "TEC de Monterrey", "Universidad Anáhuac"],
                testimonial: "La comunicación es el puente entre las ideas y las personas"
            }
        ]
    },
    
    negocios: {
        nombre: "Negocios",
        icono: "📊",
        color: "#FFA500",
        descripcion: "Carreras enfocadas en la gestión empresarial y el mundo de los negocios",
        carreras: [
            {
                id: "administracion",
                nombre: "Administración de Empresas",
                duracion: "4 años",
                descripcion: "Gestión y dirección de organizaciones",
                descripcion_larga: "Desarrollarás habilidades para liderar equipos, tomar decisiones estratégicas y hacer crecer negocios en entornos competitivos.",
                campo_laboral: [
                    "Gerente general",
                    "Consultor empresarial",
                    "Emprendedor",
                    "Analista de negocios",
                    "Director de operaciones"
                ],
                salario_promedio: "$18,000 - $45,000 MXN",
                habilidades_requeridas: ["Matemáticas financieras", "Liderazgo", "Planeación estratégica"],
                habilidades_blandas: ["Liderazgo", "Negociación", "Trabajo en equipo", "Visión estratégica"],
                universidades: ["TEC de Monterrey", "UNAM", "IPN", "Universidad Anáhuac", "ITESO"],
                testimonial: "Administración te permite ver la empresa como un todo y tomar decisiones estratégicas"
            },
            {
                id: "marketing",
                nombre: "Mercadotecnia",
                duracion: "4 años",
                descripcion: "Estrategias de mercado y publicidad",
                descripcion_larga: "Aprenderás a entender al consumidor, crear estrategias de marketing digital y tradicional, y construir marcas poderosas.",
                campo_laboral: [
                    "Gerente de marketing",
                    "Community manager",
                    "Investigador de mercados",
                    "Brand manager",
                    "Publicista"
                ],
                salario_promedio: "$15,000 - $38,000 MXN",
                habilidades_requeridas: ["Creatividad", "Comunicación", "Análisis", "Psicología del consumidor"],
                habilidades_blandas: ["Creatividad", "Persuasión", "Comunicación", "Adaptabilidad"],
                universidades: ["TEC de Monterrey", "Universidad Iberoamericana", "IPN", "La Salle", "Universidad Anáhuac"],
                testimonial: "Marketing es entender qué necesita la gente y cómo comunicárselo de la mejor manera"
            },
            {
                id: "finanzas",
                nombre: "Finanzas",
                duracion: "4 años",
                descripcion: "Gestión del dinero, inversiones y mercados financieros",
                descripcion_larga: "Te especializarás en análisis financiero, inversiones, evaluación de riesgos y creación de valor en las organizaciones.",
                campo_laboral: [
                    "Analista financiero",
                    "Banquero de inversión",
                    "Asesor financiero",
                    "Gestor de fondos",
                    "Tesorero empresarial"
                ],
                salario_promedio: "$20,000 - $60,000 MXN",
                habilidades_requeridas: ["Matemáticas financieras", "Análisis de riesgo", "Economía", "Estadística"],
                habilidades_blandas: ["Toma de decisiones", "Análisis", "Negociación", "Visión a futuro"],
                universidades: ["TEC de Monterrey", "UNAM", "ITAM", "Universidad Anáhuac", "IPN"],
                testimonial: "Las finanzas son el motor que mueve el mundo, todo negocio necesita financiamiento"
            }
        ]
    },
    
    artes: {
        nombre: "Artes y Diseño",
        icono: "🎨",
        color: "#9C27B0",
        descripcion: "Carreras creativas para expresar ideas y crear belleza",
        carreras: [
            {
                id: "diseno-grafico",
                nombre: "Diseño Gráfico",
                duracion: "4 años",
                descripcion: "Comunicación visual y diseño digital",
                descripcion_larga: "Aprenderás a comunicar ideas a través de imágenes, tipografía, color y composición, creando piezas visuales impactantes.",
                campo_laboral: [
                    "Diseñador visual",
                    "Director de arte",
                    "Ilustrador",
                    "Diseñador UX/UI",
                    "Branding"
                ],
                salario_promedio: "$12,000 - $35,000 MXN",
                habilidades_requeridas: ["Creatividad", "Software diseño", "Comunicación visual", "Tipografía"],
                habilidades_blandas: ["Creatividad", "Comunicación visual", "Trabajo con clientes", "Feedback"],
                universidades: ["UNAM", "CENTRO", "Universidad Iberoamericana", "La Salle", "TEC de Monterrey"],
                testimonial: "El diseño gráfico es hacer que lo importante se vea increíble"
            },
            {
                id: "arquitectura",
                nombre: "Arquitectura",
                duracion: "5 años",
                descripcion: "Diseño de espacios habitables y creación de entornos",
                descripcion_larga: "Diseñarás espacios funcionales y estéticos donde las personas vivirán, trabajarán y soñarán, combinando arte y técnica.",
                campo_laboral: [
                    "Arquitecto diseñador",
                    "Urbanista",
                    "Restaurador",
                    "Paisajista",
                    "Diseñador de interiores"
                ],
                salario_promedio: "$18,000 - $45,000 MXN",
                habilidades_requeridas: ["Dibujo", "Creatividad", "Matemáticas", "Visualización espacial"],
                habilidades_blandas: ["Creatividad", "Comunicación visual", "Sensibilidad estética"],
                universidades: ["UNAM", "Universidad Iberoamericana", "TEC de Monterrey", "Universidad La Salle"],
                testimonial: "Arquitectura es el arte de convertir los sueños en espacios reales"
            }
        ]
    },
    
    exactas: {
        nombre: "Ciencias Exactas",
        icono: "🔬",
        color: "#26A69A",
        descripcion: "Estudio de la naturaleza y los fenómenos del mundo físico",
        carreras: [
            {
                id: "biologia",
                nombre: "Biología",
                duracion: "4 años",
                descripcion: "Estudio de los seres vivos",
                descripcion_larga: "Explorarás la vida en todas sus formas, desde microorganismos hasta ecosistemas, contribuyendo al conocimiento y conservación de la naturaleza.",
                campo_laboral: [
                    "Investigador",
                    "Biotecnología",
                    "Consultor ambiental",
                    "Docente",
                    "Conservación"
                ],
                salario_promedio: "$12,000 - $30,000 MXN",
                habilidades_requeridas: ["Método científico", "Observación", "Análisis", "Biología"],
                habilidades_blandas: ["Curiosidad", "Paciencia", "Trabajo de campo", "Ética"],
                universidades: ["UNAM", "IPN", "UAM", "Universidad Autónoma Metropolitana"],
                testimonial: "La biología te permite entender el milagro de la vida y cómo protegerlo"
            },
            {
                id: "quimica",
                nombre: "Química",
                duracion: "4 años",
                descripcion: "Estudio de la materia y sus transformaciones",
                descripcion_larga: "Comprenderás la composición, estructura y propiedades de la materia, creando nuevos materiales y medicamentos.",
                campo_laboral: [
                    "Químico analítico",
                    "Investigador",
                    "Industria farmacéutica",
                    "Control de calidad",
                    "Docencia"
                ],
                salario_promedio: "$14,000 - $35,000 MXN",
                habilidades_requeridas: ["Química", "Matemáticas", "Método científico", "Laboratorio"],
                habilidades_blandas: ["Precisión", "Paciencia", "Trabajo en equipo", "Seguridad"],
                universidades: ["UNAM", "IPN", "UAM", "Universidad Autónoma Metropolitana"],
                testimonial: "La química está en todo, desde los medicamentos hasta los alimentos que comemos"
            }
        ]
    }
};

const PERFILES_VOCACIONALES = {
    analitico: {
        nombre: "Analítico",
        descripcion: "Te gusta analizar datos, resolver problemas lógicos y trabajar con información detallada",
        icono: "🔍",
        carreras_recomendadas: ["ing-software", "ing-sistemas", "biologia", "finanzas", "quimica"]
    },
    creativo: {
        nombre: "Creativo",
        descripcion: "Tu fuerte es la creatividad, la innovación y expresar ideas",
        icono: "🎨",
        carreras_recomendadas: ["diseno-grafico", "arquitectura", "marketing", "comunicacion"]
    },
    social: {
        nombre: "Social",
        descripcion: "Disfrutas ayudar a otros y trabajar con personas",
        icono: "🤝",
        carreras_recomendadas: ["psicologia", "medicina", "enfermeria", "derecho", "comunicacion"]
    },
    emprendedor: {
        nombre: "Emprendedor",
        descripcion: "Tienes visión de negocios y liderazgo",
        icono: "🚀",
        carreras_recomendadas: ["administracion", "marketing", "finanzas", "comunicacion"]
    },
    practico: {
        nombre: "Práctico",
        descripcion: "Te gusta construir y ver resultados tangibles",
        icono: "🛠️",
        carreras_recomendadas: ["ing-sistemas", "arquitectura", "medicina", "enfermeria"]
    },
    investigador: {
        nombre: "Investigador",
        descripcion: "Tienes curiosidad científica y te gusta descubrir",
        icono: "🔬",
        carreras_recomendadas: ["biologia", "quimica", "medicina", "ia", "psicologia"]
    }
};

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
    window.CARRERAS_DB = CARRERAS_DB;
    window.PERFILES_VOCACIONALES = PERFILES_VOCACIONALES;
}