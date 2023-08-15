CREATE TABLE IF NOT EXISTS "bookmark_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
ALTER TABLE "bookmarks" ADD COLUMN "category_id" integer;