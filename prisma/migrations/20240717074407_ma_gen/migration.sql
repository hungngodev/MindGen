-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` VARCHAR(191) NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE `mindmaps` (
    `id` VARCHAR(191) NOT NULL,
    `elements` LONGTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mindmaps` ADD CONSTRAINT `mindmaps_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
