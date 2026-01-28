# Echo Chamber Web Interface

## 🌐 Web Server Documentation

The Echo Chamber now includes a complete web interface alongside the console application. The web server provides a REST API and a beautiful interactive web UI.

### Running the Web Server

```bash
# Start the web server
npm start
# or
node server.js

# Access the web interface at: http://localhost:3000
```

### Running Console Mode

```bash
# Run the console application
npm run console
# or
node index.js
```

### Running Tests

```bash
npm test
# or
node test.js
```

## 🌐 Web Interface Features

### Tabs

1. **🔮 Predictor Tab**
   - Enter custom sequences (comma-separated numbers)
   - Get instant predictions
   - View detailed results with difference calculation
   - Quick actions to load samples and clear memories

2. **🧪 Samples Tab**
   - Pre-loaded sample sequences for testing
   - Click "Test This" to instantly predict and load into predictor
   - Includes valid and invalid sequences for comprehensive testing

3. **📚 Memories Tab**
   - View all stored predictions
   - Each memory shows the sequence, prediction, and timestamp
   - Refresh button to reload memories
   - See complete history of your predictions

4. **📊 Statistics Tab**
   - View comprehensive statistics
   - Total echoes recorded
   - Average difference calculation
   - Details of first and latest echoes

## 📡 REST API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and application info.

**Response:**
```json
{
  "status": "ok",
  "application": "Echo Chamber",
  "version": "2.0.0"
}
```

### Predict Next Number
```
POST /api/predict
Content-Type: application/json

{
  "sequence": [3, 6, 9, 12]
}
```

**Success Response:**
```json
{
  "success": true,
  "nextNumber": 15,
  "difference": 3,
  "sequenceLength": 4,
  "memory": {
    "echoId": 1,
    "sequence": [3, 6, 9, 12],
    "nextNumber": 15,
    "difference": 3,
    "timestamp": "2024-01-28T10:30:45.123Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Not an arithmetic progression...",
  "nextNumber": null,
  "difference": null
}
```

### Validate Sequence
```
POST /api/validate
Content-Type: application/json

{
  "sequence": [3, 6, 9, 12]
}
```

**Response:**
```json
{
  "isValid": true,
  "difference": 3,
  "error": null
}
```

### Get All Memories
```
GET /api/memories
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "memories": [
    {
      "echoId": 1,
      "sequence": [3, 6, 9, 12],
      "nextNumber": 15,
      "difference": 3,
      "timestamp": "2024-01-28T10:30:45.123Z"
    },
    ...
  ]
}
```

### Clear All Memories
```
DELETE /api/memories
```

**Response:**
```json
{
  "success": true,
  "message": "All memories cleared"
}
```

### Get Statistics
```
GET /api/statistics
```

**Response:**
```json
{
  "success": true,
  "statistics": {
    "totalEchoes": 5,
    "averageDifference": 2.4,
    "firstEcho": {
      "echoId": 1,
      "sequence": [3, 6, 9, 12],
      "nextNumber": 15,
      "difference": 3,
      "timestamp": "2024-01-28T10:30:45.123Z"
    },
    "lastEcho": {
      "echoId": 5,
      "sequence": [10, 20, 30],
      "nextNumber": 40,
      "difference": 10,
      "timestamp": "2024-01-28T10:31:45.123Z"
    }
  }
}
```

### Get Sample Sequences
```
GET /api/samples
```

**Response:**
```json
{
  "success": true,
  "count": 6,
  "samples": [
    {
      "name": "The Primary Sequence",
      "sequence": [3, 6, 9, 12],
      "expected": 15,
      "difference": 3
    },
    ...
  ]
}
```

## 🎨 Web Interface Design

### Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Beautiful gradient background with purple and blue tones
- **Tab Navigation**: Easy switching between different features
- **Real-time Updates**: Instant feedback and results
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Clear, user-friendly error messages
- **Accessibility**: Semantic HTML and keyboard navigation

