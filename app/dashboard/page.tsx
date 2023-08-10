import { BookmarkCard } from '@/components/bookmarkCard'
import { bookmarkSchema } from '@/types'

const getData = async () => {
	const res = await fetch(process.env.NEXT_APP_URL + '/api/bookmark', {
		method: 'GET',
		cache: 'no-store',
	})
	const data = await res.json()

	return bookmarkSchema.array().parse(data)
}

export default async function DashboardPage() {
	const data = await getData()

	return (
		<div className='mt-4 flex w-full max-w-4xl flex-row flex-wrap justify-center gap-6'>
			{data.map((data, index) => (
				<BookmarkCard
					index={index}
					data={data}
				/>
			))}
		</div>
	)
}
