import { Pool } from 'pg'
import config from '../config'

let database: Pool

if (config.env === 'test') {
  database = new Pool({
    port: config.postgres_port,
    host: config.postgres_host,
    database: config.postgres_database_test,
    user: config.postgres_username,
    password: config.postgres_password
  })
} else {
  database = new Pool({
    port: config.postgres_port,
    host: config.postgres_host,
    database: config.postgres_database,
    user: config.postgres_username,
    password: config.postgres_password
  })
}

export default database