'use client'

import { BookmarkCategoryWithBookmarks } from '@/types'
import { Tabs, Tab } from '@nextui-org/tabs'
import { BookmarkCard } from './bookmarkCard'

export default function BookmarkTabs({
	data,
}: {
	data: BookmarkCategoryWithBookmarks[]
}) {
	return (
		<div className='flex w-full max-w-4xl flex-col'>
			<Tabs
				fullWidth
				color='primary'>
				{data.map((bookmarkCategory, index) => (
					<Tab
						key={index}
						title={bookmarkCategory.name}>
						<div className='mt-4 flex flex-wrap justify-center gap-6'>
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
		</div>
	)
}
