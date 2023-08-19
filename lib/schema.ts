import { relations } from 'drizzle-orm'
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core'

export const user = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
	email: text('email'),
	hashedPassword: text('password'),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at'),
})

export const userRelations = relations(user, ({ many }) => ({
	bookmark: many(bookmark),
	sessions: many(sessions),
}))

export const bookmark = pgTable('bookmarks', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => user.id),
	category_id: integer('category_id'),
	name: text('name'),
	link: text('link'),
	description: text('description'),
	url: text('url'),
})

export const bookmarkRelations = relations(bookmark, ({ one }) => ({
	user: one(user, {
		fields: [bookmark.userId],
		references: [user.id],
	}),
	bookmarkCategory: one(bookmarkCategory, {
		fields: [bookmark.category_id],
		references: [bookmarkCategory.id],
	}),
}))

export const bookmarkCategory = pgTable('bookmark_categories', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => user.id),
	name: text('name'),
})

export const bookmarkCategoryRelations = relations(
	bookmarkCategory,
	({ one, many }) => ({
		user: one(user, {
			fields: [bookmarkCategory.userId],
			references: [user.id],
		}),
		bookmark: many(bookmark),
	})
)

export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const sessionRelations = relations(sessions, ({ one }) => ({
	user: one(user, {
		fields: [sessions.userId],
		references: [user.id],
	}),
}))
