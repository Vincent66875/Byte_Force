#!/bin/bash

# Start script for Byte-App
# This script starts both the log server and Expo in one command

echo ""
echo "============================================================"
echo "🚀 Starting Byte-App Development Environment"
echo "============================================================"
echo ""

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo "============================================================"
    echo "🛑 Shutting down..."
    echo "============================================================"
    echo ""
    echo "Stopping log server..."
    kill $LOG_SERVER_PID 2>/dev/null
    echo "Stopping Expo..."
    kill $EXPO_PID 2>/dev/null
    echo ""
    echo "✅ All processes stopped. Goodbye!"
    echo ""
    exit 0
}

# Set up trap to catch Ctrl+C and cleanup
trap cleanup SIGINT SIGTERM

# Start the log server in the background
echo "📝 Starting reaction time log server..."
node log-server.js &
LOG_SERVER_PID=$!
echo "   ✅ Log server started (PID: $LOG_SERVER_PID)"
echo "   📁 Logs will be saved to: reaction_times.txt"
echo ""

# Wait a moment for the log server to start
sleep 2

# Start Expo
echo "📱 Starting Expo development server..."
echo ""
npx expo start &
EXPO_PID=$!

# Wait for both processes
wait

