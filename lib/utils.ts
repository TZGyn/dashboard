import { db } from './db'

export const getBookmarkCategories = async (user: number | null) => {
	const bookmarkCategories = await db.query.bookmarkCategory.findMany({
		where: (bookmarkCategory, { eq }) =>
			eq(bookmarkCategory.userId, user ?? 0),
	})

	return bookmarkCategories
}
