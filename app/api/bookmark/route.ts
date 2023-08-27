import { bookmarkSchema, newBookmarkSchema } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { bookmark } from '@/lib/schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { getUser } from '@/lib/auth'

export const POST = async (request: NextRequest) => {
	const body = await request.json()
	const token = cookies().get('token')

	const session_user = await getUser(token)

	const newBookmark = newBookmarkSchema.safeParse(body)

	if (newBookmark.success) {
		await db.insert(bookmark).values({
			...newBookmark.data,
			userId: session_user ? session_user.id : null,
		})

		return NextResponse.json({ status: 200 })
	}

	return NextResponse.json(newBookmark.error)
}

export const PATCH = async (request: NextRequest) => {
	const body = await request.json()

	const updateBookmark = bookmarkSchema.safeParse(body)

	if (updateBookmark.success) {
		await db
			.update(bookmark)
			.set({ ...updateBookmark.data })
			.where(eq(bookmark.id, updateBookmark.data.id))

		return NextResponse.json({ message: 'Bookmark Updated' })
	}

	return NextResponse.json(updateBookmark.error)
}

export const DELETE = async (request: NextRequest) => {
	const body = await request.json()

	const bookmarkId = body.bookmarkId

	await db.delete(bookmark).where(eq(bookmark.id, bookmarkId))

	return NextResponse.json({ message: 'Bookmark Deleted' })
}
