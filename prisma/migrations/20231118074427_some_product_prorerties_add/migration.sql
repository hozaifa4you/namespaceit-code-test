/*
  Warnings:

  - You are about to drop the column `tags` on the `product` table. All the data in the column will be lost.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `tags`,
    ADD COLUMN `price` VARCHAR(191) NOT NULL,
    ADD COLUMN `productCode` VARCHAR(191) NULL,
    ADD COLUMN `sku` VARCHAR(191) NULL;
