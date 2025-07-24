'use server'

import { db } from '@/db'
import { UsersTable } from '@/db/schema'
import { auth } from '@/lib/auth'
import { and, asc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password
      }
    })

    return {
      success: true,
      message: 'Signed in successfully.'
    }
  } catch (error) {
    const e = error as Error

    return {
      success: false,
      message: e.message || 'An unknown error occurred.'
    }
  }
}

export const signUp = async (email: string, password: string, name: string) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        role: 'USER'
      }
    })

    return {
      success: true,
      message: 'Signed up successfully.'
    }
  } catch (error) {
    const e = error as Error

    return {
      success: false,
      message: e.message || 'An unknown error occurred.'
    }
  }
}

/* ADMIN QUERIES - THESE QUERIES REQUIRE ADMIN ACCESS */

export async function findAllUsers() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) redirect('/auth/sign-in')

  const allUsers = await db
    .select()
    .from(UsersTable)
    .orderBy(asc(UsersTable.name))

  return allUsers
}

export async function deleteUser(id: string) {
  const headersList = await headers()

  const session = await auth.api.getSession({
    headers: headersList
  })

  if (!session) throw new Error('Unauthorized')

  if (session.user.role !== 'ADMIN' || session.user.id === id) {
    throw new Error('Forbidden operation')
  }

  try {
    await db
      .delete(UsersTable)
      .where(and(eq(UsersTable.id, id), eq(UsersTable.role, 'USER')))
  } catch (error) {
    console.error(error)
    return {
      error:
        'Failed to delete user. Admin users cannot be deleted. Users cannot delete themselves'
    }
  }

  revalidatePath('/admin/dashboard')
}