### Color Scheme
- **Primary**: #667eea (Purple-Blue)
- **Secondary**: #764ba2 (Dark Purple)
- **Accent**: #f093fb (Pink)
- **Background**: Dark gradient (#0f172a → #2d1b69)
- **Success**: #48bb78 (Green)
- **Error**: #f56565 (Red)

## 🔧 Configuration

### Port Configuration
By default, the server runs on port 3000. To use a different port:

```bash
PORT=3001 npm start
```

### CORS
The server enables CORS by default, allowing requests from any origin. This makes it easy to integrate with external applications.

## 📊 Usage Examples

### Using cURL

```bash
# Predict next number
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"sequence": [3, 6, 9, 12]}'

# Get all memories
curl http://localhost:3000/api/memories

# Clear memories
curl -X DELETE http://localhost:3000/api/memories

# Get statistics
curl http://localhost:3000/api/statistics
```

### Using JavaScript (Fetch API)

```javascript
// Predict next number
const result = await fetch('http://localhost:3000/api/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ sequence: [3, 6, 9, 12] })
});
const data = await result.json();
console.log('Next number:', data.nextNumber);
```

### Using Python (requests)

```python
import requests

# Predict next number
response = requests.post(
    'http://localhost:3000/api/predict',
    json={'sequence': [3, 6, 9, 12]}
)
data = response.json()
print(f"Next number: {data['nextNumber']}")
```

## 🚀 Deployment

### Local Network Access
To access the server from other machines on your network:

```bash
# Get your IP address
ipconfig getifaddr en0  # macOS
hostname -I            # Linux
ipconfig               # Windows

# Access at: http://<YOUR_IP>:3000
```

### Production Deployment
For production use, consider:
- Using a process manager like PM2
- Running behind a reverse proxy (nginx, Apache)
- Enabling HTTPS/SSL
- Adding authentication
- Rate limiting

## 📝 Architecture

### Server Structure
- **server.js**: HTTP server with REST API endpoints
- **public/index.html**: Web interface markup
- **public/style.css**: Styling and responsive design
- **public/app.js**: Client-side JavaScript and API integration
- **index.js**: Core EchoChamber class
- **test.js**: Automated test suite

### Request Flow
```
Browser → app.js → Fetch API → server.js → EchoChamber class → JSON Response
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use a different port
PORT=3001 npm start
```

### CORS Issues
The server enables CORS by default. If you still have issues:
```javascript
// The server handles preflight requests automatically
// No additional configuration needed
```

### API Connection Failed
1. Ensure the server is running: `npm start`
2. Check the port (default: 3000)
3. Check browser console for error messages
4. Try accessing http://localhost:3000 directly

## 🔒 Security Notes

- The server runs only on localhost by default when started locally
- All input is validated before processing
- No sensitive data is stored permanently
- CORS is enabled (can be restricted in production)

## 📚 Integration Examples

### HTML Form Example
```html
<form onsubmit="predict(event)">
  <input type="text" id="sequence" placeholder="3, 6, 9, 12">
  <button type="submit">Predict</button>
</form>

<script>
async function predict(e) {
  e.preventDefault();
  const sequence = document.getElementById('sequence').value
    .split(',')
    .map(n => parseFloat(n.trim()));
  
  const response = await fetch('http://localhost:3000/api/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sequence })
  });
  
  const data = await response.json();
  console.log('Next number:', data.nextNumber);
}
</script>
```

## ✨ Next Steps

1. **Start the server**: `npm start`
2. **Open in browser**: http://localhost:3000
3. **Try the samples**: Click on the "🧪 Samples" tab
4. **Make predictions**: Use the "🔮 Predictor" tab
5. **Check memories**: View your prediction history in "📚 Memories"
6. **Review statistics**: See overall statistics in "📊 Statistics"

---

**Enjoy exploring the mystical Echo Chamber!** ✨
