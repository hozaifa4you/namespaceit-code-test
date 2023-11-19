/*
  Warnings:

  - You are about to drop the column `orderProductId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `orderproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `orderproduct` DROP FOREIGN KEY `OrderProduct_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderproduct` DROP FOREIGN KEY `OrderProduct_productId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `orderProductId`;

-- DropTable
DROP TABLE `orderproduct`;
