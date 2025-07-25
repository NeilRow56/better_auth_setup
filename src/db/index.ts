import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import * as schema from '@/db/schema'

import { env } from '@/lib/env'

config({ path: '.env' })

const sql = neon(env.DATABASE_URL!)

const db = drizzle(sql, { schema })

export { db }
