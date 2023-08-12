'use client'

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { Bookmark } from '@/types'
import { BookmarkContext, EditBookmarkContext } from '@/app/providers'

export default function EditBookmarkForm() {
	const { isEditBookmark, setIsEditBookmark } =
		useContext(EditBookmarkContext)
	const { bookmark, setBookmark } = useContext(BookmarkContext)

	const router = useRouter()
	const onSubmit = async () => {
		const body = bookmark

		await fetch('/api/bookmark', {
			method: 'PATCH',
			body: JSON.stringify(body),
		})
		setIsEditBookmark(false)
		router.refresh()
	}

	return (
		<>
			<Modal
				isOpen={isEditBookmark}
				onOpenChange={() => setIsEditBookmark(false)}
				placement='top-center'
				hideCloseButton>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex gap-2'>
								Edit Bookmark
								<Icon
									icon='mdi:bookmark-box'
									fontSize={30}
								/>
							</ModalHeader>
							<ModalBody className='gap-4'>
								<Input
									autoFocus
									label='Name'
									placeholder='Enter Name'
									variant='bordered'
									value={bookmark.name}
									onChange={(event) => {
										setBookmark({
											...bookmark,
											name: event.target.value,
										})
									}}
								/>
								<Input
									label='Link'
									placeholder='Enter Link'
									variant='bordered'
									value={bookmark.link}
									onChange={(event) => {
										setBookmark({
											...bookmark,
											link: event.target.value,
										})
									}}
								/>
								<Input
									label='Description'
									placeholder='Enter Desription'
									variant='bordered'
									value={bookmark.description}
									onChange={(event) => {
										setBookmark({
											...bookmark,
											description: event.target.value,
										})
									}}
								/>
								<Input
									label='Url'
									placeholder='Enter Url'
									variant='bordered'
									value={bookmark.url}
									onChange={(event) => {
										setBookmark({
											...bookmark,
											url: event.target.value,
										})
									}}
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									color='danger'
									variant='flat'
									onClick={onClose}>
									Close
								</Button>
								<Button
									color='primary'
									onPress={onSubmit}>
									Update
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
