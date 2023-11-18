/*
  Warnings:

  - Added the required column `creator` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `creator` INTEGER NOT NULL;
