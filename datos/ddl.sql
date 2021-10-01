CREATE TABLE area_desempenio (
    areas_estudio_area_estudio_id  INTEGER NOT NULL,
    persona_usuarios_id            INTEGER NOT NULL
);

ALTER TABLE area_desempenio ADD CONSTRAINT area_desempenio_pk PRIMARY KEY ( areas_estudio_area_estudio_id,
                                                                            persona_usuarios_id );

CREATE TABLE areas_estudio (
    area_estudio_id  INTEGER NOT NULL,
    nombre           VARCHAR(150) NOT NULL,
    decripcion       VARCHAR(250)
);

ALTER TABLE areas_estudio ADD CONSTRAINT areas_estudio_pk PRIMARY KEY ( area_estudio_id );

CREATE TABLE institucion (
    institucion_id  INTEGER NOT NULL,
    nombre          VARCHAR(200) NOT NULL,
    direccion       VARCHAR(200)
);

ALTER TABLE institucion ADD CONSTRAINT institucion_pk PRIMARY KEY ( institucion_id );

CREATE TABLE logro_academico (
    logro_id                    INTEGER NOT NULL,
    anio                        INTEGER NOT NULL,
    titulo                      VARCHAR(200) NOT NULL,
    tipo_logro_tipo_logro_id    INTEGER NOT NULL,
    persona_usuarios_id         INTEGER NOT NULL,
    institucion_institucion_id  INTEGER NOT NULL
);

ALTER TABLE logro_academico ADD CONSTRAINT logro_academico_pk PRIMARY KEY ( logro_id );

CREATE TABLE persona (
    usuarios_id       INTEGER NOT NULL,
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
    created_at        DATE,
    usuario           VARCHAR(25) NOT NULL,
    contrasenia       VARCHAR(30) NOT NULL
);

ALTER TABLE persona ADD CONSTRAINT persona_pk PRIMARY KEY ( usuarios_id );

CREATE TABLE tipo_logro (
    tipo_logro_id  INTEGER NOT NULL,
    descripcion    VARCHAR(200) NOT NULL
);

ALTER TABLE tipo_logro ADD CONSTRAINT tipo_logro_pk PRIMARY KEY ( tipo_logro_id );

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
