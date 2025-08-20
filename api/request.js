import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    const {
      "first-name": firstName,
      "last-name": lastName,
      email,
      phone,
      "pickup-location": pickupLocation,
      "dropoff-location": dropoffLocation,
      "start-date": startDate,
      "preferred-time": preferredTime,
      duration,
      "transport-type": transportType,
      "personnel-count": personnelCount,
      "additional-info": additionalInfo,
    } = req.body;

    const row = [
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }), // Request Timestamp
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
      `REQ-${Date.now()}`, // Unique Request ID
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `${process.env.SHEET_NAME}!A:N`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    res.status(200).json({ success: true, message: "Request saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save request" });
  }
}
