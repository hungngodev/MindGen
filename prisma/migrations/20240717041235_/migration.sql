/*
  Warnings:

  - You are about to drop the column `identifier` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[session_token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `sessions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `session_token` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_user_id_fkey`;

-- DropIndex
DROP INDEX `sessions_identifier_token_key` ON `sessions`;

-- AlterTable
ALTER TABLE `sessions` DROP COLUMN `identifier`,
    DROP COLUMN `token`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `session_token` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Session`;

-- CreateTable
CREATE TABLE `verification_tokens` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `verification_tokens_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `sessions_session_token_key` ON `sessions`(`session_token`);

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
