@echo off
REM Start script for Byte-App (Windows)
REM This script starts both the log server and Expo in one command

echo.
echo ============================================================
echo 🚀 Starting Byte-App Development Environment
echo ============================================================
echo.

echo 📝 Starting reaction time log server...
start "Log Server" cmd /k "node log-server.js"
echo    ✅ Log server started in new window
echo    📁 Logs will be saved to: reaction_times.txt
echo.

REM Wait a moment for the log server to start
timeout /t 2 /nobreak >nul

echo 📱 Starting Expo development server...
echo.
npx expo start

echo.
echo ============================================================
echo 🛑 Expo stopped. Close the Log Server window manually.
echo ============================================================
echo.
pause

