-- migrate:up
INSERT INTO
  city (city_name)
VALUES
  ('Bogotá'),
  ('Medellín'),
  ('Cali'),
  ('Barranquilla');

INSERT INTO
  status (status_name)
VALUES
  ('En espera'),
  ('En tránsito'),
  ('Entregado');

-- Bogotá → Medellín
INSERT INTO
  rate (
    origin,
    destination,
    min_weight,
    max_weight,
    price
  )
VALUES
  (1, 2, 0, 4.9, 15000),
  (1, 2, 5, 9.9, 25000),
  (1, 2, 10, 19.9, 35000),
  (1, 2, 20, 29.9, 45000),
  (1, 2, 30, 39.9, 55000),
  (1, 2, 40, 49.9, 65000),
  (1, 2, 50, 9999.9, 75000);

-- Bogotá → Cali
INSERT INTO
  rate (
    origin,
    destination,
    min_weight,
    max_weight,
    price
  )
VALUES
  (1, 3, 0, 4.9, 18000),
  (1, 3, 5, 9.9, 28000),
  (1, 3, 10, 19.9, 38000),
  (1, 3, 20, 29.9, 48000),
  (1, 3, 30, 39.9, 58000),
  (1, 3, 40, 49.9, 68000),
  (1, 3, 50, 9999.9, 78000);

-- Bogotá → Barranquilla
INSERT INTO
  rate (
    origin,
    destination,
    min_weight,
    max_weight,
    price
  )
VALUES
  (1, 4, 0, 4.9, 20000),
  (1, 4, 5, 9.9, 30000),
  (1, 4, 10, 19.9, 40000),
  (1, 4, 20, 29.9, 50000),
  (1, 4, 30, 39.9, 60000),
  (1, 4, 40, 49.9, 70000),
  (1, 4, 50, 9999.9, 80000);

-- Medellín → Bogotá
INSERT INTO
  rate (
    origin,
    destination,
    min_weight,
    max_weight,
    price
  )
VALUES
  (2, 1, 0, 4.9, 16000),
  (2, 1, 5, 9.9, 26000),
  (2, 1, 10, 19.9, 36000),
  (2, 1, 20, 29.9, 46000),
  (2, 1, 30, 39.9, 56000),
  (2, 1, 40, 49.9, 66000),
  (2, 1, 50, 9999.9, 76000);

-- Medellín → Cali
INSERT INTO
  rate (
    origin,
    destination,
    min_weight,
    max_weight,
    price
  )
VALUES
  (2, 3, 0, 4.9, 17000),
  (2, 3, 5, 9.9, 27000),
  (2, 3, 10, 19.9, 37000),
  (2, 3, 20, 29.9, 47000),
  (2, 3, 30, 39.9, 57000),
  (2, 3, 40, 49.9, 67000),
  (2, 3, 50, 9999.9, 77000);

-- Medellín → Barranquilla
INSERT INTO
  rate (
    origin,
    destination,
    min_weight,
    max_weight,
    price
  )
VALUES
  (2, 4, 0, 4.9, 19000),
  (2, 4, 5, 9.9, 29000),
  (2, 4, 10, 19.9, 39000),
  (2, 4, 20, 29.9, 49000),
  (2, 4, 30, 39.9, 59000),
  (2, 4, 40, 49.9, 69000),
  (2, 4, 50, 9999.9, 79000);

-- Cali → Bogotá
INSERT INTO
  rate (
    origin,
    destination,
    min_weight,
    max_weight,
    price
  )
VALUES
  (3, 1, 0, 4.9, 17000),
  (3, 1, 5, 9.9, 27000),
  (3, 1, 10, 19.9, 37000),
  (3, 1, 20, 29.9, 47000),
  (3, 1, 30, 39.9, 57000),
  (3, 1, 40, 49.9, 67000),
  (3, 1, 50, 9999.9, 77000);

-- Cali → Medellín
INSERT INTO
  rate (
    origin,
    destination,
    min_weight,
    max_weight,
    price
  )
VALUES
  (3, 2, 0, 4.9, 16000),
  (3, 2, 5, 9.9, 26000),
  (3, 2, 10, 19.9, 36000),
  (3, 2, 20, 29.9, 46000),
  (3, 2, 30, 39.9, 56000),
  (3, 2, 40, 49.9, 66000),
  (3, 2, 50, 9999.9, 76000);

-- Cali → Barranquilla
INSERT INTO
  rate (
    origin,
    destination,
    min_weight,
    max_weight,
    price
  )
VALUES
  (3, 4, 0, 4.9, 20000),
  (3, 4, 5, 9.9, 30000),
  (3, 4, 10, 19.9, 40000),
  (3, 4, 20, 29.9, 50000),
  (3, 4, 30, 39.9, 60000),
  (3, 4, 40, 49.9, 70000),
  (3, 4, 50, 9999.9, 80000);

-- Barranquilla → Bogotá
INSERT INTO
  rate (
    origin,
    destination,
    min_weight,
    max_weight,
    price
  )
VALUES
  (4, 1, 0, 4.9, 21000),
  (4, 1, 5, 9.9, 31000),
  (4, 1, 10, 19.9, 41000),
  (4, 1, 20, 29.9, 51000),
  (4, 1, 30, 39.9, 61000),
  (4, 1, 40, 49.9, 71000),
  (4, 1, 50, 9999.9, 81000);

-- Barranquilla → Medellín
INSERT INTO
  rate (
    origin,
    destination,
    min_weight,
    max_weight,
    price
  )
VALUES
  (4, 2, 0, 4.9, 19000),
  (4, 2, 5, 9.9, 29000),
  (4, 2, 10, 19.9, 39000),
  (4, 2, 20, 29.9, 49000),
  (4, 2, 30, 39.9, 59000),
  (4, 2, 40, 49.9, 69000),
  (4, 2, 50, 9999.9, 79000);

-- Barranquilla → Cali
INSERT INTO
  rate (
    origin,
    destination,
    min_weight,
    max_weight,
    price
  )
VALUES
  (4, 3, 0, 4.9, 22000),
  (4, 3, 5, 9.9, 32000),
  (4, 3, 10, 19.9, 42000),
  (4, 3, 20, 29.9, 52000),
  (4, 3, 30, 39.9, 62000),
  (4, 3, 40, 49.9, 72000),
  (4, 3, 50, 9999.9, 82000);

-- migrate:down
DELETE FROM
  rate;

DELETE FROM
  status;

DELETE FROM
  city;