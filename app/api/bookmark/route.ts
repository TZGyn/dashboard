import { bookmarkSchema } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { db, bookmark } from '@/lib/schema'

export const dynamic = 'force-dynamic'

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
