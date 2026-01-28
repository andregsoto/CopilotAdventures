/**
 * Echo Chamber v3.0 - Enhanced Web Server
 * Includes:
 * - RESTful API with multi-pattern support
 * - Static file serving
 * - CORS support
 * - Logging and monitoring
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { EchoChamber, Logger } = require('./echo-chamber-v3');

// ============================================================================
// Server Configuration
// ============================================================================

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const CORS_ORIGINS = ['*'];

// Initialize Echo Chamber instance
const chamber = new EchoChamber();
const serverLogger = new Logger('info');

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Parse JSON body from request
 */
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
      if (data.length > 1e6) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

/**
 * Send JSON response
 */
function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data, null, 2));
}

/**
 * Send HTML response
 */
function sendHtml(res, content) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(content);
}

/**
 * Send static file response
 */
function sendFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      sendJson(res, 404, { error: 'File not found' });
      return;
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(content);
  });
}

/**
 * Sanitize file path to prevent directory traversal
 */
function sanitizePath(filePath) {
  const normalizedPath = path.normalize(filePath);
  const basePath = path.normalize(__dirname);
  if (!normalizedPath.startsWith(basePath)) {
    throw new Error('Invalid path');
  }
  return normalizedPath;
}

// ============================================================================
// API Route Handlers
// ============================================================================

/**
 * Health check endpoint
 */
function handleHealth(res) {
  sendJson(res, 200, {
    status: 'ok',
    application: 'Echo Chamber',
    version: '3.0.0',
    timestamp: new Date().toISOString()
  });
}

/**
 * Predict endpoint - detects pattern and predicts next numbers
 */
async function handlePredict(req, res) {
  try {
    const body = await parseJsonBody(req);
    const { sequence, predictCount } = body;

    if (!Array.isArray(sequence) || sequence.length === 0) {
      return sendJson(res, 400, {
        error: 'Invalid sequence. Must be a non-empty array of numbers.'
      });
    }

    const count = Math.min(predictCount || 1, 10); // Limit to 10 predictions
    const result = chamber.predictNextNumber(sequence, count);

    sendJson(res, 200, result);
  } catch (error) {
    sendJson(res, 400, { error: error.message });
  }
}

/**
 * Validate endpoint - analyzes pattern without storing
 */
async function handleValidate(req, res) {
  try {
    const body = await parseJsonBody(req);
    const { sequence } = body;

    if (!Array.isArray(sequence) || sequence.length === 0) {
      return sendJson(res, 400, {
        error: 'Invalid sequence'
      });
    }

    const analysis = chamber.detectPatternType(sequence);

    sendJson(res, 200, {
      sequence: sequence,
      analysis: analysis
    });
  } catch (error) {
    sendJson(res, 400, { error: error.message });
  }
}

/**
 * Memories endpoint - retrieve stored analyses
 */
function handleMemories(req, res) {
  const memories = chamber.getMemories();
  const limit = 50; // Return last 50 memories
  const recentMemories = memories.slice(-limit);

  sendJson(res, 200, {
    total: memories.length,
    returned: recentMemories.length,
    memories: recentMemories
  });
}

/**
 * Statistics endpoint - comprehensive analysis stats
 */
function handleStatistics(req, res) {
  const stats = chamber.getStatistics();

  sendJson(res, 200, {
    statistics: stats,
    generatedAt: new Date().toISOString()
  });
}

/**
 * Samples endpoint - predefined test samples
 */
function handleSamples(req, res) {
  const samples = [
    {
      name: 'Arithmetic: Simple Increment',
      sequence: [2, 4, 6, 8, 10],
      expectedPattern: 'arithmetic',
      description: 'Each number increases by 2'
    },
    {
      name: 'Arithmetic: Decrement',
      sequence: [100, 90, 80, 70, 60],
      expectedPattern: 'arithmetic',
      description: 'Each number decreases by 10'
    },
    {
      name: 'Geometric: Doubling',
      sequence: [1, 2, 4, 8, 16],
      expectedPattern: 'geometric',
      description: 'Each number doubles'
    },
    {
      name: 'Geometric: Halving',
      sequence: [32, 16, 8, 4, 2],
      expectedPattern: 'geometric',
      description: 'Each number is halved'
    },
    {
      name: 'Polynomial: Quadratic (Squares)',
      sequence: [1, 4, 9, 16, 25],
      expectedPattern: 'polynomial',
      description: 'Perfect squares: n²'
    },
    {
      name: 'Polynomial: Cubic',
      sequence: [1, 8, 27, 64, 125],
      expectedPattern: 'polynomial',
      description: 'Perfect cubes: n³'
    },
    {
      name: 'Polynomial: Quadratic (General)',
      sequence: [1, 5, 11, 19, 29],
      expectedPattern: 'polynomial',
      description: 'Quadratic polynomial: 2n² - n + 1'
    },
    {
      name: 'Mixed: Fibonacci',
      sequence: [1, 1, 2, 3, 5, 8],
      expectedPattern: 'unknown',
      description: 'Each number is the sum of the previous two'
    }
  ];

  sendJson(res, 200, {
    total: samples.length,
    samples: samples
  });
}

