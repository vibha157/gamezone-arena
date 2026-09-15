import { google } from "googleapis";

function getSheetsClient() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;

  if (!raw) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 is not configured."
    );
  }

  let credentials: {
    client_email: string;
    private_key: string;
  };

  try {
    const decoded = Buffer.from(raw.trim(), "base64").toString("utf8");
    credentials = JSON.parse(decoded);
  } catch {
    throw new Error("Invalid Google service account configuration.");
  }

  if (!credentials.client_email || !credentials.private_key) {
    throw new Error("Incomplete Google service account configuration.");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({
    version: "v4",
    auth,
  });
}

export async function appendBooking(row: string[]) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_NAME || "Bookings";

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEET_ID is not configured.");
  }

  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:L`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [row],
    },
  });
}

export async function getBookingRows() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_NAME || "Bookings";

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEET_ID is not configured.");
  }

  const sheets = getSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:L`,
  });

  return response.data.values ?? [];
}
