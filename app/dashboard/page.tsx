'use client'

import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Link } from '@nextui-org/link'
import { Divider } from '@nextui-org/divider'
import { Image } from '@nextui-org/image'

const handleClick = (url: string) => {
	console.log(url)
	// open(url, '_blank')
	getData()
}

const getData = async () => {
	const res = await fetch('/api/bruh')

	console.log(res)
}

export default function DashboardPage() {
	const data = [
		{
			name: 'NextUI',
			link: 'nextui.org',
			description:
				'Make beautiful websites regardless of your design experience.',
			url: 'https://github.com/nextui-org/nextui',
		},
		{
			name: 'NextUI',
			link: 'nextui.org',
			description:
				'Make beautiful websites regardless of your design experience.',
			url: 'https://github.com/nextui-org/nextui',
		},
		{
			name: 'NextUI',
			link: 'nextui.org',
			description:
				'Make beautiful websites regardless of your design experience.',
			url: 'https://github.com/nextui-org/nextui',
		},
		{
			name: 'NextUI',
			link: 'nextui.org',
			description:
				'Make beautiful websites regardless of your design experience.',
			url: 'https://github.com/nextui-org/nextui',
		},
	]
	return (
		<div className='mt-4 flex w-full max-w-4xl flex-row flex-wrap justify-center gap-6'>
			{data.map((data, index) => (
				<Card
					className='max-w-[400px]'
					key={index}
					isPressable
					onPress={() => handleClick(data.url)}>
					<CardHeader className='flex gap-3'>
						<Image
							alt='nextui logo'
							height={40}
							radius='sm'
							src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
							width={40}
						/>
						<div className='flex flex-col items-start'>
							<p className='text-md'>{data.name}</p>
							<p className='text-small text-default-500'>
								{data.link}
							</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<p>{data.description}</p>
					</CardBody>
					<Divider />
					<CardFooter>
						<Link
							isExternal
							showAnchorIcon
							href={data.url}>
							{data.url}
						</Link>
					</CardFooter>
				</Card>
			))}
		</div>
	)
}
