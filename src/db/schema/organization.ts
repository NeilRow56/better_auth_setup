import { relations } from 'drizzle-orm'
import { pgTable as table } from 'drizzle-orm/pg-core'
import * as t from 'drizzle-orm/pg-core'
import { member } from './member'
// import { relations } from 'drizzle-orm'

export const organization = table('organization', {
  id: t.text('id').primaryKey(),
  name: t.text('name').notNull(),
  slug: t.text('slug').unique(),
  logo: t.text('logo'),
  createdAt: t.timestamp('created_at').notNull(),
  metadata: t.text('metadata')
})

export const organizationRelations = relations(organization, ({ many }) => ({
  members: many(member)
}))

export type Organization = typeof organization.$inferSelect
