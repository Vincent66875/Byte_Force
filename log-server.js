/**
 * Simple HTTP server to receive reaction time logs from the Expo app
 * and write them to reaction_times.txt in the project directory
 * 
 * Usage: node log-server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const LOG_FILE = path.join(__dirname, 'reaction_times.txt');

const server = http.createServer((req, res) => {
  // Enable CORS for Expo app
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle POST requests to /log
  if (req.method === 'POST' && req.url === '/log') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { testNumber, procedureName, reactionTime, timestamp } = data;
        
        // Format: Test #, Procedure Name, Time (seconds), Timestamp
        const logEntry = `Test ${testNumber}, ${procedureName}, ${reactionTime}s, ${timestamp}\n`;
        
        // Append to file
        fs.appendFileSync(LOG_FILE, logEntry);
        
        console.log(`✅ Logged: ${logEntry.trim()}`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Logged successfully' }));
      } catch (error) {
        console.error('❌ Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📝 Reaction Time Log Server Running`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`Log file: ${LOG_FILE}`);
  console.log(`\nWaiting for reaction time logs from the app...`);
  console.log(`Press Ctrl+C to stop\n`);
});

