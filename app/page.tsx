import NextLink from 'next/link'
import { Link } from '@nextui-org/link'
import { button as buttonStyles } from '@nextui-org/theme'
import { siteConfig } from '@/config/site'
import { title, subtitle } from '@/components/primitives'
import { GithubIcon } from '@/components/icons'
import { Card, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image'

export default function Home() {
	const demoCard = {
		name: 'Dashboard',
		url: 'https://next-dashboard.tzgyn.com',
	}

	return (
		<section className='md:py-26 flex flex-col items-center justify-center gap-4 py-24'>
			<div className='inline-block max-w-lg justify-center text-center'>
				<h1 className={title({ color: 'blue' })}>Beautiful&nbsp;</h1>
				<h1 className={title()}>Dashboard&nbsp;</h1>
				<br />
				<h1 className={title()}>To Manage Your Bookmarks</h1>
				<h2 className={subtitle({ class: 'mt-4' })}>
					Beautiful, fast and modern bookmark site.
				</h2>
			</div>

			<div className='my-4'>
				<Card className='max-w-96 grow select-none'>
					<CardHeader className='flex gap-3'>
						<Image
							alt='nextui logo'
							height={40}
							radius='sm'
							src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
							width={40}
							removeWrapper
						/>
						<Link
							isExternal
							href={demoCard.url}
							color='foreground'
							className='flex grow flex-col items-start'>
							<p className='text-md'>{demoCard.name}</p>
							<p className='text-small text-default-500'>
								{demoCard.url}
							</p>
						</Link>
					</CardHeader>
				</Card>
			</div>

			<div className='flex gap-3'>
				<Link
					as={NextLink}
					href='/dashboard'
					className={buttonStyles({
						color: 'primary',
						radius: 'full',
						variant: 'shadow',
					})}>
					Dashboard
				</Link>
				<Link
					isExternal
					as={NextLink}
					className={buttonStyles({
						variant: 'bordered',
						radius: 'full',
					})}
					href={siteConfig.links.github}>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>
		</section>
	)
}
