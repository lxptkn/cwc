const fs = require('fs');

// Read the seed file
const seedPath = 'prisma/seed.ts';
let content = fs.readFileSync(seedPath, 'utf8');

// Replace all .jpg extensions with .svg for class images
content = content.replace(/image: '\/images\/classes\/.*\.jpg'/g, (match) => {
  return match.replace('.jpg', '.svg');
});

// Replace all .jpg extensions with .svg for instructor images
content = content.replace(/profileImage: "\/images\/instructors\/.*\.jpg"/g, (match) => {
  return match.replace('.jpg', '.svg');
});

// Write the updated content back
fs.writeFileSync(seedPath, content);

console.log('Updated all image extensions from .jpg to .svg'); 