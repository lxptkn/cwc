import { PrismaClient } from '../src/generated/prisma/index.js'

const prisma = new PrismaClient()

if (process.env.NODE_ENV === 'production') {
  console.log('Seeding is disabled in production.')
  process.exit(0)
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
    awards: ["Mexican Cuisine Master 2023", "Latin American Chef of the Year", "Guadalajara Culinary School"],
    bio: "Passionate Mexican chef with 18 years of experience in authentic Mexican cuisine. Carlos brings the vibrant flavors of Mexico to life in every dish.",
    specialties: ["Mexican", "Street Food", "Tacos", "Mole", "Tequila Pairing"],
    languages: ["English", "Spanish", "Portuguese"]
  },
  {
    name: "Marie Boulanger",
    email: "marie@cookingwithclass.com",
    password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
    role: "INSTRUCTOR" as const,
    profileImage: "/images/instructors/marie-boulanger.png",
    yearsExperience: 20,
    awards: ["French Pastry Master 2021", "Le Cordon Bleu Graduate", "Parisian Baker of the Year"],
    bio: "Renowned French pastry chef with expertise in classic French baking techniques. Marie's passion for perfect pastries is infectious.",
    specialties: ["French", "Pastry", "Bread", "Croissants", "Desserts"],
    languages: ["English", "French", "German"]
  },
  {
    name: "Li Wei",
    email: "liwei@cookingwithclass.com",
    password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
    role: "INSTRUCTOR" as const,
    profileImage: "/images/instructors/li-wei.png",
    yearsExperience: 14,
    awards: ["Dim Sum Master 2023", "Cantonese Cuisine Expert", "Hong Kong Culinary Institute"],
    bio: "Expert in Cantonese cuisine with special focus on dim sum and traditional Chinese cooking methods. Li Wei's classes are a journey through Chinese culinary heritage.",
    specialties: ["Chinese", "Dim Sum", "Cantonese", "Steaming", "Tea Pairing"],
    languages: ["English", "Mandarin", "Cantonese"]
  },
  {
    name: "Rachel Goldstein",
    email: "rachel@cookingwithclass.com",
    password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
    role: "INSTRUCTOR" as const,
    profileImage: "/images/instructors/rachel-goldstein.png",
    yearsExperience: 10,
    awards: ["New York Bagel Master 2022", "Jewish Cuisine Expert", "Culinary Institute of America"],
    bio: "New York native and bagel expert with deep knowledge of Jewish-American cuisine. Rachel's classes celebrate the rich traditions of New York's culinary scene.",
    specialties: ["American", "Jewish", "Bagels", "Delicatessen", "Baking"],
    languages: ["English", "Hebrew", "Yiddish"]
  },
  {
    name: "Priya Singh",
    email: "priya@cookingwithclass.com",
    password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
    role: "INSTRUCTOR" as const,
    profileImage: "/images/instructors/priya-singh.png",
    yearsExperience: 16,
    awards: ["Indian Cuisine Master 2023", "Spice Expert Award", "Mumbai Culinary Institute"],
    bio: "Master of Indian cuisine with expertise in regional dishes and spice blending. Priya's classes explore the diverse flavors of India's culinary landscape.",
    specialties: ["Indian", "Curry", "Tandoor", "Spice Blending", "Vegetarian"],
    languages: ["English", "Hindi", "Punjabi"]
  },
  {
    name: "Kasia Nowak",
    email: "kasia@cookingwithclass.com",
    password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
    role: "INSTRUCTOR" as const,
    profileImage: "/images/instructors/kasia-nowak.png",
    yearsExperience: 13,
    awards: ["Polish Cuisine Expert 2022", "European Comfort Food Master", "Warsaw Culinary School"],
    bio: "Polish chef specializing in traditional comfort foods and Eastern European cuisine. Kasia's classes bring warmth and tradition to every dish.",
    specialties: ["Polish", "Eastern European", "Comfort Food", "Dumplings", "Fermentation"],
    languages: ["English", "Polish", "German"]
  },
  {
    name: "Miguel Torres",
    email: "miguel@cookingwithclass.com",
    password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
    role: "INSTRUCTOR" as const,
    profileImage: "/images/instructors/miguel-torres.png",
    yearsExperience: 11,
    awards: ["Spanish Tapas Master 2023", "Mediterranean Cuisine Expert", "Barcelona Culinary Institute"],
    bio: "Spanish chef passionate about tapas and Mediterranean cuisine. Miguel's classes showcase the social and flavorful nature of Spanish cooking.",
    specialties: ["Spanish", "Tapas", "Mediterranean", "Seafood", "Wine Pairing"],
    languages: ["English", "Spanish", "Catalan"]
  },
  {
    name: "Nguyen Minh",
    email: "nguyen@cookingwithclass.com",
    password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // "password123"
    role: "INSTRUCTOR" as const,
    profileImage: "/images/instructors/nguyen-minh.png",
    yearsExperience: 9,
    awards: ["Vietnamese Cuisine Expert 2022", "Pho Master", "Hanoi Culinary Institute"],
    bio: "Vietnamese chef with deep knowledge of traditional Vietnamese cooking techniques. Nguyen's classes explore the balance of flavors in Vietnamese cuisine.",
    specialties: ["Vietnamese", "Pho", "Street Food", "Fresh Herbs", "Rice Dishes"],
    languages: ["English", "Vietnamese", "French"]
  }
]

