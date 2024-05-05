-- DropIndex
DROP INDEX `products_color_id_fkey` ON `products`;

-- AlterTable
ALTER TABLE `products` MODIFY `color_id` INTEGER NULL,
    MODIFY `images` VARCHAR(191) NULL;
