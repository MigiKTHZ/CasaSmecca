/*
  Warnings:

  - You are about to drop the column `productCategoryID` on the `ProductOrder` table. All the data in the column will be lost.
  - Added the required column `productID` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ProductOrder` DROP FOREIGN KEY `ProductOrder_productCategoryID_fkey`;

-- AlterTable
ALTER TABLE `ProductOrder` DROP COLUMN `productCategoryID`,
    ADD COLUMN `productID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ProductOrder` ADD CONSTRAINT `ProductOrder_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `Product`(`productID`) ON DELETE RESTRICT ON UPDATE CASCADE;
