import { createAccessControl } from 'better-auth/plugins/access'
import { defaultStatements, adminAc } from 'better-auth/plugins/admin/access'

const statements = {
  ...defaultStatements,
  users: ['create', 'read', 'update', 'delete', 'update:own', 'delete:own']
} as const

export const ac = createAccessControl(statements)

export const roles = {
  USER: ac.newRole({
    users: ['create', 'read', 'update:own', 'delete:own']
  }),
  MANAGER: ac.newRole({
    users: ['create', 'read', 'update:own', 'delete:own']
  }),

  ADMIN: ac.newRole({
    users: ['create', 'read', 'update', 'delete', 'update:own', 'delete:own'],
    ...adminAc.statements
  })
}
