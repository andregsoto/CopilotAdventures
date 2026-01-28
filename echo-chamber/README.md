# Echo Chamber - Magical Number Sequence Prediction Puzzle

## Overview

Echo Chamber is an interactive Node.js application that solves magical number sequence prediction puzzles. It validates arithmetic progressions and predicts the next number in a sequence while storing memories of all previous echoes.

## Story

In the mystical realm of Sequentia, there exists an ancient chamber where magical echoes reveal the hidden patterns of numbers. Every sequence of numbers follows an invisible force - an arithmetic progression that governs their behavior. 

Your quest: Enter sequences of numbers into the Echo Chamber, and the ancient magic will reveal the next number in the sequence!

## Features

### Core Functionality
- **Sequence Validation**: Validates that a sequence is a valid arithmetic progression
- **Next Number Prediction**: Predicts the next number in an arithmetic sequence
- **Memory Storage**: Stores memories of all previous echoes with timestamps
- **Statistics**: Provides detailed statistics about recorded echoes

### Enhanced Features
- **Input Validation**: Ensures sequences are valid before processing
- **Error Handling**: Comprehensive error handling for edge cases
- **Interactive Console Interface**: User-friendly mystical interface
- **Multiple Test Cases**: Includes sample tests for different sequence types
- **Automatic Testing**: Comprehensive test suite with automated validation

## Installation

### Prerequisites
- Node.js (version 12 or higher)
- npm (comes with Node.js)

### Setup

```bash
# Navigate to the echo-chamber directory
cd echo-chamber

# The application requires no additional dependencies - it uses only Node.js built-ins
```

## Running the Application

### Interactive Mode

```bash
node index.js
```

This launches the interactive console interface where you can:
1. Predict the next number in a sequence
2. Test with sample sequences
3. View all stored memories
4. View statistics
5. Clear all memories
6. Exit the application

### Example Usage

```bash
$ node index.js

======================================================================
✨ WELCOME TO THE ECHO CHAMBER OF SEQUENTIA ✨
======================================================================

📜 THE LEGEND:
----------------------------------------------------------------------

In the mystical realm of Sequentia, there exists an ancient chamber
where magical echoes reveal the hidden patterns of numbers. Legend says
that every sequence of numbers follows an invisible force - an 
arithmetic progression that governs their behavior.

Your quest: Enter sequences of numbers into the Echo Chamber, and the
ancient magic will reveal the next number in the sequence!

----------------------------------------------------------------------

🎵 ECHO CHAMBER MENU 🎵
----------------------------------------------------------------------
1. Predict the next number in a sequence
2. Test with sample sequences
3. View all stored memories
4. View statistics
5. Clear all memories
6. Exit the Echo Chamber
----------------------------------------------------------------------
📍 Enter your choice (1-6): 1

🔮 Enter a sequence of numbers (comma-separated, e.g., 3,6,9,12): 3,6,9,12

✨ THE ECHO CHAMBER REVEALS: ✨
  Input Sequence: [3, 6, 9, 12]
  🔮 Next Number: 15
  📊 Common Difference: 3
  💾 Memory #1 stored!
```

## Running Tests

```bash
node test.js
```

The test suite includes:
- **Core Sequence Validation Tests**: Validates arithmetic progression detection
- **Sequence Prediction Tests**: Verifies correct next number prediction
- **Memory Management Tests**: Tests storage and retrieval of echoes
- **Statistics Calculation Tests**: Validates statistics generation
- **Error Handling Tests**: Tests error detection and handling
- **Edge Cases Tests**: Tests decimal numbers, large numbers, zero differences, negative differences

### Expected Test Output

```
======================================================================
🧪 Core Sequence Validation
======================================================================
  ✅ Should validate valid arithmetic progression
  ✅ Should calculate correct difference
  ✅ Should reject non-arithmetic progression
  ✅ Should reject empty sequence
  ✅ Should reject single-element sequence
  ✅ Should accept two-element sequence
  ✅ Should calculate difference for two elements

... [more test results] ...

======================================================================
📊 TEST SUMMARY
======================================================================
✅ Tests Passed: 35
❌ Tests Failed: 0
📈 Total Tests: 35

🎉 All tests passed! The Echo Chamber is functioning perfectly!
```

