#!/usr/bin/env node

/**
 * Echo Chamber v3.0 - Advanced Magical Sequence Prediction Engine
 * 
 * This enhanced application solves multiple types of sequence puzzles:
 * - Arithmetic progressions (constant difference)
 * - Geometric progressions (constant ratio)
 * - Polynomial sequences (quadratic, cubic, etc.)
 * 
 * Features:
 * - Multi-pattern detection and analysis
 * - Historical sequence tracking
 * - Performance optimization for large sequences
 * - Comprehensive logging and error handling
 * - Advanced mathematical analysis
 */

// ============================================================================
// Logging System
// ============================================================================

class Logger {
  constructor(level = 'info') {
    this.levels = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    };
    this.currentLevel = this.levels[level];
    this.logs = [];
  }

  log(level, message, data = null) {
    if (this.levels[level] >= this.currentLevel) {
      const timestamp = new Date().toISOString();
      const logEntry = {
        timestamp,
        level,
        message,
        data
      };
      this.logs.push(logEntry);

      const prefix = {
        debug: '🔍',
        info: 'ℹ️',
        warn: '⚠️',
        error: '❌'
      };

      if (process.env.VERBOSE) {
        console.log(`${prefix[level]} [${timestamp}] ${level.toUpperCase()}: ${message}`, data || '');
      }
    }
  }

  debug(message, data) { this.log('debug', message, data); }
  info(message, data) { this.log('info', message, data); }
  warn(message, data) { this.log('warn', message, data); }
  error(message, data) { this.log('error', message, data); }

  getLogs(level = null) {
    return level ? this.logs.filter(l => l.level === level) : this.logs;
  }

  clearLogs() {
    this.logs = [];
  }
}

// ============================================================================
// Core Echo Chamber - Multi-Pattern Support
// ============================================================================

/**
 * Advanced EchoChamber class with multi-pattern support
 */
class EchoChamber {
  constructor() {
    // Memory and tracking
    this.memories = [];
    this.echoCount = 0;
    this.analysisHistory = [];

    // Performance metrics
    this.performanceMetrics = {
      totalSequencesAnalyzed: 0,
      averageAnalysisTime: 0,
      longestSequenceLength: 0,
      patternDistribution: {
        arithmetic: 0,
        geometric: 0,
        polynomial: 0,
        unknown: 0
      }
    };

    this.logger = new Logger();
  }

  /**
   * Validates if a sequence is a valid arithmetic progression
   * Complexity: O(n)
   */
  validateArithmeticProgression(sequence) {
    if (!Array.isArray(sequence) || sequence.length < 2) {
      return {
        isValid: false,
        error: 'Sequence must have at least 2 elements',
        difference: null,
        type: 'arithmetic'
      };
    }

    if (!sequence.every(num => typeof num === 'number' && !isNaN(num))) {
      return {
        isValid: false,
        error: 'All elements must be valid numbers',
        difference: null,
        type: 'arithmetic'
      };
    }

    const firstDifference = sequence[1] - sequence[0];

    for (let i = 2; i < sequence.length; i++) {
      const currentDifference = sequence[i] - sequence[i - 1];
      if (Math.abs(currentDifference - firstDifference) > 1e-10) {
        return {
          isValid: false,
          error: `Not an arithmetic progression`,
          difference: null,
          type: 'arithmetic'
        };
      }
    }

    return {
      isValid: true,
      difference: firstDifference,
      error: null,
      type: 'arithmetic'
    };
  }

