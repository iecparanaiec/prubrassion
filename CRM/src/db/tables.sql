create table usuarios (
	id SERIAL PRIMARY KEY,
	email VARCHAR NOT NULL,
	nombre VARCHAR NOT NULL,
	fecha_registro TIMESTAMP DEFAULT NOW(),
	genero VARCHAR,
	altura INTEGER NOT NULL,
	edad INTEGER NOT NULL,
	veces_entrena INTEGER DEFAULT 1,
	objetivo VARCHAR,
	CHECK(objetivo IN ('Bajar grasa corporal', 'Definir', 'Aumentar masa corporal')),
	CHECK(genero in ('Masculino', 'Femenino', 'Otro'))
);


create table gimnasios (
	id SERIAL PRIMARY KEY,
	nombre VARCHAR NOT NULL
);


create table entrenadores (
	id SERIAL PRIMARY KEY,
	usuario_id INTEGER REFERENCES usuarios (id),
	gimnasio_id INTEGER REFERENCES gimnasios (id)
);


create table rutinas (
	id SERIAL PRIMARY KEY,
	entrenador_id INTEGER REFERENCES entrenadores (id),
	tipo VARCHAR DEFAULT 'Hipertrofia'
);


create table dia (
	id SERIAL PRIMARY KEY,
	numero INTEGER NOT NULL DEFAULT 1
);


create table ejercicios (
	id SERIAL PRIMARY KEY,
	nombre VARCHAR NOT NULL,
	series INTEGER NOT NULL DEFAULT 1,
	peso INTEGER,
	repeticiones INTEGER NOT NULL DEFAULT 1
);


create table ejercicios_dias (
	dia_id INTEGER REFERENCES dia (id),
	ejercicio_id INTEGER REFERENCES ejercicios (id)
);


create table ejercicios_assets (
	ejercicio_id INTEGER REFERENCES ejercicios (id),
	url VARCHAR NOT NULL,
	is_video BOOLEAN NOT NULL DEFAULT FALSE
);