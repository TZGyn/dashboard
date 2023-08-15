import { relations } from 'drizzle-orm'
import {
	pgTable,
	serial,
	text,
	varchar,
	timestamp,
	integer,
} from 'drizzle-orm/pg-core'

// export const user = pgTable('users', {
// 	id: serial('id').primaryKey(),
// 	name: text('name'),
// 	email: text('email'),
// 	password: text('password'),
// 	createdAt: timestamp('created_at'),
// 	updatedAt: timestamp('updated_at'),
// })
//
// export const userRelations = relations(user, ({ many }) => ({
// 	bookmark: many(bookmark),
// }))
//
export const bookmark = pgTable('bookmarks', {
	id: serial('id').primaryKey(),
	// userId: integer('user_id').references(() => user.id),
	name: text('name'),
	link: text('link'),
	description: text('description'),
	url: text('url'),
})

// export const bookmarkRelations = relations(bookmark, ({ one }) => ({
// 	user: one(user, {
// 		fields: [bookmark.userId],
// 		references: [user.id],
// 	}),
// }))
