# API Integration Guide for AmLI Requests Dashboard

## Overview
This guide explains how to integrate the HTML dashboard with your serverless API to fetch real data from Google Sheets.

## Current Setup
The dashboard currently uses mock data. To connect to your real data, you need to:

1. **Replace the mock data** in `requests-dashboard.html`
2. **Create a serverless API endpoint** that returns your Google Sheets data
3. **Update the JavaScript** to call your API

## API Endpoint Requirements

### Expected API Response Format
Your API should return data in this format:

```json
[
  {
    "Request_Id": "REQ001",
    "First_name": "John",
    "Last_name": "Doe",
    "Email": "john.doe@email.com",
    "Phone_Number": "+1234567890",
    "Pickup_Location": "123 Main St, New York",
    "Dropoff_Location": "456 Oak Ave, Brooklyn",
    "Start_Date": "2024-01-15",
    "Preferred_time": "09:00 AM",
    "Service_Duration": "2 hours",
    "Transportation_Type": "Sedan",
    "No_Of_Personnel": "2",
    "Additional_Information": "VIP client, need security",
    "Status": "Pending",
    "Driver_Full_Name": "",
    "Driver_Phone_No": "",
    "Vehicle_Type": "",
    "License_Number": ""
  }
]
```

## Integration Steps

### Step 1: Update the loadRequests() function

In `requests-dashboard.html`, find the `loadRequests()` function and replace:

```javascript
// Current mock implementation
async function loadRequests() {
    showLoading();
    
    try {
        // Simulate API call - Replace with your actual API endpoint
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In production, replace this with:
        // const response = await fetch('/api/requests');
        // allRequests = await response.json();
        
        allRequests = mockRequests;
        filteredRequests = [...allRequests];
        updateStats();
        renderRequests();
        hideLoading();
    } catch (error) {
        console.error('Error loading requests:', error);
        hideLoading();
        showError('Failed to load requests. Please try again.');
    }
}
```

With:

```javascript
// Real API implementation
async function loadRequests() {
    showLoading();
    
    try {
        // Replace with your actual API endpoint
        const response = await fetch('https://your-api-domain.com/api/requests');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        allRequests = await response.json();
        filteredRequests = [...allRequests];
        updateStats();
        renderRequests();
        hideLoading();
    } catch (error) {
        console.error('Error loading requests:', error);
        hideLoading();
        showError('Failed to load requests. Please try again.');
    }
}
```

### Step 2: Create Your Serverless API

#### Option A: Using Vercel (Recommended)

1. Create `api/requests.js` in your project:

```javascript
// api/requests.js
import mysql from 'mysql2/promise';
import gspread from 'gspread';
import { ServiceAccountCredentials } from 'oauth2client';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Google Sheets setup
        const scope = [
            "https://spreadsheets.google.com/feeds",
            "https://www.googleapis.com/auth/drive"
        ];
        
        const creds = ServiceAccountCredentials.from_json_keyfile_name(
            process.env.GOOGLE_SERVICE_ACCOUNT_KEY, 
            scope
        );
        
        const client = gspread.authorize(creds);
        const sheet = client.open("AmLI_Service_Requests").sheet1;
        const data = sheet.get_all_values();
        
        const headers = data[0];
        const rows = data[1:];
        
        // Convert to objects
        const requests = rows.map(row => {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index] || '';
            });
            return obj;
        });
        
        res.status(200).json(requests);
        
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
```

2. Add environment variables in Vercel:
   - `GOOGLE_SERVICE_ACCOUNT_KEY`: Your service account JSON as a string

#### Option B: Using Netlify Functions

1. Create `netlify/functions/requests.js`:

```javascript
// netlify/functions/requests.js
const mysql = require('mysql2/promise');
const gspread = require('gspread');
const { ServiceAccountCredentials } = require('oauth2client');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    try {
        // Your Google Sheets code here (same as above)
        // ...
        
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requests)
        };
        
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};
```

### Step 3: Update API URL

In your HTML file, update the fetch URL to match your deployed API:

```javascript
// For Vercel
const response = await fetch('https://your-app.vercel.app/api/requests');

// For Netlify
const response = await fetch('https://your-app.netlify.app/.netlify/functions/requests');

// For custom domain
const response = await fetch('https://your-domain.com/api/requests');
```

## Security Considerations

1. **CORS**: Make sure your API allows requests from your domain
2. **Authentication**: Consider adding API keys or JWT tokens
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **Input Validation**: Validate all inputs on the server side

## Testing

1. Test your API endpoint directly:
   ```bash
   curl https://your-api-domain.com/api/requests
   ```

2. Check browser console for any CORS or network errors
3. Verify the data format matches the expected structure

## Troubleshooting

### Common Issues:

1. **CORS Error**: Add CORS headers to your API response
2. **404 Error**: Check your API endpoint URL
3. **500 Error**: Check server logs for Google Sheets authentication issues
4. **Data Format Error**: Ensure your API returns the exact format expected

### Debug Steps:

1. Open browser DevTools → Network tab
2. Check if the API call is being made
3. Verify the response format
4. Check console for JavaScript errors

## Next Steps

1. Deploy your serverless API
2. Update the fetch URL in the HTML file
3. Test the integration
4. Add error handling for network failures
5. Consider adding loading states and retry logic

## Support

If you need help with the integration, check:
- Your serverless platform documentation
- Google Sheets API documentation
- Browser console for specific error messages
