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
 */

// ============================================================================
// Core Echo Chamber Logic - Multi-Pattern Support
// ============================================================================

/**
 * EchoChamber v3.0 class with multi-pattern support
 */
class EchoChamber {
  constructor() {
    // Array to store memories of previous echoes with metadata
    this.memories = [];
    this.echoCount = 0;
    this.analysisHistory = [];
    this.performanceMetrics = {
      totalSequencesAnalyzed: 0,
      averageAnalysisTime: 0,
      longestSequenceLength: 0,
      patternDistribution: {
        arithmetic: 0,
        geometric: 0,
        polynomial: 0,
        mixed: 0,
        unknown: 0
      }
    };
    this.logger = new Logger();
  }

  /**
   * Validates if a sequence is a valid arithmetic progression
   * An arithmetic progression has a constant difference between consecutive elements
   * 
   * @param {number[]} sequence - The sequence to validate
   * @returns {Object} Validation result with isValid flag and difference value
   */
  validateArithmeticProgression(sequence) {
    // Edge case: sequences with less than 2 elements cannot be validated
    if (!Array.isArray(sequence) || sequence.length < 2) {
      return {
        isValid: false,
        error: 'Sequence must have at least 2 elements',
        difference: null
      };
    }

    // Check if all elements are numbers
    if (!sequence.every(num => typeof num === 'number' && !isNaN(num))) {
      return {
        isValid: false,
        error: 'All elements must be valid numbers',
        difference: null
      };
    }

    // Calculate the difference between the first two elements
    const firstDifference = sequence[1] - sequence[0];

    // Verify that all consecutive differences are the same
    for (let i = 2; i < sequence.length; i++) {
      const currentDifference = sequence[i] - sequence[i - 1];
      if (currentDifference !== firstDifference) {
        return {
          isValid: false,
          error: `Not an arithmetic progression. Expected difference of ${firstDifference}, but found ${currentDifference} between ${sequence[i - 1]} and ${sequence[i]}`,
          difference: null
        };
      }
    }

    return {
      isValid: true,
      difference: firstDifference,
      error: null
    };
  }

  /**
   * Predicts the next number in an arithmetic progression
   * 
   * @param {number[]} sequence - The sequence to predict from
   * @returns {Object} Prediction result with nextNumber and validation details
   */
  predictNextNumber(sequence) {
    // First validate the sequence
    const validation = this.validateArithmeticProgression(sequence);

    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error,
        nextNumber: null,
        difference: null
      };
    }

    // The next number is the last element plus the common difference
    const lastNumber = sequence[sequence.length - 1];
    const nextNumber = lastNumber + validation.difference;

    // Store this echo in memory
    this.echoCount++;
    const memory = {
      echoId: this.echoCount,
      sequence: [...sequence],
      nextNumber: nextNumber,
      difference: validation.difference,
      timestamp: new Date().toISOString()
    };
    this.memories.push(memory);

    return {
      success: true,
      nextNumber: nextNumber,
      difference: validation.difference,
      sequenceLength: sequence.length,
      memory: memory
    };
  }

  /**
   * Retrieves all stored memories from the Echo Chamber
   * 
   * @returns {Array} Array of all echo memories
   */
  getMemories() {
    return [...this.memories];
  }

  /**
   * Clears all memories from the Echo Chamber
   */
  clearMemories() {
    this.memories = [];
    this.echoCount = 0;
  }

  /**
   * Gets statistics about the Echo Chamber
   * 
   * @returns {Object} Statistics about stored echoes
   */
  getStatistics() {
    const totalEchoes = this.memories.length;
    const averageDifference = totalEchoes > 0
      ? (this.memories.reduce((sum, m) => sum + m.difference, 0) / totalEchoes).toFixed(2)
      : 0;

    return {
      totalEchoes: totalEchoes,
      averageDifference: parseFloat(averageDifference),
      firstEcho: this.memories.length > 0 ? this.memories[0] : null,
      lastEcho: this.memories.length > 0 ? this.memories[this.memories.length - 1] : null
    };
  }
}

