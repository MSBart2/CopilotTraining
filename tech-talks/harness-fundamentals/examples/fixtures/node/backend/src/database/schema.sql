-- Fixture: trimmed FanHub schema
CREATE TABLE IF NOT EXISTS shows (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100)
);

-- Characters table
CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    show_id INTEGER REFERENCES shows(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    actor_name VARCHAR(255),
    status VARCHAR(50), -- alive, deceased, unknown
    UNIQUE (show_id, name)
);
