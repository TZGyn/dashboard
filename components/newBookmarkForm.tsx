'use client'

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from '@nextui-org/modal'
import { Select, SelectSection, SelectItem } from '@nextui-org/select'
import { Selection } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Tab, Tabs } from '@nextui-org/tabs'
import { BookmarkCategory } from '@/types'

export default function NewBookmarkForm({
	categories,
}: {
	categories: BookmarkCategory[]
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const router = useRouter()
	const onSubmit = () => {
		if (selected === 'bookmark') submitBookmark()
		else if (selected === 'bookmark_category') submitCategory()
		else return
	}

	const submitBookmark = async () => {
		if (value === 'all') return
		const body = {
			name,
			link,
			description,
			url,
			category_id: parseInt(value.values().next().value),
		}
		await fetch('/api/bookmark', {
			method: 'POST',
			body: JSON.stringify(body),
		})
		onOpenChange()
		router.refresh()
	}

	const submitCategory = async () => {
		const body = {
			name: categoryName,
		}
		await fetch('/api/bookmark_category', {
			method: 'POST',
			body: JSON.stringify(body),
		})
		onOpenChange()
		router.refresh()
	}

	const [selected, setSelected] = useState('bookmark')

	const [name, setName] = useState('')
	const [link, setLink] = useState('')
	const [description, setDescription] = useState('')
	const [url, setUrl] = useState('')

	const [categoryName, setCategoryName] = useState('')

	const [value, setValue] = useState<Selection>(new Set([]))

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
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex gap-2'>
								New Bookmark/Category
								<Icon
									icon='mdi:bookmark-box'
									fontSize={30}
								/>
							</ModalHeader>
							<ModalBody className='gap-4'>
								<Tabs
									selectedKey={selected}
									onSelectionChange={(key) =>
										setSelected(key.toString())
									}
									fullWidth
									color='primary'>
									<Tab
										key='bookmark'
										title={'Bookmark'}>
										<form className='flex flex-col gap-4'>
											<Select
												label='Category'
												placeholder='Select a category'
												selectedKeys={value}
												onSelectionChange={setValue}
												disabledKeys={['placeholder']}>
												<SelectSection
													showDivider
													title='Categories'>
													{[...categories].map(
														(category) => (
															<SelectItem
																key={
																	category.id
																}
																value={
																	category.id
																}>
																{category.name}
															</SelectItem>
														)
													)}
												</SelectSection>
											</Select>
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
										</form>
									</Tab>
									<Tab
										key='bookmark_category'
										title={'Bookmark Category'}>
										<form className='flex flex-col gap-4'>
											<Input
												autoFocus
												label='Category Name'
												placeholder='Enter Category Name'
												variant='bordered'
												value={categoryName}
												onChange={(event) => {
													setCategoryName(
														event.target.value
													)
												}}
											/>
										</form>
									</Tab>
								</Tabs>
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
