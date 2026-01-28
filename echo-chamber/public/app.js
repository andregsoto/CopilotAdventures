/**
 * Echo Chamber Web Interface - Client Side JavaScript
 * 
 * Handles all interactions with the web UI and communicates with the API
 */

const API_BASE = 'http://localhost:3000/api';

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Make API request
 */
async function apiCall(endpoint, method = 'GET', data = null) {
  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: 'Failed to connect to server'
    };
  }
}

/**
 * Parse comma-separated input string to array of numbers
 */
function parseSequenceInput(input) {
  try {
    const sequence = input
      .split(',')
      .map(s => {
        const num = parseFloat(s.trim());
        if (isNaN(num)) {
          throw new Error(`Invalid number: ${s.trim()}`);
        }
        return num;
      });
    return { success: true, sequence };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Format timestamp to readable format
 */
function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString();
}

/**
 * Display message in result container
 */
function showResult(container, type, title, content) {
  const resultClass = type === 'error' ? 'error' : type === 'warning' ? 'warning' : '';
  container.innerHTML = `
    <div class="result ${resultClass}">
      <div class="result-title">${title}</div>
      <div>${content}</div>
    </div>
  `;
}

/**
 * Display loading state
 */
function showLoading(container, message = 'Loading...') {
  container.innerHTML = `
    <div class="result">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div class="loading"></div>
        <span>${message}</span>
      </div>
    </div>
  `;
}

// ============================================================================
// Tab Management
// ============================================================================

function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');

      // Hide all tabs
      tabContents.forEach(content => {
        content.classList.remove('active');
      });

      // Remove active class from all buttons
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
      });

      // Show selected tab
      document.getElementById(tabName).classList.add('active');
      button.classList.add('active');

      // Load content for specific tabs
      if (tabName === 'samples') {
        loadSamples();
      } else if (tabName === 'memories') {
        loadMemories();
      } else if (tabName === 'statistics') {
        loadStatistics();
      }
    });
  });
}

// ============================================================================
// Predictor Tab
// ============================================================================

async function handlePredict() {
  const input = document.getElementById('sequenceInput').value;
  const resultContainer = document.getElementById('predictorResult');

  // Clear previous result
  resultContainer.innerHTML = '';

  // Validate input
  if (!input.trim()) {
    showResult(resultContainer, 'warning', '⚠️ Empty Input', 'Please enter a sequence');
    return;
  }

  // Parse input
  const parsed = parseSequenceInput(input);
  if (!parsed.success) {
    showResult(resultContainer, 'error', '❌ Invalid Input', `Error: ${parsed.error}`);
    return;
  }

  // Show loading
  showLoading(resultContainer, 'Consulting the Echo Chamber...');

  // Make API call
  const result = await apiCall('/predict', 'POST', {
    sequence: parsed.sequence
  });

  if (!result.success) {
    showResult(resultContainer, 'error', '❌ Error', result.error);
    return;
  }

  // Display result
  const html = `
    <div class="result">
      <div class="result-title">✨ THE ECHO CHAMBER REVEALS ✨</div>
      
      <div style="margin: 15px 0;">
        <strong>Input Sequence:</strong><br>
        <code>[${result.sequence.join(', ')}]</code>
      </div>

      <div class="result-value">${result.nextNumber}</div>

      <div class="result-details">
        <div class="detail-item">
          <span class="detail-label">Predicted Next Number:</span>
          <span class="detail-value">${result.nextNumber}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Common Difference:</span>
          <span class="detail-value">${result.difference}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Sequence Length:</span>
          <span class="detail-value">${result.sequenceLength}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Memory ID:</span>
          <span class="detail-value">#${result.memory.echoId}</span>
        </div>
      </div>
    </div>
  `;

  resultContainer.innerHTML = html;
  document.getElementById('sequenceInput').value = '';
}

function initializePredictor() {
  const predictBtn = document.getElementById('predictBtn');
  const sequenceInput = document.getElementById('sequenceInput');

  predictBtn.addEventListener('click', handlePredict);

  // Allow Enter key to predict
  sequenceInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handlePredict();
    }
  });

  // Clear memories button
  document.getElementById('clearMemoriesBtn').addEventListener('click', async () => {
    if (confirm('Are you sure you want to clear all memories?')) {
      const result = await apiCall('/memories', 'DELETE');
      if (result.success) {
        alert('All memories cleared!');
      }
    }
  });

  // Load sample button
  document.getElementById('loadSampleBtn').addEventListener('click', () => {
    document.querySelector('[data-tab="samples"]').click();
  });
}

// ============================================================================
// Samples Tab
// ============================================================================

