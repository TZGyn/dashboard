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

export default function NewBookmarkForm() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const onSubmit = () => {
		console.log('submitting')
		onOpenChange()
	}

	return (
		<>
			<Button onPress={onOpen}>
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
				placement='top-center'>
				<ModalContent>
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
								/>
								<Input
									label='Link'
									placeholder='Enter Link'
									variant='bordered'
								/>
								<Input
									label='Description'
									placeholder='Enter Desription'
									variant='bordered'
								/>
								<Input
									label='Url'
									placeholder='Enter Url'
									variant='bordered'
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
