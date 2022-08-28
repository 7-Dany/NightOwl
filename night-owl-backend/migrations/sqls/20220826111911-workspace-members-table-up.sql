CREATE TABLE workspace_members
(
    id           SERIAL PRIMARY KEY,
    workspace_id uuid REFERENCES workspaces (id) NOT NULL,
    user_id      uuid REFERENCES users (id)      NOT NULL UNIQUE,
    role         VARCHAR                         NOT NULL
);