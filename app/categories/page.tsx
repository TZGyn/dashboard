import { bookmarkCategoryWithBookmarksSchema } from '@/types'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { getUser } from '@/lib/auth'
import TableComponent from './table'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function CategoriesPage() {
	const token = cookies().get('token')

	const session_user = await getUser(token)

	const data = await db.query.bookmarkCategory.findMany({
		where: (bookmarkCategory, { eq }) =>
			eq(bookmarkCategory.userId, session_user ? session_user.id : 0),
		with: {
			bookmark: true,
		},
	})

	const bookmarkCategories = bookmarkCategoryWithBookmarksSchema
		.array()
		.parse(data)

	return (
		<div className='flex w-full max-w-4xl flex-row flex-wrap justify-start gap-6'>
			<TableComponent bookmarkCategories={bookmarkCategories} />
		</div>
	)
}
