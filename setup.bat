@echo off
echo Starting EventFlow Setup...

:: Step 1: Create necessary directories and files
echo Creating directories and files...
if not exist "server" mkdir server
if not exist "server\models" mkdir server\models
if not exist "server\scripts" mkdir server\scripts

:: Step 2: Create .env file
echo Creating .env file...
echo PORT=5000 > server\.env
echo MONGODB_URI=mongodb://127.0.0.1:27017/eventflow >> server\.env
echo JWT_SECRET=your_secret_key_here >> server\.env

:: Step 3: Install server dependencies
echo Installing server dependencies...
cd server
call npm init -y
call npm install express mongoose cors dotenv bcryptjs

:: Step 4: Create MongoDB data directory
echo Creating MongoDB data directory...
if not exist "C:\data\db" mkdir "C:\data\db"

:: Step 5: Start MongoDB
echo Starting MongoDB...
start "MongoDB" "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="C:\data\db"

:: Wait for MongoDB to start
timeout /t 5

:: Step 6: Initialize database
echo Initializing database...
node scripts\initDb.js

:: Step 7: Start server
echo Starting server...
start "Server" node server.js

echo Setup complete! The database is ready to use.
pause 