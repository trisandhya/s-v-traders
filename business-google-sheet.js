/**
 * Creates a Google Sheet + bound Apps Script project
 * named after the business.
 *
 * @param {string} businessName - The name of the business
 */
function createBusinessSheet(businessName) {
  // 1. Create a new Google Sheet
  const sheet = SpreadsheetApp.create(businessName + " Orders Log");

  // 2. Add headers to the first sheet
  const ws = sheet.getActiveSheet();
  ws.setName("Orders");
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

  // Note: The Apps Script project is automatically bound to this Sheet
  // when you paste this code into Tools → Script editor of the Sheet.
}
