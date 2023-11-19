-- AlterTable
ALTER TABLE `order` ADD COLUMN `isPaid` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `paymentMethod` ENUM('CashOnDelivery', 'Card') NOT NULL DEFAULT 'CashOnDelivery';
