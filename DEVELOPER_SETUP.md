# 🚀 Developer Setup Guide - Byte-App

This guide will help new developers get the Byte-App project running on their local machine.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v18 or higher)
   - Check: `node --version`
   - Download: https://nodejs.org/

2. **npm** or **yarn** (comes with Node.js)
   - Check: `npm --version`

3. **Expo CLI** (optional, but recommended)
   - Install: `npm install -g expo-cli`

4. **Expo Go App** (for testing on physical device)
   - iOS: Download from App Store
   - Android: Download from Google Play Store

5. **Python 3** (only needed if regenerating TTS audio files)
   - Check: `python3 --version`
   - Most macOS/Linux systems have this pre-installed

---

## 🔧 Initial Setup

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd Byte_Force
```

### Step 2: Install Node.js dependencies

```bash
npm install
```

This will install all the required packages including:
- `expo-av` (for audio playback)
- `expo-router` (for navigation)
- `@react-navigation/native` (for navigation hooks)
- And all other dependencies listed in `package.json`

### Step 3: Start the development server

```bash
npx expo start
```

Or if you have Expo CLI installed globally:

```bash
expo start
```

### Step 4: Run the app

Once the server starts, you'll see a QR code. You can:

- **On iOS**: Scan the QR code with your Camera app
- **On Android**: Scan the QR code with the Expo Go app
- **On iOS Simulator**: Press `i` in the terminal
- **On Android Emulator**: Press `a` in the terminal
- **On Web**: Press `w` in the terminal

---

## 🎙️ TTS Audio Files (Optional)

The TTS audio files are already included in the repository under `app/tts/`. You **do not** need to regenerate them unless you're updating the procedure text.

### If you need to regenerate TTS audio files:

1. **Install Python dependencies:**

```bash
pip3 install gtts
```

2. **Run the TTS generation script:**

```bash
python3 generate_tts.py
```

This will regenerate all audio files in `app/tts/`.

---

## 📁 Project Structure

```
Byte_Force/
├── app/                      # Main application code
│   ├── (tabs)/              # Tab navigation screens
│   │   ├── index.tsx        # Home/Dashboard screen
│   │   ├── bookmark.tsx     # Bookmarks screen
│   │   └── setting.tsx      # Settings screen
│   ├── procedures/          # Emergency procedure screens
│   │   ├── cpr.tsx
│   │   ├── choke.tsx
│   │   ├── bleed.tsx
│   │   ├── break.tsx
│   │   ├── head.tsx
│   │   └── epipen.tsx
│   ├── images/              # Image assets
│   ├── tts/                 # Text-to-speech audio files
│   └── contexts/            # React contexts (BookmarkContext)
├── generate_tts.py          # Script to generate TTS audio files
├── package.json             # Node.js dependencies
└── README.md                # Project overview
```

---

## 🔑 Key Features

- **Emergency Procedures**: Step-by-step guides for CPR, Choking, Bleeding, Broken Bones, Head Injuries, and EpiPen usage
- **Text-to-Speech**: Automatic audio playback for each procedure step (enabled by default)
- **Bookmarks**: Save progress on procedures
- **Offline-First**: All data is hardcoded (no backend required)

---

## 🐛 Troubleshooting

### Issue: "Module not found" errors

**Solution:** Make sure you've run `npm install`

```bash
npm install
```

### Issue: Expo server won't start

**Solution:** Clear the cache and restart

```bash
npx expo start -c
```

### Issue: Audio not playing

**Solution:** 
1. Make sure TTS is enabled in Settings (it's on by default)
2. Check that audio files exist in `app/tts/`
3. On iOS, make sure your device is not in silent mode (audio should still play, but check volume)

### Issue: "Port 8081 already in use"

**Solution:** Kill the existing process or use a different port

```bash
# Kill existing process
lsof -ti:8081 | xargs kill -9

# Or use a different port
npx expo start --port 8082
```

---

## 📝 Development Notes

- **TTS is enabled by default** - Users can toggle it off in Settings
- **All data is hardcoded** - This is a prototype with no backend
- **Audio files are committed to the repo** - No need to regenerate unless updating text
- **Target platform**: Android (cross-platform support planned for later)

---

## 🤝 Need Help?

If you run into any issues not covered here, reach out to the team or check the main README.md file.

Happy coding! 🎉

