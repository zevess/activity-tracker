CREATE TABLE `activities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`type` text,
	`category_id` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`is_archived` integer DEFAULT false NOT NULL,
	`schedule_type` text,
	`targer_days` text,
	`reminder_time` text,
	`due_time` integer,
	`priority` text,
	`completed_at` integer,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`color` text NOT NULL,
	`icon` text
);
--> statement-breakpoint
DROP TABLE `lists`;--> statement-breakpoint
DROP TABLE `tasks`;