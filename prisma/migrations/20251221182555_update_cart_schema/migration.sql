/*
  Warnings:

  - You are about to drop the column `shippingAdress` on the `CustomerOrder` table. All the data in the column will be lost.
  - You are about to drop the column `CategoryID` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal(10,2)`.
  - The primary key for the `ProductCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CategoryID` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `count` on the `ProductOrder` table. All the data in the column will be lost.
  - You are about to drop the column `adress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `adressNr` on the `User` table. All the data in the column will be lost.
  - Added the required column `shippingAddress` to the `CustomerOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryID` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryID` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceAtPurchase` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressNr` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_CategoryID_fkey`;

-- AlterTable
ALTER TABLE `CustomerOrder` DROP COLUMN `shippingAdress`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `shippingAddress` VARCHAR(200) NOT NULL,
    ADD COLUMN `totalAmount` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    MODIFY `status` VARCHAR(50) NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `CategoryID`,
    ADD COLUMN `categoryID` INTEGER NOT NULL,
    MODIFY `description` TEXT NOT NULL,
    MODIFY `price` DECIMAL(10, 2) NOT NULL,
    MODIFY `image` VARCHAR(500) NOT NULL;

-- AlterTable
ALTER TABLE `ProductCategory` DROP PRIMARY KEY,
    DROP COLUMN `CategoryID`,
    ADD COLUMN `categoryID` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `image` VARCHAR(500) NOT NULL,
    ADD PRIMARY KEY (`categoryID`);

-- AlterTable
ALTER TABLE `ProductOrder` DROP COLUMN `count`,
    ADD COLUMN `priceAtPurchase` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `adress`,
    DROP COLUMN `adressNr`,
    ADD COLUMN `address` VARCHAR(200) NOT NULL,
    ADD COLUMN `addressNr` VARCHAR(10) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `adminFlag` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `phoneNr` VARCHAR(20) NOT NULL,
    MODIFY `plz` VARCHAR(10) NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryID_fkey` FOREIGN KEY (`categoryID`) REFERENCES `ProductCategory`(`categoryID`) ON DELETE RESTRICT ON UPDATE CASCADE;
