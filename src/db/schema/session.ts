import { pgTable as table } from 'drizzle-orm/pg-core'
import * as t from 'drizzle-orm/pg-core'
import { UsersTable } from './users'

export const session = table('session', {
  id: t.text('id').primaryKey(),
  expiresAt: t.timestamp('expires_at').notNull(),
  token: t.text('token').notNull().unique(),
  createdAt: t.timestamp('created_at').notNull(),
  updatedAt: t.timestamp('updated_at').notNull(),
  ipAddress: t.text('ip_address'),
  userAgent: t.text('user_agent'),
  userId: t
    .text('user_id')
    .notNull()
    .references(() => UsersTable.id, { onDelete: 'cascade' })
})
