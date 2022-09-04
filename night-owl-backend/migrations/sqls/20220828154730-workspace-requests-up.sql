CREATE TABLE workspace_requests
(
    id           SERIAL PRIMARY KEY,
    user_id      uuid REFERENCES users (id) UNIQUE,
    workspace_id uuid REFERENCES workspaces (id)
);