CREATE DATABASE SENACYT;
USE SENACYT;
CREATE TABLE area_desempenio (
    areas_estudio_area_estudio_id  INTEGER NOT NULL,
    persona_usuarios_id            INTEGER NOT NULL
);

ALTER TABLE area_desempenio ADD CONSTRAINT area_desempenio_pk PRIMARY KEY ( areas_estudio_area_estudio_id,
                                                                            persona_usuarios_id );

CREATE TABLE areas_estudio (
    area_estudio_id  INTEGER NOT NULL AUTO_INCREMENT,
    nombre           VARCHAR(150) NOT NULL,
    decripcion       VARCHAR(250),
    PRIMARY KEY (area_estudio_id)
);

CREATE TABLE institucion (
    institucion_id  INTEGER NOT NULL AUTO_INCREMENT,
    nombre          VARCHAR(200) NOT NULL,
    direccion       VARCHAR(200),
    PRIMARY KEY (institucion_id)
);

CREATE TABLE logro_academico (
    logro_id                    INTEGER NOT NULL AUTO_INCREMENT,
    anio                        INTEGER NOT NULL,
    titulo                      VARCHAR(200) NOT NULL,
    tipo_logro_tipo_logro_id    INTEGER NOT NULL,
    persona_usuarios_id         INTEGER NOT NULL,
    institucion_institucion_id  INTEGER NOT NULL,
    PRIMARY KEY (logro_id)
);

CREATE TABLE persona (
    usuarios_id       INTEGER NOT NULL AUTO_INCREMENT,
    primer_nombre     VARCHAR(40) NOT NULL,
    segundo_nombre    VARCHAR(50),
    tercer_nombre     VARCHAR(40),
    primer_apellido   VARCHAR(40) NOT NULL,
    segundo_apellido  VARCHAR(40),
    telefono          INTEGER NOT NULL,
    fecha_nacimiento  DATE NOT NULL,
    direccion         VARCHAR(100) NOT NULL,
    cui               VARCHAR(13) NOT NULL,
    genero            INTEGER NOT NULL,
    created_at        DATETIME DEFAULT NOW(),
    usuario           VARCHAR(25) NOT NULL,
    contrasenia       VARCHAR(30) NOT NULL,
    PRIMARY KEY(usuarios_id)
);

CREATE TABLE tipo_logro (
    tipo_logro_id  INTEGER NOT NULL AUTO_INCREMENT,
    descripcion    VARCHAR(200) NOT NULL,
    PRIMARY KEY(tipo_logro_id)
);


ALTER TABLE area_desempenio
    ADD CONSTRAINT area_desempenio_areas_estudio FOREIGN KEY ( areas_estudio_area_estudio_id )
        REFERENCES areas_estudio ( area_estudio_id );

ALTER TABLE area_desempenio
    ADD CONSTRAINT area_desempenio_persona_fk FOREIGN KEY ( persona_usuarios_id )
        REFERENCES persona ( usuarios_id );

ALTER TABLE logro_academico
    ADD CONSTRAINT logro_academico_institucion_fk FOREIGN KEY ( institucion_institucion_id )
        REFERENCES institucion ( institucion_id );

ALTER TABLE logro_academico
    ADD CONSTRAINT logro_academico_persona_fk FOREIGN KEY ( persona_usuarios_id )
        REFERENCES persona ( usuarios_id );

ALTER TABLE logro_academico
    ADD CONSTRAINT logro_academico_tipo_logro_fk FOREIGN KEY ( tipo_logro_tipo_logro_id )
        REFERENCES tipo_logro ( tipo_logro_id );

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
       
ALTER TABLE persona ADD CONSTRAINT persona_UN UNIQUE KEY (usuario);
ALTER TABLE persona ADD CONSTRAINT persona_cui_UN UNIQUE KEY (cui);