  /**
   * Validates if a sequence is a valid geometric progression
   * Complexity: O(n)
   */
  validateGeometricProgression(sequence) {
    if (!Array.isArray(sequence) || sequence.length < 2) {
      return {
        isValid: false,
        error: 'Sequence must have at least 2 elements',
        ratio: null,
        type: 'geometric'
      };
    }

    if (!sequence.every(num => typeof num === 'number' && !isNaN(num))) {
      return {
        isValid: false,
        error: 'All elements must be valid numbers',
        ratio: null,
        type: 'geometric'
      };
    }

    // Check for zero elements in geometric progression
    if (sequence.slice(0, -1).some(num => num === 0)) {
      return {
        isValid: false,
        error: 'Geometric progression cannot have zero elements (except possibly the last)',
        ratio: null,
        type: 'geometric'
      };
    }

    const firstRatio = sequence[1] / sequence[0];
    const tolerance = 1e-10;

    for (let i = 2; i < sequence.length; i++) {
      const currentRatio = sequence[i] / sequence[i - 1];
      if (Math.abs(currentRatio - firstRatio) > tolerance) {
        return {
          isValid: false,
          error: `Not a geometric progression`,
          ratio: null,
          type: 'geometric'
        };
      }
    }

    return {
      isValid: true,
      ratio: firstRatio,
      error: null,
      type: 'geometric'
    };
  }

  /**
   * Detects polynomial sequences using finite differences
   * Supports quadratic, cubic, and higher-order polynomials
   * Complexity: O(n²)
   */
  detectPolynomialSequence(sequence) {
    if (!Array.isArray(sequence) || sequence.length < 2) {
      return {
        isValid: false,
        error: 'Sequence must have at least 2 elements',
        degree: null,
        type: 'polynomial'
      };
    }

    if (!sequence.every(num => typeof num === 'number' && !isNaN(num))) {
      return {
        isValid: false,
        error: 'All elements must be valid numbers',
        degree: null,
        type: 'polynomial'
      };
    }

    const maxDegree = Math.min(sequence.length - 2, 5); // Max degree 5
    let differences = [...sequence];
    let degree = 0;

    for (let d = 0; d <= maxDegree; d++) {
      // Calculate next level of differences
      const nextDifferences = [];
      for (let i = 0; i < differences.length - 1; i++) {
        nextDifferences.push(differences[i + 1] - differences[i]);
      }

      // Check if all differences are constant (within tolerance)
      const tolerance = 1e-10;
      const firstDiff = nextDifferences[0];
      const isConstant = nextDifferences.every(diff =>
        Math.abs(diff - firstDiff) < tolerance
      );

      if (isConstant && nextDifferences.length > 0) {
        degree = d + 1;
        return {
          isValid: true,
          degree: degree,
          error: null,
          type: 'polynomial',
          differences: differences.slice(0, 5) // Store first 5 for visualization
        };
      }

      differences = nextDifferences;
    }

    return {
      isValid: false,
      error: 'No polynomial pattern detected up to degree 5',
      degree: null,
      type: 'polynomial'
    };
  }

  /**
   * Detects the pattern type of a sequence
   * Returns: 'arithmetic', 'geometric', 'polynomial', or 'unknown'
   */
  detectPatternType(sequence) {
    // Try arithmetic first (most common)
    const arithmetic = this.validateArithmeticProgression(sequence);
    if (arithmetic.isValid) return { type: 'arithmetic', ...arithmetic };

    // Try geometric
    const geometric = this.validateGeometricProgression(sequence);
    if (geometric.isValid) return { type: 'geometric', ...geometric };

    // Try polynomial
    const polynomial = this.detectPolynomialSequence(sequence);
    if (polynomial.isValid) return { type: 'polynomial', ...polynomial };

    return { type: 'unknown', error: 'No recognized pattern detected' };
  }

