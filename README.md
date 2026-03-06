# Free QRCode Generator

<p align="center">
  <img src="https://i.imgur.com/u389in4h.jpg" alt="Free QRCode Generator banner" />
</p>

A free, fast, no-sign-up QR Code generator with optional center logo and PNG export.

## Overview

This project is a static web application to generate QR Codes with a custom visual identity. You provide text or a URL, optionally add a center logo, adjust logo size and white padding, then download a high-quality result.

## Features

- Browser-based QR Code generation
- Optional logo upload applied in the QR center
- Logo size and white padding controls via sliders
- One-click PNG download
- Bilingual interface (PT-BR and EN-US)
- Automatic CDN fallback for the QR Code library

## Tech Stack

- HTML5
- JavaScript (Vanilla)
- Tailwind CSS (via CDN)
- [qrcode](https://github.com/soldair/node-qrcode) (via CDN)

## Run Locally

Because this is a static project, you can open `index.html` directly in your browser.

Optionally, run a local server:

```bash
# Python 3
python3 -m http.server 5500
```

Then open:

`http://localhost:5500`

## How to Use

1. Fill in the content field with a URL or text.
2. (Optional) Upload a logo image.
3. Adjust logo size and white padding.
4. Click **Generate QR Code**.
5. Click **Download PNG** to export.

## Project Structure

```text
.
├── index.html
├── script.js
└── README.md
```

## License

This project is available for free use.
