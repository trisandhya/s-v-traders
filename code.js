/**
 * Google Apps Script backend for Order-Taking App
 * Logs orders into Google Sheets with bilingual product names.
 */

// Replace with your Google Sheet ID
const SHEET_ID = "YOUR_SHEET_ID_HERE";
const SHEET_NAME = "Orders";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    // Parse incoming JSON payload
    const data = JSON.parse(e.postData.contents);

    const user = data.user || "Unknown";
    const orders = data.orders || []; // array of { sku, nameEN, nameLocal, qty, price }

    const timestamp = new Date();

    // Build rows for each product in the order
    const rows = orders.map(item => [
      timestamp,
      user,
      item.sku,
      item.nameEN,
      item.nameLocal,
      item.qty,
      item.price,
      item.qty * item.price
    ]);

    // Append all rows in one batch
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Order logged" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
