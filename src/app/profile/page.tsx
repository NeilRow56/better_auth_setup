import { SignOutButton } from '@/components/sign-out-button'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { ArrowLeftIcon } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('/auth/sign-in')

  const role = session.user.role

  return (
    <div className='container mx-auto max-w-screen-lg space-y-8 px-8 py-16'>
      <div className='space-y-4'>
        <Button size='icon' asChild>
          <Link href='/'>
            <ArrowLeftIcon />
          </Link>
        </Button>
        <h1 className='text-3xl font-bold'>Profile</h1>
        <div className='flex items-center gap-2'>
          {session.user.role === 'ADMIN' && (
            <Button size='sm' asChild>
              <Link href='/admin/dashboard'>Admin Dashboard</Link>
            </Button>
          )}

          <SignOutButton />
        </div>

        <pre className='overflow-clip text-sm'>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      <div>User Role: {role}</div>
    </div>
  )
}
