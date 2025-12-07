import sys
import json
from google.oauth2 import service_account
from googleapiclient.discovery import build

# Usage: python create_sheet.py "Business Name"

def create_business_sheet(business_name):
    # Load credentials from GitHub Actions secret (service account JSON)
    creds = service_account.Credentials.from_service_account_file(
        "service_account.json",
        scopes=["https://www.googleapis.com/auth/spreadsheets"]
    )

    service = build("sheets", "v4", credentials=creds)

    # 1. Create a new Sheet
    spreadsheet = {
        "properties": {
            "title": f"{business_name} Orders Log"
        },
        "sheets": [
            {
                "properties": {"title": "Orders"}
            }
        ]
    }

    spreadsheet = service.spreadsheets().create(body=spreadsheet, fields="spreadsheetId").execute()
    sheet_id = spreadsheet.get("spreadsheetId")

    # 2. Add headers
    headers = [["Timestamp", "User", "Product SKU", "Product Name (EN)",
                "Product Name (Local)", "Quantity", "Price", "Total"]]

    service.spreadsheets().values().update(
        spreadsheetId=sheet_id,
        range="Orders!A1:H1",
        valueInputOption="RAW",
        body={"values": headers}
    ).execute()

    # 3. Save Sheet ID to config.json for later steps
    config = {"business_name": business_name, "sheet_id": sheet_id}
    with open("config.json", "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2)

    print(f"Created Google Sheet for {business_name}: {sheet_id}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python create_sheet.py 'Business Name'")
        sys.exit(1)

    business_name = sys.argv[1]
    create_business_sheet(business_name)
