-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "awards" TEXT[],
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "specialties" TEXT[],
ADD COLUMN     "yearsExperience" INTEGER;
