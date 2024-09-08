/*
  Warnings:

  - Added the required column `href` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProductCategory` ADD COLUMN `href` VARCHAR(200) NOT NULL,
    ADD COLUMN `image` VARCHAR(200) NOT NULL;
