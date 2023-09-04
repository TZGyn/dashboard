export type SiteConfig = typeof siteConfig

export const siteConfig = {
	name: 'Dashboard',
	description: 'Dashboard to manage your bookmarks',
	navItems: [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Dashboard',
			href: '/dashboard',
		},
		{
			label: 'Categories',
			href: '/categories',
		},
	],
	navMenuItems: [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Dashboard',
			href: '/dashboard',
		},
		{
			label: 'Categories',
			href: '/categories',
		},
	],
	links: {
		github: 'https://github.com/TZGyn/dashboard',
		twitter: 'https://twitter.com/getnextui',
		docs: 'https://nextui-docs-v2.vercel.app',
		discord: 'https://discord.gg/9b6yyZKmH4',
		sponsor: 'https://patreon.com/jrgarciadev',
	},
} as const
