# Bilingual Order-Taking App Template

This repository provides a simple, customizable order-taking system for small businesses, distributors, and sales teams.  
It uses **GitHub Pages** for free hosting, **Google Sheets** for storage, and **Google Apps Script** for backend logic.

---

## ✨ Features
- 🌐 Host your own catalog on GitHub Pages (free).
- 🖼️ Product images with **English + local language names**.
- 📱 Responsive grid:
  - Mobile → 3 × 3 matrix (9 items visible per screen).
  - Desktop → 9 × 9 matrix (81 items visible per screen).
- 🔢 Quantity dropdowns for quick selection.
- 🛡️ Basic login/logout to identify who placed orders.
- 📊 Orders saved directly into your Google Sheet.

---

## 📂 Repository Structure



---

## 🚀 Setup Guide

### 1. Fork and Deploy
1. Fork this repository to your GitHub account.
2. Go to **Settings → Pages** and enable GitHub Pages (branch: `main`, folder: `/root`).
3. Your site will be live at `https://<your-username>.github.io/<repo-name>`.

### 2. Customize Business Info
- Replace `logo.png` in `/images/`.
- Edit **Business Name, Contact, and ID** in `index.html`.

### 3. Add Your Products
- Open `products.json` and add your items:
  ```json
  {
    "sku": "SKU123",
    "image": "images/product.jpg",
    "name": {
      "en": "English Name",
      "hi": "हिंदी नाम",
      "te": "తెలుగు పేరు"
    },
    "price": 100,
    "category": "Snacks"
  }

google sheet with column headers 
Timestamp | User | Product (EN) | Product (Local) | Quantity
