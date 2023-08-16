'use client'

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@nextui-org/modal'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/dropdown'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { BookmarkContext, EditBookmarkContext } from '@/app/providers'
import { ChevronDownIcon } from './ChevronDownIcon'

export default function EditBookmarkForm() {
	const { isEditBookmark, onIsEditBookmarkChange } =
		useContext(EditBookmarkContext)
	const { bookmark, setBookmark } = useContext(BookmarkContext)

	const router = useRouter()
	const onSubmit = async () => {
		const body = {
			...bookmark,
			category_id: selectedKey === 'Other' ? 2 : 1,
		}

		await fetch('/api/bookmark', {
			method: 'PATCH',
			body: JSON.stringify(body),
		})
		onIsEditBookmarkChange()
		router.refresh()
	}

	const [selectedKey, setSelectedKey] = useState(
		bookmark.category_id == 2 ? 'Other' : 'Coding'
	)

	return (
		<>
			<Modal
				isOpen={isEditBookmark}
				onOpenChange={onIsEditBookmarkChange}
				placement='top-center'
				hideCloseButton>
				<ModalContent
					onKeyUp={(e) => {
						if (e.key === 'Enter') onSubmit()
					}}>
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
								<Dropdown>
									<DropdownTrigger className='hidden justify-start sm:flex'>
										<Button
											endContent={
												<ChevronDownIcon className='text-small' />
											}
											variant='flat'>
											<div className='w-full text-start'>
												{selectedKey}
											</div>
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										disallowEmptySelection
										selectionMode='single'
										selectedKeys={selectedKey}>
										<DropdownItem
											key='Coding'
											onClick={() => {
												setSelectedKey('Coding')
											}}
											className='capitalize'>
											Coding
										</DropdownItem>
										<DropdownItem
											key='Other'
											onClick={() => {
												setSelectedKey('Other')
											}}
											className='capitalize'>
											Other
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
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
