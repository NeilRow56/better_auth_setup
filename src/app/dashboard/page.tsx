import { CreateOrganizationForm } from '@/components/forms/create-organization-form'
import { SignOutButton } from '@/components/sign-out-button'
import { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { getOrganizations } from '@/server/organizations'
import { ArrowLeft } from 'lucide-react'

import Link from 'next/link'

import React from 'react'

export default async function DashboardPage() {
  const organizations = await getOrganizations()
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
        <div className='flex h-[500px] flex-col items-center justify-center gap-2'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline'>Create Organization</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Organization</DialogTitle>
                <DialogDescription>
                  Create a new organization to get started.
                </DialogDescription>
              </DialogHeader>
              <CreateOrganizationForm />
            </DialogContent>
          </Dialog>

          <div className='flex flex-col gap-2'>
            <h2 className='text-2xl font-bold'>Organizations</h2>
            {organizations.map(organization => (
              <Button variant='outline' key={organization.id} asChild>
                <Link href={`/dashboard/organization/${organization.slug}`}>
                  {organization.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className='w-full'>
          <SignOutButton />
        </div>
      </div>
    </div>
  )
}
