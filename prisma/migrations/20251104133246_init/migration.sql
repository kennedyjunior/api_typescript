/*
  Warnings:

  - Added the required column `senha` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ALUNO', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "planoAluno" INTEGER,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ALUNO',
ADD COLUMN     "senha" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_planoAluno_fkey" FOREIGN KEY ("planoAluno") REFERENCES "plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
