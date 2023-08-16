'use client'

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from '@nextui-org/modal'
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from '@nextui-org/dropdown'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Icon } from '@iconify/react'
import { ChevronDownIcon } from './ChevronDownIcon'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewBookmarkForm() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const router = useRouter()
	const onSubmit = async () => {
		const body = {
			name,
			link,
			description,
			url,
			category_id: selectedKey === 'Other' ? 2 : 1,
		}
		await fetch('/api/bookmark', {
			method: 'POST',
			body: JSON.stringify(body),
		})
		onOpenChange()
		router.refresh()
	}

	const [name, setName] = useState('')
	const [link, setLink] = useState('')
	const [description, setDescription] = useState('')
	const [url, setUrl] = useState('')

	const [selectedKey, setSelectedKey] = useState('Other')

	return (
		<>
			<Button
				variant='ghost'
				onPress={onOpen}>
				<Icon
					icon='mdi:plus'
					fontSize={24}
				/>
				<Icon
					icon='mdi:bookmark-box'
					fontSize={24}
				/>
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement='center'
				hideCloseButton>
				<ModalContent
					onKeyUp={(e) => {
						if (e.key === 'Enter') onSubmit()
					}}>
					{(onClose) => (
						<>
							<ModalHeader className='flex gap-2'>
								New Bookmark
								<Icon
									icon='mdi:bookmark-box'
									fontSize={30}
								/>
							</ModalHeader>
							<ModalBody className='gap-4'>
								<Dropdown>
									<DropdownTrigger className='flex justify-start'>
										<Button
											startContent={
												<span className='text-default-400'>
													Category:
												</span>
											}
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
										selectedKeys={selectedKey}
										disabledKeys={['disabled']}>
										<DropdownItem
											key='disabled'
											className='capitalize'>
											Select Category
										</DropdownItem>
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
									autoFocus
									label='Name'
									placeholder='Enter Name'
									variant='bordered'
									value={name}
									onChange={(event) => {
										setName(event.target.value)
									}}
								/>
								<Input
									label='Url'
									placeholder='Enter Url'
									variant='bordered'
									value={url}
									onChange={(event) => {
										setUrl(event.target.value)
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
									Add
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
