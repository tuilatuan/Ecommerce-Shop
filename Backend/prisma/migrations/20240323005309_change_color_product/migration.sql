/*
  Warnings:

  - Added the required column `product_id` to the `colorProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_color_id_fkey`;

-- AlterTable
ALTER TABLE `colorProducts` ADD COLUMN `product_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `colorProducts` ADD CONSTRAINT `colorProducts_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
