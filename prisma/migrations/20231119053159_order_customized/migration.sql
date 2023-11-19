/*
  Warnings:

  - You are about to drop the column `orderId` on the `product` table. All the data in the column will be lost.
  - Added the required column `deliveryCharge` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderProductId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPayment` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalProduct` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_orderId_fkey`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `deliveryCharge` DOUBLE NOT NULL,
    ADD COLUMN `orderId` VARCHAR(191) NOT NULL,
    ADD COLUMN `orderProductId` INTEGER NOT NULL,
    ADD COLUMN `orderStatus` ENUM('Processing', 'Shipping', 'Delivered', 'Cancel', 'DeliveryFailed') NOT NULL DEFAULT 'Processing',
    ADD COLUMN `totalPayment` DOUBLE NOT NULL,
    ADD COLUMN `totalProduct` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `orderId`;

-- CreateTable
CREATE TABLE `OrderProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `addressLine1` VARCHAR(191) NOT NULL,
    `addressLine2` VARCHAR(191) NULL,
    `city` VARCHAR(191) NOT NULL,
    `division` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `zip` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShippingInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `addressId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShippingInfo` ADD CONSTRAINT `ShippingInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShippingInfo` ADD CONSTRAINT `ShippingInfo_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_orderProductId_fkey` FOREIGN KEY (`orderProductId`) REFERENCES `OrderProduct`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