  /**
   * Predicts the next number(s) in a sequence
   * Automatically detects pattern type
   */
  predictNextNumber(sequence, predictCount = 1) {
    const startTime = performance.now();

    try {
      // Detect pattern type
      const patternAnalysis = this.detectPatternType(sequence);

      if (patternAnalysis.type === 'unknown') {
        this.logger.warn('Unknown pattern detected', { sequence });
        return {
          success: false,
          error: patternAnalysis.error,
          pattern: 'unknown'
        };
      }

      let predictions = [];
      let lastValue = sequence[sequence.length - 1];

      if (patternAnalysis.type === 'arithmetic') {
        const diff = patternAnalysis.difference;
        for (let i = 0; i < predictCount; i++) {
          lastValue += diff;
          predictions.push(lastValue);
        }
      } else if (patternAnalysis.type === 'geometric') {
        const ratio = patternAnalysis.ratio;
        for (let i = 0; i < predictCount; i++) {
          lastValue *= ratio;
          predictions.push(lastValue);
        }
      } else if (patternAnalysis.type === 'polynomial') {
        // For polynomial, use the finite differences method
        predictions = this.predictPolynomialSequence(
          sequence,
          patternAnalysis.degree,
          predictCount
        );
      }

      // Store in memory
      this.echoCount++;
      const analysisTime = performance.now() - startTime;
      const memory = {
        echoId: this.echoCount,
        sequence: [...sequence],
        predictions: predictions,
        pattern: patternAnalysis.type,
        patternDetails: {
          difference: patternAnalysis.difference || null,
          ratio: patternAnalysis.ratio || null,
          degree: patternAnalysis.degree || null
        },
        timestamp: new Date().toISOString(),
        analysisTimeMs: analysisTime
      };

      this.memories.push(memory);

      // Update performance metrics
      this.updatePerformanceMetrics(sequence.length, analysisTime, patternAnalysis.type);

      this.logger.info('Prediction generated', {
        pattern: patternAnalysis.type,
        timeMs: analysisTime
      });

      return {
        success: true,
        predictions: predictions,
        nextNumber: predictions[0],
        pattern: patternAnalysis.type,
        patternDetails: patternAnalysis,
        sequenceLength: sequence.length,
        memory: memory
      };
    } catch (error) {
      this.logger.error('Prediction error', { error: error.message });
      return {
        success: false,
        error: error.message,
        pattern: 'error'
      };
    }
  }

  /**
   * Predicts next numbers in a polynomial sequence
   * Uses the finite differences method
   */
  predictPolynomialSequence(sequence, degree, predictCount) {
    const extendedSeq = [...sequence];

    for (let pred = 0; pred < predictCount; pred++) {
      // Build difference table
      let differences = [extendedSeq];

      for (let d = 0; d < degree; d++) {
        const lastRow = differences[differences.length - 1];
        const newRow = [];
        for (let i = 0; i < lastRow.length - 1; i++) {
          newRow.push(lastRow[i + 1] - lastRow[i]);
        }
        differences.push(newRow);
      }

      // Extend each row by one element, working backwards
      for (let d = degree; d >= 0; d--) {
        if (d === degree) {
          // Assume the last difference continues
          differences[d].push(differences[d][differences[d].length - 1]);
        } else {
          const newValue = differences[d][differences[d].length - 1] + differences[d + 1][differences[d + 1].length - 1];
          differences[d].push(newValue);
        }
      }

      extendedSeq.push(differences[0][differences[0].length - 1]);
    }

    return extendedSeq.slice(sequence.length);
  }

  /**
   * Updates performance metrics
   */
  updatePerformanceMetrics(sequenceLength, analysisTime, patternType) {
    const metrics = this.performanceMetrics;
    metrics.totalSequencesAnalyzed++;
    metrics.averageAnalysisTime =
      (metrics.averageAnalysisTime * (metrics.totalSequencesAnalyzed - 1) + analysisTime) /
      metrics.totalSequencesAnalyzed;
    metrics.longestSequenceLength = Math.max(metrics.longestSequenceLength, sequenceLength);
    metrics.patternDistribution[patternType]++;
  }

  /**
   * Retrieves all stored memories
   */
  getMemories() {
    return [...this.memories];
  }

  /**
   * Retrieves analysis history
   */
  getAnalysisHistory() {
    return [...this.analysisHistory];
  }

