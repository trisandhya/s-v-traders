/**
 * Bootstrap script: creates a Google Sheet + Web App backend
 * for a given business name.
 *
 * Usage: run createBusinessInstance("My Business Name")
 */

function createBusinessInstance(businessName) {
  // 1. Create a new Google Sheet
  const sheet = SpreadsheetApp.create(businessName + " Orders Log");
  const ws = sheet.getActiveSheet();
  ws.setName("Orders");

  // 2. Add headers
  ws.appendRow([
    "Timestamp",
    "User",
    "Product SKU",
    "Product Name (EN)",
    "Product Name (Local)",
    "Quantity",
    "Price",
    "Total"
  ]);

  // 3. Log the URL for reference
  Logger.log("Created Sheet: " + sheet.getUrl());

  // Note: This Apps Script project is bound to the new Sheet.
  // You can now deploy it as a Web App.
}

/**
 * Web App endpoint: receives orders from frontend
 * and appends them to the Google Sheet.
 */
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Orders");

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
