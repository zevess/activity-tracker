PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_activities` (
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
	`due_time` text,
	`priority` text,
	`completed_at` integer,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_activities`("id", "title", "description", "type", "category_id", "created_at", "updated_at", "is_archived", "schedule_type", "targer_days", "reminder_time", "due_time", "priority", "completed_at") SELECT "id", "title", "description", "type", "category_id", "created_at", "updated_at", "is_archived", "schedule_type", "targer_days", "reminder_time", "due_time", "priority", "completed_at" FROM `activities`;--> statement-breakpoint
DROP TABLE `activities`;--> statement-breakpoint
ALTER TABLE `__new_activities` RENAME TO `activities`;--> statement-breakpoint
PRAGMA foreign_keys=ON;