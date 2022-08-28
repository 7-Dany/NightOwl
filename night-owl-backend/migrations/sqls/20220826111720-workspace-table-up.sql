CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE workspaces
(
    id   uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL
);