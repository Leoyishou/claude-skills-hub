CREATE TABLE `categories` (
	`id` varchar(64) NOT NULL,
	`nameEn` varchar(128) NOT NULL,
	`nameZh` varchar(128) NOT NULL,
	`descEn` text,
	`descZh` text,
	`color` varchar(32),
	`icon` varchar(256),
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `skills` (
	`id` varchar(64) NOT NULL,
	`titleEn` varchar(256) NOT NULL,
	`titleZh` varchar(256) NOT NULL,
	`descriptionEn` text,
	`descriptionZh` text,
	`scenarioEn` text,
	`scenarioZh` text,
	`category` varchar(64) NOT NULL,
	`tagsEn` json,
	`tagsZh` json,
	`source` enum('official','community') NOT NULL DEFAULT 'community',
	`author` varchar(128),
	`url` varchar(512),
	`isActive` boolean NOT NULL DEFAULT true,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `skills_id` PRIMARY KEY(`id`)
);
