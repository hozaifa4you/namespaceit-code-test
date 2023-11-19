/*
  Warnings:

  - Added the required column `shippingInfoId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `shippingInfoId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_shippingInfoId_fkey` FOREIGN KEY (`shippingInfoId`) REFERENCES `ShippingInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
