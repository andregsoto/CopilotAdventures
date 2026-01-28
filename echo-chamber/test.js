#!/usr/bin/env node

/**
 * Echo Chamber Test Suite
 * 
 * Comprehensive automated tests for the Echo Chamber application
 */

// ============================================================================
// Test Utilities
// ============================================================================

let testsPassed = 0;
let testsFailed = 0;

/**
 * Assert that a condition is true
 * 
 * @param {boolean} condition - The condition to test
 * @param {string} message - The test message
 */
function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
    testsPassed++;
  } else {
    console.log(`  ❌ ${message}`);
    testsFailed++;
  }
}

/**
 * Assert that a value equals an expected value
 * 
 * @param {*} actual - The actual value
 * @param {*} expected - The expected value
 * @param {string} message - The test message
 */
function assertEqual(actual, expected, message) {
  assert(actual === expected, `${message} (expected: ${expected}, got: ${actual})`);
}

/**
 * Run a test suite
 * 
 * @param {string} suiteName - The name of the test suite
 * @param {Function} testFn - The test function
 */
function describe(suiteName, testFn) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`🧪 ${suiteName}`);
  console.log(`${'='.repeat(70)}`);
  testFn();
}

// ============================================================================
// Import EchoChamber class from index.js
// ============================================================================

const EchoChamber = require('./index.js');

// ============================================================================
// Test Suites
// ============================================================================

describe('Core Sequence Validation', () => {
  const chamber = new EchoChamber();

  // Test valid arithmetic progression
  const validSeq = [3, 6, 9, 12];
  const validation = chamber.validateArithmeticProgression(validSeq);
  assert(validation.isValid, 'Should validate valid arithmetic progression');
  assertEqual(validation.difference, 3, 'Should calculate correct difference');

  // Test invalid sequence - not an arithmetic progression
  const invalidSeq = [1, 2, 4, 7];
  const invalidValidation = chamber.validateArithmeticProgression(invalidSeq);
  assert(!invalidValidation.isValid, 'Should reject non-arithmetic progression');

  // Test edge case - empty array
  const emptySeq = [];
  const emptyValidation = chamber.validateArithmeticProgression(emptySeq);
  assert(!emptyValidation.isValid, 'Should reject empty sequence');

  // Test edge case - single element
  const singleSeq = [5];
  const singleValidation = chamber.validateArithmeticProgression(singleSeq);
  assert(!singleValidation.isValid, 'Should reject single-element sequence');

  // Test edge case - two elements
  const twoSeq = [1, 2];
  const twoValidation = chamber.validateArithmeticProgression(twoSeq);
  assert(twoValidation.isValid, 'Should accept two-element sequence');
  assertEqual(twoValidation.difference, 1, 'Should calculate difference for two elements');
});

describe('Sequence Prediction', () => {
  const chamber = new EchoChamber();

  // Test primary sequence from requirements
  const result1 = chamber.predictNextNumber([3, 6, 9, 12]);
  assert(result1.success, 'Primary sequence should be valid');
  assertEqual(result1.nextNumber, 15, 'Primary sequence should predict 15');

  // Test increasing sequence
  const result2 = chamber.predictNextNumber([2, 4, 6, 8, 10]);
  assert(result2.success, 'Increasing sequence should be valid');
  assertEqual(result2.nextNumber, 12, 'Increasing sequence should predict 12');

  // Test decreasing sequence
  const result3 = chamber.predictNextNumber([20, 15, 10, 5]);
  assert(result3.success, 'Decreasing sequence should be valid');
  assertEqual(result3.nextNumber, 0, 'Decreasing sequence should predict 0');

  // Test negative numbers
  const result4 = chamber.predictNextNumber([-5, -3, -1, 1]);
  assert(result4.success, 'Negative sequence should be valid');
  assertEqual(result4.nextNumber, 3, 'Negative sequence should predict 3');

  // Test invalid sequence
  const result5 = chamber.predictNextNumber([1, 2, 4, 7]);
  assert(!result5.success, 'Non-arithmetic progression should fail');
});

