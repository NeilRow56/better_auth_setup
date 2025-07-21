import { createEnv } from '@t3-oss/env-nextjs' // or core package
import { z } from 'zod/v4'

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    DATABASE_URL: z.url()
  },

  experimental__runtimeEnv: {}
})
