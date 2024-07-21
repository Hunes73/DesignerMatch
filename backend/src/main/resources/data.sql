INSERT INTO roles (id, name)
VALUES (1, 'ADMIN')
ON CONFLICT (id) DO UPDATE
    SET name = excluded.name;

INSERT INTO roles (id, name)
VALUES (2, 'ARTIST')
ON CONFLICT (id) DO UPDATE
    SET name = excluded.name;

INSERT INTO roles (id, name)
VALUES (3, 'COMPANY')
ON CONFLICT (id) DO UPDATE
    SET name = excluded.name;