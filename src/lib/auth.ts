import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/db'
import * as schema from '@/db/schema'
import { nextCookies } from 'better-auth/next-js'
import { Resend } from 'resend'
import { env } from './env'
import VerifyEmail from '@/components/emails/verify-email'
import ForgotPasswordEmail from '@/components/emails/reset-password'
import { ac, roles } from '@/lib/permissions'
import { admin } from 'better-auth/plugins'

const resend = new Resend(env.RESEND_API_KEY)

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      resend.emails.send({
        from: `${env.EMAIL_SENDER_NAME} <${env.EMAIL_SENDER_ADDRESS}>`,
        to: user.email,
        subject: 'Verify your email',
        react: VerifyEmail({ username: user.name, verifyUrl: url })
      })
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      resend.emails.send({
        from: `${env.EMAIL_SENDER_NAME} <${env.EMAIL_SENDER_ADDRESS}>`,
        to: user.email,
        subject: 'Reset your password',
        react: ForgotPasswordEmail({
          username: user.name,
          resetUrl: url,
          userEmail: user.email
        })
      })
    },
    requireEmailVerification: true
  },
  user: {
    additionalFields: {
      role: {
        type: ['ADMIN', 'MANAGER', 'USER']
      }
    }
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days - default is 7 days
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },

  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
      user: schema.UsersTable
      // session, user and verification table names already match the database names
    }
  }),
  plugins: [
    nextCookies(),
    admin({
      defaultRole: 'USER',
      adminRoles: ['ADMIN', 'MANAGER'],
      ac,
      roles
    })
  ]
})

export type ErrorCode = keyof typeof auth.$ERROR_CODES | 'UNKNOWN'
