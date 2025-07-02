import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

if (process.env.NODE_ENV === 'production') {
  console.log('Seeding is disabled in production.');
  process.exit(0);
}

async function main() {
  const { mockClasses } = await import('../src/data/mockClasses')
  for (const mock of mockClasses) {
    await prisma.class.upsert({
      where: { id: Number(mock.id) },
      update: {},
      create: {
        title: mock.title,
        description: mock.description,
        location: mock.location,
        address: mock.address,
        instructorName: mock.instructorName,
        duration: mock.duration,
        cuisineType: mock.cuisineType,
        difficulty: mock.difficulty,
        maxStudents: mock.maxStudents,
        price: mock.price,
        rating: 5.0, // default
        about: 'About this class...', // default
        menu: 'Sample menu', // default
        schedule: 'Check schedule', // default
        highlights: 'Fun, hands-on, delicious', // default
        additionalInformation: 'Bring your appetite!', // default
      },
    })
  }
  console.log('Database seeded with mock classes.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 