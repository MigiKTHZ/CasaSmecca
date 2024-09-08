-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryID_fkey` FOREIGN KEY (`categoryID`) REFERENCES `ProductCategory`(`CategoryID`) ON DELETE RESTRICT ON UPDATE CASCADE;
