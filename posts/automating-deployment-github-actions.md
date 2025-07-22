---
title: "From Code to Cloud: Automating My Blog's Deployment with GitHub Actions"
date: '2025-07-22'
tags: ['GitHub Actions', 'CI/CD', 'Automation', 'Deployment', 'Cloudflare']
---

A modern development workflow isn't just about writing code; it's also about how efficiently and reliably you can get that code from your local machine to a live server. This is where Continuous Integration and Continuous Deployment (CI/CD) come in. This blog has a fully automated deployment pipeline, and this post will break down exactly how it works.

We'll dissect the GitHub Actions workflow that powers this site, showing how every push to the `master` branch automatically triggers a build, deployment to GitHub Pages, and even a cache purge on Cloudflare.

### What is CI/CD?

*   **Continuous Integration (CI):** The practice of frequently merging all developer working copies to a shared mainline. In our case, this is pushing code to the `master` branch.
*   **Continuous Deployment (CD):** The practice of automatically deploying every change that passes the CI stage to production.

The goal is to make deployments a predictable, low-effort, and reliable process.

### The Workflow File: `.github/workflows/deploy.yml`

The heart of the automation is the `deploy.yml` file. Let's walk through it section by section.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - master
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      # Step 1: Check out the code
      - name: Checkout
        uses: actions/checkout@v3

      # Step 2: Install dependencies and build the site
      - name: Install and Build
        run: |
          npm install
          npm run build

      # Step 3: Create .nojekyll file
      - name: Create .nojekyll file
        run: touch out/.nojekyll

      # Step 4: Deploy to GitHub Pages
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: out

      # Step 5: Purge Cloudflare Cache
      - name: Purge Cloudflare Cache
        run: |
          curl -X POST "https://api.cloudflare.com/client/v4/zones/${{ secrets.CF_ZONE_ID }}/purge_cache" \
          -H "Authorization: Bearer ${{ secrets.CF_API_TOKEN }}" \
          -H "Content-Type: application/json" \
          --data '{"purge_everything":true}'
```

### Breaking Down the Steps

1.  **Checkout:** This step simply checks out a copy of your repository onto the virtual machine that GitHub is using to run the job.
2.  **Install and Build:** This runs the standard commands to install your project's dependencies and then build the static site, which Next.js places in the `out/` directory.
3.  **Create .nojekyll file:** This is a crucial step for GitHub Pages. It tells GitHub to not run the site through its default Jekyll build process, ensuring your site is served exactly as Next.js built it.
4.  **Deploy:** This step uses a popular third-party action to take the contents of the `out/` directory and push it to the `gh-pages` branch, which is the branch that GitHub Pages serves the site from.
5.  **Purge Cloudflare Cache:** If you're using a CDN like Cloudflare, your site's assets can be cached. This final step makes an API call to Cloudflare to tell it to clear its cache, ensuring that visitors see the latest version of your site immediately.

### Setting up the Secrets

The Cloudflare step uses `${{ secrets.CF_ZONE_ID }}` and `${{ secrets.CF_API_TOKEN }}`. These are encrypted environment variables that you configure in your GitHub repository's settings under "Secrets and variables" > "Actions". This allows you to use sensitive information in your workflows without hardcoding it into the file.

By setting up this simple workflow, the process of updating the blog becomes as easy as writing a new post and pushing the changes to GitHub.
