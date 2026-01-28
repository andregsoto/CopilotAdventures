# Echo Chamber v3.0 - API Documentation

## Overview

Echo Chamber is a RESTful API for analyzing and predicting number sequences. It supports three types of patterns:

- **Arithmetic Progressions**: Constant difference between terms
- **Geometric Progressions**: Constant ratio between terms
- **Polynomial Sequences**: Higher-order patterns (quadratic, cubic, etc.)

## Base URL

```
http://localhost:3000
```

## Authentication

No authentication required.

## Error Handling

All errors return JSON response with error message:

```json
{
  "error": "Error description"
}
```

## Endpoints

### 1. Health Check

```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "application": "Echo Chamber",
  "version": "3.0.0",
  "timestamp": "2024-01-28T12:00:00Z"
}
```

### 2. Predict Next Numbers

```
POST /api/predict
```

**Request:**
```json
{
  "sequence": [1, 2, 4, 8, 16],
  "predictCount": 2
}
```

**Response:**
```json
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
```

### 3. Validate Pattern

```
POST /api/validate
```

**Request:**
```json
{
  "sequence": [1, 4, 9, 16, 25]
}
```

**Response:**
```json
{
  "sequence": [1, 4, 9, 16, 25],
  "analysis": {
    "type": "polynomial",
    "degree": 2,
    "error": null
  }
}
```

### 4. Get Memories

```
GET /api/memories
```

**Response:**
```json
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
```

### 5. Get Statistics

```
GET /api/statistics
```

**Response:**
```json
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
```

### 6. Get Sample Sequences

```
GET /api/samples
```

**Response:**
```json
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
```

### 7. Clear All Memories

```
POST /api/clear
```

**Response:**
```json
{
  "message": "All memories have been cleared",
  "timestamp": "2024-01-28T12:00:00Z"
}
```

## Example Usage

### Using curl

```bash
# Predict next numbers
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "sequence": [2, 4, 6, 8, 10],
    "predictCount": 1
  }'

# Get statistics
curl http://localhost:3000/api/statistics

# Get samples
curl http://localhost:3000/api/samples
```

### Using JavaScript/fetch

```javascript
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
```

## Rate Limiting

No rate limiting is enforced.

## CORS

CORS is enabled for all origins.

## Pagination

The /api/memories endpoint returns the last 50 memories by default.
