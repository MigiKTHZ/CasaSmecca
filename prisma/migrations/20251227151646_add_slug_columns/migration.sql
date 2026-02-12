/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `slug` VARCHAR(12) NULL;

-- AlterTable
ALTER TABLE `ProductCategory` ADD COLUMN `slug` VARCHAR(12) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Product_slug_key` ON `Product`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `ProductCategory_slug_key` ON `ProductCategory`(`slug`);
