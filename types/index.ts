import { SVGProps } from 'react'
import { z } from 'zod'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number
}

const bookmark = {
	name: z.string().nonempty(),
	link: z.string(),
	description: z.string(),
	url: z.string().url().nonempty(),
	category_id: z.number(),
}

export const bookmarkSchema = z.object({
	id: z.number(),
	...bookmark,
})

export const newBookmarkSchema = z.object({
	...bookmark,
})

export type Bookmark = z.infer<typeof bookmarkSchema>

const bookmarkCategory = {
	name: z.string().nonempty(),
}

export const newBookmarkCategorySchema = z.object({
	...bookmarkCategory,
})

export const bookmarkCategorySchema = z.object({
	id: z.number(),
	...bookmarkCategory,
})

export const bookmarkCategoryWithBookmarksSchema = z.object({
	id: z.number(),
	...bookmarkCategory,
	bookmark: bookmarkSchema.array(),
})

export type BookmarkCategoryWithBookmarks = z.infer<
	typeof bookmarkCategoryWithBookmarksSchema
>

export const userSchema = z.object({
	email: z.string().email(),
	name: z.string(),
})

export type User = z.infer<typeof userSchema>
