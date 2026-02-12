/*
  Warnings:

  - Made the column `slug` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `ProductCategory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `slug` VARCHAR(12) NOT NULL;

-- AlterTable
ALTER TABLE `ProductCategory` MODIFY `slug` VARCHAR(12) NOT NULL;
