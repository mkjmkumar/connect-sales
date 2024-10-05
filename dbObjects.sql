-- SEQUENCE: public.users_id_seq

-- DROP SEQUENCE IF EXISTS public.users_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.users_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.users_id_seq
    OWNER TO postgres;

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id bigint NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    uuid character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    root boolean NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    enabled boolean NOT NULL,
    password bytea NOT NULL,--This values is changes to character varying(255) temporariliy
    create_date timestamp without time zone NOT NULL,
    attributes jsonb,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT uq_user_email UNIQUE (email),
    CONSTRAINT users_uuid_key UNIQUE (uuid)
);



ALTER TABLE IF EXISTS public.users
    OWNER to postgres;