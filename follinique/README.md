# Follinique Static HTML Export

This folder contains a static HTML version exported from the original CodeIgniter/PHP site.

Included pages:
- index.html
- product1.html
- product2.html
- product3.html
- product4.html
- value.html
- privacy.html
- contact.html
- track_order.html
- thanks.html
- checkout.html (disabled/static notice)

Notes:
- PHP, CodeIgniter, database, cart, checkout, payment, and order tracking logic were not included.
- Cart/checkout/order-tracking clicks are intentionally blocked with `public/js/static-disable-commerce.js`.
- Static assets are under `/public/`.
- `_redirects` is included for Netlify-style redirects from the old PHP URLs.


## Light static package note

This light version removes the large product MP4 video file and uses the existing poster image in its place. Commerce/order functions remain disabled for static hosting.
