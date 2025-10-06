/*
  Warnings:

  - You are about to drop the column `TreinadorResponsavelId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_TreinadorResponsavelId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "TreinadorResponsavelId",
ADD COLUMN     "treinadorResponsavelId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_treinadorResponsavelId_fkey" FOREIGN KEY ("treinadorResponsavelId") REFERENCES "trainers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
