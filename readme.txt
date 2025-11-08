Byte-App: Emergency Procedures Dashboard - Setup Guide

This file provides instructions for setting up and running the Byte-App on a School of Computing Linux machine. The project uses React Native/Expo and is managed via a Makefile.

=======================================================
1. PREREQUISITES
=======================================================
You must have Node.js (v18+) and npm installed.

A. CHECK AND INSTALL NODE.JS & NPM:
Check current versions:
$ node -v
$ npm -v

If Node.js or npm are missing, use the following commands to install them:
$ sudo apt update
$ sudo apt install nodejs npm

B. MOBILE PREVIEW:
To view on a mobile device, download the **Expo Go App** (from the App Store or Play Store).

=======================================================
2. SETUP AND INSTALLATION
=======================================================
Use the 'git' and 'make' utilities for setup.

A. CLONE THE REPOSITORY:
$ git clone https://github.com/<your-username>/byte-app.git
$ cd byte-app

B. INSTALL DEPENDENCIES:
This uses the Makefile to run 'npm install'.
$ make install

=======================================================
3. RUNNING THE APPLICATION
=======================================================
Use 'make run' to start the development server.

A. START THE SERVER (Metro Bundler):
$ make run

The terminal will display a QR code and a local URL.

B. VIEW THE INTERFACE:

- ON MOBILE: Open the Expo Go app on your phone and **scan the QR code** displayed in the terminal.
- IN BROWSER: Run the following command, then open the displayed local URL (e.g., http://localhost:19006):
  $ make web

=======================================================
4. MAKEFILE COMMANDS (For Reference)
=======================================================
The following commands are defined in the Makefile:

- make install : Installs project dependencies (npm install)
- make run     : Starts the development server (npx expo start)
- make web     : Starts the server and opens in a web browser (npx expo start --web)
- make clean   : Deletes the node_modules folder (rm -rf node_modules)

=======================================================
5. TROUBLESHOOTING
=======================================================
- If 'make run' fails, try the underlying command directly: 'npx expo start'.
- If the port is in use, try running: 'npx expo start --port 19007' (using a different port number).
- If you encounter 'Permission denied', try running the relevant command with 'sudo' or move the repository to a writable directory.