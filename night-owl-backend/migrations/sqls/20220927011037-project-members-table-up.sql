CREATE TABLE project_members
(
    id         SERIAL PRIMARY KEY,
    project_id uuid REFERENCES projects (id) NOT NULL,
    user_id    uuid REFERENCES users (id)    NOT NULL,
    role       VARCHAR(50)                   NOT NULL,
    title      VARCHAR(50)                   Null
);