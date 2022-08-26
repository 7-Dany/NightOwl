CREATE TABLE workspace_members
(
    id           SERIAL PRIMARY KEY,
    workspace_id BIGINT REFERENCES workspaces (id),
    user_id      uuid REFERENCES users (id)
);