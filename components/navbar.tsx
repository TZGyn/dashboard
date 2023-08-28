'use client'

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from '@nextui-org/navbar'
import {
	Dropdown,
	DropdownMenu,
	DropdownItem,
	DropdownTrigger,
} from '@nextui-org/dropdown'
import { Avatar, AvatarIcon } from '@nextui-org/avatar'
import { Link } from '@nextui-org/link'

import { link as linkStyles } from '@nextui-org/theme'

import { siteConfig } from '@/config/site'
import NextLink from 'next/link'
import clsx from 'clsx'

import { ThemeSwitch } from '@/components/theme-switch'
import { GithubIcon } from '@/components/icons'

import { Icon } from '@iconify/react'
import NewBookmarkForm from '@/components/newBookmarkForm'
import { usePathname, useRouter } from 'next/navigation'
import { BookmarkCategory, User } from '@/types'

export const Navbar = ({
	user,
	categories,
}: {
	user: User | null
	categories: BookmarkCategory[]
}) => {
	const pathname = usePathname()
	const router = useRouter()

	if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
		return <></>
	}

	const logout = async () => {
		const response = await fetch('/api/auth/logout', {
			method: 'POST',
		})
		router.refresh()
	}

	const login = () => {
		router.push('/login')
	}

	return (
		<NextUINavbar
			maxWidth='xl'
			position='sticky'>
			<NavbarContent
				className='basis-1/5 sm:basis-full'
				justify='start'>
				<NavbarMenuToggle className='' />
				<NavbarBrand
					as='li'
					className='max-w-fit gap-3'>
					<NextLink
						className='flex items-center justify-start gap-1'
						href='/'>
						<Icon
							icon={'mdi:bookmark-box'}
							fontSize={32}
						/>
						<p className='font-bold text-inherit'>Dashboard</p>
					</NextLink>
				</NavbarBrand>
				<ul className='ml-2 hidden justify-start gap-4 md:flex'>
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: 'foreground' }),
									'data-[active=true]:font-medium data-[active=true]:text-primary'
								)}
								color='foreground'
								href={item.href}>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className='flex basis-full'
				justify='end'>
				<NavbarItem className='flex gap-2'>
					{pathname.startsWith('/dashboard') && (
						<div className='mr-4 hidden min-[400px]:flex'>
							<NewBookmarkForm categories={categories} />
						</div>
					)}
					<Link
						isExternal
						href={siteConfig.links.github}
						aria-label='Github'
						className='hidden sm:flex'>
						<GithubIcon className='text-default-500' />
					</Link>
					<ThemeSwitch className='hidden sm:flex' />
					<div className='ml-2 flex items-center gap-4 sm:ml-4'>
						<Dropdown placement='bottom-end'>
							<DropdownTrigger>
								<Avatar
									isBordered
									as='button'
									className='transition-transform'
									icon={<AvatarIcon />}
								/>
							</DropdownTrigger>
							<DropdownMenu
								aria-label='Profile Actions'
								variant='flat'>
								<DropdownItem
									key='profile'
									className='h-14 gap-2'>
									<p className='font-semibold'>
										Signed in as
									</p>
									<p className='font-semibold text-primary'>
										{user ? user.email : 'Guest'}
									</p>
								</DropdownItem>
								{user ? (
									<DropdownItem
										key='logout'
										color='danger'
										className='text-danger'
										onPress={() => logout()}>
										Log Out
									</DropdownItem>
								) : (
									<DropdownItem
										key='login'
										color='primary'
										onPress={() => login()}>
										Login
									</DropdownItem>
								)}
							</DropdownMenu>
						</Dropdown>
					</div>
				</NavbarItem>
			</NavbarContent>

			<NavbarMenu>
				<div className='mx-4 mt-2 flex flex-col gap-2'>
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? 'primary'
										: index ===
										  siteConfig.navMenuItems.length - 1
										? 'danger'
										: 'foreground'
								}
								href='#'
								size='lg'>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	)
}
