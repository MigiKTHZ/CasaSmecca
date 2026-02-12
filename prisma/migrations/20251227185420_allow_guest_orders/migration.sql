/*
  Warnings:

  - You are about to drop the column `shippingAddress` on the `CustomerOrder` table. All the data in the column will be lost.
  - Added the required column `adress` to the `CustomerOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adressNr` to the `CustomerOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `CustomerOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `CustomerOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `CustomerOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `CustomerOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNr` to the `CustomerOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plz` to the `CustomerOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CustomerOrder` DROP FOREIGN KEY `CustomerOrder_userID_fkey`;

-- AlterTable
ALTER TABLE `CustomerOrder` DROP COLUMN `shippingAddress`,
    ADD COLUMN `adress` VARCHAR(200) NOT NULL,
    ADD COLUMN `adressNr` VARCHAR(10) NOT NULL,
    ADD COLUMN `city` VARCHAR(200) NOT NULL,
    ADD COLUMN `email` VARCHAR(200) NOT NULL,
    ADD COLUMN `firstname` VARCHAR(200) NOT NULL,
    ADD COLUMN `name` VARCHAR(200) NOT NULL,
    ADD COLUMN `phoneNr` VARCHAR(20) NOT NULL,
    ADD COLUMN `plz` VARCHAR(10) NOT NULL,
    MODIFY `userID` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `CustomerOrder` ADD CONSTRAINT `CustomerOrder_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE SET NULL ON UPDATE CASCADE;
