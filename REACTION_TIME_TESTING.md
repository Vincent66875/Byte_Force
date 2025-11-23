# Reaction Time Testing Guide

This guide explains how to use the reaction time testing feature to measure how quickly users can find and navigate to emergency procedures.

## 🎯 Purpose

The reaction time feature measures the time it takes for a user to:
1. Start the test
2. Navigate to a specific procedure

This data helps identify which procedures are easy/hard to find and can inform UX improvements.

## 🚀 How to Use

### Step 1: Start the Log Server

Before testing, start the log server that will write results to a file:

```bash
node log-server.js
```

You should see:
```
============================================================
📝 Reaction Time Log Server Running
============================================================
Server: http://localhost:3001
Log file: /Users/steve/Desktop/3600/Byte_Force/reaction_times.txt

Waiting for reaction time logs from the app...
```

**Keep this terminal window open** while testing.

### Step 2: Run the App

In a separate terminal, start the Expo app:

```bash
npx expo start
```

Then open the app on your device or simulator.

### Step 3: Conduct Tests

1. **Start Test**: Tap the "Start Test" button in the top-left of the home screen
   - The button will turn green
   - A green banner will appear: "Timer Active - Select a procedure"
   
2. **Select Procedure**: Tap on any procedure card (CPR, Choking, etc.)
   - The timer stops automatically
   - Results are logged to console AND saved to file

3. **Repeat**: Go back to home screen and repeat for different procedures

## 📊 Results

### Console Output

Each test logs to the console:
```
============================================================
✅ REACTION TIME LOGGED
============================================================
Test 1, CPR, 2.34s, 2025-11-23T10:30:45.123Z
============================================================

💾 Saved to reaction_times.txt in project directory
```

### File Output

Results are automatically saved to `reaction_times.txt` in your project directory:

```
Test 1, CPR, 2.34s, 2025-11-23T10:30:45.123Z
Test 2, Choking, 3.12s, 2025-11-23T10:31:15.456Z
Test 3, Severe Bleeding, 1.89s, 2025-11-23T10:32:00.789Z
```

**Format**: `Test #, Procedure Name, Time (seconds), Timestamp`

This format is CSV-compatible and can be easily imported into Excel or Google Sheets.

## 📈 Analyzing Results

### Import to Spreadsheet

1. Open Excel or Google Sheets
2. Import `reaction_times.txt` as CSV
3. Use comma as delimiter
4. Analyze average times, identify outliers, etc.

### Example Analysis

- **Average time per procedure**: Which procedures are found fastest/slowest?
- **Consistency**: Are times consistent or highly variable?
- **Trends**: Do times improve with repeated tests (learning effect)?

## 🛠️ Technical Details

### Components

1. **ReactionTimerContext** (`contexts/ReactionTimerContext.tsx`)
   - Manages timer state
   - Tracks start/stop times
   - Sends data to log server

2. **Log Server** (`log-server.js`)
   - Simple HTTP server on port 3001
   - Receives POST requests from app
   - Writes to `reaction_times.txt`

3. **UI Components**
   - "Start Test" button on home screen
   - Green banner when timer is active
   - Auto-stop when procedure loads

### Data Flow

```
User taps "Start Test" 
  → Timer starts
  → User selects procedure
  → Timer stops
  → Calculate reaction time
  → Log to console
  → POST to http://localhost:3001/log
  → Server writes to reaction_times.txt
```

## ⚠️ Troubleshooting

### "Could not connect to log server"

**Problem**: App can't reach the log server

**Solution**: 
- Make sure `node log-server.js` is running
- Check that port 3001 is not blocked
- If using a physical device, update the URL in `ReactionTimerContext.tsx` to use your computer's IP address instead of `localhost`

### File not being created

**Problem**: `reaction_times.txt` doesn't exist

**Solution**:
- Make sure the log server is running
- Check the log server terminal for error messages
- Verify write permissions in the project directory

### Timer not stopping

**Problem**: Timer stays active after selecting procedure

**Solution**:
- Check console for errors
- Verify all procedure files have the `stopTimer()` call
- Reload the app

## 🔄 Resetting Tests

To start fresh:

1. Stop the log server (Ctrl+C)
2. Delete or rename `reaction_times.txt`
3. Restart the log server
4. Test numbers will start from 1 again

## 📝 Notes

- Test numbers auto-increment with each test
- Timer only runs when explicitly started with "Start Test" button
- Each procedure can be tested multiple times
- Data persists across app reloads (stored in file)
- Console logs are always shown, even if file writing fails

