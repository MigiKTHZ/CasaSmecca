/*
  Warnings:

  - Added the required column `adressNr` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNr` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plz` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `adressNr` VARCHAR(6) NOT NULL,
    ADD COLUMN `city` VARCHAR(200) NOT NULL,
    ADD COLUMN `firstname` VARCHAR(200) NOT NULL,
    ADD COLUMN `phoneNr` VARCHAR(10) NOT NULL,
    ADD COLUMN `plz` VARCHAR(4) NOT NULL;
