Byte-App: Emergency Procedures Dashboard - Setup Guide

This file provides instructions for setting up and running the Byte-App on a School of Computing Linux machine. The project uses React Native/Expo and is managed via a Makefile.
This guide explains how to set up and run the Byte-App on a School of Computing Linux machine. We use Node Version Manager (nvm) to create an isolated, user-level environment (similar to a venv) since root/sudo access is not available.

=======================================================
1. ENVIRONMENT SETUP (Isolated Node Runtime)
=======================================================
The project requires Node.js v18+. We use nvm to install and manage this version in your home directory, avoiding system-wide installation errors.

A. INSTALL NVM:
If you do not have 'nvm', install it using the following script:
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

B. ACTIVATE NVM MANUALLY (If automatic loading fails):
If 'source ~/.bashrc' or 'source ~/.profile' returns an error, run these two commands exactly as they are shown below:

$ export NVM_DIR="$HOME/.nvm"
$ [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

C. ACTIVATE PROJECT NODE VERSION:
This command installs and uses the required Node v18:
$ nvm install 18
$ nvm use 18

D. VERIFY INSTALLATION:
Confirm Node and npm are available:
$ node -v  
$ npm -v

E. MOBILE PREVIEW:
To view on a mobile device, download the **Expo Go App**.

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