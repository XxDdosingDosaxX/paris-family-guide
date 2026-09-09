# Paris family guide

A static, password-protected travel guide. Private trip data is encrypted locally before publication.

The browser derives a key with PBKDF2-SHA256 (600,000 iterations) and decrypts AES-256-GCM data using the Web Crypto API. The password is not included in this repository or sent to a server. The public HTML, CSS and JavaScript contain only the generic interface.

Checklist progress stores only item IDs on the current device. The decrypted trip is not cached by the app. Anyone who has the password can read it; printed copies are not encrypted.

Publish this directory as the root of the main branch with GitHub Pages. Never commit unencrypted itinerary source, credentials, or the password.
