-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_orderProductId_fkey`;

-- AlterTable
ALTER TABLE `orderproduct` ADD COLUMN `orderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