  /**
   * Clears all memories
   */
  clearMemories() {
    this.memories = [];
    this.echoCount = 0;
  }

  /**
   * Gets comprehensive statistics
   */
  getStatistics() {
    const totalEchoes = this.memories.length;

    const patterns = {};
    this.memories.forEach(memory => {
      patterns[memory.pattern] = (patterns[memory.pattern] || 0) + 1;
    });

    const averageLength = totalEchoes > 0
      ? (this.memories.reduce((sum, m) => sum + m.sequence.length, 0) / totalEchoes).toFixed(2)
      : 0;

    return {
      totalEchoes: totalEchoes,
      averageSequenceLength: parseFloat(averageLength),
      patternDistribution: patterns,
      performanceMetrics: this.performanceMetrics,
      firstEcho: this.memories.length > 0 ? this.memories[0] : null,
      lastEcho: this.memories.length > 0 ? this.memories[this.memories.length - 1] : null,
      logs: this.logger.getLogs()
    };
  }

  /**
   * Exports analysis data in JSON format
   */
  exportData() {
    return {
      version: '3.0',
      exportDate: new Date().toISOString(),
      memories: this.memories,
      statistics: this.getStatistics(),
      analysisHistory: this.analysisHistory
    };
  }

  /**
   * Imports analysis data from JSON
   */
  importData(data) {
    try {
      if (data.version !== '3.0') {
        throw new Error('Incompatible data version');
      }
      this.memories = data.memories || [];
      this.analysisHistory = data.analysisHistory || [];
      this.echoCount = this.memories.length;
      this.logger.info('Data imported successfully');
      return true;
    } catch (error) {
      this.logger.error('Import failed', { error: error.message });
      return false;
    }
  }
}

// ============================================================================
// Console Interface
// ============================================================================

function displayWelcome() {
  console.clear();
  console.log('\n' + '='.repeat(80));
  console.log('✨ WELCOME TO THE ECHO CHAMBER V3.0 OF SEQUENTIA ✨'.padStart(80));
  console.log('='.repeat(80) + '\n');

  console.log('🏰 ECHO CASTLE - Advanced Sequence Prediction Engine');
  console.log('-'.repeat(80));
  console.log(`
This mystical chamber now supports THREE types of magical sequences:

🔢 ARITHMETIC PROGRESSIONS
   Sequences where each number increases by a constant amount
   Example: 2, 4, 6, 8, 10... (difference: 2)

⚡ GEOMETRIC PROGRESSIONS
   Sequences where each number is multiplied by a constant ratio
   Example: 2, 4, 8, 16, 32... (ratio: 2)

📈 POLYNOMIAL SEQUENCES
   Higher-order patterns like quadratic and cubic sequences
   Example: 1, 4, 9, 16, 25... (quadratic: n²)

The Echo Chamber will automatically detect which pattern your sequence follows!
  `);
  console.log('-'.repeat(80) + '\n');
}

/**
 * Display the main menu
 */
async function displayMenu() {
  console.log('\n' + '='.repeat(80));
  console.log('MAIN MENU - Choose your action:'.padStart(80));
  console.log('='.repeat(80));
  console.log(`
  [1] Predict the next number in a sequence
  [2] View all memories
  [3] View advanced statistics
  [4] Run sample tests
  [5] Clear all memories
  [6] Export data to JSON
  [7] View performance metrics
  [8] Exit the Echo Chamber
  `);
  console.log('-'.repeat(80));
}

/**
 * Parse user input for sequence
 */
