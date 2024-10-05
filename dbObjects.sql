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



CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    company_id VARCHAR(10) UNIQUE NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_jp VARCHAR(255),
    website_link VARCHAR(255),
    employee_count INTEGER,
    capital NUMERIC(15, 2),
    capital_currency VARCHAR(3),
    revenue_generated NUMERIC(15, 2) DEFAULT 0,
    stage VARCHAR(50),
    status VARCHAR(50),
    country VARCHAR(100),
    state VARCHAR(100),
    industry VARCHAR(100),
    address TEXT,
    telephone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    managed_by INTEGER REFERENCES users(id),
    logo_url VARCHAR(255)
);

CREATE TABLE company_branches (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(255),
    address TEXT,
    country VARCHAR(100),
    state VARCHAR(100)
);

CREATE TABLE company_subsidiaries (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id),
    name VARCHAR(255),
    address TEXT,
    country VARCHAR(100),
    state VARCHAR(100)
);

INSERT INTO companies (company_id, name_en, name_jp, website_link, employee_count, capital, capital_currency, revenue_generated, stage, status, country, state, industry, address, telephone, created_by, managed_by, logo_url) VALUES
('JP000001', 'Tokyo Tech Solutions', 'トーキョーテックソリューションズ', 'https://tokyotech.co.jp', 500, 1000000000.00, 'JPY', 1500000000.00, 'Client', 'Active', 'Japan', 'Tokyo', 'Information Technology', '1-1-1 Marunouchi, Chiyoda-ku, Tokyo', '+81-3-1234-5678', 1, 1, 'https://example.com/logos/tokyotech.png'),
('US000001', 'Silicon Valley Innovations', NULL, 'https://svi.com', 1000, 500000000.00, 'USD', 750000000.00, 'Potential', 'Active', 'United States', 'California', 'Software', '123 Tech Boulevard, San Jose, CA 95110', '+1-408-555-1234', 1, 1, 'https://example.com/logos/svi.png'),
('IN000001', 'Bangalore Digital Services', NULL, 'https://bds.in', 2000, 10000000000.00, 'INR', 15000000000.00, 'Client', 'Active', 'India', 'Karnataka', 'IT Services', '42 Electronics City, Bangalore 560100', '+91-80-4321-9876', 1, 1, 'https://example.com/logos/bds.png'),
('DE000001', 'Munich Precision Engineering', NULL, 'https://mpe.de', 750, 100000000.00, 'EUR', 200000000.00, 'Target', 'Inactive', 'Germany', 'Bavaria', 'Manufacturing', 'Industriestraße 1, 80339 München', '+49-89-1234567', 1, 1, 'https://example.com/logos/mpe.png'),
('SG000001', 'Singapore FinTech Hub', NULL, 'https://sgfintechhub.sg', 300, 100000000.00, 'SGD', 50000000.00, 'Potential', 'Active', 'Singapore', NULL, 'Financial Services', '1 Raffles Place, #20-01, Singapore 048616', '+65-6789-0123', 1, 1, 'https://example.com/logos/sgfintech.png');

INSERT INTO company_branches (company_id, name, address, country, state) VALUES
(7, 'Tokyo Tech Solutions - Osaka Branch', '1-1-88 Oyodonaka, Kita-ku, Osaka', 'Japan', 'Osaka'),
(7, 'Tokyo Tech Solutions - Fukuoka Branch', '2-1-1 Sumiyoshi, Hakata-ku, Fukuoka', 'Japan', 'Fukuoka'),
(8, 'Silicon Valley Innovations - New York Office', '350 Fifth Avenue, New York, NY 10118', 'United States', 'New York'),
(9, 'Bangalore Digital Services - Mumbai Branch', 'Maker Chambers V, Nariman Point, Mumbai 400021', 'India', 'Maharashtra'),
(9, 'Bangalore Digital Services - Delhi Branch', 'Connaught Place, New Delhi 110001', 'India', 'Delhi'),
(10, 'Munich Precision Engineering - Berlin Office', 'Potsdamer Platz 1, 10785 Berlin', 'Germany', 'Berlin'),
(11, 'Singapore FinTech Hub - Kuala Lumpur Office', 'Menara 3 Petronas, Kuala Lumpur City Centre', 'Malaysia', 'Kuala Lumpur');

INSERT INTO company_subsidiaries (company_id, name, address, country, state) VALUES
(7, 'Tokyo Tech AI Labs', '2-2-2 Yaesu, Chuo-ku, Tokyo', 'Japan', 'Tokyo'),
(8, 'SVI Cloud Services', '456 Cloud Street, Austin, TX 78701', 'United States', 'Texas'),
(9, 'BDS Cybersecurity Solutions', '56 Cyber Road, Hyderabad 500032', 'India', 'Telangana'),
(10, 'MPE Robotics GmbH', 'Roboterstraße 5, 70569 Stuttgart', 'Germany', 'Baden-Württemberg'),
(11, 'SGFinTech Blockchain Ventures', '2 Shenton Way, #01-01, Singapore 068804', 'Singapore', NULL);