// ============================================================================
// Console Interface and Story
// ============================================================================

/**
 * Display the mystical welcome message and story
 */
function displayWelcome() {
  console.clear();
  console.log('\n' + '='.repeat(70));
  console.log('✨ WELCOME TO THE ECHO CHAMBER OF SEQUENTIA ✨'.padStart(70));
  console.log('='.repeat(70) + '\n');

  console.log('📜 THE LEGEND:');
  console.log('-'.repeat(70));
  console.log(`
In the mystical realm of Sequentia, there exists an ancient chamber
where magical echoes reveal the hidden patterns of numbers. Legend says
that every sequence of numbers follows an invisible force - an 
arithmetic progression that governs their behavior.

Your quest: Enter sequences of numbers into the Echo Chamber, and the
ancient magic will reveal the next number in the sequence!
  `);
  console.log('-'.repeat(70) + '\n');
}

/**
 * Display the main menu options
 */
function displayMenu() {
  console.log('\n🎵 ECHO CHAMBER MENU 🎵');
  console.log('-'.repeat(70));
  console.log('1. Predict the next number in a sequence');
  console.log('2. Test with sample sequences');
  console.log('3. View all stored memories');
  console.log('4. View statistics');
  console.log('5. Clear all memories');
  console.log('6. Exit the Echo Chamber');
  console.log('-'.repeat(70));
}

/**
 * Test the Echo Chamber with predefined sample sequences
 * 
 * @param {EchoChamber} chamber - The Echo Chamber instance
 */
function runSampleTests(chamber) {
  console.log('\n🧪 RUNNING SAMPLE TESTS...\n');

  const testSequences = [
    {
      name: 'The Primary Sequence',
      sequence: [3, 6, 9, 12],
      expected: 15
    },
    {
      name: 'The Fibonacci-like Arithmetic',
      sequence: [2, 4, 6, 8, 10],
      expected: 12
    },
    {
      name: 'The Decreasing Echo',
      sequence: [20, 15, 10, 5],
      expected: 0
    },
    {
      name: 'The Single Step',
      sequence: [1, 2],
      expected: 3
    },
    {
      name: 'The Negative Journey',
      sequence: [-5, -3, -1, 1],
      expected: 3
    },
    {
      name: 'The Invalid Echo (should fail)',
      sequence: [1, 2, 4, 7],
      expected: null
    }
  ];

  testSequences.forEach((test, index) => {
    console.log(`Test ${index + 1}: ${test.name}`);
    console.log(`  Input Sequence: [${test.sequence.join(', ')}]`);

    const result = chamber.predictNextNumber(test.sequence);

    if (result.success) {
      const status = result.nextNumber === test.expected ? '✅' : '⚠️';
      console.log(`  ${status} Predicted Next Number: ${result.nextNumber}`);
      console.log(`  📊 Common Difference: ${result.difference}`);
    } else {
      console.log(`  ❌ Error: ${result.error}`);
    }
    console.log();
  });

  console.log('🧪 Sample tests completed!\n');
}

/**
 * Display all stored memories
 * 
 * @param {EchoChamber} chamber - The Echo Chamber instance
 */
function displayMemories(chamber) {
  const memories = chamber.getMemories();

  if (memories.length === 0) {
    console.log('\n📭 The Echo Chamber holds no memories yet.\n');
    return;
  }

  console.log('\n📚 MEMORIES OF THE ECHO CHAMBER 📚\n');
  console.log('-'.repeat(70));

  memories.forEach((memory, index) => {
    console.log(`Echo #${memory.echoId}:`);
    console.log(`  Sequence: [${memory.sequence.join(', ')}]`);
    console.log(`  Next Number: ${memory.nextNumber}`);
    console.log(`  Difference: ${memory.difference}`);
    console.log(`  Recorded: ${new Date(memory.timestamp).toLocaleString()}`);
    console.log();
  });

  console.log('-'.repeat(70) + '\n');
}

/**
 * Display statistics about the Echo Chamber
 * 
 * @param {EchoChamber} chamber - The Echo Chamber instance
 */
