import { SVGProps } from 'react'
import { z } from 'zod'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number
}

export const bookmarkSchema = z.object({
	name: z.string(),
	link: z.string(),
	description: z.string(),
	url: z.string().url(),
})

export type Bookmark = z.infer<typeof bookmarkSchema>
