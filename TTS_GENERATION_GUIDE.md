# 🎙️ TTS Audio File Generation Guide

This guide will help you generate all the text-to-speech audio files for the emergency procedures.

## 📋 Prerequisites

You need Python 3 installed on your system. Most macOS and Linux systems have it pre-installed.

Check if you have Python:
```bash
python3 --version
```

## 🚀 Quick Start

### Step 1: Install the gTTS library

Open your terminal in the project directory and run:

```bash
pip3 install gtts
```

If that doesn't work, try:
```bash
python3 -m pip install gtts
```

### Step 2: Run the script

```bash
python3 generate_tts.py
```

### Step 3: Verify the files

The script will create the following structure:

```
app/tts/
├── cpr/
│   ├── cpr1.mp3
│   ├── cpr2.mp3
│   ├── cpr3.mp3
│   ├── cpr4.mp3
│   └── cpr5.mp3
├── choke/
│   ├── choke1.mp3
│   ├── choke2.mp3
│   ├── choke3.mp3
│   ├── choke4.mp3
│   └── choke5.mp3
├── bleed/
│   ├── bleed1.mp3
│   ├── bleed2.mp3
│   ├── bleed3.mp3
│   ├── bleed4.mp3
│   ├── bleed5.mp3
│   └── bleed6.mp3
├── break/
│   ├── break1.mp3
│   ├── break2.mp3
│   ├── break3.mp3
│   ├── break4.mp3
│   ├── break5.mp3
│   └── break6.mp3
├── head/
│   ├── head1.mp3
│   ├── head2.mp3
│   ├── head3.mp3
│   ├── head4.mp3
│   ├── head5.mp3
│   └── head6.mp3
└── epipen/
    ├── epipen1.mp3
    ├── epipen2.mp3
    ├── epipen3.mp3
    ├── epipen4.mp3
    ├── epipen5.mp3
    └── epipen6.mp3
```

## ✅ That's it!

Once the files are generated, your app will automatically use them for text-to-speech when users navigate through the procedures.

## 🔧 Troubleshooting

### Issue: "pip3: command not found"
Try using `pip` instead:
```bash
pip install gtts
python generate_tts.py
```

### Issue: "Permission denied"
Try running with sudo (on macOS/Linux):
```bash
sudo pip3 install gtts
```

### Issue: gTTS requires internet connection
The gTTS library uses Google's TTS API, which requires an internet connection to generate the audio files. Make sure you're connected to the internet when running the script.

### Issue: Audio files sound robotic
This is normal for free TTS services. If you want higher quality voices, you can:
1. Use a paid TTS service (Amazon Polly, Google Cloud TTS, etc.)
2. Record the audio yourself
3. Hire a voice actor

## 📝 Notes

- The script will overwrite existing files if you run it multiple times
- The generated MP3 files will be around 20-50 KB each
- Total size for all audio files: approximately 1-2 MB
- The voice is a standard English female voice from Google TTS

