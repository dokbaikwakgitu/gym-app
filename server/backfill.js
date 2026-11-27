import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  try {
    const result = await prisma.class.updateMany({
      where: {
        locationId: null,
        instructorName: 'lebron',
      },
      data: {
        locationId: 1,
      },
    });

    console.log(`Updated ${result.count} classes`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
      await prisma.$disconnect();
  }
};


main()
