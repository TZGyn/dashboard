'use client'

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Icon } from '@iconify/react'
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
				placement='top-center'
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
									label='Link'
									placeholder='Enter Link'
									variant='bordered'
									value={link}
									onChange={(event) => {
										setLink(event.target.value)
									}}
								/>
								<Input
									label='Description'
									placeholder='Enter Desription'
									variant='bordered'
									value={description}
									onChange={(event) => {
										setDescription(event.target.value)
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
