/*
  Warnings:

  - The primary key for the `system_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `vip_customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `name` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_cashierId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_vipCustomerId_fkey`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `system_users` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `transactions` MODIFY `vipCustomerId` VARCHAR(191) NULL,
    MODIFY `cashierId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `vip_customers` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_vipCustomerId_fkey` FOREIGN KEY (`vipCustomerId`) REFERENCES `Vip_Customers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_cashierId_fkey` FOREIGN KEY (`cashierId`) REFERENCES `System_Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
