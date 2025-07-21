import { pgTable as table } from 'drizzle-orm/pg-core'
import * as t from 'drizzle-orm/pg-core'

export const verification = table('verification', {
  id: t.text('id').primaryKey(),
  identifier: t.text('identifier').notNull(),
  value: t.text('value').notNull(),
  expiresAt: t.timestamp('expires_at').notNull(),
  createdAt: t
    .timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: t
    .timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
})
