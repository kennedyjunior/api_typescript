/*
  Warnings:

  - Made the column `TreinadorResponsavelId` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_TreinadorResponsavelId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "TreinadorResponsavelId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_TreinadorResponsavelId_fkey" FOREIGN KEY ("TreinadorResponsavelId") REFERENCES "trainers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
