/*
  Warnings:

  - You are about to drop the column `productOrderID` on the `CustomerOrder` table. All the data in the column will be lost.
  - Added the required column `customerOrderID` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CustomerOrder` DROP FOREIGN KEY `CustomerOrder_productOrderID_fkey`;

-- AlterTable
ALTER TABLE `CustomerOrder` DROP COLUMN `productOrderID`;

-- AlterTable
ALTER TABLE `ProductOrder` ADD COLUMN `customerOrderID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ProductOrder` ADD CONSTRAINT `ProductOrder_customerOrderID_fkey` FOREIGN KEY (`customerOrderID`) REFERENCES `CustomerOrder`(`orderID`) ON DELETE RESTRICT ON UPDATE CASCADE;
