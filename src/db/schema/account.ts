import { pgTable as table } from 'drizzle-orm/pg-core'
import * as t from 'drizzle-orm/pg-core'
import { UsersTable } from './users'

export const account = table('account', {
  id: t.text('id').primaryKey(),
  accountId: t.text('account_id').notNull(),
  providerId: t.text('provider_id').notNull(),
  userId: t
    .text('user_id')
    .notNull()
    .references(() => UsersTable.id, { onDelete: 'cascade' }),
  accessToken: t.text('access_token'),
  refreshToken: t.text('refresh_token'),
  idToken: t.text('id_token'),
  accessTokenExpiresAt: t.timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: t.timestamp('refresh_token_expires_at'),
  scope: t.text('scope'),
  password: t.text('password'),
  createdAt: t.timestamp('created_at').notNull(),
  updatedAt: t.timestamp('updated_at').notNull()
})
