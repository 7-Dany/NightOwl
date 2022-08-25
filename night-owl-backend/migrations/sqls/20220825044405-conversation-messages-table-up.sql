CREATE TABLE conversation_messages
(
    id              SERIAL PRIMARY KEY,
    conversation_id uuid REFERENCES conversations (id) NOT NULL,
    message_id      BIGINT REFERENCES messages (id)   NOT NULL
);