/**
 * Clear endpoint - reset memories
 */
function handleClear(req, res) {
  chamber.clearMemories();
  serverLogger.info('Memories cleared');
  sendJson(res, 200, {
    message: 'All memories have been cleared',
    timestamp: new Date().toISOString()
  });
}

/**
 * Export endpoint - export all data
 */
function handleExport(req, res) {
  const data = chamber.exportData();
  sendJson(res, 200, data);
}

// ============================================================================
// Request Router
// ============================================================================

function handleRequest(req, res) {
  // Log request
  serverLogger.info(`${req.method} ${req.url}`);

  // Handle OPTIONS (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // API Routes
  if (pathname === '/api/health') {
    return handleHealth(res);
  }

  if (pathname === '/api/predict' && req.method === 'POST') {
    return handlePredict(req, res);
  }

  if (pathname === '/api/validate' && req.method === 'POST') {
    return handleValidate(req, res);
  }

  if (pathname === '/api/memories' && req.method === 'GET') {
    return handleMemories(req, res);
  }

  if (pathname === '/api/statistics' && req.method === 'GET') {
    return handleStatistics(req, res);
  }

  if (pathname === '/api/samples' && req.method === 'GET') {
    return handleSamples(req, res);
  }

  if (pathname === '/api/clear' && req.method === 'POST') {
    return handleClear(req, res);
  }

  if (pathname === '/api/export' && req.method === 'GET') {
    return handleExport(req, res);
  }

  // Serve static files
  if (pathname === '/') {
    try {
      const indexPath = path.join(__dirname, 'public', 'index.html');
      const sanitized = sanitizePath(indexPath);
      return sendFile(res, sanitized, 'text/html; charset=utf-8');
    } catch (error) {
      return sendJson(res, 400, { error: 'Invalid request' });
    }
  }

  if (pathname.startsWith('/')) {
    const publicPath = path.join(__dirname, 'public', pathname);
    try {
      const sanitized = sanitizePath(publicPath);
      
      // Check if file exists
      if (!fs.existsSync(sanitized)) {
        return sendJson(res, 404, { error: 'Not found' });
      }

      const ext = path.extname(sanitized);
      const contentTypes = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml'
      };

      const contentType = contentTypes[ext] || 'application/octet-stream';
      return sendFile(res, sanitized, contentType);
    } catch (error) {
      return sendJson(res, 400, { error: 'Invalid request' });
    }
  }

  // 404
  sendJson(res, 404, { error: 'Not found' });
}

// ============================================================================
// Server Initialization
// ============================================================================

const server = http.createServer(handleRequest);

server.listen(PORT, HOST, () => {
  serverLogger.info(`Echo Chamber v3.0 Server running`, {
    url: `http://localhost:${PORT}`,
    host: HOST,
    port: PORT
  });
  console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║                  🏰 ECHO CHAMBER V3.0 SERVER ACTIVE 🏰                   ║
║                                                                            ║
║  🌐 Web Interface: http://localhost:${PORT}                            ║
║  🔗 API Endpoints: http://localhost:${PORT}/api/*                    ║
║  📊 Documentation: http://localhost:${PORT}/docs                      ║
║                                                                            ║
║  Supported Patterns:                                                      ║
║    ✨ Arithmetic Progressions                                              ║
║    ✨ Geometric Progressions                                               ║
║    ✨ Polynomial Sequences (Quadratic, Cubic, etc.)                        ║
║                                                                            ║
║  Press Ctrl+C to stop the server                                          ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
  `);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  serverLogger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    serverLogger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  serverLogger.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    serverLogger.info('HTTP server closed');
    process.exit(0);
  });
});

module.exports = server;
