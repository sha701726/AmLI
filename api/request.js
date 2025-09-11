// Serverless function to fetch requests from Google Sheets
// Environment variables required:
// - GOOGLE_SERVICE_ACCOUNT_JSON (full JSON string)
// - SPREADSHEET_ID (Google Sheet ID)
// - SHEET_NAME (optional, defaults to Sheet1)

const { google } = require('googleapis');

module.exports = async (req, res) => {
  if (req && req.method && req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!credentials) {
      res.status(500).json({ message: 'Missing GOOGLE_SERVICE_ACCOUNT_JSON' });
      return;
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const sheetName = process.env.SHEET_NAME || 'Sheet1';
    const range = `${sheetName}!A1:Z`;

    if (!spreadsheetId) {
      res.status(500).json({ message: 'Missing SPREADSHEET_ID' });
      return;
    }

    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const values = data.values || [];
    if (values.length === 0) {
      res.status(200).json([]);
      return;
    }

    const headers = values[0];
    const rows = values.slice(1);

    const requests = rows.map((row) => {
      const obj = {};
      headers.forEach((header, idx) => {
        obj[header] = row[idx] || '';
      });
      return obj;
    });

    // CORS headers (adjust origin as needed)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }

    res.status(200).json(requests);
  } catch (err) {
    console.error('Sheets read error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

import { google } from "googleapis";
import { Resend } from "resend";

export default async function handler(req, res) {
  // CORS headers (adjust CORS_ALLOW_ORIGIN in env as needed)
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ALLOW_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Validate required environment variables
    const requiredEnv = [
      "GOOGLE_CLIENT_EMAIL",
      "GOOGLE_PRIVATE_KEY",
      "SPREADSHEET_ID",
      "SHEET_NAME",
    ];
    for (const key of requiredEnv) {
      if (!process.env[key]) {
        return res.status(500).json({ error: `Missing environment variable: ${key}` });
      }
    }

    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    // Explicitly authorize to fail fast if key/permissions are wrong
    await auth.authorize();

    const sheets = google.sheets({ version: "v4", auth });

    // Safely parse body (supports raw JSON string or parsed object)
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: "Invalid JSON body" });
      }
    }
    body = body || {};

    // Accept both hyphenated and camelCase field names
    const firstName = body["first-name"] ?? body.firstName ?? "";
    const lastName = body["last-name"] ?? body.lastName ?? "";
    const email = body.email ?? "";
    const phone = body.phone ?? body["phone-number"] ?? "";
    const pickupLocation = body["pickup-location"] ?? body.pickupLocation ?? "";
    const dropoffLocation = body["dropoff-location"] ?? body.dropoffLocation ?? "";
    const startDate = body["start-date"] ?? body.startDate ?? "";
    const preferredTime = body["preferred-time"] ?? body.preferredTime ?? "";
    const duration = body.duration ?? body["service-duration"] ?? "";
    const transportType = body["transport-type"] ?? body.transportType ?? body.transportationType ?? "";
    const personnelCount = body["personnel-count"] ?? body.personnelCount ?? body["no-of-personnel"] ?? "";
    const additionalInfo = body["additional-info"] ?? body.additionalInfo ?? "";
    const providedTimestamp = body["request-timestamp"] ?? body.requestTimestamp;
    const providedRequestId = body["request-id"] ?? body.requestId;

    const requestTimestamp = providedTimestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const requestId = providedRequestId || `REQ-${Date.now()}`;

    // Compute Serial No. by counting existing filled rows in column A
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const configuredSheetName = (process.env.SHEET_NAME || "").trim();
    const escapeSheetName = (name) => `'${String(name).replace(/'/g, "''")}'`;
    let effectiveSheetName = configuredSheetName;
    let safeRangeSheet = escapeSheetName(effectiveSheetName);

    let colAValues = [];
    try {
      const colA = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${safeRangeSheet}!A:A`,
        majorDimension: "ROWS",
      });
      colAValues = colA.data.values || [];
    } catch (e) {
      // Fallback: if range parsing fails, use the first available sheet
      const meta = await sheets.spreadsheets.get({ spreadsheetId });
      const firstSheet = meta.data.sheets?.[0]?.properties?.title;
      if (!firstSheet) {
        throw new Error("No sheets found in spreadsheet");
      }
      effectiveSheetName = firstSheet;
      safeRangeSheet = escapeSheetName(effectiveSheetName);
      const colAFallback = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${safeRangeSheet}!A:A`,
        majorDimension: "ROWS",
      });
      colAValues = colAFallback.data.values || [];
    }
    const headerLooksLikeSerial =
      colAValues[0] &&
      colAValues[0][0] &&
      typeof colAValues[0][0] === "string" &&
      /serial/i.test(colAValues[0][0]);
    const serialNo = headerLooksLikeSerial ? colAValues.length : colAValues.length + 1;

    const row = [
      serialNo, // Serial No.
      requestTimestamp, // Request Timestamp
      firstName,
      lastName,
      email,
      phone,
      pickupLocation,
      dropoffLocation,
      startDate,
      preferredTime,
      duration,
      transportType,
      personnelCount,
      additionalInfo,
      requestId, // Request Id
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${safeRangeSheet}!A:O`, // 15 columns
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    // Try to send email via Resend if configured
    let emailSent = false;
    let emailError;
    try {
      if (process.env.RESEND_API_KEY && process.env.EMAIL_FROM && process.env.EMAIL_TO) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const adminRecipients = String(process.env.EMAIL_TO)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        const recipients = [...adminRecipients];
        if (email) {
          recipients.push(email);
        }
        const subject = `Transportation Booking - ${firstName} ${lastName} - ${requestId}`;
        const text = [
          `Request ID: ${requestId}`,
          `Serial No.: ${serialNo}`,
          `Request Timestamp: ${requestTimestamp}`,
          "",
          "Basic Information:",
          `First Name: ${firstName || "Not provided"}`,
          `Last Name: ${lastName || "Not provided"}`,
          `Email: ${email || "Not provided"}`,
          `Phone: ${phone || "Not provided"}`,
          "",
          "Travel Details:",
          `Pickup Location: ${pickupLocation || "Not provided"}`,
          `Drop-off Location: ${dropoffLocation || "Not provided"}`,
          `Start Date: ${startDate || "Not provided"}`,
          `Preferred Time: ${preferredTime || "Not provided"}`,
          "",
          "Service Details:",
          `Duration: ${duration || "Not provided"}`,
          `Transport Type: ${transportType || "Not provided"}`,
          `Personnel Count: ${personnelCount || "Not specified"}`,
          "",
          "Additional Information:",
          `${additionalInfo || "None"}`,
        ].join("\n");

        const sendResult = await resend.emails.send({
          from: process.env.EMAIL_FROM,
          to: recipients,
          subject,
          text,
        });
        if (sendResult && !sendResult.error) {
          emailSent = true;
        } else if (sendResult && sendResult.error) {
          emailError = sendResult.error.message || "Unknown email error";
        }
      }
    } catch (e) {
      emailError = e?.message || String(e);
    }

    res.status(200).json({ success: true, message: "Request saved!", requestId, serialNo, sheet: effectiveSheetName, emailSent, emailError });
  } catch (err) {
    console.error("/api/request error:", err);
    const message = err?.message || String(err);
    res.status(500).json({ error: `Failed to save request: ${message}` });
  }
}
