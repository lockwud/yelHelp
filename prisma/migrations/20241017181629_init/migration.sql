/*
  Warnings:

  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address" TEXT NOT NULL;

-- DropTable
DROP TABLE "message";
