import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { findAllUsers } from '@/server/users'
import { roles } from '@/db/schema'
import { Button } from '../ui/button'
import { PencilIcon } from 'lucide-react'
import DeleteUserButton from './delete-user-button'

export async function UserTable() {
  const users = await findAllUsers()

  const sortedUsers = users.sort((a, b) => {
    if (a.role === 'ADMIN' && b.role !== 'ADMIN') return -1
    if (a.role !== 'ADMIN' && b.role === 'ADMIN') return 1
    return 0
  })

  return (
    <Table>
      <TableCaption>A list of your recent users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedUsers.map(user => (
          <TableRow key={user.id}>
            <TableCell className='font-medium'>{user.id.slice(0, 8)}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Select>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder={user.role} />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className='space-x-2 text-right'>
              <Button variant='ghost' className='cursor-pointer'>
                <PencilIcon />
              </Button>
              {user.role === 'USER' ? (
                <DeleteUserButton userId={user.id} />
              ) : (
                <Button
                  variant='ghost'
                  className='mr-2 cursor-pointer'
                ></Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className='text-right'>£Total</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
