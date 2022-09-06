CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE conversations
(
    id   uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NULL
);