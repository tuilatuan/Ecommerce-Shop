/*
  Warnings:

  - You are about to drop the column `product_id` on the `colorProducts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `colorProducts` DROP FOREIGN KEY `colorProducts_product_id_fkey`;

-- AlterTable
ALTER TABLE `colorProducts` DROP COLUMN `product_id`;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_color_id_fkey` FOREIGN KEY (`color_id`) REFERENCES `colorProducts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
