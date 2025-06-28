-- migrate:up
-- Habilita la extensión pgcrypto para poder usar gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE city (
  city_id SERIAL PRIMARY KEY,
  city_name VARCHAR(50) NOT NULL
);

CREATE TABLE status (
  status_id SERIAL PRIMARY KEY,
  status_name VARCHAR(50) NOT NULL
);

CREATE TABLE "user" (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE shipment (
  shipment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  weight NUMERIC NOT NULL,
  height NUMERIC NOT NULL,
  width NUMERIC NOT NULL,
  length NUMERIC NOT NULL,
  origin INTEGER NOT NULL,
  destination INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user" (user_id),
  CONSTRAINT fk_origin FOREIGN KEY (origin) REFERENCES city (city_id),
  CONSTRAINT fk_destination FOREIGN KEY (destination) REFERENCES city (city_id)
);

CREATE TABLE shipment_status_history (
  shipment_status_history_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID NOT NULL,
  status_id INTEGER NOT NULL,
  changed_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_shipment FOREIGN KEY (shipment_id) REFERENCES shipment (shipment_id),
  CONSTRAINT fk_status FOREIGN KEY (status_id) REFERENCES status (status_id)
);

CREATE TABLE rate (
  rate_id SERIAL PRIMARY KEY,
  origin INTEGER NOT NULL,
  destination INTEGER NOT NULL,
  min_weight NUMERIC NOT NULL,
  max_weight NUMERIC NOT NULL,
  price NUMERIC NOT NULL,
  CONSTRAINT fk_rate_origin FOREIGN KEY (origin) REFERENCES city (city_id),
  CONSTRAINT fk_rate_destination FOREIGN KEY (destination) REFERENCES city (city_id)
);

-- migrate:down
DROP TABLE IF EXISTS rate;

DROP TABLE IF EXISTS shipment_status_history;

DROP TABLE IF EXISTS shipment;

DROP TABLE IF EXISTS "user";

DROP TABLE IF EXISTS status;

DROP TABLE IF EXISTS city;

DROP EXTENSION IF EXISTS "pgcrypto";