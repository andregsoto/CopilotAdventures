#!/usr/bin/env node

/**
 * Echo Chamber Web Server
 * 
 * Provides a REST API and web interface for the Echo Chamber application
 * Uses Node.js built-in http module (no external dependencies)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Import the EchoChamber class
const EchoChamber = require('./index.js');

// ============================================================================
// Configuration
// ============================================================================

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Create a global Echo Chamber instance
const chamber = new EchoChamber();

// ============================================================================
// MIME Types
// ============================================================================

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Parse JSON from request body
 */
function parseJsonBody(req, callback) {
  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  });
}

/**
 * Send JSON response
 */
function sendJsonResponse(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data, null, 2));
}

/**
 * Get MIME type for file
 */
function getMimeType(filePath) {
  const ext = path.extname(filePath);
  return MIME_TYPES[ext] || 'text/plain';
}

/**
 * Serve static file
 */
function serveStaticFile(res, filePath) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - File Not Found');
      return;
    }
    
    const mimeType = getMimeType(filePath);
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(content);
  });
}

// ============================================================================
// API Route Handlers
// ============================================================================

/**
 * GET /api/health - Health check
 */
function handleHealth(res) {
  sendJsonResponse(res, 200, {
    status: 'ok',
    application: 'Echo Chamber',
    version: '2.0.0'
  });
}

/**
 * POST /api/predict - Predict next number
 */
function handlePredict(req, res) {
  parseJsonBody(req, (error, data) => {
    if (error) {
      sendJsonResponse(res, 400, {
        success: false,
        error: 'Invalid JSON in request body'
      });
      return;
    }
    
    const { sequence } = data;
    
    if (!Array.isArray(sequence)) {
      sendJsonResponse(res, 400, {
        success: false,
        error: 'Sequence must be an array'
      });
      return;
    }
    
    const result = chamber.predictNextNumber(sequence);
    sendJsonResponse(res, result.success ? 200 : 400, result);
  });
}

/**
 * GET /api/memories - Get all stored memories
 */
function handleMemories(res) {
  const memories = chamber.getMemories();
  sendJsonResponse(res, 200, {
    success: true,
    count: memories.length,
    memories: memories
  });
}

/**
 * DELETE /api/memories - Clear all memories
 */
function handleClearMemories(res) {
  chamber.clearMemories();
  sendJsonResponse(res, 200, {
    success: true,
    message: 'All memories cleared'
  });
}

/**
 * GET /api/statistics - Get statistics
 */
function handleStatistics(res) {
  const stats = chamber.getStatistics();
  sendJsonResponse(res, 200, {
    success: true,
    statistics: stats
  });
}

/**
 * POST /api/validate - Validate a sequence
 */
function handleValidate(req, res) {
  parseJsonBody(req, (error, data) => {
    if (error) {
      sendJsonResponse(res, 400, {
        success: false,
        error: 'Invalid JSON in request body'
      });
      return;
    }
    
    const { sequence } = data;
    
    if (!Array.isArray(sequence)) {
      sendJsonResponse(res, 400, {
        success: false,
        error: 'Sequence must be an array'
      });
      return;
    }
    
    const validation = chamber.validateArithmeticProgression(sequence);
    sendJsonResponse(res, validation.isValid ? 200 : 400, validation);
  });
}

/**
 * GET /api/samples - Get sample sequences
 */
function handleSamples(res) {
  const samples = [
    {
      name: 'The Primary Sequence',
      sequence: [3, 6, 9, 12],
      expected: 15,
      difference: 3
    },
    {
      name: 'The Fibonacci-like Arithmetic',
      sequence: [2, 4, 6, 8, 10],
      expected: 12,
      difference: 2
    },
    {
      name: 'The Decreasing Echo',
      sequence: [20, 15, 10, 5],
      expected: 0,
      difference: -5
    },
    {
      name: 'The Single Step',
      sequence: [1, 2],
      expected: 3,
      difference: 1
    },
    {
      name: 'The Negative Journey',
      sequence: [-5, -3, -1, 1],
      expected: 3,
      difference: 2
    },
    {
      name: 'The Invalid Echo',
      sequence: [1, 2, 4, 7],
      expected: null,
      difference: null
    }
  ];
  
  sendJsonResponse(res, 200, {
    success: true,
    count: samples.length,
    samples: samples
  });
}

// ============================================================================
// Main Server Handler
// ============================================================================

/**
 * Main request handler
 */
function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // =========================================================================
  // API Routes
  // =========================================================================
  
  if (pathname === '/api/health' && req.method === 'GET') {
    handleHealth(res);
  } else if (pathname === '/api/predict' && req.method === 'POST') {
    handlePredict(req, res);
  } else if (pathname === '/api/validate' && req.method === 'POST') {
    handleValidate(req, res);
  } else if (pathname === '/api/memories' && req.method === 'GET') {
    handleMemories(res);
  } else if (pathname === '/api/memories' && req.method === 'DELETE') {
    handleClearMemories(res);
  } else if (pathname === '/api/statistics' && req.method === 'GET') {
    handleStatistics(res);
  } else if (pathname === '/api/samples' && req.method === 'GET') {
    handleSamples(res);
  }
  
  // =========================================================================
  // Static Files
  // =========================================================================
  
  else if (req.method === 'GET') {
    // Serve index.html for root path
    if (pathname === '/') {
      const filePath = path.join(PUBLIC_DIR, 'index.html');
      serveStaticFile(res, filePath);
    } else {
      // Serve static files from public directory
      const filePath = path.join(PUBLIC_DIR, pathname);
      
      // Security check: prevent directory traversal
      if (!filePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 - Forbidden');
        return;
      }
      
      // Check if file exists
      fs.exists(filePath, (exists) => {
        if (exists) {
          serveStaticFile(res, filePath);
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 - File Not Found');
        }
      });
    }
  }
  
  // =========================================================================
  // 404 - Not Found
  // =========================================================================
  
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Not Found');
  }
}

// ============================================================================
// Server Initialization
// ============================================================================

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log('\n' + '='.repeat(70));
  console.log('✨ ECHO CHAMBER WEB SERVER STARTED ✨'.padStart(70));
  console.log('='.repeat(70));
  console.log(`\n🌐 Server running at: http://localhost:${PORT}`);
  console.log(`📍 Open in your browser: http://localhost:${PORT}`);
  console.log('\n📚 API Documentation:');
  console.log('  GET  /api/health        - Health check');
  console.log('  POST /api/predict       - Predict next number');
  console.log('  POST /api/validate      - Validate sequence');
  console.log('  GET  /api/memories      - Get all memories');
  console.log('  DELETE /api/memories    - Clear all memories');
  console.log('  GET  /api/statistics    - Get statistics');
  console.log('  GET  /api/samples       - Get sample sequences');
  console.log('\n⏹️  Press Ctrl+C to stop the server\n');
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\n❌ Error: Port ${PORT} is already in use`);
    console.error(`   Try: PORT=3001 node server.js`);
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n\n⏹️  Shutting down server gracefully...');
  server.close(() => {
    console.log('✅ Server stopped');
    process.exit(0);
  });
});
