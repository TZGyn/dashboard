import { bookmarkCategorySchema, newBookmarkCategorySchema } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { bookmarkCategory } from '@/lib/schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { getUser } from '@/lib/auth'

export const POST = async (request: NextRequest) => {
	const body = await request.json()
	const token = cookies().get('token')

	const session_user = await getUser(token)

	const newBookmarkCategory = newBookmarkCategorySchema.safeParse(body)

	if (newBookmarkCategory.success) {
		await db.insert(bookmarkCategory).values({
			...newBookmarkCategory.data,
			userId: session_user ? session_user.id : 0,
		})

		return NextResponse.json({ status: 200 })
	}

	return NextResponse.json(newBookmarkCategory.error)
}

export const PATCH = async (request: NextRequest) => {
	const body = await request.json()

	const updateBookmarkCategory = bookmarkCategorySchema.safeParse(body)

	if (updateBookmarkCategory.success) {
		await db
			.update(bookmarkCategory)
			.set({ ...updateBookmarkCategory.data })
			.where(eq(bookmarkCategory.id, updateBookmarkCategory.data.id))

		return NextResponse.json({ message: 'Bookmark Updated' })
	}

	return NextResponse.json(updateBookmarkCategory.error)
}

export const DELETE = async (request: NextRequest) => {
	const body = await request.json()

	const bookmarkId = body.bookmarkCategoryId

	await db.delete(bookmarkCategory).where(eq(bookmarkCategory.id, bookmarkId))

	return NextResponse.json({ message: 'Bookmark Deleted' })
}
