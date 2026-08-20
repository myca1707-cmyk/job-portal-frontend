# Resume Building Service — integration notes

Three files, drop into your React source tree (e.g. `src/pages/resume-service/`):

- `ResumeServices.jsx` — the page itself (tabs: Templates / Build Your Own)
- `ResumeTemplates.jsx` — template gallery, presets section order per role type
- `ResumeBuilder.jsx` — the form + live paper preview + PDF download

## Wiring it in

1. Add a route in `App.jsx`:
   ```jsx
   import ResumeServices from "./pages/resume-service/ResumeServices";
   // ...
   <Route path="/services/resume-building" element={<ResumeServices />} />
   ```
2. Add a card/link to it from wherever your Services tab lists its offerings, pointing at `/services/resume-building`.

## Assumptions to check against your codebase

- **Tailwind CSS** is available (`className="..."` utility classes throughout). If the project uses plain CSS or CSS modules instead, say the word and I'll convert these to a stylesheet.
- **`crypto.randomUUID()`** is used for React keys — supported in all modern browsers (Chrome 92+, Safari 15.4+, Firefox 95+). If you need older browser support, swap in a small uuid helper.
- **PDF export** uses the browser's native print dialog (`window.print()`) scoped to just the resume via `@media print` — zero new npm dependencies. If the project already pulls in `jsPDF`/`html2canvas` elsewhere for consistency, I can swap this to match.
- No backend calls yet — everything is client-side. If you want to also save a candidate's built resume to their profile (so it shows up alongside uploaded resumes), that needs a small addition: a POST endpoint + a "Save to my profile" button. Say the word and I'll add it.

## Not yet done / next steps

- Template gallery currently ships 3 presets (Shop Floor Classic, Skilled Trades, Corporate Professional) — easy to add more via the `TEMPLATES` array in `ResumeTemplates.jsx`.
- No "save/resume later" — the builder state resets on page leave. Worth adding if candidates are expected to come back to a half-finished resume.