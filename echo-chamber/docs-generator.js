#!/usr/bin/env node

/**
 * Echo Chamber v3.0 - Documentation Generator
 * Creates a complete documentation website explaining the mathematics
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// Documentation Content
// ============================================================================

const documentation = {
  // Index page
  'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Echo Chamber v3.0 - Documentation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            color: #f3f4f6;
            line-height: 1.8;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        header {
            text-align: center;
            margin-bottom: 50px;
            padding: 40px;
            background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        h1 {
            font-size: 3em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        h2, h3 {
            color: #6366f1;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        
        .nav {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 40px 0;
        }
        
        .nav-card {
            background: #2d3748;
            padding: 25px;
            border-radius: 12px;
            border: 2px solid #e5e7eb;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .nav-card:hover {
            border-color: #6366f1;
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
            transform: translateY(-5px);
        }
        
        .nav-card a {
            color: #f3f4f6;
            text-decoration: none;
            font-weight: 600;
            display: block;
            margin-bottom: 10px;
            font-size: 1.2em;
        }
        
        .nav-card p {
            color: #9ca3af;
        }
        
        section {
            background: #2d3748;
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 30px;
            border: 1px solid #e5e7eb;
        }
        
        code {
            background: #1f2937;
            padding: 2px 6px;
            border-radius: 4px;
            color: #f59e0b;
            font-family: 'Courier New', monospace;
        }
        
        pre {
            background: #1f2937;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 15px 0;
            border: 1px solid #e5e7eb;
        }
        
        pre code {
            padding: 0;
            background: none;
            color: #6366f1;
        }
        
        .example {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
            padding: 15px;
            border-left: 4px solid #6366f1;
            margin: 15px 0;
            border-radius: 8px;
        }
        
        ul, ol {
            margin-left: 30px;
            margin-bottom: 15px;
        }
        
        li {
            margin-bottom: 10px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: #1f2937;
        }
        
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        
        th {
            background: #374151;
            color: #6366f1;
            font-weight: 600;
        }
        
        .formula {
            background: #1f2937;
            padding: 20px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            margin: 15px 0;
            border: 1px solid #e5e7eb;
            color: #6366f1;
            text-align: center;
            font-size: 1.2em;
        }
        
        footer {
            text-align: center;
            padding: 30px;
            color: #9ca3af;
            border-top: 1px solid #e5e7eb;
            margin-top: 50px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🏰 Echo Chamber v3.0 📚</h1>
            <p>Complete Documentation & Mathematical Guide</p>
        </header>
        
        <nav class="nav">
            <div class="nav-card">
                <a href="#arithmetic">🔢 Arithmetic Progressions</a>
                <p>Constant difference sequences</p>
            </div>
            <div class="nav-card">
                <a href="#geometric">⚡ Geometric Progressions</a>
                <p>Constant ratio sequences</p>
            </div>
            <div class="nav-card">
                <a href="#polynomial">📈 Polynomial Sequences</a>
                <p>Higher-order patterns</p>
            </div>
            <div class="nav-card">
                <a href="#api">🔌 API Reference</a>
                <p>REST API documentation</p>
            </div>
        </nav>
        
        <!-- Arithmetic Section -->
        <section id="arithmetic">
            <h2>🔢 Arithmetic Progressions</h2>
            
            <h3>Definition</h3>
            <p>An arithmetic progression (AP) is a sequence where the difference between consecutive terms is constant. This constant difference is called the <strong>common difference (d)</strong>.</p>
            
            <div class="example">
                <strong>Example:</strong> 2, 4, 6, 8, 10, ...
                <br>Common Difference: d = 2
                <br>Each term increases by 2
            </div>
            
            <h3>Mathematical Formula</h3>
            <p>For the n-th term (a<sub>n</sub>) in an arithmetic progression:</p>
            <div class="formula">
                a<sub>n</sub> = a<sub>1</sub> + (n - 1)d
            </div>
            
            <h3>General Properties</h3>
            <ul>
                <li><strong>Common Difference:</strong> d = a<sub>n+1</sub> - a<sub>n</sub></li>
                <li><strong>First Term:</strong> a<sub>1</sub></li>
                <li><strong>Last Term:</strong> a<sub>n</sub> = a<sub>1</sub> + (n - 1)d</li>
                <li><strong>Sum of n terms:</strong> S<sub>n</sub> = n/2 × (2a<sub>1</sub> + (n - 1)d)</li>
            </ul>
            
            <h3>Examples</h3>
            <table>
                <thead>
                    <tr>
                        <th>Sequence</th>
                        <th>Common Difference</th>
                        <th>Type</th>
                        <th>Next Term</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1, 3, 5, 7, 9, ...</td>
                        <td>2</td>
                        <td>Odd Numbers</td>
                        <td>11</td>
                    </tr>
                    <tr>
                        <td>10, 20, 30, 40, ...</td>
                        <td>10</td>
                        <td>Multiples of 10</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>100, 95, 90, 85, ...</td>
                        <td>-5</td>
                        <td>Decreasing</td>
                        <td>80</td>
                    </tr>
                    <tr>
                        <td>1.5, 2.0, 2.5, 3.0, ...</td>
                        <td>0.5</td>
                        <td>Decimal</td>
                        <td>3.5</td>
                    </tr>
                </tbody>
            </table>
            
            <h3>Detection Algorithm</h3>
            <pre><code>
For sequence [a₁, a₂, a₃, ..., aₙ]:
1. Calculate d = a₂ - a₁
2. Verify: For all i, aᵢ₊₁ - aᵢ = d
3. If verified, it's an arithmetic progression
Time Complexity: O(n)
            </code></pre>
        </section>
        
        <!-- Geometric Section -->
        <section id="geometric">
            <h2>⚡ Geometric Progressions</h2>
            
            <h3>Definition</h3>
            <p>A geometric progression (GP) is a sequence where the ratio between consecutive terms is constant. This constant ratio is called the <strong>common ratio (r)</strong>.</p>
            
            <div class="example">
                <strong>Example:</strong> 2, 4, 8, 16, 32, ...
                <br>Common Ratio: r = 2
                <br>Each term is multiplied by 2
            </div>
            
            <h3>Mathematical Formula</h3>
            <p>For the n-th term (a<sub>n</sub>) in a geometric progression:</p>
            <div class="formula">
                a<sub>n</sub> = a<sub>1</sub> × r^(n - 1)
            </div>
            
            <h3>General Properties</h3>
            <ul>
                <li><strong>Common Ratio:</strong> r = a<sub>n+1</sub> / a<sub>n</sub></li>
                <li><strong>First Term:</strong> a<sub>1</sub></li>
                <li><strong>Last Term:</strong> a<sub>n</sub> = a<sub>1</sub> × r^(n - 1)</li>
                <li><strong>Sum of n terms:</strong> S<sub>n</sub> = a<sub>1</sub> × (r^n - 1) / (r - 1)</li>
            </ul>
            
            <h3>Examples</h3>
            <table>
                <thead>
                    <tr>
                        <th>Sequence</th>
                        <th>Common Ratio</th>
                        <th>Type</th>
                        <th>Next Term</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1, 2, 4, 8, 16, ...</td>
                        <td>2</td>
                        <td>Powers of 2</td>
                        <td>32</td>
                    </tr>
                    <tr>
                        <td>27, 9, 3, 1, ...</td>
                        <td>1/3</td>
                        <td>Decreasing</td>
                        <td>1/3</td>
                    </tr>
                    <tr>
                        <td>2, -6, 18, -54, ...</td>
                        <td>-3</td>
                        <td>Negative Ratio</td>
                        <td>162</td>
                    </tr>
                    <tr>
                        <td>100, 10, 1, 0.1, ...</td>
                        <td>0.1</td>
                        <td>Fractional</td>
                        <td>0.01</td>
                    </tr>
                </tbody>
            </table>
            
            <h3>Detection Algorithm</h3>
            <pre><code>
For sequence [a₁, a₂, a₃, ..., aₙ]:
1. Verify no zeros (except possibly last)
2. Calculate r = a₂ / a₁
3. Verify: For all i, aᵢ₊₁ / aᵢ = r
4. If verified, it's a geometric progression
Time Complexity: O(n)
            </code></pre>
        </section>
        
        <!-- Polynomial Section -->
        <section id="polynomial">
            <h2>📈 Polynomial Sequences</h2>
            
            <h3>Definition</h3>
            <p>A polynomial sequence is a sequence where the n-th term is a polynomial function of n. These are detected using the <strong>method of finite differences</strong>.</p>
            
            <div class="example">
                <strong>Example:</strong> 1, 4, 9, 16, 25, ... (Perfect Squares: n²)
                <br>Polynomial Degree: 2
            </div>
            
            <h3>Common Polynomial Sequences</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Formula</th>
                        <th>Sequence</th>
                        <th>Degree</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Perfect Squares</td>
                        <td>n²</td>
                        <td>1, 4, 9, 16, 25, ...</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Perfect Cubes</td>
                        <td>n³</td>
                        <td>1, 8, 27, 64, 125, ...</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Triangular Numbers</td>
                        <td>n(n+1)/2</td>
                        <td>1, 3, 6, 10, 15, ...</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Tetrahedral Numbers</td>
                        <td>n(n+1)(n+2)/6</td>
                        <td>1, 4, 10, 20, 35, ...</td>
                        <td>3</td>
                    </tr>
                </tbody>
            </table>
            
            <h3>Finite Differences Method</h3>
            <p>For a polynomial of degree d, the d-th level differences are constant.</p>
            
            <pre><code>
Example: Sequence 1, 4, 9, 16, 25 (n²)

Level 0: 1,   4,   9,   16,  25
Level 1:    3,   5,   7,   9
Level 2:      2,   2,   2

Second differences are constant (2) → Degree 2
            </code></pre>
            
            <h3>Algorithm</h3>
            <pre><code>
For sequence [a₁, a₂, a₃, ..., aₙ]:
1. Start with the original sequence
2. Calculate first differences: [a₂-a₁, a₃-a₂, ...]
3. Repeat for subsequent differences
4. When all differences are constant → Found degree
5. Use the constant difference to extend sequence

Time Complexity: O(n²)
            </code></pre>
        </section>
        
        <!-- API Reference -->
        <section id="api">
            <h2>🔌 API Reference</h2>
            
            <h3>Base URL</h3>
            <pre><code>http://localhost:3000</code></pre>
            
            <h3>Endpoints</h3>
            
            <h4>1. Health Check</h4>
            <pre><code>GET /api/health</code></pre>
            <p>Check if the server is running.</p>
            
            <h4>2. Predict</h4>
            <pre><code>POST /api/predict</code></pre>
            <p>Analyze a sequence and predict next numbers.</p>
            <p><strong>Request Body:</strong></p>
            <pre><code>
{
  "sequence": [2, 4, 6, 8, 10],
  "predictCount": 2
}
            </code></pre>
            
            <h4>3. Validate</h4>
            <pre><code>POST /api/validate</code></pre>
            <p>Analyze pattern without storing in memory.</p>
            
            <h4>4. Memories</h4>
            <pre><code>GET /api/memories</code></pre>
            <p>Retrieve all stored analyses (last 50).</p>
            
            <h4>5. Statistics</h4>
            <pre><code>GET /api/statistics</code></pre>
            <p>Get comprehensive statistics about analyses.</p>
            
            <h4>6. Samples</h4>
            <pre><code>GET /api/samples</code></pre>
            <p>Get predefined sample sequences for testing.</p>
            
            <h4>7. Clear</h4>
            <pre><code>POST /api/clear</code></pre>
            <p>Clear all stored memories.</p>
        </section>
        
        <section>
            <h2>🚀 Quick Start</h2>
            
            <h3>Installation & Running</h3>
            <pre><code>
# Navigate to directory
cd echo-chamber

# Install dependencies (none required!)
npm install

# Start server
npm start

# Run console version
npm run console

# Run tests
npm test
            </code></pre>
            
            <h3>Using the Web Interface</h3>
            <ol>
                <li>Start the server: <code>npm start</code></li>
                <li>Open browser: http://localhost:3000</li>
                <li>Enter a sequence in the Predictor tab</li>
                <li>Click "Predict" to analyze</li>
                <li>View results with visualization</li>
            </ol>
            
            <h3>Using the API</h3>
            <pre><code>
# Predict next numbers
curl -X POST http://localhost:3000/api/predict \\
  -H "Content-Type: application/json" \\
  -d '{"sequence":[1,2,4,8,16],"predictCount":2}'

# Get statistics
curl http://localhost:3000/api/statistics

# Get samples
curl http://localhost:3000/api/samples
            </code></pre>
        </section>
        
        <section>
            <h2>📊 Performance Characteristics</h2>
            
            <table>
                <thead>
                    <tr>
                        <th>Pattern Type</th>
                        <th>Time Complexity</th>
                        <th>Space Complexity</th>
                        <th>Max Sequence Size</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Arithmetic</td>
                        <td>O(n)</td>
                        <td>O(1)</td>
                        <td>Unlimited</td>
                    </tr>
                    <tr>
                        <td>Geometric</td>
                        <td>O(n)</td>
                        <td>O(1)</td>
                        <td>Unlimited</td>
                    </tr>
                    <tr>
                        <td>Polynomial</td>
                        <td>O(n²)</td>
                        <td>O(n)</td>
                        <td>~10,000 elements</td>
                    </tr>
                </tbody>
            </table>
        </section>
        
        <footer>
            <p>📚 Echo Chamber v3.0 - Complete Documentation</p>
            <p>Created with ✨ by GitHub Copilot Adventures</p>
        </footer>
    </div>
</body>
</html>`,

  // API documentation
  'api-docs.md': `# Echo Chamber v3.0 - API Documentation

## Overview

Echo Chamber is a RESTful API for analyzing and predicting number sequences. It supports three types of patterns:

- **Arithmetic Progressions**: Constant difference between terms
- **Geometric Progressions**: Constant ratio between terms
- **Polynomial Sequences**: Higher-order patterns (quadratic, cubic, etc.)

## Base URL

\`\`\`
http://localhost:3000
\`\`\`

## Authentication

No authentication required.

## Error Handling

All errors return JSON response with error message:

\`\`\`json
{
  "error": "Error description"
}
\`\`\`

## Endpoints

### 1. Health Check

\`\`\`
GET /api/health
\`\`\`

**Response:**
\`\`\`json
{
  "status": "ok",
  "application": "Echo Chamber",
  "version": "3.0.0",
  "timestamp": "2024-01-28T12:00:00Z"
}
\`\`\`

### 2. Predict Next Numbers

\`\`\`
POST /api/predict
\`\`\`

**Request:**
\`\`\`json
{
  "sequence": [1, 2, 4, 8, 16],
  "predictCount": 2
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "predictions": [32, 64],
  "nextNumber": 32,
  "pattern": "geometric",
  "patternDetails": {
    "difference": null,
    "ratio": 2,
    "degree": null
  },
  "sequenceLength": 5,
  "memory": {
    "echoId": 1,
    "sequence": [1, 2, 4, 8, 16],
    "predictions": [32, 64],
    "pattern": "geometric",
    "timestamp": "2024-01-28T12:00:00Z",
    "analysisTimeMs": 0.5
  }
}
\`\`\`

### 3. Validate Pattern

\`\`\`
POST /api/validate
\`\`\`

**Request:**
\`\`\`json
{
  "sequence": [1, 4, 9, 16, 25]
}
\`\`\`

**Response:**
\`\`\`json
{
  "sequence": [1, 4, 9, 16, 25],
  "analysis": {
    "type": "polynomial",
    "degree": 2,
    "error": null
  }
}
\`\`\`

### 4. Get Memories

\`\`\`
GET /api/memories
\`\`\`

**Response:**
\`\`\`json
{
  "total": 5,
  "returned": 5,
  "memories": [
    {
      "echoId": 1,
      "sequence": [1, 2, 3, 4, 5],
      "predictions": [6],
      "pattern": "arithmetic",
      "timestamp": "2024-01-28T12:00:00Z"
    }
  ]
}
\`\`\`

### 5. Get Statistics

\`\`\`
GET /api/statistics
\`\`\`

**Response:**
\`\`\`json
{
  "statistics": {
    "totalEchoes": 5,
    "averageSequenceLength": 5.2,
    "patternDistribution": {
      "arithmetic": 2,
      "geometric": 2,
      "polynomial": 1
    },
    "performanceMetrics": {
      "totalSequencesAnalyzed": 5,
      "averageAnalysisTime": 0.8,
      "longestSequenceLength": 10,
      "patternDistribution": {
        "arithmetic": 2,
        "geometric": 2,
        "polynomial": 1,
        "unknown": 0
      }
    }
  }
}
\`\`\`

### 6. Get Sample Sequences

\`\`\`
GET /api/samples
\`\`\`

**Response:**
\`\`\`json
{
  "total": 8,
  "samples": [
    {
      "name": "Arithmetic: Simple Increment",
      "sequence": [2, 4, 6, 8, 10],
      "expectedPattern": "arithmetic",
      "description": "Each number increases by 2"
    }
  ]
}
\`\`\`

### 7. Clear All Memories

\`\`\`
POST /api/clear
\`\`\`

**Response:**
\`\`\`json
{
  "message": "All memories have been cleared",
  "timestamp": "2024-01-28T12:00:00Z"
}
\`\`\`

## Example Usage

### Using curl

\`\`\`bash
# Predict next numbers
curl -X POST http://localhost:3000/api/predict \\
  -H "Content-Type: application/json" \\
  -d '{
    "sequence": [2, 4, 6, 8, 10],
    "predictCount": 1
  }'

# Get statistics
curl http://localhost:3000/api/statistics

# Get samples
curl http://localhost:3000/api/samples
\`\`\`

### Using JavaScript/fetch

\`\`\`javascript
const response = await fetch('http://localhost:3000/api/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sequence: [1, 2, 4, 8, 16],
    predictCount: 2
  })
});

const result = await response.json();
console.log(result.predictions); // [32, 64]
\`\`\`

## Rate Limiting

No rate limiting is enforced.

## CORS

CORS is enabled for all origins.

## Pagination

The /api/memories endpoint returns the last 50 memories by default.
`,

  // Mathematics guide
  'mathematics.md': `# Mathematical Foundations

## Arithmetic Progressions (AP)

### Definition
A sequence where consecutive terms have a constant difference.

### Formula
- General term: $a_n = a_1 + (n-1)d$
- where d = common difference

### Example
2, 5, 8, 11, 14, ...
- First term: a₁ = 2
- Common difference: d = 3
- Fifth term: a₅ = 2 + (5-1)×3 = 14

### Detection
Check if all consecutive differences are equal:
d₁ = d₂ = d₃ = ... = dₙ₋₁

## Geometric Progressions (GP)

### Definition
A sequence where consecutive terms have a constant ratio.

### Formula
- General term: $a_n = a_1 × r^{n-1}$
- where r = common ratio

### Example
2, 6, 18, 54, 162, ...
- First term: a₁ = 2
- Common ratio: r = 3
- Fifth term: a₅ = 2 × 3⁴ = 162

### Detection
Check if all consecutive ratios are equal:
r₁ = r₂ = r₃ = ... = rₙ₋₁

## Polynomial Sequences

### Definition
Sequences following a polynomial function of n.

### Finite Differences Method
For a degree d polynomial, the d-th differences are constant.

### Examples

**Quadratic (n²):**
1, 4, 9, 16, 25, ...
- Level 0: 1, 4, 9, 16, 25
- Level 1: 3, 5, 7, 9
- Level 2: 2, 2, 2 (constant)
- Degree: 2

**Cubic (n³):**
1, 8, 27, 64, 125, ...
- Differences eventually become constant at level 3
- Degree: 3

## Algorithm Complexity

| Pattern | Time | Space | Notes |
|---------|------|-------|-------|
| Arithmetic | O(n) | O(1) | Single pass |
| Geometric | O(n) | O(1) | Single pass |
| Polynomial | O(n²) | O(n) | Multiple passes for differences |

`
};

// ============================================================================
// Documentation Generator
// ============================================================================

function generateDocumentation() {
  const docsDir = path.join(__dirname, 'docs');

  // Create docs directory
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  console.log('📚 Generating documentation...\n');

  // Generate each file
  Object.entries(documentation).forEach(([filename, content]) => {
    const filePath = path.join(docsDir, filename);
    fs.writeFileSync(filePath, content);
    console.log(`✅ Generated: ${filename}`);
  });

  console.log(`\n✨ Documentation generated in "${docsDir}"`);
  console.log(`\n📖 View documentation:`);
  console.log(`   Open: ${docsDir}/index.html`);
  console.log(`   Or visit: http://localhost:3000/docs/\n`);

  return docsDir;
}

// ============================================================================
// Main
// ============================================================================

if (require.main === module) {
  generateDocumentation();
}

module.exports = { generateDocumentation, documentation };
