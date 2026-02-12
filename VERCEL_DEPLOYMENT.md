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

5. **Verify PR Deployment Settings** (Important!)
   
   Go to **Project Settings → Git** and ensure:
   - ✅ **Production Branch:** `main` (or your default branch)
   - ✅ **Deploy on Push:** Enabled
   - ✅ **Ignore Build Step:** Not enabled (leave unchecked)
   - ✅ **Preview Deployments:** All branches (default)
   
   This ensures every PR gets an automatic preview deployment.

## Demo Access

The application uses demo authentication:
- **Username:** recruiter@techaccel
- **Password:** interns@techaccel

All other authentication methods (OAuth, registration) are disabled for demo purposes.

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

## Additional OAuth Providers

### LinkedIn OAuth
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create an app
3. Add redirect URL: `https://eecxsxlkbdaaawbhfnxh.supabase.co/auth/v1/callback`
4. Copy Client ID and Secret to Supabase → Providers → LinkedIn

### GitHub OAuth
1. Go to [GitHub Settings → Developer Settings → OAuth Apps](https://github.com/settings/developers)
2. Create new OAuth App
3. Authorization callback URL: `https://eecxsxlkbdaaawbhfnxh.supabase.co/auth/v1/callback`
4. Copy Client ID and Secret to Supabase → Providers → GitHub

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_SUPABASE_URL` | Your Supabase project URL | Yes |
| `REACT_APP_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `REACT_APP_SITE_URL` | Your deployed application URL | Yes (for OAuth) |

## Quick Checklist

- [ ] Vercel project created with `client` as root directory
- [ ] Environment variables set in Vercel
- [ ] Initial deployment completed
- [ ] Supabase Site URL updated with Vercel URL
- [ ] Supabase Redirect URLs include Vercel URL with `/**`
- [ ] Google OAuth credentials created in Google Cloud Console
- [ ] Google OAuth configured in Supabase with Client ID and Secret
- [ ] Vercel application redeployed after environment variable changes
- [ ] OAuth login tested on production URL

## Support

If you continue to experience issues:
1. Check Vercel deployment logs for errors
2. Check browser console for client-side errors
3. Verify all URLs match exactly (including https://)
4. Ensure no trailing slashes in URLs where not specified
