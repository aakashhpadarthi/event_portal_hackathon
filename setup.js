const { spawn } = require('child_process');
const mongoose = require('mongoose');
const path = require('path');

// Configuration
const config = {
  mongodb: {
    url: 'mongodb://localhost:27017/eventflow'
  },
  server: {
    port: 5000
  },
  frontend: {
    port: 5173
  }
};

// Initialize MongoDB and seed data
async function initializeDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(config.mongodb.url);
    
    // Import models
    const Event = require('./server/models/Event');
    const User = require('./server/models/User');
    
    // Clear existing data
    await Event.deleteMany({});
    console.log('✨ Cleared existing events');
    
    // Create admin user
    await User.findOneAndUpdate(
      { email: 'admin.hackathon@gmail.com' },
      {
        email: 'admin.hackathon@gmail.com',
        password: 'Admin@123',
        role: 'admin'
      },
      { upsert: true }
    );
    console.log('👤 Admin user created/updated');

    // Insert events
    const events = [
      {
        title: 'Summer Music Festival',
        date: 'July 15, 2024',
        location: 'Central Park, NY',
        price: 99,
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
        category: 'Music',
        description: 'Experience the ultimate summer music festival',
        features: ['Live performances', 'Food vendors', 'Camping'],
        availableTickets: 5000
      },
      // Add all 15 events here...
    ];

    await Event.insertMany(events);
    console.log(`📅 Inserted ${events.length} events`);

    // Verify data
    const eventCount = await Event.countDocuments();
    const adminUser = await User.findOne({ email: 'admin.hackathon@gmail.com' });
    
    console.log(`
      ✅ Database Initialization Complete:
      - Events: ${eventCount}
      - Admin user: ${adminUser ? 'Created' : 'Failed'}
    `);

    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return false;
  }
}

// Start MongoDB
function startMongoDB() {
  return new Promise((resolve, reject) => {
    const mongod = spawn('mongod', [], { stdio: 'inherit' });
    
    mongod.on('error', (error) => {
      console.error('❌ Failed to start MongoDB:', error);
      reject(error);
    });

    // Give MongoDB time to start
    setTimeout(() => {
      console.log('📦 MongoDB started');
      resolve(mongod);
    }, 2000);
  });
}

// Start Backend Server
function startBackend() {
  return new Promise((resolve, reject) => {
    const server = spawn('node', ['server/server.js'], { 
      stdio: 'inherit',
      env: { ...process.env, PORT: config.server.port }
    });

    server.on('error', (error) => {
      console.error('❌ Failed to start backend:', error);
      reject(error);
    });

    // Give server time to start
    setTimeout(() => {
      console.log('🚀 Backend server started');
      resolve(server);
    }, 2000);
  });
}

// Start Frontend
function startFrontend() {
  return new Promise((resolve, reject) => {
    const frontend = spawn('npm', ['run', 'dev'], { 
      stdio: 'inherit',
      env: { ...process.env, PORT: config.frontend.port }
    });

    frontend.on('error', (error) => {
      console.error('❌ Failed to start frontend:', error);
      reject(error);
    });

    console.log('🌐 Frontend development server started');
    resolve(frontend);
  });
}

// Main setup function
async function setup() {
  try {
    console.log('🚀 Starting setup...');

    // Start MongoDB
    const mongod = await startMongoDB();

    // Initialize database
    const dbInitialized = await initializeDatabase();
    if (!dbInitialized) {
      throw new Error('Database initialization failed');
    }

    // Start backend server
    const backend = await startBackend();

    // Start frontend
    const frontend = await startFrontend();

    console.log(`
      ✅ Setup Complete!
      
      Services running:
      - MongoDB: mongodb://localhost:27017/eventflow
      - Backend: http://localhost:${config.server.port}
      - Frontend: http://localhost:${config.frontend.port}

      Admin credentials:
      - Email: admin.hackathon@gmail.com
      - Password: Admin@123

      Press Ctrl+C to stop all services
    `);

    // Handle cleanup on exit
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down...');
      mongod.kill();
      backend.kill();
      frontend.kill();
      await mongoose.disconnect();
      process.exit();
    });

  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run setup
setup(); 