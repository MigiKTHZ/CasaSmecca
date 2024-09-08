/*
  Warnings:

  - You are about to drop the column `categoryID` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `ProductID` on the `ProductOrder` table. All the data in the column will be lost.
  - You are about to drop the column `orderID` on the `ProductOrder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productOrderID]` on the table `CustomerOrder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productOrderID` to the `CustomerOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CategoryID` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productCategoryID` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryID_fkey`;

-- AlterTable
ALTER TABLE `CustomerOrder` ADD COLUMN `productOrderID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `categoryID`,
    ADD COLUMN `CategoryID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ProductOrder` DROP COLUMN `ProductID`,
    DROP COLUMN `orderID`,
    ADD COLUMN `productCategoryID` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CustomerOrder_productOrderID_key` ON `CustomerOrder`(`productOrderID`);

-- AddForeignKey
ALTER TABLE `CustomerOrder` ADD CONSTRAINT `CustomerOrder_productOrderID_fkey` FOREIGN KEY (`productOrderID`) REFERENCES `ProductOrder`(`productOrderID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_CategoryID_fkey` FOREIGN KEY (`CategoryID`) REFERENCES `ProductCategory`(`CategoryID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOrder` ADD CONSTRAINT `ProductOrder_productCategoryID_fkey` FOREIGN KEY (`productCategoryID`) REFERENCES `ProductCategory`(`CategoryID`) ON DELETE RESTRICT ON UPDATE CASCADE;
