import * as pg from 'pg-promise';

const pgInit = pg();
const db = pgInit(process.env.DB_URL)

export default db;