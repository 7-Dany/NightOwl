CREATE TABLE messages
(
    id              SERIAL PRIMARY KEY,
    text            TEXT,
    media_url       VARCHAR,
    created_at      TIMESTAMP                          NOT NULL,
    message_type    VARCHAR(50)                        NOT NULL,
    user_id         uuid REFERENCES users (id)         NOT NULL,
    conversation_id uuid REFERENCES conversations (id) NOT NULL
);