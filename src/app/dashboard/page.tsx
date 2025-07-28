import { SignOutButton } from '@/components/sign-out-button'
import { buttonVariants } from '@/components/ui/button'

import { ArrowLeft } from 'lucide-react'

import Link from 'next/link'

import React from 'react'

export default async function DashboardPage() {
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
                href='/admin/dashboard'
                className={buttonVariants({
                  variant: 'default'
                })}
              >
                <span className='flex items-center gap-4'>
                  <ArrowLeft />
                  Admin Dashboard
                </span>
              </Link>
            </div>
          </div>
        </div>
        <h1 className='text-3xl'>Public Dashboard Page - not protected</h1>

        <div className='w-full'>
          <SignOutButton />
        </div>
      </div>
    </div>
  )
}
