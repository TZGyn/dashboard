CREATE TABLE IF NOT EXISTS "bookmarks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"link" text,
	"description" text,
	"url" text
);
