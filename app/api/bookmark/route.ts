import { bookmarkSchema } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { db, bookmark } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export const GET = async () => {
	const bookmarks = await db.select().from(bookmark)

	return NextResponse.json(bookmarks)
}

export const POST = async (request: NextRequest) => {
	const body = await request.json()

	const newBookmark = bookmarkSchema.safeParse(body)

	if (newBookmark.success) {
		await db.insert(bookmark).values(newBookmark.data)

		return NextResponse.json({ status: 200 })
	}

	return NextResponse.json(newBookmark.error)
}

export const DELETE = async (request: NextRequest) => {
	const body = await request.json()

	const bookmarkId = body.bookmarkId

	await db.delete(bookmark).where(eq(bookmark.id, bookmarkId))

	return NextResponse.json({ message: 'Bookmark Deleted' })
}