function parseSequenceInput(input) {
  try {
    const numbers = input.split(',').map(n => {
      const parsed = parseFloat(n.trim());
      if (isNaN(parsed)) throw new Error(`Invalid number: ${n}`);
      return parsed;
    });
    return { success: true, sequence: numbers };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Run comprehensive sample tests
 */
function runSampleTests(chamber) {
  console.log('\n' + '='.repeat(80));
  console.log('🧪 RUNNING COMPREHENSIVE SAMPLE TESTS'.padStart(80));
  console.log('='.repeat(80) + '\n');

  const tests = [
    {
      name: 'Arithmetic: Simple',
      sequence: [2, 4, 6, 8, 10],
      expectedPattern: 'arithmetic'
    },
    {
      name: 'Arithmetic: Negative difference',
      sequence: [100, 90, 80, 70, 60],
      expectedPattern: 'arithmetic'
    },
    {
      name: 'Geometric: Ratio 2',
      sequence: [1, 2, 4, 8, 16],
      expectedPattern: 'geometric'
    },
    {
      name: 'Geometric: Fractional ratio',
      sequence: [16, 8, 4, 2, 1],
      expectedPattern: 'geometric'
    },
    {
      name: 'Polynomial: Quadratic',
      sequence: [1, 4, 9, 16, 25],
      expectedPattern: 'polynomial'
    },
    {
      name: 'Polynomial: Cubic',
      sequence: [1, 8, 27, 64, 125],
      expectedPattern: 'polynomial'
    },
    {
      name: 'Mixed: Fibonacci-like',
      sequence: [1, 1, 2, 3, 5, 8],
      expectedPattern: 'unknown'
    }
  ];

  let passed = 0;
  let failed = 0;

  tests.forEach((test, index) => {
    const result = chamber.predictNextNumber(test.sequence, 2);
    const patternMatch = result.pattern === test.expectedPattern || 
                        (test.expectedPattern === 'unknown' && !result.success);
    
    if (patternMatch && result.success) {
      console.log(`✅ Test ${index + 1}: ${test.name}`);
      console.log(`   Sequence: ${test.sequence.join(', ')}`);
      console.log(`   Pattern: ${result.pattern}`);
      console.log(`   Predictions: ${result.predictions.map(p => p.toFixed(2)).join(', ')}`);
      passed++;
    } else {
      console.log(`❌ Test ${index + 1}: ${test.name}`);
      console.log(`   Expected: ${test.expectedPattern}, Got: ${result.pattern}`);
      failed++;
    }
    console.log();
  });

  console.log('-'.repeat(80));
  console.log(`Tests Passed: ${passed}/${tests.length}`);
  console.log('-'.repeat(80));
}

// ============================================================================
// Main Interactive Loop
// ============================================================================

async function main() {
  const readline = require('readline');
  const chamber = new EchoChamber();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => {
    return new Promise(resolve => {
      rl.question(prompt, resolve);
    });
  };

  displayWelcome();

  let running = true;
  while (running) {
    await displayMenu();
    const choice = await question('Enter your choice (1-8): ');

    switch (choice.trim()) {
      case '1': {
        // Predict next number
        const input = await question(
          '\n📝 Enter sequence (comma-separated numbers): '
        );
        const parsed = parseSequenceInput(input);

        if (!parsed.success) {
          console.log(`❌ Error: ${parsed.error}`);
        } else {
          const count = await question(
            'How many predictions? (default 1): '
          );
          const predictCount = parseInt(count) || 1;

          const result = chamber.predictNextNumber(parsed.sequence, predictCount);

          if (result.success) {
            console.log(`\n✨ PREDICTION GENERATED:`);
            console.log(`   Input Sequence: ${result.memory.sequence.join(', ')}`);
            console.log(`   Pattern Type: ${result.pattern.toUpperCase()}`);
            console.log(`   Predictions: ${result.predictions.map(p => 
              Number.isInteger(p) ? p : p.toFixed(4)
            ).join(', ')}`);
            if (result.patternDetails.difference) {
              console.log(`   Common Difference: ${result.patternDetails.difference}`);
            }
            if (result.patternDetails.ratio) {
              console.log(`   Common Ratio: ${result.patternDetails.ratio.toFixed(4)}`);
            }
            if (result.patternDetails.degree) {
              console.log(`   Polynomial Degree: ${result.patternDetails.degree}`);
            }
          } else {
            console.log(`\n❌ ${result.error}`);
          }
        }
        break;
      }

      case '2': {
        // View memories
        const memories = chamber.getMemories();
        if (memories.length === 0) {
          console.log('\n📚 The Echo Chamber contains no memories yet.');
        } else {
          console.log(`\n📚 ECHO CHAMBER MEMORIES (${memories.length} total):`);
          console.log('-'.repeat(80));
          memories.forEach((memory, index) => {
            console.log(`\n📌 Echo #${memory.echoId}:`);
            console.log(`   Sequence: ${memory.sequence.join(', ')}`);
            console.log(`   Pattern: ${memory.pattern}`);
            console.log(`   Predictions: ${memory.predictions.map(p =>
              Number.isInteger(p) ? p : p.toFixed(4)
            ).join(', ')}`);
            console.log(`   Time: ${memory.timestamp}`);
          });
        }
        break;
      }

      case '3': {
        // View statistics
        const stats = chamber.getStatistics();
        console.log('\n📊 ADVANCED STATISTICS:');
        console.log('-'.repeat(80));
        console.log(`   Total Echoes: ${stats.totalEchoes}`);
        console.log(`   Average Sequence Length: ${stats.averageSequenceLength}`);
        console.log(`\n   Pattern Distribution:`);
        Object.entries(stats.patternDistribution).forEach(([pattern, count]) => {
          console.log(`     - ${pattern}: ${count}`);
        });
        console.log(`\n   Performance Metrics:`);
        console.log(`     - Total Analyzed: ${stats.performanceMetrics.totalSequencesAnalyzed}`);
        console.log(`     - Avg Analysis Time: ${stats.performanceMetrics.averageAnalysisTime.toFixed(4)}ms`);
        console.log(`     - Longest Sequence: ${stats.performanceMetrics.longestSequenceLength} elements`);
        break;
      }

      case '4': {
        // Run samples
        runSampleTests(chamber);
        break;
      }

      case '5': {
        // Clear memories
        const confirm = await question(
          '\n⚠️  Clear all memories? (yes/no): '
        );
        if (confirm.toLowerCase() === 'yes') {
          chamber.clearMemories();
          console.log('✅ All memories cleared.');
        } else {
          console.log('❌ Cancelled.');
        }
        break;
      }

      case '6': {
        // Export data
        const fs = require('fs');
        const data = chamber.exportData();
        const filename = `echo-chamber-export-${Date.now()}.json`;
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
        console.log(`✅ Data exported to ${filename}`);
        break;
      }

      case '7': {
        // Performance metrics
        const stats = chamber.getStatistics();
        const metrics = stats.performanceMetrics;
        console.log('\n⚡ PERFORMANCE METRICS:');
        console.log('-'.repeat(80));
        console.log(`   Total Sequences Analyzed: ${metrics.totalSequencesAnalyzed}`);
        console.log(`   Average Analysis Time: ${metrics.averageAnalysisTime.toFixed(4)}ms`);
        console.log(`   Longest Sequence: ${metrics.longestSequenceLength} elements`);
        console.log(`\n   Pattern Distribution:`);
        Object.entries(metrics.patternDistribution).forEach(([pattern, count]) => {
          console.log(`     - ${pattern}: ${count}`);
        });
        break;
      }

      case '8': {
        // Exit
        console.log('\n👋 Thank you for visiting the Echo Chamber! Farewell...\n');
        running = false;
        break;
      }

      default:
        console.log('❌ Invalid choice. Please select 1-8.');
    }
  }

  rl.close();
}

// ============================================================================
// Module Exports and Execution
// ============================================================================

module.exports = {
  EchoChamber,
  Logger
};

// Run main loop only if this file is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
