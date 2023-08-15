import { bookmarkCategoryWithBookmarksSchema } from '@/types'
import { bookmark } from '@/lib/schema'
import { db } from '@/lib/db'
import EditBookmarkForm from '@/components/editBookmarkForm'
import BookmarkTabs from '@/components/tabs'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function DashboardPage() {
	const data = await db.query.bookmarkCategory.findMany({
		with: {
			bookmark: true,
		},
	})

	const bookmarkCategoryWithBookmarks = bookmarkCategoryWithBookmarksSchema
		.array()
		.parse(data)

	return (
		<div className='flex w-full max-w-4xl flex-row flex-wrap justify-start gap-6'>
			<BookmarkTabs data={bookmarkCategoryWithBookmarks} />
			<EditBookmarkForm />
		</div>
	)
}
