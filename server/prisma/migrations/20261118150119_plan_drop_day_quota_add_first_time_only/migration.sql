-- AlterTable
ALTER TABLE "plan" DROP COLUMN "day_quota",
ADD COLUMN     "is_first_time_only" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "duration_days" DROP DEFAULT;
