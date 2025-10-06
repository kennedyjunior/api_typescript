-- AlterTable
ALTER TABLE "users" ADD COLUMN     "TreinadorResponsavelId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_TreinadorResponsavelId_fkey" FOREIGN KEY ("TreinadorResponsavelId") REFERENCES "trainers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
