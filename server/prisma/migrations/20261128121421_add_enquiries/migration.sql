-- CreateTable
CREATE TABLE "enquiries" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "enquiries_pkey" PRIMARY KEY ("id")
);
