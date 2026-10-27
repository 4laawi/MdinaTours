const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const srcDir = path.join(rootDir, 'src');

function getFiles(dir, exts) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, exts));
    } else if (exts.some(ext => file.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

const sourceFiles = getFiles(srcDir, ['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.css']);

// Match any path beginning with / that looks like an image or media asset
const imgRegex = /['"`](\/(?:[a-zA-Z0-9_\-./%]+\.(?:webp|jpg|jpeg|png|svg|avif|gif|mp4))|(?:img|img2|img3|images|assets|cars|FIGURES|a-mdiinatours|b-roll)\/[a-zA-Z0-9_\-./%]+)['"`]/g;

const missing = new Map();
let totalFound = 0;

for (const file of sourceFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    let imgPath = match[1];
    if (!imgPath.startsWith('/')) {
      imgPath = '/' + imgPath;
    }
    
    // Ignore dynamic syntax
    if (imgPath.includes('${') || imgPath.includes('http')) continue;

    // Decode URI encoding like %20 if present
    const decodedPath = decodeURIComponent(imgPath);

    totalFound++;
    const relFile = path.relative(rootDir, file);

    const existsRaw = fs.existsSync(path.join(publicDir, imgPath));
    const existsDecoded = fs.existsSync(path.join(publicDir, decodedPath));

    if (!existsRaw && !existsDecoded) {
      if (!missing.has(imgPath)) {
        missing.set(imgPath, new Set([relFile]));
      } else {
        missing.get(imgPath).add(relFile);
      }
    }
  }
}

console.log('--- STATIC SCAN ---');
console.log('Checked source files:', sourceFiles.length);
console.log('Total asset references:', totalFound);
console.log('Missing images count:', missing.size);

for (const [img, files] of missing.entries()) {
  console.log(`\nMISSING: ${img}`);
  for (const f of files) {
    console.log(`  in: ${f}`);
  }
}
