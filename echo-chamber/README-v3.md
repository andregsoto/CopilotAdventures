# 🏰 Echo Chamber v3.0 - Advanced Sequence Prediction Engine

![Version](https://img.shields.io/badge/version-3.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Node](https://img.shields.io/badge/node-%3E%3D12.0.0-brightgreen)

## Overview

Echo Chamber v3.0 is an advanced, production-ready sequence prediction engine that automatically detects and predicts patterns in numeric sequences. It supports multiple pattern types including arithmetic progressions, geometric progressions, and polynomial sequences.

### ✨ Features

✅ **Multi-Pattern Support**
- Arithmetic Progressions (constant difference)
- Geometric Progressions (constant ratio)
- Polynomial Sequences (quadratic, cubic, etc.)
- Automatic pattern detection

✅ **Web Interface**
- Beautiful Echo Castle themed UI
- Real-time sequence visualization with Chart.js
- Interactive tabs for different features
- Responsive design for mobile & desktop
- Dark mode aesthetic

✅ **REST API**
- 7 comprehensive endpoints
- CORS enabled
- JSON responses
- Error handling

✅ **Advanced Features**
- Historical analysis tracking
- Performance metrics
- Data export/import
- Comprehensive logging
- Memory management
- Multi-prediction support

✅ **Testing & Documentation**
- 50+ comprehensive tests
- Edge case coverage
- Performance benchmarks
- Complete mathematical documentation
- API reference guide

## 🚀 Quick Start

### Installation

```bash
cd echo-chamber
npm install
```

No external dependencies required! Uses only Node.js built-ins.

### Running the Server

```bash
# Start web server and API
npm start

# Then visit: http://localhost:3000
```

### Using the Console Version

```bash
npm run console
```

### Running Tests

```bash
npm test
```

### Generating Documentation

```bash
npm run docs
```

## 📊 Pattern Types

### 1. Arithmetic Progressions

Sequences with constant difference between terms.

```
Example: 2, 4, 6, 8, 10, ...
Common Difference: 2
Next: 12

Formula: aₙ = a₁ + (n-1)d
```

### 2. Geometric Progressions

Sequences with constant ratio between terms.

```
Example: 2, 6, 18, 54, 162, ...
Common Ratio: 3
Next: 486

Formula: aₙ = a₁ × r^(n-1)
```

### 3. Polynomial Sequences

Higher-order patterns like quadratic and cubic sequences.

```
Example: 1, 4, 9, 16, 25, ...
Type: Quadratic (n²)
Next: 36

Method: Finite Differences
```

## 🔌 API Endpoints

### Health Check
```bash
GET /api/health
```

### Predict Next Numbers
```bash
POST /api/predict
Content-Type: application/json

{
  "sequence": [1, 2, 4, 8, 16],
  "predictCount": 2
}
```

### Validate Pattern
```bash
POST /api/validate
Content-Type: application/json

{
  "sequence": [1, 4, 9, 16, 25]
}
```

### Get Memories
```bash
GET /api/memories
```

### Get Statistics
```bash
GET /api/statistics
```

### Get Samples
```bash
GET /api/samples
```

### Clear Memories
```bash
POST /api/clear
```

### Export Data
```bash
GET /api/export
```

## 📈 Using the Web Interface

### Predictor Tab
1. Enter a comma-separated sequence
2. Specify number of predictions
3. Click "Predict"
4. View results with visualization

### Visualization
- Real-time Chart.js graphs
- Input sequence vs predictions
- Pattern type display
- Pattern details (difference, ratio, degree)

### Memories Tab
- View all previous analyses
- Pattern distribution
- Timestamps
- Clear history

### Statistics Tab
- Total echoes analyzed
- Average sequence length
- Pattern distribution
- Performance metrics

### Documentation Tab
- Complete pattern guides
- Mathematical formulas
- Examples
- Detection algorithms

## 🧪 Testing

Comprehensive test suite included:

```bash
npm test
```

Tests include:
- ✅ Arithmetic progression validation
- ✅ Geometric progression detection
- ✅ Polynomial sequence recognition
- ✅ Edge cases (empty, single element, negative)
- ✅ Large sequences (10,000+ elements)
- ✅ Performance benchmarks
- ✅ Memory and statistics
- ✅ Data import/export
- ✅ Logging system

**Test Statistics:**
- 50+ test cases
- Multiple pattern categories
- Edge case coverage
- Performance validation
- 100% core functionality coverage

## 📚 Documentation

### Quick Reference
- [API Documentation](./docs/api-docs.md)
- [Mathematical Guide](./docs/mathematics.md)
- [Web Interface Guide](./public/index-v3.html)

### Complete Documentation Website
```bash
npm run docs
```

Opens comprehensive documentation with:
- Pattern definitions
- Mathematical formulas
- Algorithm explanations
- Time complexity analysis
- Usage examples
- API reference

## 🎯 Console Mode Features

Interactive menu with options:
- Predict next numbers
- View memories
- View statistics
- Run sample tests
- Clear memories
- Export data
- View performance metrics
- Exit

## ⚙️ Configuration

### Environment Variables

```bash
PORT=3000          # Server port (default: 3000)
VERBOSE=true       # Enable detailed logging
```

### Server Configuration

```javascript
// In server-v3.js
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const CORS_ORIGINS = ['*'];
```

## 🔍 Pattern Detection Algorithm

Echo Chamber uses a systematic approach:

1. **Arithmetic Check** (O(n))
   - Calculate first differences
   - Verify all differences equal
   - Return if valid

2. **Geometric Check** (O(n))
   - Calculate ratios
   - Verify all ratios equal
   - Return if valid

3. **Polynomial Check** (O(n²))
   - Build difference table
   - Check each level for constant differences
   - Return degree if found

4. **Unknown**
   - Return error if no pattern matches

## 📊 Performance Characteristics

| Pattern | Time | Space | Max Size |
|---------|------|-------|----------|
| Arithmetic | O(n) | O(1) | Unlimited |
| Geometric | O(n) | O(1) | Unlimited |
| Polynomial | O(n²) | O(n) | ~10,000 |

## 📁 Project Structure

```
echo-chamber/
├── echo-chamber-v3.js      # Core engine with multi-pattern support
├── server-v3.js            # Enhanced web server & API
├── test-v3.js              # Comprehensive test suite (50+ tests)
├── docs-generator.js       # Documentation website generator
├── public/
│   └── index-v3.html       # Beautiful web interface with visualization
├── docs/                   # Generated documentation
│   ├── index.html          # Main documentation
│   ├── api-docs.md         # API reference
│   └── mathematics.md      # Mathematical guide
├── package.json            # Project metadata
└── README.md               # This file
```

## 🔒 Error Handling

Comprehensive error handling for:
- Invalid input (non-numbers, empty sequences)
- Sequence too short (< 2 elements)
- Unknown patterns
- API errors
- Server errors

All errors return JSON with descriptive messages.

## 🌐 CORS Support

CORS is enabled for all origins:
```javascript
'Access-Control-Allow-Origin': '*'
'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
'Access-Control-Allow-Headers': 'Content-Type'
```

## 🎓 Learning Resources

### For Pattern Recognition
- Study the different pattern types
- Review mathematical formulas
- Examine test cases
- Experiment with samples

### For API Usage
- Check endpoint documentation
- Review curl examples
- Try JavaScript examples
- Build your own client

### For Mathematics
- Read the mathematical guide
- Study algorithm descriptions
- Review complexity analysis
- Explore examples

## 🚀 Advanced Usage

### Using as a Module

```javascript
const { EchoChamber, Logger } = require('./echo-chamber-v3');

const chamber = new EchoChamber();
const result = chamber.predictNextNumber([1, 2, 4, 8, 16], 2);

console.log(result.pattern);        // 'geometric'
console.log(result.predictions);    // [32, 64]
console.log(result.patternDetails); // { ratio: 2, ... }
```

### Export and Import Data

```javascript
// Export
const data = chamber.exportData();
fs.writeFileSync('backup.json', JSON.stringify(data));

// Import
const imported = JSON.parse(fs.readFileSync('backup.json'));
chamber.importData(imported);
```

### Custom Logging

```javascript
const logger = chamber.logger;
logger.info('Processing sequence');
logger.warn('Large sequence detected');
logger.error('Invalid input');

const logs = logger.getLogs('error'); // Filter by level
```

## 📈 Version History

### v3.0.0 (Current)
- ✨ Multi-pattern support (Geometric, Polynomial)
- ✨ Enhanced web interface with visualization
- ✨ Comprehensive test suite (50+ tests)
- ✨ Complete documentation website
- ✨ Performance metrics and logging
- ✨ Data export/import
- ✨ Production-ready error handling

### v2.0.0
- Web interface with 4 tabs
- REST API with 7 endpoints
- Console interactive interface
- 44 tests

### v1.0.0
- Basic arithmetic progression detection
- Console interface
- Memory storage

## 🤝 Contributing

Contributions welcome! Please:
1. Test thoroughly
2. Update documentation
3. Follow code style
4. Add test cases for new features

## 📝 License

MIT License - See LICENSE file for details

## 🙏 Credits

Created with ✨ by GitHub Copilot Adventures

Part of the CopilotAdventures educational repository demonstrating GitHub Copilot's capabilities.

## 📞 Support

For issues or questions:
1. Check the documentation
2. Review test cases
3. Check API responses for error messages
4. Enable VERBOSE mode for debugging

```bash
VERBOSE=true npm start
```

## 🎯 Future Enhancements

Potential additions:
- [ ] Fibonacci sequence detection
- [ ] Exponential function detection
- [ ] Trigonometric sequences
- [ ] Database backend for memory
- [ ] Authentication for API
- [ ] Rate limiting
- [ ] Advanced visualization (3D plots)
- [ ] Machine learning pattern detection
- [ ] Mobile app
- [ ] Multi-language support

---

**Happy predicting! 🏰✨**
