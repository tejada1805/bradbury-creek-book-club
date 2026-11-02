# Bradbury Creek Book Club Website

A free, mobile-friendly static website built for GitHub Pages.

## Publish with GitHub Pages

1. Sign in at https://github.com and create a new **public** repository named `bradbury-creek-book-club`.
2. Upload the **contents** of this folder to the repository root (not the containing folder). Include `index.html`, `style.css`, `site.js`, and the `assets` folder with its PDF files. Commit the files.
3. Open the repository **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**. Choose branch `main` and folder `/(root)`, then click **Save**.
4. Wait for deployment. Visit `https://YOUR-USERNAME.github.io/bradbury-creek-book-club/`. Replace YOUR-USERNAME with your GitHub username.
5. In GitHub, edit `site.js` to change the book, events, bookshelf, Facebook group URL, and contact email. Commit changes to publish updates.

## Customize

- `site.js`: Change all club content in the `club` object at the top. Dates are placeholders, not confirmed events.
- `style.css`: Adjust colors and styling.
- `index.html`: Edit section text and headings.
- `assets/`: Printable reading challenge, bingo, and discussion prompts.
- Gallery: The three gallery panels are decorative placeholders, not actual photos. To show photos, upload photos to `assets/` and replace the gallery tiles in `index.html` with `<img src="assets/photo1.jpg" alt="Description">` elements, then adjust CSS. Only share member photos with their permission.
- Membership: The Join button stays inactive until you add `facebookUrl` or `contactEmail` in `site.js`.

## Notes

This is a static website, not a login/member database. Do not upload private member data to a public repository. For private RSVPs or membership forms, link a trusted external form service and set permissions carefully.
