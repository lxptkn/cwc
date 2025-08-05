const fs = require('fs');
const path = require('path');

// Create placeholder images for classes
const classImages = [
  'pasta-pandemonium.jpg',
  'sushi-shenanigans.jpg',
  'taco-tango.jpg',
  'croissant-capers.jpg',
  'dim-sum-delights.jpg',
  'bagel-bonanza.jpg',
  'curry-carnival.jpg',
  'pierogi-party.jpg',
  'tapas-tickle.jpg',
  'pho-nomenal-fun.jpg',
  'pizza-perfection.jpg',
  'ramen-revolution.jpg',
  'mexican-street-food.jpg',
  'french-bistro-basics.jpg',
  'chinese-dumpling-masterclass.jpg'
];

// Create placeholder images for instructors
const instructorImages = [
  'giovanni-spaghetti.jpg',
  'aiko-tanaka.jpg',
  'carlos-rivera.jpg',
  'marie-boulanger.jpg',
  'li-wei.jpg',
  'rachel-goldstein.jpg',
  'priya-singh.jpg',
  'kasia-nowak.jpg',
  'miguel-torres.jpg',
  'nguyen-minh.jpg'
];

// Create a simple SVG placeholder
function createPlaceholderSVG(text, width = 400, height = 300) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f3f4f6"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#6b7280" text-anchor="middle" dy=".3em">${text}</text>
  </svg>`;
}

// Ensure directories exist
const dirs = [
  'public/images/classes',
  'public/images/instructors',
  'public/images/profiles'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Generate class placeholder images
classImages.forEach(className => {
  const name = className.replace('.jpg', '').replace(/-/g, ' ');
  const svg = createPlaceholderSVG(name, 800, 600);
  fs.writeFileSync(path.join('public/images/classes', className.replace('.jpg', '.svg')), svg);
  console.log(`Created placeholder for class: ${name}`);
});

// Generate instructor placeholder images
instructorImages.forEach(instructorName => {
  const name = instructorName.replace('.jpg', '').replace(/-/g, ' ');
  const svg = createPlaceholderSVG(name, 400, 400);
  fs.writeFileSync(path.join('public/images/instructors', instructorName.replace('.jpg', '.svg')), svg);
  console.log(`Created placeholder for instructor: ${name}`);
});

console.log('Placeholder images generated successfully!'); 