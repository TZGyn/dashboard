import { bookmarkCategoryWithBookmarksSchema } from '@/types'
import { db } from '@/lib/db'
import BookmarkTabs from './tabs'
import { cookies } from 'next/headers'
import { getUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function DashboardPage() {
	const token = cookies().get('token')

	const session_user = await getUser(token)

	const data = await db.query.bookmarkCategory.findMany({
		where: (bookmark, { eq }) =>
			eq(bookmark.userId, session_user ? session_user.id : 0),
		with: {
			bookmark: true,
		},
		orderBy: (bookmark, { asc }) => [asc(bookmark.position)],
	})

	const bookmarkCategoryWithBookmarks = bookmarkCategoryWithBookmarksSchema
		.array()
		.parse(data)

	return (
		<div className='flex w-full max-w-4xl flex-row flex-wrap justify-start gap-6'>
			<BookmarkTabs data={bookmarkCategoryWithBookmarks} />
		</div>
	)
}
