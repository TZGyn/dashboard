import type { Config } from 'drizzle-kit'

export default {
	schema: './schema.ts',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		user: 'postgres',
		password: 'password',
		host: '0.0.0.0',
		port: 5432,
		database: 'next-dashboard',
	},
} satisfies Config
