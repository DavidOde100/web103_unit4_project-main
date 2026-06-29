import pg from 'pg'

const isRenderHost = process.env.PGHOST?.includes('render.com') || process.env.PGHOST?.includes('postgres')
const sslEnabled = process.env.PGSSLMODE === 'require' || isRenderHost || process.env.PGSSL === 'true'

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: sslEnabled ? { rejectUnauthorized: false } : false
}

export const pool = new pg.Pool(config)