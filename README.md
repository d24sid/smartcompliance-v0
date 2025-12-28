# Data contract definition

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/d24sids-projects/v0-data-contract-definition)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/fSxfUvr7V8z)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

### GitHub Pages

This project is configured to deploy to GitHub Pages automatically via GitHub Actions.

**Setup Instructions:**

1. **Enable GitHub Pages in your repository:**
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Save the settings

2. **Configure basePath (if needed):**
   - If your repository name is NOT the root (e.g., `username.github.io`), you need to set the `basePath` in `next.config.mjs`
   - Uncomment the `basePath` line and set it to your repository name:
     ```js
     basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
     ```

3. **Push to main/master branch:**
   - The workflow will automatically trigger on push to `main` or `master` branch
   - You can also manually trigger it from the Actions tab

4. **Access your site:**
   - Your site will be available at: `https://your-username.github.io/repository-name/`
   - Or if using a custom domain: your configured domain

**Note:** The workflow uses `pnpm` for package management. Make sure your `pnpm-lock.yaml` is committed to the repository.

### Vercel (Alternative)

Your project can also be deployed on Vercel:

**[https://vercel.com/d24sids-projects/v0-data-contract-definition](https://vercel.com/d24sids-projects/v0-data-contract-definition)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/fSxfUvr7V8z](https://v0.app/chat/fSxfUvr7V8z)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