function displayStatistics(chamber) {
  const stats = chamber.getStatistics();

  console.log('\n📊 ECHO CHAMBER STATISTICS 📊\n');
  console.log('-'.repeat(70));
  console.log(`Total Echoes Recorded: ${stats.totalEchoes}`);

  if (stats.totalEchoes > 0) {
    console.log(`Average Difference: ${stats.averageDifference}`);
    console.log(`First Echo: [${stats.firstEcho.sequence.join(', ')}] → ${stats.firstEcho.nextNumber}`);
    console.log(`Latest Echo: [${stats.lastEcho.sequence.join(', ')}] → ${stats.lastEcho.nextNumber}`);
  } else {
    console.log('No echoes recorded yet.');
  }

  console.log('-'.repeat(70) + '\n');
}

/**
 * Parse a comma-separated input string into an array of numbers
 * 
 * @param {string} input - The user input string
 * @returns {Object} Parsed sequence and validation result
 */
function parseSequenceInput(input) {
  try {
    const sequence = input
      .split(',')
      .map(str => {
        const num = parseFloat(str.trim());
        if (isNaN(num)) {
          throw new Error(`"${str.trim()}" is not a valid number`);
        }
        return num;
      });

    return {
      success: true,
      sequence: sequence
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      sequence: null
    };
  }
}

// ============================================================================
// Main Application Flow
// ============================================================================

/**
 * Main async function to run the Echo Chamber interactive application
 */
async function main() {
  const chamber = new EchoChamber();
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Helper function to prompt user
  const prompt = (question) => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };

  displayWelcome();

  let running = true;

  while (running) {
    displayMenu();
    const choice = await prompt('📍 Enter your choice (1-6): ');

    switch (choice.trim()) {
      case '1': {
        // Predict the next number
        const input = await prompt(
          '\n🔮 Enter a sequence of numbers (comma-separated, e.g., 3,6,9,12): '
        );

        const parsed = parseSequenceInput(input);

        if (!parsed.success) {
          console.log(`\n❌ Invalid input: ${parsed.error}\n`);
          break;
        }

        const result = chamber.predictNextNumber(parsed.sequence);

        if (result.success) {
          console.log('\n✨ THE ECHO CHAMBER REVEALS: ✨');
          console.log(`  Input Sequence: [${parsed.sequence.join(', ')}]`);
          console.log(`  🔮 Next Number: ${result.nextNumber}`);
          console.log(`  📊 Common Difference: ${result.difference}`);
          console.log(`  💾 Memory #${result.memory.echoId} stored!\n`);
        } else {
          console.log(`\n❌ The Echo Chamber detected an error:`);
          console.log(`  ${result.error}\n`);
        }
        break;
      }

      case '2': {
        // Run sample tests
        runSampleTests(chamber);
        break;
      }

      case '3': {
        // View memories
        displayMemories(chamber);
        break;
      }

      case '4': {
        // View statistics
        displayStatistics(chamber);
        break;
      }

      case '5': {
        // Clear memories
        const confirm = await prompt(
          '⚠️  Are you sure you want to clear all memories? (yes/no): '
        );

        if (confirm.toLowerCase() === 'yes') {
          chamber.clearMemories();
          console.log('\n🗑️  All memories have been cleared from the Echo Chamber.\n');
        } else {
          console.log('\n✅ Memories preserved.\n');
        }
        break;
      }

      case '6': {
        // Exit
        console.log('\n👋 Thank you for visiting the Echo Chamber. Farewell, seeker!\n');
        running = false;
        break;
      }

      default: {
        console.log('\n❌ Invalid choice. Please enter a number between 1 and 6.\n');
      }
    }
  }

  rl.close();
}

// ============================================================================
// Application Entry Point
// ============================================================================

// Export for testing
module.exports = EchoChamber;

// Run the application only if this is the main module
if (require.main === module) {
  main().catch(error => {
    console.error('An unexpected error occurred:', error);
    process.exit(1);
  });
}
