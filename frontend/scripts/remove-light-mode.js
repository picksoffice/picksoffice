const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Ensure scripts directory exists
ensureDirectoryExists(path.resolve(__dirname));

// Find all TSX files
console.log('Finding all TSX files...');
const findCommand = 'find ./src -type f -name "*.tsx" | grep -v "node_modules"';
const files = execSync(findCommand, { encoding: 'utf8' }).trim().split('\n');

console.log(`Found ${files.length} files to process`);

// Process each file
let totalReplacements = 0;

files.forEach(filePath => {
  if (!filePath) return;

  const fullPath = filePath;
  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    let replacements = 0;

    // Replace bg-white with bg-dark-bg or bg-gray-800/900
    const newContent1 = content.replace(/bg-white/g, 'bg-dark-bg');
    if (newContent1 !== content) {
      content = newContent1;
      replacements++;
    }

    // Replace text-gray-900 with text-dark-text or text-white
    const newContent2 = content.replace(/text-gray-900/g, 'text-dark-text');
    if (newContent2 !== content) {
      content = newContent2;
      replacements++;
    }

    // Replace text-black with text-white
    const newContent3 = content.replace(/text-black/g, 'text-white');
    if (newContent3 !== content) {
      content = newContent3;
      replacements++;
    }

    // Replace border-gray-100 with border-gray-700
    const newContent4 = content.replace(/border-gray-100/g, 'border-gray-700');
    if (newContent4 !== content) {
      content = newContent4;
      replacements++;
    }

    // Replace hover:bg-gray-100 with hover:bg-gray-800
    const newContent5 = content.replace(/hover:bg-gray-100/g, 'hover:bg-gray-800');
    if (newContent5 !== content) {
      content = newContent5;
      replacements++;
    }

    // Remove dark: prefixes
    const newContent6 = content.replace(/dark:/g, '');
    if (newContent6 !== content) {
      content = newContent6;
      replacements += (content.match(/dark:/g) || []).length;
    }

    // Write changes back to file
    if (replacements > 0) {
      fs.writeFileSync(fullPath, content);
      totalReplacements += replacements;
      console.log(`Updated ${filePath} (${replacements} replacements)`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log(`Done! Made ${totalReplacements} replacements across ${files.length} files.`);
console.log('You may need to manually check components that had complex light/dark mode styles.');
