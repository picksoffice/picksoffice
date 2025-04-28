const fs = require('fs');
const { execSync } = require('child_process');

console.log('Checking for remaining light mode references...');

// Find any files still containing "dark:" references
try {
  const darkPrefixes = execSync('grep -r "dark:" --include="*.tsx" --include="*.ts" --include="*.css" ./src', 
    { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
  
  if (darkPrefixes.trim()) {
    console.log('Found files with "dark:" prefixes:');
    console.log(darkPrefixes);
  } else {
    console.log('No "dark:" prefixes found. ✓');
  }
} catch (error) {
  console.log('No "dark:" prefixes found. ✓');
}

// Find any bg-white references
try {
  const bgWhite = execSync('grep -r "bg-white" --include="*.tsx" --include="*.ts" --include="*.css" ./src', 
    { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
  
  if (bgWhite.trim()) {
    console.log('Found files with "bg-white" classes:');
    console.log(bgWhite);
  } else {
    console.log('No "bg-white" classes found. ✓');
  }
} catch (error) {
  console.log('No "bg-white" classes found. ✓');
}

// Find any text-gray-900 references
try {
  const textGray900 = execSync('grep -r "text-gray-900" --include="*.tsx" --include="*.ts" --include="*.css" ./src', 
    { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
  
  if (textGray900.trim()) {
    console.log('Found files with "text-gray-900" classes:');
    console.log(textGray900);
  } else {
    console.log('No "text-gray-900" classes found. ✓');
  }
} catch (error) {
  console.log('No "text-gray-900" classes found. ✓');
}

console.log('Check complete. If any matches were found, you may need to manually update those files.');