import { bookmarkCategorySchema, newBookmarkCategorySchema } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { bookmarkCategory } from '@/lib/schema'
import { db } from '@/lib/db'
import { eq, and } from 'drizzle-orm'
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
	const token = cookies().get('token')

	const session_user = await getUser(token)

	const bookmarkId = body.bookmarkCategoryId

	const selectedBookmarkCategory = await db.query.bookmarkCategory.findFirst({
		where: (bookmarkCategory, { eq }) =>
			eq(bookmarkCategory.id, bookmarkId),
		with: {
			bookmark: true,
		},
	})

	if (!selectedBookmarkCategory)
		return NextResponse.json({ message: 'Invalid Category' })

	if (selectedBookmarkCategory.bookmark.length) {
		return NextResponse.json({
			message: 'Category Must Have No Bookmarks To Be Deleted',
		})
	}

	await db
		.delete(bookmarkCategory)
		.where(
			and(
				eq(bookmarkCategory.id, bookmarkId),
				eq(bookmarkCategory.userId, session_user ? session_user.id : 0)
			)
		)

	return NextResponse.json({ message: 'Bookmark Category Deleted' })
}
