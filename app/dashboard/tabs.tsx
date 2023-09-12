'use client'

import { BookmarkCategoryWithBookmarks } from '@/types'
import { Tabs, Tab } from '@nextui-org/tabs'
import { BookmarkCard } from '@/components/bookmarkCard'
import { useContext } from 'react'
import { BookmarkCategoryContext } from '@/app/providers'
import EditBookmarkForm from './editBookmarkForm'

export default function BookmarkTabs({
	data,
}: {
	data: BookmarkCategoryWithBookmarks[]
}) {
	const { selectedCategory, setSelectedCategory } = useContext(
		BookmarkCategoryContext
	)

	return (
		<div className='flex w-full max-w-4xl flex-col'>
			<Tabs
				fullWidth
				selectedKey={selectedCategory}
				onSelectionChange={(key) => setSelectedCategory(key.toString())}
				color='primary'>
				{data.map((bookmarkCategory) => (
					<Tab
						key={bookmarkCategory.id}
						title={bookmarkCategory.name}>
						<div className='mt-12 flex flex-wrap justify-center gap-6'>
							{bookmarkCategory.bookmark.map((data, index) => (
								<BookmarkCard
									key={index}
									data={data}
								/>
							))}
						</div>
					</Tab>
				))}
			</Tabs>
			<EditBookmarkForm />
		</div>
	)
}
