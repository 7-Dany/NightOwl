CREATE TABLE conversation_members
(
    id              SERIAL PRIMARY KEY,
    conversation_id uuid REFERENCES conversations (id) NOT NULL,
    user_id         uuid REFERENCES users (id)         NOT NULL
);