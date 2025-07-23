import { ReturnButton } from '@/components/return-button'

import { auth } from '@/lib/auth'

import { headers } from 'next/headers'

import { redirect } from 'next/navigation'

export default async function AdminDashboardPage() {
  const headersList = await headers()

  const session = await auth.api.getSession({
    headers: headersList
  })
  if (!session) redirect('/auth/sign-in')

  if (session.user.role !== 'ADMIN') {
    return (
      <div className='container mx-auto max-w-screen-lg space-y-8 px-8 py-16'>
        <div className='space-y-4'>
          <ReturnButton href='/profile' label='Profile' />

          <h1 className='text-3xl font-bold'>Admin Dashboard</h1>

          <p className='rounded-md bg-red-600 p-2 text-lg font-bold text-white'>
            FORBIDDEN
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto max-w-screen-lg space-y-8 px-8 py-16'>
      <div className='space-y-4'>
        <ReturnButton href='/profile' label='Profile' />

        <h1 className='text-3xl font-bold'>Admin Dashboard</h1>

        <p className='rounded-md bg-green-600 p-2 text-lg font-bold text-white'>
          ACCESS GRANTED
        </p>
      </div>

      {/* <div className="w-full overflow-x-auto">
        <table className="table-auto min-w-full whitespace-nowrap">
          <thead>
            <tr className="border-b text-sm text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2 text-center">Role</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id} className="border-b text-sm text-left">
                <td className="px-4 py-2">{user.id.slice(0, 8)}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 text-center">
                  <UserRoleSelect
                    userId={user.id}
                    role={user.role as UserRole}
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  {user.role === "USER" ? (
                    <DeleteUserButton userId={user.id} />
                  ) : (
                    <PlaceholderDeleteUserButton />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  )
}