async function loadSamples() {
  const container = document.getElementById('samplesContainer');

  if (container.innerHTML !== '') return; // Already loaded

  showLoading(container, 'Loading sample sequences...');

  const result = await apiCall('/samples', 'GET');

  if (!result.success) {
    showResult(container, 'error', 'Error', result.error);
    return;
  }

  let html = '';
  result.samples.forEach((sample, index) => {
    const sequenceStr = `[${sample.sequence.join(', ')}]`;
    const expectedDisplay = sample.expected !== null 
      ? `<div class="sample-expected">Expected: ${sample.expected}</div>`
      : '<div class="sample-expected">Invalid sequence (test error handling)</div>';

    html += `
      <div class="sample-card">
        <div class="sample-name">${sample.name}</div>
        <div class="sample-sequence">${sequenceStr}</div>
        ${expectedDisplay}
        ${sample.expected !== null ? `<div style="color: #cbd5e1; font-size: 0.9em;">Difference: ${sample.difference}</div>` : ''}
        <button class="btn btn-secondary sample-btn" onclick="loadAndPredict('${sample.sequence.join(', ')}')">
          🔮 Test This
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
}

function loadAndPredict(sequence) {
  document.getElementById('sequenceInput').value = sequence;
  document.querySelector('[data-tab="predictor"]').click();
  setTimeout(handlePredict, 100);
}

// ============================================================================
// Memories Tab
// ============================================================================

async function loadMemories() {
  const container = document.getElementById('memoriesContainer');
  
  showLoading(container, 'Loading memories...');

  const result = await apiCall('/memories', 'GET');

  if (!result.success) {
    showResult(container, 'error', 'Error', result.error);
    return;
  }

  if (result.count === 0) {
    container.innerHTML = '<div class="empty-state">📭 The Echo Chamber holds no memories yet.</div>';
    return;
  }

  let html = '';
  result.memories.forEach((memory) => {
    const sequenceStr = `[${memory.sequence.join(', ')}]`;
    const time = formatTime(memory.timestamp);

    html += `
      <div class="memory-card">
        <div class="memory-header">
          <span class="memory-id">Echo #${memory.echoId}</span>
          <span class="memory-time">${time}</span>
        </div>
        <div class="memory-sequence">${sequenceStr}</div>
        <div class="memory-result">
          <div class="memory-item">
            <div class="memory-item-label">Next Number</div>
            <div class="memory-item-value">${memory.nextNumber}</div>
          </div>
          <div class="memory-item">
            <div class="memory-item-label">Difference</div>
            <div class="memory-item-value">${memory.difference}</div>
          </div>
          <div class="memory-item">
            <div class="memory-item-label">Length</div>
            <div class="memory-item-value">${memory.sequence.length}</div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function initializeMemoriesTab() {
  document.getElementById('refreshMemoriesBtn').addEventListener('click', () => {
    document.getElementById('memoriesContainer').innerHTML = '';
    loadMemories();
  });
}

// ============================================================================
// Statistics Tab
// ============================================================================

async function loadStatistics() {
  const container = document.getElementById('statisticsContainer');
  
  showLoading(container, 'Loading statistics...');

  const result = await apiCall('/statistics', 'GET');

  if (!result.success) {
    showResult(container, 'error', 'Error', result.error);
    return;
  }

  const stats = result.statistics;
  let html = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Echoes Recorded</div>
        <div class="stat-value">${stats.totalEchoes}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Average Difference</div>
        <div class="stat-value">${stats.averageDifference}</div>
      </div>
    </div>
  `;

  if (stats.totalEchoes > 0) {
    html += `
      <div style="margin-top: 30px;">
        <h3 style="color: var(--accent-color); margin-bottom: 20px;">📈 Details</h3>
        
        <div class="stat-card">
          <div class="stat-label">First Echo</div>
          <div style="color: #cbd5e1;">
            <strong>Sequence:</strong> [${stats.firstEcho.sequence.join(', ')}]<br>
            <strong>Next:</strong> <span style="color: var(--success-color);">${stats.firstEcho.nextNumber}</span><br>
            <strong>Difference:</strong> ${stats.firstEcho.difference}
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-label">Latest Echo</div>
          <div style="color: #cbd5e1;">
            <strong>Sequence:</strong> [${stats.lastEcho.sequence.join(', ')}]<br>
            <strong>Next:</strong> <span style="color: var(--success-color);">${stats.lastEcho.nextNumber}</span><br>
            <strong>Difference:</strong> ${stats.lastEcho.difference}
          </div>
        </div>
      </div>
    `;
  } else {
    html += '<div class="empty-state">📭 No statistics available yet.</div>';
  }

  container.innerHTML = html;
}

function initializeStatisticsTab() {
  document.getElementById('refreshStatsBtn').addEventListener('click', () => {
    document.getElementById('statisticsContainer').innerHTML = '';
    loadStatistics();
  });
}

// ============================================================================
// Page Initialization
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Echo Chamber Web Interface Loaded');
  
  // Initialize all components
  initializeTabs();
  initializePredictor();
  initializeMemoriesTab();
  initializeStatisticsTab();

  // Test API connection
  apiCall('/health', 'GET').then(result => {
    if (result.status === 'ok') {
      console.log('✅ Connected to Echo Chamber API');
    } else {
      console.error('❌ API connection failed');
    }
  });
});
