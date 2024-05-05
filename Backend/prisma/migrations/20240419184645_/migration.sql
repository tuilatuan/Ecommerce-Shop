/*
  Warnings:

  - You are about to drop the column `total` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `totalProduct` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `subTotal` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `Color` on the `orderdetail` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `orderdetail` table. All the data in the column will be lost.
  - You are about to drop the column `totalProduct` on the `orderdetail` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `orderdetail` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `products` table. All the data in the column will be lost.
  - Added the required column `role` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTotal` to the `orderDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accounts` ADD COLUMN `role` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `total`,
    DROP COLUMN `totalProduct`,
    MODIFY `color` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `createdAt`,
    DROP COLUMN `subTotal`,
    DROP COLUMN `updatedAt`,
    MODIFY `totalProduct` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `orderdetail` DROP COLUMN `Color`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `totalProduct`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `color` VARCHAR(191) NULL,
    ADD COLUMN `subTotal` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `description` VARCHAR(255) NOT NULL;
