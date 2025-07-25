import { pgTable as table } from 'drizzle-orm/pg-core'
import * as t from 'drizzle-orm/pg-core'
// import { relations } from 'drizzle-orm'

export const roles = ['ADMIN', 'MANAGER', 'USER'] as const
export type Role = (typeof roles)[number]
export const roleEnum = t.pgEnum('user_role', roles)

export const UsersTable = table('users', {
  id: t.text('id').primaryKey(),
  name: t.text('name').notNull(),
  email: t.text('email').notNull().unique(),
  role: roleEnum().notNull().default('USER'),
  emailVerified: t
    .boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: t.text('image'),
  createdAt: t
    .timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: t
    .timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull()
})
