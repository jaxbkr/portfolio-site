# Jackson Baker Portfolio

A responsive React/Vite portfolio styled as an Azure-inspired dashboard using the Catppuccin Mocha palette.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Run locally

```bash
npm install
npm run dev
```

Vite will print a local URL, normally `http://localhost:5173`.

## Production build

```bash
npm install
npm run build
npm run preview
```

The deployable static output is created in `dist/`.

## Deploy to Vercel

1. Extract this ZIP and push the folder to a GitHub repository.
2. In Vercel, choose **Add New > Project** and import the repository.
3. Vercel should detect Vite automatically.
4. If needed, set:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Select **Deploy**.

## Deploy to Netlify

1. Push the extracted folder to GitHub, GitLab, or Bitbucket.
2. In Netlify, choose **Add new site > Import an existing project**.
3. Use:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy the site.

A `netlify.toml` file is included with these settings.

## Deploy to Cloudflare Pages

1. Push the project to a Git repository.
2. In Cloudflare, open **Workers & Pages > Create > Pages > Connect to Git**.
3. Select the repository and use:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Save and deploy.

## Deploy to GitHub Pages

This project includes a GitHub Actions workflow. After pushing it to GitHub:

1. Open the repository's **Settings > Pages**.
2. Under **Build and deployment**, choose **GitHub Actions**.
3. Push to the `main` branch or manually run the workflow.
4. The workflow builds and deploys the site.

The Vite configuration uses relative asset paths, so project-site URLs are supported.

## Before publishing

- Test every external link.
- Add project screenshots or live project URLs when available.
- If desired, place a resume PDF in `public/resume.pdf` and add a link to `/resume.pdf`.
