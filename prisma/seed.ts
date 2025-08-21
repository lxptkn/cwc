import { PrismaClient } from '../src/generated/prisma/index.js'

const prisma = new PrismaClient()

// Production-safe seeding
async function main() {
  // Check if we're in production and if seeding is allowed
  if (process.env.NODE_ENV === 'production') {
    // Only seed if explicitly allowed via environment variable
    if (process.env.ALLOW_PRODUCTION_SEEDING !== 'true') {
      console.log('Production seeding disabled. Set ALLOW_PRODUCTION_SEEDING=true to enable.')
      return
    }
    console.log('Production seeding enabled - proceeding with care...')
  }

  try {
    console.log('Starting database seeding...')

    // Check if data already exists
    const existingUsers = await prisma.user.count()
    if (existingUsers > 0) {
      console.log('Database already has data, skipping seed...')
      return
    }

    // Instructor data with full profiles
    const instructors = [
      {
        name: "Giovanni Spaghetti",
        email: "giovanni@cookingwithclass.com",
        password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
        role: "INSTRUCTOR" as const,
        profileImage: "/images/instructors/giovanni-spaghetti.png",
        yearsExperience: 15,
        awards: ["Best Italian Chef 2023", "Michelin Star 2021", "Culinary Institute of America Graduate"],
        bio: "Master Italian chef with 15 years of experience in traditional and modern Italian cuisine. Trained in Rome and Florence, Giovanni brings authentic Italian flavors to every class.",
        specialties: ["Italian", "Pasta", "Pizza", "Mediterranean", "Wine Pairing"],
        languages: ["English", "Italian", "French"]
      },
      {
        name: "Aiko Tanaka",
        email: "aiko@cookingwithclass.com",
        password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
        role: "INSTRUCTOR" as const,
        profileImage: "/images/instructors/aiko-tanaka.png",
        yearsExperience: 12,
        awards: ["Sushi Master 2022", "Japanese Culinary Excellence Award", "Tokyo Culinary Institute"],
        bio: "Expert sushi chef with deep knowledge of Japanese culinary traditions. Aiko specializes in sushi, ramen, and traditional Japanese techniques.",
        specialties: ["Japanese", "Sushi", "Ramen", "Tempura", "Tea Ceremony"],
        languages: ["English", "Japanese", "Korean"]
      },
      {
        name: "Carlos Rivera",
        email: "carlos@cookingwithclass.com",
        password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
        role: "INSTRUCTOR" as const,
        profileImage: "/images/instructors/carlos-rivera.png",
        yearsExperience: 18,
        awards: ["Mexican Cuisine Excellence 2023", "Latin American Chef of the Year", "Culinary Institute of Mexico"],
        bio: "Passionate Mexican chef bringing authentic flavors and traditional techniques to every class. Carlos specializes in regional Mexican cuisine and street food.",
        specialties: ["Mexican", "Street Food", "Tacos", "Mole", "Salsa Making"],
        languages: ["English", "Spanish", "Portuguese"]
      },
      {
        name: "Marie Boulanger",
        email: "marie@cookingwithclass.com",
        password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
        role: "INSTRUCTOR" as const,
        profileImage: "/images/instructors/marie-boulanger.png",
        yearsExperience: 20,
        awards: ["French Pastry Master 2021", "Le Cordon Bleu Graduate", "Paris Culinary Excellence"],
        bio: "Classically trained French pastry chef with expertise in traditional French baking techniques. Marie brings the art of French pastry to life.",
        specialties: ["French", "Pastry", "Bread", "Croissants", "Desserts"],
        languages: ["English", "French", "Italian"]
      },
      {
        name: "Li Wei",
        email: "liwei@cookingwithclass.com",
        password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
        role: "INSTRUCTOR" as const,
        profileImage: "/images/instructors/li-wei.png",
        yearsExperience: 14,
        awards: ["Chinese Cuisine Master 2022", "Asian Culinary Institute", "Dim Sum Specialist"],
        bio: "Expert in traditional Chinese cuisine with focus on dim sum and regional specialties. Li Wei brings authentic Chinese flavors and techniques.",
        specialties: ["Chinese", "Dim Sum", "Noodles", "Stir Fry", "Tea Pairing"],
        languages: ["English", "Mandarin", "Cantonese"]
      }
    ]

    console.log('Creating instructors...')
    for (const instructorData of instructors) {
      await prisma.user.create({
        data: instructorData
      })
    }

    console.log('Creating sample classes...')
    const sampleClasses = [
      {
        title: "Pasta Pandemonium",
        description: "Dive into the world of Italian pasta with a twist! Make noodles that would make your nonna giggle.",
        location: "Rome, Italy",
        address: "Piazza Navona, 00186 Roma RM, Italy",
        instructorName: "Giovanni Spaghetti",
        duration: "2h",
        cuisineType: "Italian",
        difficulty: "Beginner",
        rating: 4.8,
        about: "Learn the art of pasta making from scratch with traditional Italian techniques.",
        menu: "Fresh pasta, marinara sauce, garlic bread, tiramisu",
        schedule: "Every Saturday at 2:00 PM",
        highlights: "Apron, recipe book, take-home pasta",
        additionalInformation: "Vegetarian options available, wine pairing included",
        maxStudents: 12,
        price: 75,
        image: "/images/classes/pasta-pandemonium.svg",
        instructorId: (await prisma.user.findFirst({ where: { email: "giovanni@cookingwithclass.com" } }))!.id
      },
      {
        title: "Sushi Shenanigans",
        description: "Roll with laughter as you learn the art of sushi making in the heart of Tokyo.",
        location: "Tokyo, Japan",
        address: "1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan",
        instructorName: "Aiko Tanaka",
        duration: "2.5h",
        cuisineType: "Japanese",
        difficulty: "Intermediate",
        rating: 4.9,
        about: "Master the art of sushi making with traditional Japanese techniques and modern twists.",
        menu: "Maki rolls, nigiri, miso soup, green tea",
        schedule: "Every Sunday at 11:00 AM",
        highlights: "Sushi mat, chopsticks, recipe guide",
        additionalInformation: "Fish alternatives available, sake tasting included",
        maxStudents: 10,
        price: 120,
        image: "/images/classes/sushi-shenanigans.svg",
        instructorId: (await prisma.user.findFirst({ where: { email: "aiko@cookingwithclass.com" } }))!.id
      }
    ]

    for (const classData of sampleClasses) {
      await prisma.class.create({
        data: classData
      })
    }

    console.log('Database seeded successfully! 🌱')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  }) 