// Class data with instructor assignments and images
const classes = [
  {
    title: 'Pasta Pandemonium',
    description: 'Dive into the world of Italian pasta with a twist! Make noodles that would make your nonna giggle.',
    location: 'Rome, Italy',
    address: 'Piazza Navona, 00186 Roma RM, Italy',
    instructorName: 'Giovanni Spaghetti',
    duration: '2h',
    cuisineType: 'Italian',
    difficulty: 'Beginner',
    maxStudents: 12,
    price: 75,
    rating: 4.8,
    about: 'Learn the art of pasta making from a true Italian chef. Perfect for beginners!',
    menu: 'Fresh pasta, marinara sauce, garlic bread',
    schedule: 'Every Tuesday and Thursday at 6 PM',
    highlights: 'Hands-on experience, take-home pasta, wine pairing tips',
    additionalInformation: 'Bring your appetite and a container for leftovers!',
    image: '/classes/class-1.png',
    instructorEmail: 'giovanni@cookingwithclass.com'
  },
  {
    title: 'Sushi Shenanigans',
    description: 'Roll with laughter as you learn the art of sushi making in the heart of Tokyo.',
    location: 'Tokyo, Japan',
    address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan',
    instructorName: 'Aiko Tanaka',
    duration: '2.5h',
    cuisineType: 'Japanese',
    difficulty: 'Intermediate',
    maxStudents: 10,
    price: 120,
    rating: 4.9,
    about: 'Master the delicate art of sushi making with traditional techniques.',
    menu: 'Maki rolls, nigiri, miso soup, green tea',
    schedule: 'Every Saturday at 5 PM',
    highlights: 'Premium fish, bamboo rolling mats, traditional techniques',
    additionalInformation: 'All ingredients provided. No experience necessary!',
    image: '/classes/class-2.png',
    instructorEmail: 'aiko@cookingwithclass.com'
  },
  {
    title: 'Taco Tango',
    description: 'Spice up your life with a fiesta of flavors and a side of salsa dancing in Mexico City.',
    location: 'Mexico City, Mexico',
    address: 'Plaza de la Constitución S/N, Centro, Cuauhtémoc, 06000 Ciudad de México, CDMX, Mexico',
    instructorName: 'Carlos Rivera',
    duration: '2h',
    cuisineType: 'Mexican',
    difficulty: 'Beginner',
    maxStudents: 15,
    price: 60,
    rating: 4.7,
    about: 'Experience authentic Mexican cuisine with traditional recipes passed down through generations.',
    menu: 'Street tacos, guacamole, salsa verde, horchata',
    schedule: 'Every Friday at 7 PM',
    highlights: 'Fresh tortillas, homemade salsas, tequila tasting',
    additionalInformation: 'Vegetarian options available. Spice levels adjustable.',
    image: '/classes/class-3.png',
    instructorEmail: 'carlos@cookingwithclass.com'
  },
  {
    title: 'Croissant Capers',
    description: 'Master the flaky art of croissant making in the city of lights. Oui, chef!',
    location: 'Paris, France',
    address: '5 Av. Anatole France, 75007 Paris, France',
    instructorName: 'Marie Boulanger',
    duration: '3h',
    cuisineType: 'French',
    difficulty: 'Advanced',
    maxStudents: 8,
    price: 95,
    rating: 4.6,
    about: 'Learn the secrets of perfect French pastries from a Parisian baker.',
    menu: 'Butter croissants, pain au chocolat, French coffee',
    schedule: 'Every Sunday at 9 AM',
    highlights: 'Laminated dough technique, butter quality, oven skills',
    additionalInformation: 'Take home your creations. Coffee and tea provided.',
    image: '/classes/class-4.png',
    instructorEmail: 'marie@cookingwithclass.com'
  },
  {
    title: 'Dim Sum Delights',
    description: 'Steam, stuff, and giggle your way through a dim sum adventure in Hong Kong.',
    location: 'Hong Kong, China',
    address: 'Tsim Sha Tsui Promenade, Tsim Sha Tsui, Hong Kong',
    instructorName: 'Li Wei',
    duration: '2.5h',
    cuisineType: 'Chinese',
    difficulty: 'Intermediate',
    maxStudents: 14,
    price: 110,
    rating: 4.8,
    about: 'Discover the art of dim sum making with authentic Cantonese techniques.',
    menu: 'Har gow, siu mai, char siu bao, jasmine tea',
    schedule: 'Every Wednesday at 6:30 PM',
    highlights: 'Steaming techniques, dumpling folding, tea ceremony',
    additionalInformation: 'All equipment provided. Gluten-free options available.',
    image: '/classes/class-5.png',
    instructorEmail: 'liwei@cookingwithclass.com'
  },
  {
    title: 'Bagel Bonanza',
    description: 'Boil, bake, and schmear your way to bagel bliss in New York City.',
    location: 'New York, USA',
    address: '350 5th Ave, New York, NY 10118, USA',
    instructorName: 'Rachel Goldstein',
    duration: '2h',
    cuisineType: 'American',
    difficulty: 'Beginner',
    maxStudents: 16,
    price: 55,
    rating: 4.5,
    about: 'Learn to make authentic New York-style bagels from scratch.',
    menu: 'Everything bagels, cream cheese, lox, coffee',
    schedule: 'Every Saturday at 10 AM',
    highlights: 'Boiling technique, proper kneading, traditional toppings',
    additionalInformation: 'Take home a dozen fresh bagels. Coffee included.',
    image: '/classes/class-6.png',
    instructorEmail: 'rachel@cookingwithclass.com'
  },
  {
    title: 'Curry Carnival',
    description: 'Spice up your senses with a whirlwind of Indian curries in Mumbai.',
    location: 'Mumbai, India',
    address: 'Gateway of India, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001, India',
    instructorName: 'Priya Singh',
    duration: '2.5h',
    cuisineType: 'Indian',
    difficulty: 'Intermediate',
    maxStudents: 12,
    price: 80,
    rating: 4.7,
    about: 'Master the art of Indian curry making with authentic spices and techniques.',
    menu: 'Butter chicken, naan bread, raita, masala chai',
    schedule: 'Every Thursday at 6 PM',
    highlights: 'Spice blending, tandoor techniques, traditional methods',
    additionalInformation: 'Spice levels adjustable. Vegetarian options available.',
    image: '/classes/class-7.png',
    instructorEmail: 'priya@cookingwithclass.com'
  },
  {
    title: 'Pierogi Party',
    description: 'Stuff, pinch, and boil your way to Polish comfort food in Warsaw.',
    location: 'Warsaw, Poland',
    address: 'Plac Zamkowy, 00-277 Warszawa, Poland',
    instructorName: 'Kasia Nowak',
    duration: '2h',
    cuisineType: 'Polish',
    difficulty: 'Beginner',
    maxStudents: 10,
    price: 65,
    rating: 4.4,
    about: 'Learn to make traditional Polish pierogi with authentic family recipes.',
    menu: 'Potato and cheese pierogi, sour cream, sauerkraut',
    schedule: 'Every Tuesday at 5 PM',
    highlights: 'Dough making, filling preparation, proper sealing',
    additionalInformation: 'Take home frozen pierogi. Traditional music included.',
    image: '/classes/class-8.png',
    instructorEmail: 'kasia@cookingwithclass.com'
  },
  {
    title: 'Tapas Tickle',
    description: 'Share laughs and small plates in a lively tapas class in Barcelona.',
    location: 'Barcelona, Spain',
    address: 'La Rambla, 08002 Barcelona, Spain',
    instructorName: 'Miguel Torres',
    duration: '2h',
    cuisineType: 'Spanish',
    difficulty: 'Intermediate',
    maxStudents: 14,
    price: 90,
    rating: 4.6,
    about: 'Experience the vibrant flavors of Spanish tapas with traditional recipes.',
    menu: 'Patatas bravas, gambas al ajillo, tortilla española, sangria',
    schedule: 'Every Friday at 8 PM',
    highlights: 'Multiple small dishes, Spanish wine pairing, social dining',
    additionalInformation: 'Wine included. Perfect for groups and couples.',
    image: '/classes/class-9.png',
    instructorEmail: 'miguel@cookingwithclass.com'
  },
  {
    title: 'Pho-nomenal Fun',
    description: 'Simmer, slurp, and smile as you make authentic pho in Hanoi.',
    location: 'Hanoi, Vietnam',
    address: '1 Hàng Trống, Hoàn Kiếm, Hà Nội, Vietnam',
    instructorName: 'Nguyen Minh',
    duration: '2.5h',
    cuisineType: 'Vietnamese',
    difficulty: 'Beginner',
    maxStudents: 12,
    price: 70,
    rating: 4.5,
    about: 'Learn to make authentic Vietnamese pho with traditional broth techniques.',
    menu: 'Beef pho, fresh herbs, bean sprouts, Vietnamese coffee',
    schedule: 'Every Sunday at 11 AM',
    highlights: 'Broth making, herb preparation, noodle cooking',
    additionalInformation: 'Vegetarian pho option available. Take home broth recipe.',
    image: '/classes/class-10.png',
    instructorEmail: 'nguyen@cookingwithclass.com'
  },
  // Additional classes for each instructor
  {
    title: 'Pizza Perfection',
    description: 'Craft the perfect Neapolitan pizza in Naples with a wood-fired oven.',
    location: 'Naples, Italy',
    address: 'Via Pizza 8, 80100 Napoli NA, Italy',
    instructorName: 'Giovanni Spaghetti',
    duration: '2h',
    cuisineType: 'Italian',
    difficulty: 'Beginner',
    maxStudents: 18,
    price: 80,
    rating: 4.9,
    about: 'Learn to make pizza dough, sauce, and bake in a real wood-fired oven.',
    menu: 'Margherita pizza, calzone, tiramisu',
    schedule: 'Every Friday at 6 PM',
    highlights: 'Dough tossing, sauce secrets, oven skills',
    additionalInformation: 'Aprons and chef hats provided.',
    image: '/classes/class-11.png',
    instructorEmail: 'giovanni@cookingwithclass.com'
  },
  {
    title: 'Ramen Revolution',
    description: 'Master the art of Japanese ramen from broth to bowl in Osaka.',
    location: 'Osaka, Japan',
    address: '1-1-1 Umeda, Kita Ward, Osaka, Japan',
    instructorName: 'Aiko Tanaka',
    duration: '3h',
    cuisineType: 'Japanese',
    difficulty: 'Intermediate',
    maxStudents: 12,
    price: 100,
    rating: 4.8,
    about: 'Learn to make authentic ramen noodles and broth from scratch.',
    menu: 'Shoyu ramen, gyoza, green tea',
    schedule: 'Every Monday at 6 PM',
    highlights: 'Broth simmering, noodle making, toppings bar',
    additionalInformation: 'Aprons provided. Vegetarian options available.',
    image: '/classes/class-12.png',
    instructorEmail: 'aiko@cookingwithclass.com'
  },
  {
    title: 'Mexican Street Food',
    description: 'Explore the vibrant world of Mexican street food in Guadalajara.',
    location: 'Guadalajara, Mexico',
    address: 'Plaza de los Mariachis, Guadalajara, Mexico',
    instructorName: 'Carlos Rivera',
    duration: '2.5h',
    cuisineType: 'Mexican',
    difficulty: 'Beginner',
    maxStudents: 16,
    price: 70,
    rating: 4.6,
    about: 'Learn to make authentic Mexican street food favorites.',
    menu: 'Elote, tamales, churros, horchata',
    schedule: 'Every Saturday at 3 PM',
    highlights: 'Street food techniques, traditional recipes, local ingredients',
    additionalInformation: 'Vegetarian options available. Family friendly.',
    image: '/classes/class-13.png',
    instructorEmail: 'carlos@cookingwithclass.com'
  },
  {
    title: 'French Bistro Basics',
    description: 'Cook classic French bistro dishes in Lyon with a local chef.',
    location: 'Lyon, France',
    address: 'Rue de la Cuisine 12, 69001 Lyon, France',
    instructorName: 'Marie Boulanger',
    duration: '2.5h',
    cuisineType: 'French',
    difficulty: 'Intermediate',
    maxStudents: 12,
    price: 100,
    rating: 4.7,
    about: 'Master French classics like coq au vin and crème brûlée.',
    menu: 'Coq au vin, ratatouille, crème brûlée',
    schedule: 'Every Tuesday at 7 PM',
    highlights: 'Wine pairing, sauce making, plating',
    additionalInformation: 'Wine included. Recipes in English and French.',
    image: '/classes/class-14.png',
    instructorEmail: 'marie@cookingwithclass.com'
  },
  {
    title: 'Chinese Dumpling Masterclass',
    description: 'Master the art of Chinese dumpling making in Beijing.',
    location: 'Beijing, China',
    address: 'Wangfujing Street, Beijing, China',
    instructorName: 'Li Wei',
    duration: '3h',
    cuisineType: 'Chinese',
    difficulty: 'Intermediate',
    maxStudents: 12,
    price: 95,
    rating: 4.8,
    about: 'Learn to make various types of Chinese dumplings from scratch.',
    menu: 'Jiaozi, xiaolongbao, wontons, tea',
    schedule: 'Every Sunday at 2 PM',
    highlights: 'Dough making, filling preparation, folding techniques',
    additionalInformation: 'All equipment provided. Vegetarian options available.',
    image: '/classes/class-15.png',
    instructorEmail: 'liwei@cookingwithclass.com'
  }
]

async function main() {
  console.log('Starting database seeding...')

  // Create instructors first
  console.log('Creating instructors...')
  const createdInstructors = new Map()

  for (const instructorData of instructors) {
    const instructor = await prisma.user.create({
      data: instructorData
    })
    createdInstructors.set(instructor.email, instructor.id)
    console.log(`Created instructor: ${instructor.name}`)
  }

  // Create classes with instructor relationships
  console.log('Creating classes...')
  for (const classData of classes) {
    const instructorId = createdInstructors.get(classData.instructorEmail)
    if (!instructorId) {
      console.error(`Instructor not found for email: ${classData.instructorEmail}`)
      continue
    }

    const { instructorEmail, ...classDataWithoutEmail } = classData

    await prisma.class.create({
      data: {
        ...classDataWithoutEmail,
        instructorId: instructorId
      }
    })
    console.log(`Created class: ${classData.title}`)
  }

  console.log('Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 