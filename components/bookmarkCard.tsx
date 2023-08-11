'use client'

import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Link } from '@nextui-org/link'
import { Divider } from '@nextui-org/divider'
import { Image } from '@nextui-org/image'
import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/button'
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from '@nextui-org/dropdown'
import { useRouter } from 'next/navigation'

import { type Bookmark } from '@/types'

export const BookmarkCard = ({ data }: { data: Bookmark }) => {
	const router = useRouter()
	const deleteBookmark = async (event: React.MouseEvent, id: Number) => {
		event.stopPropagation()
		await fetch('/api/bookmark', {
			method: 'DELETE',
			body: JSON.stringify({ bookmarkId: id }),
		})
		router.refresh()
	}
	return (
		<>
			<Card className='w-96'>
				<CardHeader className='flex gap-3'>
					<Image
						alt='nextui logo'
						height={40}
						radius='sm'
						src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
						width={40}
					/>
					<div className='flex grow flex-col items-start'>
						<p className='text-md'>{data.name}</p>
						<p className='text-small text-default-500'>
							{data.link}
						</p>
					</div>
					<Dropdown>
						<DropdownTrigger>
							<Button
								variant='light'
								isIconOnly>
								<Icon
									icon='mdi:dots-vertical'
									fontSize={24}
								/>
							</Button>
						</DropdownTrigger>
						<DropdownMenu aria-label='Static Actions'>
							<DropdownItem
								key='delete'
								className='text-danger'
								color='danger'
								onClick={(event) =>
									deleteBookmark(event, data.id)
								}>
								Delete Bookmark
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
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
