'use client'

import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Tooltip,
	Select,
	SelectItem,
	Selection,
} from '@nextui-org/react'
import { DeleteIcon, EditIcon } from '@/components/icons'
import { BookmarkCategory, BookmarkCategoryWithBookmarks } from '@/types'

import { useRouter } from 'next/navigation'

const columns = [
	{ name: 'NAME', uid: 'name' },
	{ name: 'POSITION', uid: 'position' },
	{ name: 'BOOKMARK COUNT', uid: 'bookmarkcount' },
	{ name: 'ACTIONS', uid: 'actions' },
]

export default function TableComponent({
	bookmarkCategories,
}: {
	bookmarkCategories: BookmarkCategoryWithBookmarks[]
}) {
	const router = useRouter()

	const deleteCategory = async (id: number) => {
		if (!confirm('Do you want to delete this category?')) return
		const body = {
			bookmarkCategoryId: id,
		}
		await fetch('/api/bookmark_category', {
			method: 'DELETE',
			body: JSON.stringify(body),
		})

		router.refresh()
		return
	}

	const updateCategory = async (
		bookmark_category: BookmarkCategory,
		position: Selection
	) => {
		if (position === 'all') return

		const body = {
			...bookmark_category,
			position: parseInt(position.values().next().value),
		}

		await fetch('/api/bookmark_category', {
			method: 'PATCH',
			body: JSON.stringify(body),
		})

		router.refresh()
		return
	}

	return (
		<>
			<Table>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.uid}>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={bookmarkCategories}>
					{(item) => {
						const { bookmark: _, ...category } = item
						return (
							<TableRow key={item.id}>
								<TableCell>{item.name}</TableCell>
								<TableCell>
									<Select
										placeholder='Select position'
										selectedKeys={item.position.toString()}
										onSelectionChange={(key) => {
											updateCategory(category, key)
										}}>
										{bookmarkCategories.map((_, index) => (
											<SelectItem
												key={index + 1}
												value={index + 1}>
												{(index + 1).toString()}
											</SelectItem>
										))}
									</Select>
								</TableCell>
								<TableCell>{item.bookmark.length}</TableCell>
								<TableCell>
									<div className='relative flex items-center gap-2'>
										<Tooltip content='Edit Category'>
											<span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
												<EditIcon />
											</span>
										</Tooltip>
										<Tooltip
											color='danger'
											content='Delete Category'>
											<span
												className='cursor-pointer text-lg text-danger active:opacity-50'
												onClick={() =>
													deleteCategory(item.id)
												}>
												<DeleteIcon />
											</span>
										</Tooltip>
									</div>
								</TableCell>
							</TableRow>
						)
					}}
				</TableBody>
			</Table>
		</>
	)
}
