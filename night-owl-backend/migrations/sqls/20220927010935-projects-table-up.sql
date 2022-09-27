CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE projects
(
    id      uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name    VARCHAR(100) NOT NULL,
    summary VARCHAR      NULL,
    logo    VARCHAR      Null
);