'use client'

import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Tooltip,
} from '@nextui-org/react'
import { DeleteIcon, EditIcon } from '@/components/icons'
import { BookmarkCategory } from '@/types'

import { useRouter } from 'next/navigation'

const columns = [
	{ name: 'NAME', uid: 'name' },
	{ name: 'ACTIONS', uid: 'actions' },
]

export default function TableComponent({
	bookmarkCategories,
}: {
	bookmarkCategories: BookmarkCategory[]
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
					{(item) => (
						<TableRow key={item.id}>
							<TableCell>{item.name}</TableCell>
							<TableCell>
								<div className='relative flex items-center gap-2'>
									<Tooltip content='Edit user'>
										<span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
											<EditIcon />
										</span>
									</Tooltip>
									<Tooltip
										color='danger'
										content='Delete user'>
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
					)}
				</TableBody>
			</Table>
		</>
	)
}
