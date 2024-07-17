-- AlterTable
ALTER TABLE `Log` MODIFY `input` TEXT NOT NULL,
    MODIFY `output` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Plan` MODIFY `content` TEXT NOT NULL;
