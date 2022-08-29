CREATE TABLE workspace_requests
(
    id           SERIAL PRIMARY KEY,
    user_id      uuid REFERENCES users (id),
    workspace_id uuid REFERENCES workspaces (id),
    state        VARCHAR NOT NULL
);