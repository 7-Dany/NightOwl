CREATE TABLE workspaces
(
    id      SERIAL PRIMARY KEY,
    name    VARCHAR NOT NULL,
    creator uuid REFERENCES users (id)
);