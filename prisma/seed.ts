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
      if (process.env.FORCE_RESET === 'true') {
        console.log('Force reset enabled - clearing existing data...')
        await prisma.booking.deleteMany()
        await prisma.review.deleteMany()
        await prisma.class.deleteMany()
        await prisma.user.deleteMany()
        console.log('Existing data cleared, proceeding with seed...')
      } else {
        console.log('Database already has data, skipping seed...')
        console.log('Set FORCE_RESET=true to clear existing data and reseed')
        return
      }
    }

    // Instructor data with full profiles - using all available instructor images
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
      },
      {
        name: "Kasia Nowak",
        email: "kasia@cookingwithclass.com",
        password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
        role: "INSTRUCTOR" as const,
        profileImage: "/images/instructors/kasia-nowak.png",
        yearsExperience: 16,
        awards: ["Polish Cuisine Excellence 2023", "Eastern European Chef of the Year", "Warsaw Culinary Institute"],
        bio: "Passionate Polish chef specializing in traditional Eastern European cuisine. Kasia brings the rich flavors of Poland to every cooking class.",
        specialties: ["Polish", "Eastern European", "Pierogi", "Soups", "Traditional Baking"],
        languages: ["English", "Polish", "German"]
      },
      {
        name: "Miguel Torres",
        email: "miguel@cookingwithclass.com",
        password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
        role: "INSTRUCTOR" as const,
        profileImage: "/images/instructors/miguel-torres.png",
        yearsExperience: 13,
        awards: ["Spanish Tapas Master 2022", "Mediterranean Cuisine Award", "Barcelona Culinary School"],
        bio: "Expert in Spanish and Mediterranean cuisine with a focus on tapas and regional specialties. Miguel brings the vibrant flavors of Spain to life.",
        specialties: ["Spanish", "Tapas", "Mediterranean", "Seafood", "Paella"],
        languages: ["English", "Spanish", "Catalan"]
      },
      {
        name: "Nguyen Minh",
        email: "nguyen@cookingwithclass.com",
        password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
        role: "INSTRUCTOR" as const,
        profileImage: "/images/instructors/nguyen-minh.png",
        yearsExperience: 11,
        awards: ["Vietnamese Cuisine Master 2023", "Southeast Asian Excellence", "Ho Chi Minh Culinary Institute"],
        bio: "Expert in Vietnamese cuisine with deep knowledge of traditional techniques and modern interpretations. Nguyen specializes in pho, banh mi, and fresh herbs.",
        specialties: ["Vietnamese", "Pho", "Banh Mi", "Fresh Herbs", "Street Food"],
        languages: ["English", "Vietnamese", "French"]
      },
      {
        name: "Priya Singh",
        email: "priya@cookingwithclass.com",
        password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
        role: "INSTRUCTOR" as const,
        profileImage: "/images/instructors/priya-singh.png",
        yearsExperience: 17,
        awards: ["Indian Cuisine Excellence 2022", "Spice Master Award", "Delhi Culinary Institute"],
        bio: "Master of Indian cuisine with expertise in regional specialties and spice combinations. Priya brings the rich, aromatic flavors of India to every class.",
        specialties: ["Indian", "Curry", "Bread Making", "Spice Blends", "Vegetarian"],
        languages: ["English", "Hindi", "Punjabi"]
      },
      {
        name: "Rachel Goldstein",
        email: "rachel@cookingwithclass.com",
        password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
        role: "INSTRUCTOR" as const,
        profileImage: "/images/instructors/rachel-goldstein.png",
        yearsExperience: 19,
        awards: ["Jewish Cuisine Master 2021", "Traditional Baking Excellence", "New York Culinary Institute"],
        bio: "Expert in Jewish and Eastern European cuisine with a focus on traditional baking and comfort foods. Rachel brings generations of family recipes to life.",
        specialties: ["Jewish", "Baking", "Comfort Food", "Traditional Recipes", "Bagels"],
        languages: ["English", "Hebrew", "Yiddish"]
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
        image: "/classes/class-1.png",
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
        image: "/classes/class-2.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "aiko@cookingwithclass.com" } }))!.id
      },
      {
        title: "Taco Tango",
        description: "Dance with flavors in this Mexican street food extravaganza! Learn to make authentic tacos that will make your taste buds sing.",
        location: "Mexico City, Mexico",
        address: "Av. Francisco I. Madero, Centro Histórico, 06000 Ciudad de México, CDMX, Mexico",
        instructorName: "Carlos Rivera",
        duration: "2h",
        cuisineType: "Mexican",
        difficulty: "Beginner",
        rating: 4.7,
        about: "Master the art of Mexican street food with authentic recipes and traditional techniques.",
        menu: "Street tacos, guacamole, salsa verde, horchata",
        schedule: "Every Friday at 6:00 PM",
        highlights: "Tortilla press, recipe cards, take-home salsa",
        additionalInformation: "Vegetarian options available, tequila tasting included",
        maxStudents: 15,
        price: 65,
        image: "/classes/class-3.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "carlos@cookingwithclass.com" } }))!.id
      },
      {
        title: "Croissant Capers",
        description: "Master the art of French pastry with flaky, buttery croissants that will transport you to a Parisian café.",
        location: "Paris, France",
        address: "8 Rue du Cherche-Midi, 75006 Paris, France",
        instructorName: "Marie Boulanger",
        duration: "3h",
        cuisineType: "French",
        difficulty: "Intermediate",
        rating: 4.9,
        about: "Learn the secrets of perfect French pastry with traditional techniques and modern precision.",
        menu: "Butter croissants, pain au chocolat, French pastries, coffee",
        schedule: "Every Saturday at 9:00 AM",
        highlights: "Pastry tools, recipe book, take-home pastries",
        additionalInformation: "Gluten-free options available, French wine pairing",
        maxStudents: 8,
        price: 95,
        image: "/classes/class-4.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "marie@cookingwithclass.com" } }))!.id
      },
      {
        title: "Chinese Dumpling Masterclass",
        description: "Unlock the secrets of perfect Chinese dumplings in this comprehensive masterclass.",
        location: "Beijing, China",
        address: "1 Wangfujing St, Dongcheng, Beijing, China",
        instructorName: "Li Wei",
        duration: "2.5h",
        cuisineType: "Chinese",
        difficulty: "Intermediate",
        rating: 4.8,
        about: "Master the art of Chinese dumpling making with traditional fillings and perfect pleating techniques.",
        menu: "Pork dumplings, vegetable dumplings, dipping sauces, tea",
        schedule: "Every Sunday at 2:00 PM",
        highlights: "Dumpling tools, recipe guide, take-home dumplings",
        additionalInformation: "Vegetarian options available, traditional tea ceremony",
        maxStudents: 12,
        price: 85,
        image: "/classes/class-5.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "liwei@cookingwithclass.com" } }))!.id
      },
      {
        title: "Pierogi Party",
        description: "Join the ultimate Eastern European comfort food celebration! Learn to make perfect pierogi from scratch.",
        location: "Warsaw, Poland",
        address: "Krakowskie Przedmieście 5, 00-068 Warszawa, Poland",
        instructorName: "Kasia Nowak",
        duration: "2.5h",
        cuisineType: "Polish",
        difficulty: "Beginner",
        rating: 4.6,
        about: "Discover the art of Polish pierogi making with traditional fillings and authentic techniques.",
        menu: "Classic pierogi, sour cream, caramelized onions, Polish beer",
        schedule: "Every Saturday at 4:00 PM",
        highlights: "Dough tools, recipe cards, take-home pierogi",
        additionalInformation: "Vegetarian options available, Polish beer tasting",
        maxStudents: 14,
        price: 70,
        image: "/classes/class-6.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "kasia@cookingwithclass.com" } }))!.id
      },
      {
        title: "Tapas Tickle",
        description: "Experience the vibrant flavors of Spain in this exciting tapas adventure!",
        location: "Barcelona, Spain",
        address: "Carrer de la Boqueria, 08002 Barcelona, Spain",
        instructorName: "Miguel Torres",
        duration: "2h",
        cuisineType: "Spanish",
        difficulty: "Beginner",
        rating: 4.7,
        about: "Learn to create authentic Spanish tapas with fresh ingredients and traditional techniques.",
        menu: "Patatas bravas, gambas al ajillo, tortilla española, sangria",
        schedule: "Every Friday at 7:00 PM",
        highlights: "Tapas plates, recipe guide, Spanish wine",
        additionalInformation: "Seafood alternatives available, sangria making included",
        maxStudents: 16,
        price: 80,
        image: "/classes/class-7.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "miguel@cookingwithclass.com" } }))!.id
      },
      {
        title: "Pho-nomenal Fun",
        description: "Dive into the world of Vietnamese pho and discover the secrets of this beloved noodle soup.",
        location: "Ho Chi Minh City, Vietnam",
        address: "1 Đồng Khởi, Bến Nghé, Quận 1, TP. Hồ Chí Minh, Vietnam",
        instructorName: "Nguyen Minh",
        duration: "2.5h",
        cuisineType: "Vietnamese",
        difficulty: "Intermediate",
        rating: 4.8,
        about: "Master the art of Vietnamese pho with authentic broth and fresh ingredients.",
        menu: "Beef pho, fresh herbs, bean sprouts, Vietnamese coffee",
        schedule: "Every Sunday at 1:00 PM",
        highlights: "Pho bowls, recipe guide, fresh herbs",
        additionalInformation: "Vegetarian pho available, Vietnamese coffee tasting",
        maxStudents: 12,
        price: 75,
        image: "/classes/class-8.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "nguyen@cookingwithclass.com" } }))!.id
      },
      {
        title: "Curry Carnival",
        description: "Embark on a spice-filled journey through the diverse flavors of Indian cuisine!",
        location: "Mumbai, India",
        address: "Juhu Tara Road, Juhu, Mumbai, Maharashtra 400049, India",
        instructorName: "Priya Singh",
        duration: "3h",
        cuisineType: "Indian",
        difficulty: "Intermediate",
        rating: 4.9,
        about: "Learn to create authentic Indian curries with perfect spice combinations and traditional techniques.",
        menu: "Butter chicken, naan bread, raita, masala chai",
        schedule: "Every Saturday at 5:00 PM",
        highlights: "Spice kit, recipe book, take-home curry",
        additionalInformation: "Vegetarian options available, chai making included",
        maxStudents: 10,
        price: 90,
        image: "/classes/class-9.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "priya@cookingwithclass.com" } }))!.id
      },
      {
        title: "Bagel Bonanza",
        description: "Master the art of perfect New York-style bagels in this traditional baking class.",
        location: "New York City, USA",
        address: "123 Bagel Street, Brooklyn, NY 11201, USA",
        instructorName: "Rachel Goldstein",
        duration: "2.5h",
        cuisineType: "Jewish",
        difficulty: "Beginner",
        rating: 4.7,
        about: "Learn the secrets of authentic New York bagels with traditional techniques and family recipes.",
        menu: "Fresh bagels, cream cheese, lox, traditional spreads",
        schedule: "Every Sunday at 8:00 AM",
        highlights: "Baking tools, recipe cards, take-home bagels",
        additionalInformation: "Vegan options available, traditional coffee service",
        maxStudents: 12,
        price: 75,
        image: "/classes/class-10.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "rachel@cookingwithclass.com" } }))!.id
      },
      {
        title: "Pizza Perfection",
        description: "Create the perfect Neapolitan pizza from scratch in this authentic Italian experience!",
        location: "Naples, Italy",
        address: "Via Toledo, 80134 Napoli NA, Italy",
        instructorName: "Giovanni Spaghetti",
        duration: "2.5h",
        cuisineType: "Italian",
        difficulty: "Intermediate",
        rating: 4.9,
        about: "Master the art of Neapolitan pizza with traditional dough techniques and wood-fired cooking.",
        menu: "Margherita pizza, marinara pizza, Italian wine, gelato",
        schedule: "Every Friday at 6:00 PM",
        highlights: "Pizza peel, recipe guide, take-home dough",
        additionalInformation: "Vegetarian options available, Italian wine pairing",
        maxStudents: 14,
        price: 85,
        image: "/classes/class-11.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "giovanni@cookingwithclass.com" } }))!.id
      },
      {
        title: "Ramen Revolution",
        description: "Revolutionize your ramen game with authentic Japanese techniques and rich broths.",
        location: "Tokyo, Japan",
        address: "2 Chome-1-1 Yoyogi, Shibuya City, Tokyo 151-0053, Japan",
        instructorName: "Aiko Tanaka",
        duration: "3h",
        cuisineType: "Japanese",
        difficulty: "Advanced",
        rating: 4.8,
        about: "Master the complex art of ramen making with authentic broth techniques and perfect noodle preparation.",
        menu: "Tonkotsu ramen, chashu pork, soft-boiled eggs, pickled vegetables",
        schedule: "Every Saturday at 12:00 PM",
        highlights: "Ramen bowls, recipe guide, take-home broth",
        additionalInformation: "Vegetarian ramen available, sake pairing included",
        maxStudents: 8,
        price: 110,
        image: "/classes/class-12.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "aiko@cookingwithclass.com" } }))!.id
      },
      {
        title: "French Bistro Basics",
        description: "Master the fundamentals of French bistro cooking with classic techniques and timeless recipes.",
        location: "Paris, France",
        address: "15 Rue de Rivoli, 75004 Paris, France",
        instructorName: "Marie Boulanger",
        duration: "2.5h",
        cuisineType: "French",
        difficulty: "Intermediate",
        rating: 4.8,
        about: "Learn essential French bistro techniques with classic dishes and professional cooking methods.",
        menu: "Coq au vin, ratatouille, French bread, red wine",
        schedule: "Every Thursday at 7:00 PM",
        highlights: "Cooking tools, recipe book, French wine",
        additionalInformation: "Vegetarian options available, wine pairing included",
        maxStudents: 10,
        price: 95,
        image: "/classes/class-13.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "marie@cookingwithclass.com" } }))!.id
      },
      {
        title: "Mexican Street Food",
        description: "Explore the vibrant world of Mexican street food with authentic recipes and traditional techniques.",
        location: "Guadalajara, Mexico",
        address: "Av. Juárez, Centro, 44100 Guadalajara, Jal., Mexico",
        instructorName: "Carlos Rivera",
        duration: "2h",
        cuisineType: "Mexican",
        difficulty: "Beginner",
        rating: 4.6,
        about: "Discover the secrets of authentic Mexican street food with traditional recipes and fresh ingredients.",
        menu: "Elote, tamales, aguas frescas, Mexican hot chocolate",
        schedule: "Every Saturday at 3:00 PM",
        highlights: "Street food tools, recipe cards, traditional drinks",
        additionalInformation: "Vegetarian options available, Mexican hot chocolate making",
        maxStudents: 16,
        price: 60,
        image: "/classes/class-14.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "carlos@cookingwithclass.com" } }))!.id
      },
      {
        title: "Dim Sum Delights",
        description: "Master the art of traditional Chinese dim sum with expert techniques and authentic flavors.",
        location: "Hong Kong, China",
        address: "1 Nathan Road, Tsim Sha Tsui, Hong Kong",
        instructorName: "Li Wei",
        duration: "3h",
        cuisineType: "Chinese",
        difficulty: "Advanced",
        rating: 4.9,
        about: "Learn to create perfect dim sum with traditional fillings and professional folding techniques.",
        menu: "Har gow, siu mai, char siu bao, jasmine tea",
        schedule: "Every Sunday at 10:00 AM",
        highlights: "Dim sum tools, recipe guide, take-home dumplings",
        additionalInformation: "Vegetarian options available, traditional tea service",
        maxStudents: 8,
        price: 100,
        image: "/classes/class-15.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "liwei@cookingwithclass.com" } }))!.id
      },
      {
        title: "Polish Comfort Classics",
        description: "Discover the heartwarming world of Polish comfort food with traditional recipes and techniques.",
        location: "Krakow, Poland",
        address: "Rynek Główny 1, 31-042 Kraków, Poland",
        instructorName: "Kasia Nowak",
        duration: "2.5h",
        cuisineType: "Polish",
        difficulty: "Intermediate",
        rating: 4.7,
        about: "Learn to create authentic Polish comfort dishes with traditional techniques and family recipes.",
        menu: "Bigos, kotlet schabowy, mashed potatoes, Polish beer",
        schedule: "Every Friday at 6:00 PM",
        highlights: "Cooking tools, recipe book, traditional beer",
        additionalInformation: "Vegetarian options available, Polish beer tasting",
        maxStudents: 12,
        price: 75,
        image: "/classes/class-16.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "kasia@cookingwithclass.com" } }))!.id
      },
      {
        title: "Spanish Paella Masterclass",
        description: "Master the art of authentic Spanish paella with traditional techniques and fresh ingredients.",
        location: "Valencia, Spain",
        address: "Plaza de la Virgen, 46001 Valencia, Spain",
        instructorName: "Miguel Torres",
        duration: "3h",
        cuisineType: "Spanish",
        difficulty: "Advanced",
        rating: 4.9,
        about: "Learn to create perfect paella with traditional rice techniques and authentic Spanish flavors.",
        menu: "Seafood paella, sangria, Spanish bread, flan",
        schedule: "Every Saturday at 5:00 PM",
        highlights: "Paella pan, recipe guide, Spanish wine",
        additionalInformation: "Seafood alternatives available, sangria making included",
        maxStudents: 10,
        price: 95,
        image: "/classes/class-17.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "miguel@cookingwithclass.com" } }))!.id
      },
      {
        title: "Vietnamese Banh Mi Workshop",
        description: "Create the perfect Vietnamese banh mi sandwich with fresh ingredients and authentic techniques.",
        location: "Hanoi, Vietnam",
        address: "36 Hàng Bông, Hoàn Kiếm, Hà Nội, Vietnam",
        instructorName: "Nguyen Minh",
        duration: "2h",
        cuisineType: "Vietnamese",
        difficulty: "Beginner",
        rating: 4.6,
        about: "Learn to make authentic Vietnamese banh mi with fresh bread and traditional fillings.",
        menu: "Banh mi thit nuong, fresh herbs, pickled vegetables, Vietnamese coffee",
        schedule: "Every Saturday at 11:00 AM",
        highlights: "Bread making tools, recipe cards, fresh herbs",
        additionalInformation: "Vegetarian options available, Vietnamese coffee tasting",
        maxStudents: 14,
        price: 65,
        image: "/classes/class-18.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "nguyen@cookingwithclass.com" } }))!.id
      },
      {
        title: "Indian Bread Making",
        description: "Master the art of traditional Indian breads with expert techniques and authentic recipes.",
        location: "Delhi, India",
        address: "Connaught Place, New Delhi, Delhi 110001, India",
        instructorName: "Priya Singh",
        duration: "2.5h",
        cuisineType: "Indian",
        difficulty: "Intermediate",
        rating: 4.8,
        about: "Learn to create perfect Indian breads including naan, roti, and paratha with traditional techniques.",
        menu: "Naan bread, roti, paratha, curry, masala chai",
        schedule: "Every Sunday at 3:00 PM",
        highlights: "Bread making tools, recipe book, spice kit",
        additionalInformation: "Vegetarian options available, chai making included",
        maxStudents: 12,
        price: 80,
        image: "/classes/class-19.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "priya@cookingwithclass.com" } }))!.id
      },
      {
        title: "Jewish Holiday Baking",
        description: "Celebrate Jewish traditions with authentic holiday baking techniques and family recipes.",
        location: "Jerusalem, Israel",
        address: "Western Wall Plaza, Jerusalem, Israel",
        instructorName: "Rachel Goldstein",
        duration: "3h",
        cuisineType: "Jewish",
        difficulty: "Intermediate",
        rating: 4.8,
        about: "Learn to create traditional Jewish holiday treats with authentic techniques and family recipes.",
        menu: "Challah bread, rugelach, hamantaschen, traditional tea",
        schedule: "Every Sunday at 2:00 PM",
        highlights: "Baking tools, recipe book, traditional ingredients",
        additionalInformation: "Vegan options available, traditional tea service",
        maxStudents: 10,
        price: 85,
        image: "/classes/class-20.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "rachel@cookingwithclass.com" } }))!.id
      },
      {
        title: "Italian Wine & Cheese Pairing",
        description: "Discover the perfect harmony of Italian wines and artisanal cheeses in this sophisticated tasting class.",
        location: "Florence, Italy",
        address: "Piazza della Signoria, 50122 Firenze FI, Italy",
        instructorName: "Giovanni Spaghetti",
        duration: "2h",
        cuisineType: "Italian",
        difficulty: "Beginner",
        rating: 4.9,
        about: "Learn the art of Italian wine and cheese pairing with expert sommeliers and cheese masters.",
        menu: "Artisanal cheeses, Italian wines, bread, olives",
        schedule: "Every Thursday at 7:00 PM",
        highlights: "Wine glasses, tasting guide, cheese board",
        additionalInformation: "Vegetarian options available, wine tasting included",
        maxStudents: 16,
        price: 120,
        image: "/classes/class-21.png",
        instructorId: (await prisma.user.findFirst({ where: { email: "giovanni@cookingwithclass.com" } }))!.id
      }
    ]

    for (const classData of sampleClasses) {
      await prisma.class.create({
        data: classData
      })
    }

    console.log('Database seeded successfully! 🌱')
    console.log(`Created ${instructors.length} instructors and ${sampleClasses.length} classes`)
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