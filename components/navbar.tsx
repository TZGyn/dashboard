'use client'

import {
	Avatar,
	AvatarIcon,
	Button,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	DropdownTrigger,
	Link,
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from '@nextui-org/react'

import { link as linkStyles } from '@nextui-org/theme'

import { siteConfig } from '@/config/site'
import NextLink from 'next/link'
import clsx from 'clsx'

import { ThemeSwitch } from '@/components/theme-switch'
import { ChevronDown, GithubIcon } from '@/components/icons'

import { Icon } from '@iconify/react'
import NewBookmarkForm from '@/components/newBookmarkForm'
import { usePathname, useRouter } from 'next/navigation'
import { BookmarkCategory, User } from '@/types'
import { useContext, useState } from 'react'
import { BookmarkCategoryContext } from '@/app/providers'

export const Navbar = ({
	user,
	categories,
}: {
	user: User | null
	categories: BookmarkCategory[]
}) => {
	const pathname = usePathname()
	const { setSelectedCategory } = useContext(BookmarkCategoryContext)
	const [menuOpen, setMenuOpen] = useState(false)

	if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
		return <></>
	}

	return (
		<NextUINavbar
			maxWidth='xl'
			position='sticky'
			isMenuOpen={menuOpen}
			onMenuOpenChange={(isOpen) => setMenuOpen(isOpen ?? menuOpen)}>
			<NavbarContent
				className='basis-1/5 sm:basis-full'
				justify='start'>
				<NavbarMenuToggle className='' />
				<NavbarBrand
					as='li'
					className='max-w-fit gap-3'>
					<NextLink
						className='hidden items-center justify-start gap-1 sm:flex'
						href='/'>
						<Icon
							icon={'mdi:bookmark-box'}
							fontSize={32}
						/>
					</NextLink>
				</NavbarBrand>
				{siteConfig.navItems.map((item) => {
					if (
						pathname.startsWith('/dashboard') &&
						item.label === 'Dashboard'
					)
						return
					return (
						<NavbarItem
							key={item.href}
							className='hidden sm:flex'>
							<NextLink
								className={clsx(
									linkStyles({
										color:
											item.href === pathname
												? 'primary'
												: 'foreground',
									}),
									'data-[active=true]:font-medium data-[active=true]:text-primary'
								)}
								color='foreground'
								href={item.href}>
								{item.label}
							</NextLink>
						</NavbarItem>
					)
				})}
				{pathname.startsWith('/dashboard') && (
					<NavbarItem className='hidden sm:flex'>
						<Dropdown>
							<DropdownTrigger>
								<Button
									disableRipple
									className='bg-transparent p-0 data-[hover=true]:bg-transparent'
									endContent={
										<ChevronDown
											fill='currentColor'
											size={16}
										/>
									}
									radius='sm'
									size='lg'
									variant='light'>
									Category
								</Button>
							</DropdownTrigger>
							<DropdownMenu>
								{categories.length > 0 ? (
									categories.map((category) => (
										<DropdownItem
											key={category.name}
											onPress={() =>
												setSelectedCategory(
													category.id.toString()
												)
											}>
											{category.name}
										</DropdownItem>
									))
								) : (
									<DropdownItem key='empty'>
										Nothing Here
									</DropdownItem>
								)}
							</DropdownMenu>
						</Dropdown>
					</NavbarItem>
				)}
			</NavbarContent>

			<NavbarContent
				className='flex basis-full'
				justify='end'>
				<NavbarItem className='flex gap-2'>
					{pathname.startsWith('/dashboard') && (
						<div className='mr-4'>
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
					<ThemeSwitch className='hidden min-[330px]:flex' />
					<div className='ml-2 flex items-center gap-4 min-[330px]:ml-4'>
						<UserAvatar user={user} />
					</div>
				</NavbarItem>
			</NavbarContent>

			<NavbarMenu>
				<div className='mx-4 mt-2 flex flex-col gap-2'>
					{siteConfig.navMenuItems.map((item, index) => {
						if (
							pathname.startsWith('/dashboard') &&
							item.label === 'Dashboard'
						)
							return
						return (
							<NavbarMenuItem key={`${item}-${index}`}>
								<Link
									color={
										item.href === pathname
											? 'primary'
											: 'foreground'
									}
									href={item.href}
									size='lg'>
									{item.label}
								</Link>
							</NavbarMenuItem>
						)
					})}
					{pathname.startsWith('/dashboard') &&
						categories.length > 0 &&
						categories.map((category) => (
							<NavbarMenuItem
								key={category.name}
								onClick={() => {
									setMenuOpen(false)
									setSelectedCategory(category.id.toString())
								}}>
								{category.name}
							</NavbarMenuItem>
						))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	)
}

function UserAvatar({ user }: { user: User | null }) {
	const router = useRouter()

	const logout = async () => {
		await fetch('/api/auth/logout', {
			method: 'POST',
		})
		router.refresh()
	}

	const login = () => {
		router.push('/login')
	}

	return (
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
					<p className='font-semibold'>Signed in as</p>
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
	)
}
