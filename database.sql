-- Base de datos Zentri Vocacional
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    email TEXT UNIQUE,
    perfil_principal TEXT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS resultados_test (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    perfil TEXT,
    recomendaciones TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS carreras (
    id TEXT PRIMARY KEY,
    nombre TEXT,
    area TEXT,
    duracion TEXT,
    salario_promedio TEXT,
    descripcion TEXT
);