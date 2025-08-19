// server.js
import express from "express";
import { google } from "googleapis";

const app = express();
app.use(express.json());

// Auth with Service Account using ENV variables
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  SCOPES
);

const sheets = google.sheets({ version: "v4", auth });

// Your Google Sheet ID & Name from ENV
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || "AmLI_Service_Requests";

// Generate Request Id
function makeRequestId() {
  const pad2 = (n) => String(n).padStart(2, "0");
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = pad2(now.getMonth() + 1);
  const dd = pad2(now.getDate());
  const hh = pad2(now.getHours());
  const mi = pad2(now.getMinutes());
  const ss = pad2(now.getSeconds());
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TRN-${yyyy}${mm}${dd}-${hh}${mi}${ss}-${rand}`;
}

// API Endpoint
app.post("/submit-request", async (req, res) => {
  try {
    const body = req.body;

    // Extract form data
    const data = {
      firstName: body["first-name"] || "",
      lastName: body["last-name"] || "",
      email: body["email"] || "",
      phone: body["phone"] || "",
      pickup: body["pickup-location"] || "",
      dropoff: body["dropoff-location"] || "",
      startDate: body["start-date"] || "",
      preferredTime: body["preferred-time"] || "",
      duration: body["duration"] || "",
      transportType: body["transport-type"] || "",
      personnelCount: body["personnel-count"] || "",
      additionalInfo: body["additional-info"] || "",
      status: body["status"] || "Pending",
    };

    // Validate required fields
    const required = [
      "firstName",
      "lastName",
      "phone",
      "pickup",
      "dropoff",
      "startDate",
      "preferredTime",
      "duration",
      "transportType",
    ];
    const missing = required.filter((k) => !String(data[k]).trim());
    if (missing.length) {
      return res.status(422).json({ ok: false, error: "Missing fields", missing });
    }

    // Auto-generated fields
    const now = new Date();
    const requestId = makeRequestId();

    // Find Serial No. by counting rows
    const sheet = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:A`, // Column A (Serial No.)
    });
    const serial = sheet.data.values ? sheet.data.values.length : 1;

    // Row in the right order
    const row = [
      serial, // Serial No.
      now.toISOString(), // Request Timestamp
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.pickup,
      data.dropoff,
      data.startDate,
      data.preferredTime,
      data.duration,
      data.transportType,
      data.personnelCount,
      data.additionalInfo,
      requestId,
      data.status,
    ];

    // Append row to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_NAME,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    res.json({ ok: true, message: "Saved", requestId, serial });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Start server (for local dev; Vercel will handle prod)
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