## Architecture

### Class Structure

#### EchoChamber
Main class that manages sequence prediction and memory storage.

**Methods:**
- `validateArithmeticProgression(sequence)`: Validates if a sequence is an arithmetic progression
- `predictNextNumber(sequence)`: Predicts the next number in a sequence
- `getMemories()`: Returns all stored memories
- `clearMemories()`: Clears all stored memories
- `getStatistics()`: Returns statistics about stored echoes

### File Structure

```
echo-chamber/
├── index.js          # Main application with interactive interface
├── test.js           # Comprehensive test suite
├── package.json      # Project metadata
└── README.md         # This file
```

## Code Documentation

### Arithmetic Progression Validation

An arithmetic progression is a sequence where the difference between consecutive terms is constant.

```javascript
// Example: [3, 6, 9, 12]
// Differences: 3, 3, 3 (all the same)
// Valid arithmetic progression with common difference of 3
// Next number: 12 + 3 = 15
```

### Input Validation

The application validates:
- Sequence must be an array with at least 2 elements
- All elements must be valid numbers (no NaN, null, or undefined)
- Consecutive differences must all be equal

### Memory Structure

Each memory object contains:
```javascript
{
  echoId: 1,                              // Unique identifier
  sequence: [3, 6, 9, 12],               // Original sequence
  nextNumber: 15,                         // Predicted next number
  difference: 3,                          // Common difference
  timestamp: "2024-01-28T10:30:45.123Z"  // ISO 8601 timestamp
}
```

## Sample Test Sequences

The application includes these sample sequences for testing:

| Name | Sequence | Expected Next | Difference |
|------|----------|---|---|
| Primary Sequence | [3, 6, 9, 12] | 15 | 3 |
| Fibonacci-like | [2, 4, 6, 8, 10] | 12 | 2 |
| Decreasing Echo | [20, 15, 10, 5] | 0 | -5 |
| Single Step | [1, 2] | 3 | 1 |
| Negative Journey | [-5, -3, -1, 1] | 3 | 2 |
| Invalid Echo | [1, 2, 4, 7] | Error | N/A |

## Error Cases

The application handles various error cases:

1. **Non-array input**: "Sequence must be an array"
2. **Too few elements**: "Sequence must have at least 2 elements"
3. **Non-numeric elements**: "All elements must be valid numbers"
4. **Invalid progression**: "Not an arithmetic progression..."
5. **NaN values**: "All elements must be valid numbers"
6. **Null/undefined**: "All elements must be valid numbers"

## Learning Outcomes

By using the Echo Chamber application, you will learn:

1. **Arithmetic Progressions**: Understanding sequences with constant differences
2. **Input Validation**: Validating and sanitizing user input
3. **Error Handling**: Proper error detection and reporting
4. **Data Storage**: Managing and retrieving data structures
5. **Statistics Calculation**: Analyzing and summarizing data
6. **Interactive Interfaces**: Building user-friendly console applications
7. **Testing**: Comprehensive testing strategies and test organization

## Technical Specifications

### Requirements
- Node.js 12+
- No external dependencies (uses only Node.js built-in modules)

### Language Features Used
- ES6 Classes
- Arrow Functions
- Destructuring
- Template Literals
- Array Methods (map, filter, every, reduce)
- Async/Await with readline
- Error Handling

### Performance
- O(n) time complexity for sequence validation (where n is sequence length)
- O(n) space complexity for memory storage
- Efficient difference calculation

## Contributing

To extend the Echo Chamber application:

1. Add new test cases in `test.js`
2. Implement new prediction algorithms by extending the EchoChamber class
3. Add new menu options in the main interactive loop
4. Enhance the visual interface with more emojis and formatting

## License

MIT License - See LICENSE file for details

## Author

Created as part of the CopilotAdventures educational repository by GitHub Copilot.

---

**May the echoes of Sequentia guide your coding journey! ✨**
