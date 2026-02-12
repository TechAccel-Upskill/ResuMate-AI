# Vercel Deployment Guide for ResuMate-AI

## Initial Deployment Steps

1. **Import Repository to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository: `TechAccel-Upskill/ResuMate-AI`

2. **Configure Build Settings**
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

3. **Set Environment Variables** (Optional - already configured with fallbacks)
   
   Go to **Project Settings → Environment Variables** and add:
   
   ```
   REACT_APP_SUPABASE_URL=https://eecxsxlkbdaaawbhfnxh.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=sb_publishable_B0SICeYzqU81Q-frlkKG2w_A3QH7-z6
   REACT_APP_SITE_URL=https://your-deployment-url.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live!

5. **Enable PR Deployments**
   
   Go to **Project Settings → Git** and configure:
   - **Production Branch:** `main`
   - **Preview Deployments:** Select **"All branches"** (enables PR previews)
   - **Ignored Build Step:** Leave empty (default)
   
   This ensures every Pull Request gets an automatic preview deployment.

## PR Preview Deployments

Vercel automatically creates preview deployments for Pull Requests:

### How It Works
1. Create a Pull Request on GitHub
2. Vercel automatically builds and deploys a preview
3. Preview URL is posted as a comment on the PR
4. Each new commit updates the preview automatically

### Preview URL Format
```
https://resu-mate-ai-<branch>-<user>.vercel.app
```

### Benefits
- Test changes in production-like environment
- Share preview links with team members
- Review UI/UX changes before merging
- Automatic cleanup when PR is closed

### Configuration
PR deployments are enabled in `vercel.json`:
- `github.enabled: true` - Enables GitHub integration
- `github.autoAlias: true` - Creates consistent preview URLs
- `github.autoJobCancelation: true` - Cancels outdated builds

## Troubleshooting

### "OAuth Error" or "Redirect URI Mismatch"
- Verify the `REACT_APP_SITE_URL` environment variable matches your exact Vercel URL
- Check that the URL is added to Supabase Redirect URLs
- Ensure Google OAuth has the correct authorized redirect URI: `https://eecxsxlkbdaaawbhfnxh.supabase.co/auth/v1/callback`

### "Unable to verify email"
- Make sure OAuth providers are enabled in Supabase
- Check that the provider configuration is saved properly

### Login Works Locally but Not on Vercel
- Confirm `REACT_APP_SITE_URL` is set in Vercel environment variables
- Redeploy after adding environment variables
- Check browser console for errors

### Multiple Vercel Deployments
If you have preview deployments, add all preview URLs to Supabase Redirect URLs:
```
https://*.vercel.app/**
```

## OAuth Configuration (Optional)

### Additional Providers

**LinkedIn:**
1. Create app at [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Redirect URL: `https://eecxsxlkbdaaawbhfnxh.supabase.co/auth/v1/callback`
3. Add Client ID and Secret to Supabase → Providers → LinkedIn

**GitHub:**
1. Create OAuth App in [GitHub Settings → Developer Settings](https://github.com/settings/developers)
2. Callback URL: `https://eecxsxlkbdaaawbhfnxh.supabase.co/auth/v1/callback`
3. Add Client ID and Secret to Supabase → Providers → GitHub

## Quick Reference

**Environment Variables:**
- `REACT_APP_SUPABASE_URL` - Supabase project URL (required)
- `REACT_APP_SUPABASE_ANON_KEY` - Supabase anon key (required)
- `REACT_APP_SITE_URL` - Deployed app URL (required for OAuth)

**Demo Credentials:**
- Username: `recruiter@techaccel`
- Password: `interns@techaccel`