describe('Memory Management', () => {
  const chamber = new EchoChamber();

  // Test storing memories
  chamber.predictNextNumber([3, 6, 9, 12]);
  chamber.predictNextNumber([2, 4, 6]);
  chamber.predictNextNumber([10, 20, 30]);

  const memories = chamber.getMemories();
  assertEqual(memories.length, 3, 'Should store 3 memories');
  assertEqual(memories[0].nextNumber, 15, 'First memory should have correct prediction');
  assertEqual(memories[1].nextNumber, 8, 'Second memory should have correct prediction');
  assertEqual(memories[2].nextNumber, 40, 'Third memory should have correct prediction');

  // Test memory structure
  assert(memories[0].echoId !== undefined, 'Memory should have echoId');
  assert(memories[0].sequence !== undefined, 'Memory should store sequence');
  assert(memories[0].difference !== undefined, 'Memory should store difference');
  assert(memories[0].timestamp !== undefined, 'Memory should have timestamp');

  // Test clearing memories
  chamber.clearMemories();
  assertEqual(chamber.getMemories().length, 0, 'Should clear all memories');
});

describe('Statistics Calculation', () => {
  const chamber = new EchoChamber();

  // Test empty statistics
  const emptyStats = chamber.getStatistics();
  assertEqual(emptyStats.totalEchoes, 0, 'Empty chamber should have 0 echoes');

  // Add some echoes
  chamber.predictNextNumber([3, 6, 9, 12]); // difference: 3
  chamber.predictNextNumber([0, 5, 10]);     // difference: 5
  chamber.predictNextNumber([100, 110, 120]); // difference: 10

  const stats = chamber.getStatistics();
  assertEqual(stats.totalEchoes, 3, 'Should have 3 echoes');
  assertEqual(stats.averageDifference, 6, 'Average difference should be 6');
  assert(stats.firstEcho !== null, 'Should have first echo');
  assert(stats.lastEcho !== null, 'Should have last echo');
});

describe('Error Handling', () => {
  const chamber = new EchoChamber();

  // Test non-number input
  const result1 = chamber.predictNextNumber([1, 'two', 3]);
  assert(!result1.success, 'Should reject non-number elements');

  // Test NaN values
  const result2 = chamber.predictNextNumber([1, NaN, 3]);
  assert(!result2.success, 'Should reject NaN values');

  // Test null/undefined
  const result3 = chamber.predictNextNumber([1, null, 3]);
  assert(!result3.success, 'Should reject null values');

  // Test non-array input
  const result4 = chamber.validateArithmeticProgression('not an array');
  assert(!result4.isValid, 'Should reject non-array input');
});

describe('Edge Cases', () => {
  const chamber = new EchoChamber();

  // Test with decimal numbers
  const result1 = chamber.predictNextNumber([1.5, 2.5, 3.5, 4.5]);
  assert(result1.success, 'Should handle decimal numbers');
  assertEqual(result1.nextNumber, 5.5, 'Should predict decimal number');

  // Test with very large numbers
  const result2 = chamber.predictNextNumber([1000000, 2000000, 3000000]);
  assert(result2.success, 'Should handle large numbers');
  assertEqual(result2.nextNumber, 4000000, 'Should predict large number');

  // Test with zero difference
  const result3 = chamber.predictNextNumber([5, 5, 5, 5]);
  assert(result3.success, 'Should handle zero difference');
  assertEqual(result3.difference, 0, 'Should calculate zero difference');
  assertEqual(result3.nextNumber, 5, 'Should predict same number');

  // Test with negative differences
  const result4 = chamber.predictNextNumber([100, 75, 50, 25]);
  assert(result4.success, 'Should handle negative differences');
  assertEqual(result4.difference, -25, 'Should calculate negative difference');
  assertEqual(result4.nextNumber, 0, 'Should predict with negative difference');
});

// ============================================================================
// Test Summary
// ============================================================================

console.log(`\n${'='.repeat(70)}`);
console.log('📊 TEST SUMMARY');
console.log(`${'='.repeat(70)}`);
console.log(`✅ Tests Passed: ${testsPassed}`);
console.log(`❌ Tests Failed: ${testsFailed}`);
console.log(`📈 Total Tests: ${testsPassed + testsFailed}`);

if (testsFailed === 0) {
  console.log('\n🎉 All tests passed! The Echo Chamber is functioning perfectly!');
  process.exit(0);
} else {
  console.log(`\n⚠️  ${testsFailed} test(s) failed. Please review the errors above.`);
  process.exit(1);
}
