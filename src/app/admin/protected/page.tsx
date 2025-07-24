import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function ProtectedPage() {
  const headersList = await headers()

  const session = await auth.api.getSession({
    headers: headersList
  })
  if (!session) redirect('/auth/sign-in')
  return <div>Protected Page</div>
}
