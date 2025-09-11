// deshbort_api.js - Shared Google Sheets fetcher for the dashboard API (ESM)
// Supports either of these env configurations:
// 1) GOOGLE_SERVICE_ACCOUNT_JSON (full JSON string)
// 2) GOOGLE_CLIENT_EMAIL + GOOGLE_PRIVATE_KEY (PEM; supports \n escaped newlines)
// Also requires: SPREADSHEET_ID and optional SHEET_NAME (defaults to 'Sheet1')

import { google } from 'googleapis';

export async function getRequestsFromSheet() {
  const spreadsheetId = process.env.SPREADSHEET_ID;
  if (!spreadsheetId) throw new Error('Missing SPREADSHEET_ID');

  const sheetName = (process.env.SHEET_NAME || 'Sheet1').trim();
  const range = `${sheetName}!A1:Z`;

  // Build credentials
  let auth;
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
  } else if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      undefined,
      privateKey,
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );
    auth = jwt;
  } else {
    throw new Error('Missing service account credentials');
  }

  // Authorize if JWT is used (GoogleAuth will lazy-authorize)
  if (auth && typeof auth.authorize === 'function') {
    await auth.authorize();
  }

  const sheets = google.sheets({ version: 'v4', auth });
  const { data } = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  const values = data.values || [];
  if (values.length === 0) return [];

  const headers = values[0];
  const rows = values.slice(1);
  const requests = rows.map((row) => {
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header] = row[idx] || '';
    });
    return obj;
  });
  return requests;
}


