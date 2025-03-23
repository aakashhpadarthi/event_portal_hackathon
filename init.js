const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m'
};

function log(message, type = 'info') {
  const date = new Date().toLocaleTimeString();
  switch(type) {
    case 'success':
      console.log(`${colors.green}[${date}] ✓ ${message}${colors.reset}`);
      break;
    case 'error':
      console.log(`${colors.red}[${date}] ✗ ${message}${colors.reset}`);
      break;
    default:
      console.log(`${colors.yellow}[${date}] → ${message}${colors.reset}`);
  }
}

async function runCommand(command, cwd = process.cwd()) {
  try {
    log(`Running: ${command}`);
    execSync(command, { 
      cwd, 
      stdio: 'inherit',
      env: { ...process.env, FORCE_COLOR: true }
    });
    return true;
  } catch (error) {
    log(`Failed to run: ${command}`, 'error');
    log(error.message, 'error');
    return false;
  }
}

async function setupProject() {
  try {
    // Create necessary directories
    if (!fs.existsSync('server')) {
      fs.mkdirSync('server');
      log('Created server directory', 'success');
    }

    // Create .env files
    const serverEnv = `PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/eventflow
JWT_SECRET=your_secret_key_here`;

    fs.writeFileSync('server/.env', serverEnv);
    log('Created server/.env file', 'success');

    // Install server dependencies
    log('Installing server dependencies...');
    const serverDeps = [
      'express',
      'mongoose',
      'cors',
      'dotenv',
      'bcryptjs',
      'jsonwebtoken'
    ];
    
    if (!await runCommand(`npm init -y`, 'server')) return;
    if (!await runCommand(`npm install ${serverDeps.join(' ')}`, 'server')) return;
    
    // Install frontend dependencies
    log('Installing frontend dependencies...');
    const frontendDeps = [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      '@heroicons/react',
      'tailwindcss',
      'postcss',
      'autoprefixer'
    ];
    
    if (!await runCommand(`npm install ${frontendDeps.join(' ')}`)) return;
    
    // Initialize database
    log('Initializing database...');
    if (!await runCommand('node scripts/initDb.js', 'server')) return;

    log('Setup completed successfully!', 'success');
    log(`
To start the application:

1. Start MongoDB:
   mongod

2. Start the server:
   cd server && node server.js

3. Start the frontend:
   npm run dev

Admin credentials:
- Email: admin.hackathon@gmail.com
- Password: Admin@123
    `, 'success');

  } catch (error) {
    log('Setup failed:', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

// Run setup
setupProject(); 