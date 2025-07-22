'use client'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'

import Link from 'next/link'
import { SignOutButton } from './sign-out-button'

export const GetStartedButton = () => {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <Button size='lg' className='opacity-50' asChild>
        <span>Get Started</span>
      </Button>
    )
  }

  const href = session ? '/profile' : '/auth/sign-in'

  return (
    <div className='flex flex-col items-center gap-4'>
      <Button size='lg' asChild>
        <Link href={href}>Get Started</Link>
      </Button>

      {session && (
        <div className='mx-auto flex flex-col space-y-4'>
          <p>Welcome back, {session.user.name}! 👋</p>
          <SignOutButton />
        </div>
      )}
    </div>
  )
}
