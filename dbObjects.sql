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
    user_id INTEGER,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    root boolean NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    enabled boolean NOT NULL,
    password_hash VARCHAR(255) NOT NULL,--This values is changes to character varying(255) temporariliy
    role VARCHAR(20),
    create_date timestamp without time zone NOT NULL,
    attributes jsonb,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT uq_user_email UNIQUE (email),
    CONSTRAINT users_uuid_key UNIQUE (uuid)
);


ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

-- Companies table
CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_jp VARCHAR(100),
    website VARCHAR(255),
    employee_count INTEGER,
    capital DECIMAL(15, 2),
    revenue DECIMAL(15, 2),
    stage VARCHAR(20),
    status VARCHAR(20),
    country VARCHAR(50),
    state VARCHAR(50),
    industry VARCHAR(50),
    address TEXT,
    telephone VARCHAR(20),
    logo_url VARCHAR(255),
    created_by INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company_managers table (for multiple managers per company)
CREATE TABLE company_managers (
    company_id INTEGER REFERENCES companies(company_id),
    user_id INTEGER REFERENCES users(user_id),
    PRIMARY KEY (company_id, user_id)
);

-- Branch_offices table
CREATE TABLE branch_offices (
    branch_id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(company_id),
    name VARCHAR(100),
    address TEXT,
    telephone VARCHAR(20)
);

-- Subsidiaries table
CREATE TABLE subsidiaries (
    subsidiary_id SERIAL PRIMARY KEY,
    parent_company_id INTEGER REFERENCES companies(company_id),
    name VARCHAR(100),
    address TEXT,
    telephone VARCHAR(20)
);

