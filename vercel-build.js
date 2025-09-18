import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting Vercel build process...');

try {
  // Build the frontend React app
  console.log('Building frontend React app...');
  execSync('cd frontend/launch-lab && npm install && npm run build', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  // Install backend dependencies
  console.log('Installing backend dependencies...');
  execSync('cd backend && npm install', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  // Copy the built frontend to the public directory for Next.js
  console.log('Setting up static files...');
  const frontendBuildPath = path.join(__dirname, 'frontend', 'launch-lab', 'build');
  const publicPath = path.join(__dirname, 'public');
  
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath);
  }
  
  // Copy build contents to public directory
  if (fs.existsSync(frontendBuildPath)) {
    const buildContents = fs.readdirSync(frontendBuildPath);
    buildContents.forEach(file => {
      const srcPath = path.join(frontendBuildPath, file);
      const destPath = path.join(publicPath, file);
      
      if (fs.statSync(srcPath).isDirectory()) {
        copyDirSync(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  }
  
  console.log('Vercel build completed successfully!');
  
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
