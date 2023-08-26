ALTER TABLE "bookmark_categories" ALTER COLUMN "user_id" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "bookmark_categories" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bookmark_categories" ALTER COLUMN "name" SET DEFAULT 'Other';--> statement-breakpoint
ALTER TABLE "bookmark_categories" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;