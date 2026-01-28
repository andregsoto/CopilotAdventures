# Mathematical Foundations

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

