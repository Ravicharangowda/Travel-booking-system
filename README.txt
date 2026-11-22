=====================================================
 WANDERLY - TRAVEL BOOKING SYSTEM
 College Web Programming Project
 Built with HTML, CSS and vanilla JavaScript only
=====================================================

PROJECT FILES
-------------
  index.html   - Page structure (nav, hero, search, destinations,
                 booking form, about, contact, footer) + SEO tags
  style.css    - All styling, animations and responsive layout
  script.js    - All functionality (search, filters, booking,
                 validation, confirmation, saved bookings)
  README.txt   - This file

No frameworks, no paid APIs, no internet connection needed
(except for the optional social media links in the footer).


HOW TO RUN ON YOUR COMPUTER
---------------------------
1. Put index.html, style.css and script.js in the SAME folder.
2. Double-click index.html. It opens in Chrome.
   (Or right-click -> Open with -> Google Chrome.)
That's it - no installation or server needed.


FEATURES TO DEMONSTRATE TO YOUR LECTURER
----------------------------------------
- Responsive navigation with mobile hamburger menu
- Hero section with animated travel illustration (SVG, no images)
- Trip search form (From, Destination, Dates, Travelers) with validation
- 12 destinations with prices and Book Now buttons
- Live search, category chips, budget filter and sorting
- Booking form with validation and live price summary (with 5% tax)
- Booking confirmation pop-up with a unique Booking ID (printable)
- "My Bookings" list saved in the browser (localStorage) with cancel
- About Us (animated counters), Contact form, Footer with social links
- SEO: title, meta description, keywords, headings, structured data


HOW TO DEPLOY ON NETLIFY (FREE) - DRAG AND DROP METHOD
------------------------------------------------------
1. Create a folder (for example "travel-booking") and put
   index.html, style.css and script.js inside it.
   (index.html MUST be directly inside the folder.)
2. Go to https://app.netlify.com/drop in Chrome.
3. Sign up free (use Email, Google or GitHub) if asked.
4. Drag the whole "travel-booking" FOLDER onto the page
   (or click "browse to upload").
5. Wait a few seconds. Netlify shows your live site with a
   random URL like  https://sparkly-unicorn-123abc.netlify.app
6. Click that URL - anyone in the world can open it in Chrome.

OPTIONAL - CHANGE THE SITE NAME
-------------------------------
1. Open your site in the Netlify dashboard.
2. Go to Site configuration -> Change site name.
3. Pick a name such as  wanderly-travel  ->
   https://wanderly-travel.netlify.app

UPDATING THE SITE LATER
-----------------------
Open your site in Netlify -> Deploys tab -> drag the updated
folder into the "Drag and drop" box on that page.


CUSTOMISING THE PROJECT
-----------------------
- Brand name: search for "Wanderly" in index.html and replace it.
- Destinations and prices: edit the DESTINATIONS list at the top
  of script.js (each destination is one line).
- Colours: change the values in :root at the top of style.css.
- Contact details: edit the phone/email/address in index.html.
  (The email hello@wanderly.example is a placeholder.)


NOTES
-----
- This is a demo: no real payments are taken. Bookings and
  messages are stored only in the visitor's own browser.
- After deploying, set your real site URL in the SEO tags if you
  want (optional) and submit it in Google Search Console so
  Google can index it.

Good luck with your project!
