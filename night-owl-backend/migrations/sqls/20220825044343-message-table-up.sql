CREATE TABLE messages
(
    id        SERIAL PRIMARY KEY,
    text      TEXT,
    media_url VARCHAR,
    user_id   uuid REFERENCES users (id) NOT NULL
);