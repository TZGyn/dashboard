import { SVGProps } from 'react'
import { z } from 'zod'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number
}

const bookmark = {
	name: z.string(),
	link: z.string(),
	description: z.string(),
	url: z.string().url(),
}

export const bookmarkSchema = z.object({
	id: z.number(),
	...bookmark,
})

export const newBookmarkSchema = z.object({
	...bookmark,
})

export type Bookmark = z.infer<typeof bookmarkSchema>
