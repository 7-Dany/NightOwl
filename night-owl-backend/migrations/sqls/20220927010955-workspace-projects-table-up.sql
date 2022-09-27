CREATE TABLE workspace_projects (
    id SERIAL PRIMARY KEY,
    workspace_id uuid REFERENCES workspaces(id) NOT NULL ,
    project_id uuid REFERENCES projects(id) NOT NULL
)