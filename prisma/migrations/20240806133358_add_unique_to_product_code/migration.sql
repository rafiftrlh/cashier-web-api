/*
  Warnings:

  - A unique constraint covering the columns `[productCode]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Products_productCode_key` ON `Products`(`productCode`);
