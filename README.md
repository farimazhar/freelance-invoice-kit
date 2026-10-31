# InvoiceKit — Free Freelance Invoice Generator

A lightweight, responsive invoice generator for freelancers, developers, designers, and small businesses. Create a clean invoice, preview it live, and print or save it as a PDF.

## Features

- Live invoice preview as you type
- Add and remove line items
- Automatic subtotal, tax, and total calculations
- Multiple currencies: USD, EUR, GBP, PKR, AED, and INR
- Issue date, due date, client details, and payment notes
- Save and load a draft in your browser
- Print-friendly A4 layout (use **Download / Print PDF**, then choose **Save as PDF**)
- No signup, backend, analytics, or API key required

## Run locally

No build tools or dependencies are needed.

1. Download or clone this repository.
2. Open `index.html` in your browser.

For local development, you can also run a static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Privacy

Invoice data is processed in your browser. Drafts are stored in the browser's `localStorage` only when you click **Save draft**. Clearing browser data may remove saved drafts. Do not use a shared device for confidential invoices.

## Project structure

```text
invoicekit/
├── index.html
├── styles.css
├── app.js
├── README.md
├── LICENSE
└── CONTRIBUTING.md
```

## Contributing

Issues, bug reports, accessibility improvements, translations, and feature pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Roadmap

- [ ] Logo upload
- [ ] More currency and locale options
- [ ] Multiple saved invoices
- [ ] Optional discount field
- [ ] Invoice templates

## License

MIT — see [LICENSE](LICENSE).
