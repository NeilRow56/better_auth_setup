import { pgTable as table } from 'drizzle-orm/pg-core'
import * as t from 'drizzle-orm/pg-core'
import { organization } from './organization'
import { roleEnum, UsersTable } from './users'
import { relations } from 'drizzle-orm'

export const member = table('member', {
  id: t.text('id').primaryKey(),
  organizationId: t
    .text('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  userId: t
    .text('user_id')
    .notNull()
    .references(() => UsersTable.id, { onDelete: 'cascade' }),
  role: roleEnum('role').default('USER').notNull(),
  createdAt: t.timestamp('created_at').notNull()
})

export const memberRelations = relations(member, ({ one }) => ({
  organization: one(organization, {
    fields: [member.organizationId],
    references: [organization.id]
  }),
  user: one(UsersTable, {
    fields: [member.userId],
    references: [UsersTable.id]
  })
}))

export type Member = typeof member.$inferSelect & {
  user: typeof UsersTable.$inferSelect
}
