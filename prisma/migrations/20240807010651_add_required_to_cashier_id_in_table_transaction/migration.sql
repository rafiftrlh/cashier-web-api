/*
  Warnings:

  - Made the column `cashierId` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_cashierId_fkey`;

-- AlterTable
ALTER TABLE `transactions` MODIFY `cashierId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_cashierId_fkey` FOREIGN KEY (`cashierId`) REFERENCES `System_Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
