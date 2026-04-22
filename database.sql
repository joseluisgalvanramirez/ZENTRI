-- Active: 1770173543998@@127.0.0.1@3306@mysql
-- Base de datos Zentri Vocacional
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    perfil_principal VARCHAR(255),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS resultados_test (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    perfil VARCHAR(255),
    recomendaciones TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS carreras (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(255),
    area VARCHAR(255),
    duracion VARCHAR(100),
    salario_promedio VARCHAR(100),
    descripcion TEXT
);

