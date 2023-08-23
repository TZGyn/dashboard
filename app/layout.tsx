import '@/styles/globals.css'
import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import { Providers } from './providers'
import { Navbar } from '@/components/navbar'
import { Link } from '@nextui-org/link'
import clsx from 'clsx'
import { userSchema } from '@/types'
import { cookies } from 'next/headers'
import { getUser } from '@/lib/auth'

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const token = cookies().get('token')
	const userData = await getUser(token)

	let user = null
	if (userData) {
		user = userSchema.parse(userData)
	}

	return (
		<html
			lang='en'
			suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable
				)}>
				<Providers
					themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
					<div className='relative flex h-screen flex-col'>
						<Navbar user={user} />
						<main className='container mx-auto max-w-7xl flex-grow px-6 pt-16'>
							{children}
						</main>
						<footer className='flex w-full items-center justify-center py-3'>
							<Link
								isExternal
								className='flex items-center gap-1 text-current'
								href={siteConfig.links.github}
								title='nextui.org homepage'>
								<span className='text-default-600'>
									Made by
								</span>
								<p className='text-primary'>TZGyn</p>
							</Link>
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	)
}
