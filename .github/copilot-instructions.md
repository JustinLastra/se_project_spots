<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Copilot instructions for Spots (static web project)

Overview
- Small static site (no build step) organized with BEM CSS and vanilla JS.
- Layout files: `index.html`, styles in `pages/index.css` and `blocks/`.
- Behavior in `scripts/index.js` (UI + card rendering) and `scripts/validation.js` (form validation helpers).

What to know before editing
- No bundler or package.json — changes are immediately visible by opening `index.html` or running a local static server.
- CSS imports are composed in `pages/index.css` via `@import` of `blocks/*.css` and `vendor/*`.
- Naming convention: BEM (block__element and block--modifier). Keep class names consistent with existing files in `blocks/`.

Key runtime patterns (copyable examples)
- Modal open state: add/remove class `modal_is-open`. Open sequence calls `resetValidation(formEl)`; see `openModal()` in `scripts/index.js`.
- Validation error element: error span IDs follow the pattern `<input.id>-error`. `validation.js` uses this exact pattern (e.g., `profile-name-input` → `profile-name-input-error`).
- Forms: selector `.modal__form`; inputs `.modal__input`; submit button `.modal__submit-btn`. Validation `settings` object lives in `scripts/validation.js`.
- Card template: HTML `<template id="card-template">` contains an `.card` element. Use `getCardElement(data)` in `scripts/index.js` as the canonical rendering pattern. Likes toggle class `card__like-button_active`. Delete removes the `<li>` element.

Files to inspect for context
- Entry: `index.html` — page structure, modals, and the `#card-template`.
- UI behavior: `scripts/index.js` — initial data (`initialCards`), DOM helpers, modal handlers.
- Form handling: `scripts/validation.js` — input validation, error-show/hide, and button enable/disable logic.
- Styling: `pages/index.css` and `blocks/*.css` — BEM blocks and layout.
- Docs: `README.md` — deployment target is GitHub Pages; keep relative paths intact.

Developer workflows
- Local preview (no build):
  - Serve files from project root, e.g.:
    - `python3 -m http.server 8000` and open `http://localhost:8000`
    - or use VS Code Live Server extension.
- Deployment: site is deployed to GitHub Pages (see `README.md`), so avoid changing URL-sensitive paths.

Conventions and cautions for edits
- Preserve BEM class names and modifiers; CSS is split into `blocks/` so prefer adding new block files when adding new components.
- `validation.js` expects each input to have a corresponding `#<id>-error` element — adding inputs without these will break validation UI.
- `scripts/index.js` manipulates DOM directly (querySelector, template cloning). Keep changes simple and DOM-compatible for older browsers if needed.
- No tests or CI currently; keep changes small and manual-verify in browser.

Common tasks examples
- Add a new block CSS: create `blocks/<block>.css` and import it from `pages/index.css`.
- Add a new modal form: mirror structure in `index.html` (use `.modal`, `.modal__form`, input IDs and related `-error` spans), then call `openModal()` to initialize validation.

If you are unsure
- Open `index.html` and the two scripts first. Run the local server and exercise modals, card creation, like/delete flows to see observable behavior before changing logic.

If anything here is unclear or you'd like more examples (component templates, CSS patterns, or a suggested local dev npm script), tell me which part to expand.
