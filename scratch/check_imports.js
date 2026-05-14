const fs = require('fs');
const path = require('path');

const projectRoot = '/Users/mamun/Desktop/projects/food-hub-projects/food-hub-frontend';

const filesToCheck = [
  'src/app/(CommonLayout)/meals/page.tsx',
  'src/app/(CommonLayout)/meals/[id]/page.tsx',
  'src/components/modules/Meals/MealsList.tsx',
  'src/components/modules/Meals/ReviewsSection.tsx',
  'src/components/modules/Home/FeaturesProducts.tsx',
  'src/components/modules/Home/CategoryProducts.tsx',
];

const aliases = {
  '@': path.join(projectRoot, 'src'),
};

filesToCheck.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const importRegex = /import\s+.*?\s+from\s+['"](.*?)['"]/g;
  let match;

  console.log(`\nChecking imports in ${file}:`);
  while ((match = importRegex.exec(content)) !== null) {
    let importPath = match[1];
    let resolvedPath;

    if (importPath.startsWith('@/')) {
      resolvedPath = path.join(aliases['@'], importPath.substring(2));
    } else if (importPath.startsWith('.')) {
      resolvedPath = path.resolve(path.dirname(filePath), importPath);
    } else {
      // Library import, skip for now
      continue;
    }

    const possibleExtensions = ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx'];
    let found = false;
    for (const ext of possibleExtensions) {
      if (fs.existsSync(resolvedPath + ext) && !fs.lstatSync(resolvedPath + ext).isDirectory()) {
        found = true;
        break;
      }
      if (fs.existsSync(resolvedPath + ext) && fs.lstatSync(resolvedPath + ext).isDirectory() && fs.existsSync(path.join(resolvedPath + ext, 'index.ts'))) {
        found = true;
        break;
      }
    }

    if (!found) {
      console.log(`  ❌ Missing: ${importPath} (Resolved to: ${resolvedPath})`);
    } else {
      // console.log(`  ✅ Found: ${importPath}`);
    }
  }
});