-- Leads table
CREATE TABLE leads (
    lead_id SERIAL PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_jp VARCHAR(100),
    company_id INTEGER REFERENCES companies(company_id),
    position VARCHAR(100),
    department VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    stage VARCHAR(20),
    status VARCHAR(20),
    created_by INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lead_managers table (for multiple managers per lead)
CREATE TABLE lead_managers (
    lead_id INTEGER REFERENCES leads(lead_id),
    user_id INTEGER REFERENCES users(user_id),
    PRIMARY KEY (lead_id, user_id)
);

-- Deals table
CREATE TABLE deals (
    deal_id SERIAL PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_jp VARCHAR(100),
    lead_id INTEGER REFERENCES leads(lead_id),
    company_id INTEGER REFERENCES companies(company_id),
    stage VARCHAR(20),
    deal_value DECIMAL(15, 2),
    probability DECIMAL(5, 2),
    start_date DATE,
    closing_date DATE,
    product VARCHAR(100),
    licenses_count INTEGER,
    payment_method VARCHAR(50),
    currency VARCHAR(3),
    budget DECIMAL(15, 2),
    deposit_amount DECIMAL(15, 2),
    estimated_revenue DECIMAL(15, 2),
    created_by INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Deal_managers table (for multiple managers per deal)
CREATE TABLE deal_managers (
    deal_id INTEGER REFERENCES deals(deal_id),
    user_id INTEGER REFERENCES users(user_id),
    PRIMARY KEY (deal_id, user_id)
);

-- Activities table
CREATE TABLE activities (
    activity_id SERIAL PRIMARY KEY,
    activity_type VARCHAR(50),
    description TEXT,
    related_to VARCHAR(20), -- 'lead', 'deal', or 'company'
    related_id INTEGER,
    user_id INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    due_date DATE,
    status VARCHAR(20),
    related_to VARCHAR(20), -- 'lead', 'deal', or 'company'
    related_id INTEGER,
    assigned_to INTEGER REFERENCES users(user_id),
    created_by INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoices table
CREATE TABLE invoices (
    invoice_id SERIAL PRIMARY KEY,
    deal_id INTEGER REFERENCES deals(deal_id),
    amount DECIMAL(15, 2),
    status VARCHAR(20),
    issue_date DATE,
    due_date DATE,
    created_by INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Estimates table
CREATE TABLE estimates (
    estimate_id SERIAL PRIMARY KEY,
    deal_id INTEGER REFERENCES deals(deal_id),
    amount DECIMAL(15, 2),
    status VARCHAR(20),
    issue_date DATE,
    expiry_date DATE,
    created_by INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tags table
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Taggable junction table (for leads, deals, and companies)
CREATE TABLE taggables (
    tag_id INTEGER REFERENCES tags(tag_id),
    taggable_type VARCHAR(20), -- 'lead', 'deal', or 'company'
    taggable_id INTEGER,
    PRIMARY KEY (tag_id, taggable_type, taggable_id)
);

-- You'll need to add a target table or column to track targets
CREATE TABLE IF NOT EXISTS targets (
    target_id SERIAL PRIMARY KEY,
    target_type VARCHAR(50),
    target_value INTEGER,
    target_period VARCHAR(20),
    target_year INTEGER,
    target_quarter INTEGER
);


-- Sample data for users table
INSERT INTO users (
    uuid, user_id, username, first_name, last_name, root, email, enabled, password_hash, role, create_date, attributes
) 
VALUES 
    (gen_random_uuid(),1, 'john_doe', 'John', 'Doe', false, 'john.doe@example.com', true, 'hashed_password_1', 'sales_rep', CURRENT_TIMESTAMP, '{"key": "value"}'::jsonb),
    (gen_random_uuid(),2, 'jane_smith', 'Jane', 'Smith', false, 'jane.smith@example.com', true, 'hashed_password_2', 'manager', CURRENT_TIMESTAMP, '{"key": "value"}'::jsonb),
    (gen_random_uuid(),3, 'bob_johnson', 'Bob', 'Johnson', true, 'bob.johnson@example.com', true, 'hashed_password_3', 'admin', CURRENT_TIMESTAMP, '{"key": "value"}'::jsonb);


-- Sample data for companies table
INSERT INTO companies (name_en, name_jp, website, employee_count, capital, revenue, stage, status, country, state, industry, address, telephone, created_by) VALUES
('Acme Corp', 'アクメ株式会社', 'https://acme.com', 500, 10000000.00, 50000000.00, 'Client', 'Active', 'Japan', 'Tokyo', 'Technology', '1-1-1 Shibuya, Tokyo', '+81-3-1234-5678', 1),
('TechInnovate', 'テックイノベート', 'https://techinnovate.com', 200, 5000000.00, 20000000.00, 'Potential', 'Active', 'USA', 'California', 'Software', '123 Silicon Valley Blvd, CA', '+1-555-123-4567', 2),
('Global Trade Ltd', 'グローバルトレード株式会社', 'https://globaltrade.com', 1000, 50000000.00, 100000000.00, 'Target', 'Active', 'UK', 'London', 'Finance', '10 Downing Street, London', '+44-20-1234-5678', 3);

-- Sample data for company_managers table
INSERT INTO company_managers (company_id, user_id) VALUES
(1, 1), (1, 2),
(2, 2),
(3, 1), (3, 3);

-- Sample data for branch_offices table
INSERT INTO branch_offices (company_id, name, address, telephone) VALUES
(1, 'Acme Corp Osaka Branch', '2-2-2 Umeda, Osaka', '+81-6-2345-6789'),
(2, 'TechInnovate New York Office', '456 Broadway, New York', '+1-212-987-6543'),
(3, 'Global Trade Ltd Paris Office', '15 Rue de la Paix, Paris', '+33-1-23-45-67-89');

-- Sample data for subsidiaries table
INSERT INTO subsidiaries (parent_company_id, name, address, telephone) VALUES
(1, 'Acme Research Lab', '3-3-3 Akihabara, Tokyo', '+81-3-3456-7890'),
(2, 'TechInnovate Cloud Services', '789 Cloud Ave, Seattle', '+1-206-345-6789'),
(3, 'Global Trade Fintech', '25 Canary Wharf, London', '+44-20-9876-5432');

-- Sample data for leads table
INSERT INTO leads (name_en, name_jp, company_id, position, department, email, telephone, stage, status, created_by) VALUES
('Taro Yamada', '山田太郎', 1, 'CTO', 'Technology', 'taro.yamada@acme.com', '+81-90-1234-5678', 'Potential', 'Active', 1),
('Emily Johnson', 'エミリー・ジョンソン', 2, 'CEO', 'Executive', 'emily.johnson@techinnovate.com', '+1-415-987-6543', 'Client', 'Active', 2),
('David Brown', 'デビッド・ブラウン', 3, 'CFO', 'Finance', 'david.brown@globaltrade.com', '+44-7700-900123', 'Target', 'Active', 3);

-- Sample data for lead_managers table
INSERT INTO lead_managers (lead_id, user_id) VALUES
(1, 1), (1, 2),
(2, 2),
(3, 1), (3, 3);

-- Sample data for deals table
INSERT INTO deals (name_en, name_jp, lead_id, company_id, stage, deal_value, probability, start_date, closing_date, product, licenses_count, payment_method, currency, budget, deposit_amount, estimated_revenue, created_by) VALUES
('Acme Corp Software Upgrade', 'アクメ株式会社ソフトウェアアップグレード', 1, 1, 'Negotiation', 500000.00, 0.75, '2023-01-01', '2023-06-30', 'Enterprise Software', 100, 'Wire Transfer', 'JPY', 600000.00, 50000.00, 500000.00, 1),
('TechInnovate Cloud Migration', 'テックイノベートクラウド移行', 2, 2, 'Proposal', 250000.00, 0.50, '2023-02-15', '2023-08-31', 'Cloud Services', 1, 'Credit Card', 'USD', 300000.00, 25000.00, 250000.00, 2),
('Global Trade Financial Suite', 'グローバルトレード金融スイート', 3, 3, 'Qualification', 1000000.00, 0.25, '2023-03-01', '2023-12-31', 'Financial Software', 500, 'Bank Transfer', 'GBP', 1200000.00, 100000.00, 1000000.00, 3);

-- Insert sample deals
INSERT INTO deals (name_en, name_jp, lead_id, company_id, stage, deal_value, probability, start_date, closing_date, product, licenses_count, payment_method, currency, budget, deposit_amount, estimated_revenue, created_by, created_at)
VALUES
('Acme Corp Deal 1', 'アクメ株式会社取引1', 1, 1, 'Closed Won', 100000.00, 1.00, '2023-01-01', '2023-03-31', 'Product A', 10, 'Wire Transfer', 'JPY', 120000.00, 10000.00, 100000.00, 1, '2023-01-01 10:00:00'),
('Acme Corp Deal 2', 'アクメ株式会社取引2', 2, 1, 'Closed Won', 150000.00, 1.00, '2023-04-01', '2023-06-30', 'Product B', 15, 'Credit Card', 'JPY', 180000.00, 15000.00, 150000.00, 2, '2023-04-01 11:00:00'),
('TechInnovate Deal', 'テックイノベート取引', 3, 2, 'Closed Won', 75000.00, 1.00, '2023-02-01', '2023-05-31', 'Product C', 5, 'Bank Transfer', 'USD', 80000.00, 7500.00, 75000.00, 3, '2023-02-01 12:00:00');

-- Sample data for deal_managers table
INSERT INTO deal_managers (deal_id, user_id) VALUES
(1, 1), (1, 2),
(2, 2),
(3, 1), (3, 3);

-- Sample data for activities table
INSERT INTO activities (activity_type, description, related_to, related_id, user_id) VALUES
('Email', 'Sent follow-up email about software requirements', 'lead', 1, 1),
('Call', 'Discussed cloud migration timeline', 'deal', 2, 2),
('Meeting', 'In-person meeting to present financial suite demo', 'company', 3, 3);

-- Sample data for tasks table
INSERT INTO tasks (title, description, due_date, status, related_to, related_id, assigned_to, created_by) VALUES
('Prepare software upgrade proposal', 'Draft a detailed proposal for Acme Corp software upgrade', '2023-05-15', 'In Progress', 'deal', 1, 1, 2),
('Schedule cloud migration kickoff', 'Arrange a kickoff meeting with TechInnovate team', '2023-07-01', 'Pending', 'deal', 2, 2, 2),
('Conduct financial needs assessment', 'Analyze Global Trade Ltd financial software requirements', '2023-06-30', 'Not Started', 'lead', 3, 3, 1);

-- Sample data for invoices table
INSERT INTO invoices (deal_id, amount, status, issue_date, due_date, created_by) VALUES
(1, 250000.00, 'Paid', '2023-04-01', '2023-05-01', 1),
(2, 125000.00, 'Pending', '2023-05-15', '2023-06-15', 2);

-- Sample data for estimates table
INSERT INTO estimates (deal_id, amount, status, issue_date, expiry_date, created_by) VALUES
(1, 500000.00, 'Accepted', '2023-03-15', '2023-04-15', 1),
(2, 250000.00, 'Sent', '2023-04-01', '2023-05-01', 2),
(3, 1000000.00, 'Draft', '2023-05-01', '2023-06-01', 3);

-- Sample data for tags table
INSERT INTO tags (name) VALUES
('High Priority'),
('New Client'),
('Upsell Opportunity');

-- Sample data for taggables table
INSERT INTO taggables (tag_id, taggable_type, taggable_id) VALUES
(1, 'deal', 1),
(2, 'company', 2),
(3, 'lead', 3);

-- 2. Target vs Achievement (assuming we're counting deals as achievements)

INSERT INTO targets (target_type, target_value, target_period, target_year, target_quarter)
VALUES ('deals', 100, 'Quarterly', 2023, 2);

-- Insert deals for 2023 Q2
INSERT INTO deals (name_en, name_jp, lead_id, company_id, stage, deal_value, probability, start_date, closing_date, product, licenses_count, payment_method, currency, budget, deposit_amount, estimated_revenue, created_by, created_at)
VALUES
('Deal 1', 'ディール1', 1, 1, 'Closed Won', 50000.00, 1.00, '2023-04-01', '2023-05-15', 'Product A', 10, 'Wire Transfer', 'JPY', 60000.00, 5000.00, 50000.00, 1, '2023-04-01 10:00:00'),
('Deal 2', 'ディール2', 2, 2, 'Closed Won', 75000.00, 1.00, '2023-05-01', '2023-06-15', 'Product B', 15, 'Credit Card', 'JPY', 80000.00, 7500.00, 75000.00, 2, '2023-05-01 11:00:00'),
('Deal 3', 'ディール3', 3, 3, 'Negotiation', 100000.00, 0.75, '2023-06-01', '2023-07-31', 'Product C', 20, 'Bank Transfer', 'JPY', 120000.00, 10000.00, 100000.00, 3, '2023-06-01 12:00:00');

INSERT INTO deals (name_en, name_jp, lead_id, company_id, stage, deal_value, probability, start_date, closing_date, product, licenses_count, payment_method, currency, budget, deposit_amount, estimated_revenue, created_by) VALUES
('Acme Corp Software Upgrade', 'アクメ株式会社ソフトウェアアップグレード', 1, 1, 'Negotiation', 500000.00, 0.75, '2023-01-01', '2023-06-30', 'Enterprise Software', 100, 'Wire Transfer', 'JPY', 600000.00, 50000.00, 500000.00, 1),
('TechInnovate Cloud Migration', 'テックイノベートクラウド移行', 2, 2, 'Proposal', 250000.00, 0.50, '2023-02-15', '2023-08-31', 'Cloud Services', 1, 'Credit Card', 'USD', 300000.00, 25000.00, 250000.00, 2),
('Global Trade Financial Suite', 'グローバルトレード金融スイート', 3, 3, 'Qualification', 1000000.00, 0.25, '2023-03-01', '2023-12-31', 'Financial Software', 500, 'Bank Transfer', 'GBP', 1200000.00, 100000.00, 1000000.00, 3);

CREATE TABLE deals (
    deal_id SERIAL PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_jp VARCHAR(100),
    lead_id INTEGER REFERENCES leads(lead_id),
    company_id INTEGER REFERENCES companies(company_id),
    stage VARCHAR(20),
    deal_value DECIMAL(15, 2),
    probability DECIMAL(5, 2),
    start_date DATE,
    closing_date DATE,
    product VARCHAR(100),
    licenses_count INTEGER,
    payment_method VARCHAR(50),
    currency VARCHAR(3),
    budget DECIMAL(15, 2),
    deposit_amount DECIMAL(15, 2),
    estimated_revenue DECIMAL(15, 2),
    created_by INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS targets (
    target_id SERIAL PRIMARY KEY,
    target_type VARCHAR(50),
    target_value INTEGER,
    target_period VARCHAR(20),
    target_year INTEGER,
    target_quarter INTEGER
);

--Dashboard Queries

-- 1. Top Summary Statistics
-- View name top_summary_statistics_1
SELECT 
    (SELECT COUNT(*) FROM companies) AS total_companies,
    (SELECT COUNT(*) FROM leads) AS total_leads,
    (SELECT COUNT(*) FROM deals) AS total_deals,
    (SELECT COUNT(*) FROM deals WHERE stage = 'Client') AS closed_deals;


-- 2. Query to get target vs achievement
-- View name target_vs_achievement_2
SELECT
    t.target_value AS target,
    COUNT(d.deal_id) AS achievement,
    CASE
        WHEN t.target_value > 0
        THEN ROUND((COUNT(d.deal_id)::NUMERIC / t.target_value) * 100, 2)
        ELSE 0
    END AS percentage
FROM
    targets t
LEFT JOIN
    deals d ON EXTRACT(YEAR FROM d.created_at) = t.target_year
    AND EXTRACT(QUARTER FROM d.created_at) = t.target_quarter
WHERE
    t.target_type = 'deals'
    AND t.target_year = 2023
    AND t.target_quarter = 2
GROUP BY
    t.target_value;

-- 3. Progress by Quarter
-- View name progress_by_quarter_3
WITH quarters AS (
    SELECT generate_series(1, 4) AS quarter
)
SELECT 
    'Q' || q.quarter AS quarter,
    COALESCE(t.target_value, 0) AS target,
    COUNT(d.deal_id) AS achievement,
    CASE 
        WHEN COALESCE(t.target_value, 0) > 0 
        THEN ROUND((COUNT(d.deal_id)::NUMERIC / t.target_value) * 100, 2)
        ELSE 0
    END AS percentage
FROM 
    quarters q
LEFT JOIN 
    targets t ON t.target_quarter = q.quarter AND t.target_year = EXTRACT(YEAR FROM CURRENT_DATE)
LEFT JOIN 
    deals d ON EXTRACT(QUARTER FROM d.created_at) = q.quarter 
           AND EXTRACT(YEAR FROM d.created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
GROUP BY 
    q.quarter, t.target_value
ORDER BY 
    q.quarter;

-- 4. Lead Generation (Monthly Sales)
-- View name lead_generation_monthly_sales_4
SELECT 
    TO_CHAR(created_at, 'Month') AS month,
    COUNT(*) AS monthly_sales
FROM 
    leads
WHERE 
    created_at >= DATE_TRUNC('year', CURRENT_DATE)
GROUP BY 
    TO_CHAR(created_at, 'Month'), DATE_TRUNC('month', created_at)
ORDER BY 
    DATE_TRUNC('month', created_at);

-- 5. Deal Conversation (Weekly)
-- View name deal_conversation_weekly_5
WITH weeks AS (
    SELECT generate_series(
        DATE_TRUNC('week', CURRENT_DATE - INTERVAL '3 weeks'),
        DATE_TRUNC('week', CURRENT_DATE),
        '1 week'::INTERVAL
    ) AS week_start
)
SELECT 
    CASE 
        WHEN w.week_start = DATE_TRUNC('week', CURRENT_DATE) THEN 'This Week'
        WHEN w.week_start = DATE_TRUNC('week', CURRENT_DATE - INTERVAL '1 week') THEN '1 Week Ago'
        WHEN w.week_start = DATE_TRUNC('week', CURRENT_DATE - INTERVAL '2 weeks') THEN '2 Weeks Ago'
        WHEN w.week_start = DATE_TRUNC('week', CURRENT_DATE - INTERVAL '3 weeks') THEN '3 Weeks Ago'
    END AS week,
    COUNT(CASE WHEN d.stage = 'Client' THEN 1 END) AS client,
    COUNT(CASE WHEN d.stage = 'Hot' THEN 1 END) AS hot,
    COUNT(CASE WHEN d.stage = 'Warm' THEN 1 END) AS warm,
    COUNT(CASE WHEN d.stage = 'Cold' THEN 1 END) AS cold,
    COUNT(CASE WHEN d.stage = 'Contact' THEN 1 END) AS contact,
    COUNT(CASE WHEN d.stage = 'Dead' THEN 1 END) AS dead,
    COUNT(CASE WHEN d.stage NOT IN ('Client', 'Hot', 'Warm', 'Cold', 'Contact', 'Dead') THEN 1 END) AS other
FROM 
    weeks w
LEFT JOIN 
    deals d ON d.created_at >= w.week_start AND d.created_at < w.week_start + INTERVAL '1 week'
GROUP BY 
    w.week_start
ORDER BY 
    w.week_start DESC;

-- 6. Deal Conversation (Activities)
-- View name deal_conversation_activities_6
SELECT 
    'TEL for HOT activities' AS activity_type,
    COUNT(*) AS count
FROM 
    activities
WHERE 
    activity_type = 'Call' 
    AND related_to = 'deal'
    AND related_id IN (SELECT deal_id FROM deals WHERE stage = 'Hot')
    AND created_at >= CURRENT_DATE
UNION ALL
SELECT 
    'TEL for WARM activities' AS activity_type,
    COUNT(*) AS count
FROM 
    activities
WHERE 
    activity_type = 'Call' 
    AND related_to = 'deal'
    AND related_id IN (SELECT deal_id FROM deals WHERE stage = 'Warm')
    AND created_at >= CURRENT_DATE
UNION ALL
SELECT 
    'MAIL for HOT activities' AS activity_type,
    COUNT(*) AS count
FROM 
    activities
WHERE 
    activity_type = 'Email' 
    AND related_to = 'deal'
    AND related_id IN (SELECT deal_id FROM deals WHERE stage = 'Hot')
    AND created_at >= CURRENT_DATE
UNION ALL
SELECT 
    'VISIT IN for HOT activities' AS activity_type,
    COUNT(*) AS count
FROM 
    activities
WHERE 
    activity_type = 'Meeting' 
    AND related_to = 'deal'
    AND related_id IN (SELECT deal_id FROM deals WHERE stage = 'Hot')
    AND created_at >= CURRENT_DATE
UNION ALL
SELECT 
    'VISIT IN for WARM activities' AS activity_type,
    COUNT(*) AS count
FROM 
    activities
WHERE 
    activity_type = 'Meeting' 
    AND related_to = 'deal'
    AND related_id IN (SELECT deal_id FROM deals WHERE stage = 'Warm')
    AND created_at >= CURRENT_DATE
UNION ALL
SELECT 
    'VISIT OUT for HOT activities' AS activity_type,
    COUNT(*) AS count
FROM 
    activities
WHERE 
    activity_type = 'Meeting' 
    AND related_to = 'deal'
    AND related_id IN (SELECT deal_id FROM deals WHERE stage = 'Hot')
    AND created_at >= CURRENT_DATE
UNION ALL
SELECT 
    'VISIT OUT for WARM activities' AS activity_type,
    COUNT(*) AS count
FROM 
    activities
WHERE 
    activity_type = 'Meeting' 
    AND related_to = 'deal'
    AND related_id IN (SELECT deal_id FROM deals WHERE stage = 'Warm')
    AND created_at >= CURRENT_DATE;

-- 7. Top Client
-- Top Client Query
-- View name top_client_7
SELECT
    c.name_en AS company,
    COALESCE(SUM(d.deal_value), 0) AS revenue,
    CASE 
        WHEN (SELECT SUM(deal_value) FROM deals) > 0 
        THEN ROUND((COALESCE(SUM(d.deal_value), 0) / (SELECT SUM(deal_value) FROM deals)) * 100, 2)
        ELSE 0
    END AS percentage
FROM
    companies c
LEFT JOIN
    deals d ON c.company_id = d.company_id
WHERE
    d.stage = 'Closed Won' OR c.stage = 'Client'
GROUP BY
    c.company_id, c.name_en
ORDER BY
    revenue DESC
LIMIT 5;

