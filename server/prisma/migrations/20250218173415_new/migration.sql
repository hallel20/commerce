-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('user', 'staff', 'admin') NOT NULL DEFAULT 'user';
