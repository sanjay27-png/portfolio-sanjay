# Sanjay R. — Corporate Developer Portfolio

A responsive single-page portfolio built with HTML, CSS, and vanilla JavaScript. It is suitable for GitHub Pages and does not require a build step.

## Files

- `index.html` — portfolio content and sections
- `style.css` — layout, responsive styles, colors, and animations
- `script.js` — persistent light/dark theme toggle, mobile navigation, reveal animations, project-preview gallery, and current-year footer
- `images/` — three locally stored SVG project-preview illustrations

## Personalize before publishing

Search `index.html` for `YOUR_` and update these placeholder links/details:

1. `YOUR_EMAIL@example.com` — your real email address
2. `YOUR_GITHUB_USERNAME` — your GitHub username
3. `YOUR_LINKEDIN_PROFILE` — your LinkedIn profile path
4. Add a resume PDF if you want a resume download button, then link it from the hero section.

The header includes a light/dark theme toggle that remembers the selected theme on the same browser. The project cards include custom illustrative SVG previews and an interactive lightbox with next/previous navigation. These are concept visuals, not actual screenshots. Replace them with screenshots from your working projects before sending the portfolio to recruiters.

Review the project descriptions and only keep claims that match what you implemented. Add your actual GitHub repositories and live demos when they are ready. Update your education dates and add certifications only after completion.

## Run locally

Open `index.html` in a browser. For a local development server, use the Live Server extension in Visual Studio Code.

## Publish with GitHub Pages

1. Create a GitHub repository, for example `my-portfolio`.
2. Upload `index.html`, `style.css`, `script.js`, and this README to the repository root.
3. Open the repository's **Settings → Pages**.
4. Under the build/deployment section, select **Deploy from a branch**, choose `main` and `/(root)`, then save.
5. Wait for GitHub Pages to publish the site and open the URL shown in Settings → Pages.

The Google Fonts import uses an external service; the site still has system font fallbacks if it cannot load.
