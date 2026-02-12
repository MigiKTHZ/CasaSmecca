/*
  Warnings:

  - A unique constraint covering the columns `[stripePaymentIntentId]` on the table `CustomerOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeSessionId]` on the table `CustomerOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeProductId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripePriceId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `CustomerOrder` ADD COLUMN `ageVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ageVerifiedAt` DATETIME(3) NULL,
    ADD COLUMN `metadata` JSON NULL,
    ADD COLUMN `shippingMethod` VARCHAR(50) NULL,
    ADD COLUMN `stripeCustomerId` VARCHAR(255) NULL,
    ADD COLUMN `stripePaymentIntentId` VARCHAR(255) NULL,
    ADD COLUMN `stripeSessionId` VARCHAR(255) NULL,
    ADD COLUMN `trackingNumber` VARCHAR(100) NULL,
    ADD COLUMN `verificationMethod` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `minimumAge` INTEGER NOT NULL DEFAULT 18,
    ADD COLUMN `requiresAgeVerification` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `stripePriceId` VARCHAR(255) NULL,
    ADD COLUMN `stripeProductId` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `ageVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ageVerifiedAt` DATETIME(3) NULL,
    ADD COLUMN `dateOfBirth` DATETIME(3) NULL,
    ADD COLUMN `stripeCustomerId` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CustomerOrder_stripePaymentIntentId_key` ON `CustomerOrder`(`stripePaymentIntentId`);

-- CreateIndex
CREATE UNIQUE INDEX `CustomerOrder_stripeSessionId_key` ON `CustomerOrder`(`stripeSessionId`);

-- CreateIndex
CREATE INDEX `CustomerOrder_stripePaymentIntentId_idx` ON `CustomerOrder`(`stripePaymentIntentId`);

-- CreateIndex
CREATE INDEX `CustomerOrder_stripeSessionId_idx` ON `CustomerOrder`(`stripeSessionId`);

-- CreateIndex
CREATE INDEX `CustomerOrder_stripeCustomerId_idx` ON `CustomerOrder`(`stripeCustomerId`);

-- CreateIndex
CREATE INDEX `CustomerOrder_status_idx` ON `CustomerOrder`(`status`);

-- CreateIndex
CREATE INDEX `CustomerOrder_createdAt_idx` ON `CustomerOrder`(`createdAt`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_stripeProductId_key` ON `Product`(`stripeProductId`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_stripePriceId_key` ON `Product`(`stripePriceId`);

-- CreateIndex
CREATE INDEX `Product_requiresAgeVerification_idx` ON `Product`(`requiresAgeVerification`);

-- CreateIndex
CREATE INDEX `Product_stripeProductId_idx` ON `Product`(`stripeProductId`);

-- CreateIndex
CREATE INDEX `Product_slug_idx` ON `Product`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `User_stripeCustomerId_key` ON `User`(`stripeCustomerId`);

-- CreateIndex
CREATE INDEX `User_stripeCustomerId_idx` ON `User`(`stripeCustomerId`);
