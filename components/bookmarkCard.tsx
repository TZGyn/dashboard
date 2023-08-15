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
import { useContext } from 'react'
import { BookmarkContext, EditBookmarkContext } from '@/app/providers'

export const BookmarkCard = ({ data }: { data: Bookmark }) => {
	const { onIsEditBookmark } = useContext(EditBookmarkContext)
	const { bookmark, setBookmark } = useContext(BookmarkContext)

	const router = useRouter()
	const deleteBookmark = async (event: React.MouseEvent, id: Number) => {
		event.stopPropagation()
		await fetch('/api/bookmark', {
			method: 'DELETE',
			body: JSON.stringify({ bookmarkId: id }),
		})
		router.refresh()
	}
	const editBookmark = (selectedBookmark: Bookmark) => {
		setBookmark({ ...bookmark, ...selectedBookmark })
		onIsEditBookmark()
	}
	return (
		<>
			<Card className='w-96 grow select-none'>
				<CardHeader className='flex gap-3'>
					<Image
						alt='nextui logo'
						height={40}
						radius='sm'
						src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
						width={40}
					/>
					<Link
						isExternal
						href={data.url}
						color='foreground'
						className='flex grow flex-col items-start'>
						<p className='text-md'>{data.name}</p>
						<p className='text-small text-default-500'>
							{data.link}
						</p>
					</Link>
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
								key='edit'
								onPress={() => editBookmark(data)}>
								Edit Bookmark
							</DropdownItem>
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
			</Card>
		</>
	)
}
