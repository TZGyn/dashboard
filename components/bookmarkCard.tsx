'use client'

import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Link } from '@nextui-org/link'
import { Divider } from '@nextui-org/divider'
import { Image } from '@nextui-org/image'

import { type Bookmark } from '@/types'

export const BookmarkCard = ({ data }: { data: Bookmark }) => {
	return (
		<>
			<Card
				className='w-96'
				isPressable
				onPress={() => open(data.url, '_blank')}>
				<CardHeader className='flex gap-3'>
					<Image
						alt='nextui logo'
						height={40}
						radius='sm'
						src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
						width={40}
					/>
					<div className='flex flex-col items-start'>
						<p className='text-md'>{data.name}</p>
						<p className='text-small text-default-500'>
							{data.link}
						</p>
					</div>
				</CardHeader>
				<Divider />
				<CardBody>
					<p>{data.description}</p>
				</CardBody>
				<Divider />
				<CardFooter>
					<Link
						isExternal
						showAnchorIcon
						href={data.url}>
						{data.url}
					</Link>
				</CardFooter>
			</Card>
		</>
	)
}
