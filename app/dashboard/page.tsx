import { BookmarkCard } from '@/components/bookmarkCard'
import { bookmarkSchema } from '@/types'
import { db, bookmark } from '@/lib/schema'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function DashboardPage() {
	const data = await db.select().from(bookmark)

	const bookmarks = bookmarkSchema.array().parse(data)
	return (
		<div className='mt-4 flex w-full max-w-4xl flex-row flex-wrap justify-center gap-6'>
			{bookmarks.map((data, index) => (
				<BookmarkCard
					key={index}
					data={data}
				/>
			))}
		</div>
	)
}
