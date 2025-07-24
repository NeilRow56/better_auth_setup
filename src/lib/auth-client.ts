import {
  inferAdditionalFields,
  adminClient,
  organizationClient
} from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import type { auth } from '@/lib/auth'
import { ac, roles } from '@/lib/permissions'

import { env } from './env'

const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: env.NEXT_PUBLIC_API_URL,

  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient({ ac, roles }),
    organizationClient()
  ]
})

export const { signIn, signUp, signOut, useSession, admin, organization } =
  authClient
