const fs = require('fs');
const path = require('path');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function getRelativePath(from, to) {
  let relativePath = path.relative(path.dirname(from), to);
  // Remove .js or .jsx extension
  relativePath = relativePath.replace(/\.(js|jsx)$/, '');
  // Ensure it starts with ./ or ../
  if (!relativePath.startsWith('.')) {
    relativePath = './' + relativePath;
  }
  return relativePath;
}

function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const srcDir = path.join(__dirname, 'src');
  let modified = false;
  
  // Fix patterns like: from "lib/utils" or from "components/ui/button"
  // These are missing the relative path prefix
  
  const importRegex = /from ["'](?!\.|\/)([^"']+)["']/g;
  
  content = content.replace(importRegex, (match, importPath) => {
    // Skip node_modules and special imports
    if (importPath.startsWith('react') || 
        importPath.startsWith('next') || 
        importPath.startsWith('lucide-react') ||
        importPath.startsWith('sonner') ||
        importPath.startsWith('@radix-ui') ||
        importPath.startsWith('class-variance-authority') ||
        importPath.startsWith('zustand') ||
        importPath.startsWith('axios') ||
        importPath.startsWith('@hookform') ||
        importPath.startsWith('react-hook-form') ||
        importPath.startsWith('zod')) {
      return match;
    }
    
    // This is a local import that needs fixing
    const targetPath = path.join(srcDir, importPath);
    
    // Check if the file exists with .js or .jsx extension
    let actualPath = targetPath;
    if (!fs.existsSync(targetPath)) {
      if (fs.existsSync(targetPath + '.js')) {
        actualPath = targetPath + '.js';
      } else if (fs.existsSync(targetPath + '.jsx')) {
        actualPath = targetPath + '.jsx';
      }
    }
    
    if (fs.existsSync(actualPath)) {
      const relativePath = getRelativePath(filePath, actualPath);
      modified = true;
      return `from "${relativePath}"`;
    }
    
    return match;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${path.relative(__dirname, filePath)}`);
  }
}

const srcDir = path.join(__dirname, 'src');
const files = getAllFiles(srcDir);
files.forEach(fixImports);
console.log(`\nProcessed ${files.length} files`);
