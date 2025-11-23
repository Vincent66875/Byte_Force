# 🚀 Quick Start Guide

This guide shows you the **easiest way** to start the Byte-App development environment.

## ⚡ Super Simple Method (Recommended)

Just run **ONE command** and everything starts automatically!

### For Mac/Linux:

```bash
npm run dev
```

### For Windows:

```bash
npm run dev
```

**That's it!** This single command will:
- ✅ Start the reaction time log server
- ✅ Start the Expo development server
- ✅ Both run in the same terminal window

### To Stop:

Press `Ctrl+C` once to stop both servers.

---

## 🎯 What You'll See

When you run `npm run dev`, you'll see:

```
[0] ============================================================
[0] 📝 Reaction Time Log Server Running
[0] ============================================================
[0] Server: http://localhost:3001
[0] Log file: /Users/you/Byte_Force/reaction_times.txt
[0] 
[0] Waiting for reaction time logs from the app...
[1] 
[1] Starting Metro Bundler...
[1] ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
[1] █ ▄▄▄▄▄ █▀▀ ██▄█ ▄█ ▄▄▄▄▄ █
[1] ...
```

The `[0]` lines are from the log server, and `[1]` lines are from Expo.

---

## 📱 Next Steps

After running `npm run dev`:

1. **Scan the QR code** with Expo Go app (on your phone)
   - OR -
2. **Press `i`** to open iOS simulator
   - OR -
3. **Press `a`** to open Android emulator

---

## 🔧 Alternative Methods

If you prefer more control, you can use these alternative methods:

### Method 2: Shell Script (Mac/Linux)

```bash
./start.sh
```

This runs both servers in the same terminal with nice formatting.

### Method 3: Batch File (Windows)

```bash
start.bat
```

This opens the log server in a separate window and runs Expo in the current window.

### Method 4: Manual (Two Terminals)

**Terminal 1:**
```bash
node log-server.js
```

**Terminal 2:**
```bash
npx expo start
```

---

## ❓ Troubleshooting

### "npm run dev" doesn't work

**Solution**: Make sure you've run `npm install` first:
```bash
npm install
npm run dev
```

### Permission denied on Mac/Linux

**Solution**: Make the shell script executable:
```bash
chmod +x start.sh
./start.sh
```

### Port already in use

**Solution**: 
1. Stop any running instances with `Ctrl+C`
2. If that doesn't work, find and kill the process:
   ```bash
   # Mac/Linux
   lsof -ti:3001 | xargs kill
   lsof -ti:8081 | xargs kill
   
   # Windows
   netstat -ano | findstr :3001
   taskkill /PID <PID> /F
   ```

### Can't see reaction_times.txt

**Solution**: 
- The file is created when you complete your first test
- Make sure you:
  1. Tap "Start Test" in the app
  2. Select a procedure
  3. Check the project root directory

---

## 📝 For Your Team

**Tell your team members:**

> "Just run `npm run dev` and everything will start automatically. Press Ctrl+C to stop."

That's all they need to know! 🎉

---

## 🔗 More Information

- **Full setup guide**: See `DEVELOPER_SETUP.md`
- **Reaction time testing**: See `REACTION_TIME_TESTING.md`
- **Project structure**: See `README.md` (if exists)

