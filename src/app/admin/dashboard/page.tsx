import { SignOutButton } from '@/components/sign-out-button'
import { buttonVariants } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  return (
    <div className='container mx-auto max-w-screen-lg space-y-8 px-8 py-16'>
      <div className='flex flex-col space-y-8'>
        <div className='w-full max-w-sm md:max-w-3xl'>
          <div className='mb-8'>
            <Link
              href='/'
              className={buttonVariants({
                variant: 'outline'
              })}
            >
              <span className='flex items-center gap-4'>
                <ArrowLeft />
                Home
              </span>
            </Link>
          </div>
          <div className='w-full max-w-sm md:max-w-3xl'>
            <div className='mb-8'>
              <Link
                href='/dashboard'
                className={buttonVariants({
                  variant: 'default'
                })}
              >
                <span className='flex items-center gap-4'>
                  <ArrowLeft />
                  Dashboard
                </span>
              </Link>
            </div>
          </div>
        </div>
        <h1 className='text-3xl'>Admin Dashboard Page</h1>

        <div className='w-full'>
          <SignOutButton />
        </div>
      </div>
    </div>
  )
}
