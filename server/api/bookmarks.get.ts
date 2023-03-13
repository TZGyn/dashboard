import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// fixed "Do not know how to serialize a BigInt"
;(BigInt.prototype as any).toJSON = function () {
	return this.toString()
}

export default defineEventHandler(async (event) => {
	// const user = await serverSupabaseUser(event)

	// if (!user) {
	// 	throw createError({ statusCode: 401, message: 'Unauthorized' })
	// }

	const bookmark_categories = await prisma.bookmark_categories.findMany({
		// where: { user_id: user.id },
		select: {
			bookmark_category_name: true,
			bookmark_category_icon: true,
			bookmarks: {
				select: {
					bookmark_name: true,
					bookmark_icon: true,
					bookmark_link: true,
				},
			},
		},
	})

	return bookmark_categories
})
