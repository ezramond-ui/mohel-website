PUT YOUR LOGO HERE
===================

Save your logo file in THIS folder, named exactly:

    logo.png

Full path on your computer:
    C:\Users\ezram\Documents\Mohel-Website\assets\logo.png

The website header already points to /assets/logo.png, so once the file
is here it appears automatically in the top bar on every page. The header
background is white, so a blue (or any dark) logo will show clearly.

Notes
-----
- Recommended: a PNG with a transparent background, at least ~200px tall
  (it displays at 48px tall, so 200px keeps it crisp on retina screens).
  A wide "wordmark" logo works too.
- Prefer SVG or WebP? Name it logo.svg / logo.webp and tell Claude to
  update the file extension in the header (one small change), OR just
  export a PNG named logo.png and no code change is needed.
- If your logo already includes your name ("Rabbi Ezra Mond"), you can
  delete the two text spans (brand-name / brand-sub) in each page's
  header so the name is not shown twice. There is an HTML comment marking
  the spot. (Ask Claude and it can remove them across all pages at once.)
- Until logo.png exists, the header simply shows the text name — no broken
  image icon.

Other images (optional, for later)
----------------------------------
- Portrait photo (Home + About): mohel.jpg
- Gallery photos: put them in assets/gallery/
See the main README.md, section "Adding real photos," for how to wire
those in.
