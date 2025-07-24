import { pgTable as table } from 'drizzle-orm/pg-core'
import * as t from 'drizzle-orm/pg-core'
import { organization } from './organization'
import { UsersTable } from './users'

export const invitation = table('invitation', {
  id: t.text('id').primaryKey(),
  organizationId: t
    .text('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  email: t.text('email').notNull(),
  role: t.text('role'),
  status: t.text('status').default('pending').notNull(),
  expiresAt: t.timestamp('expires_at').notNull(),
  inviterId: t
    .text('inviter_id')
    .notNull()
    .references(() => UsersTable.id, { onDelete: 'cascade' })
})
