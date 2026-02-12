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

3. **Set Environment Variables** ⚠️ CRITICAL for OAuth Login
   
   Go to **Project Settings → Environment Variables** and add:
   
   ```
   REACT_APP_SUPABASE_URL=https://eecxsxlkbdaaawbhfnxh.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=sb_publishable_B0SICeYzqU81Q-frlkKG2w_A3QH7-z6
   REACT_APP_SITE_URL=https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Note your deployment URL

## Post-Deployment: Configure Supabase OAuth

### Step 1: Update Supabase URL Configuration

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication → URL Configuration**
4. Update the following fields:

   **Site URL:**
   ```
   https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app
   ```

   **Redirect URLs:** (Add all of these)
   ```
   https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app/**
   https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app/dashboard
   http://localhost:3000/**
   ```

5. Click **Save**

### Step 2: Configure Google OAuth Provider

1. In Supabase Dashboard, go to **Authentication → Providers**
2. Find **Google** and click **Enable**
3. You'll need Google OAuth credentials:

   **Get Google OAuth Credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Navigate to **APIs & Services → Credentials**
   - Click **Create Credentials → OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Name: `ResuMate-AI`
   - **Authorized JavaScript origins:**
     ```
     https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app
     http://localhost:3000
     ```
   - **Authorized redirect URIs:**
     ```
     https://eecxsxlkbdaaawbhfnxh.supabase.co/auth/v1/callback
     ```
   - Click **Create**
   - Copy the **Client ID** and **Client Secret**

4. Back in Supabase Providers → Google:
   - Paste **Client ID**
   - Paste **Client Secret**
   - Click **Save**

### Step 3: Redeploy Vercel Application

After setting the environment variables:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click the **...** menu on your latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic redeployment

## Testing OAuth Login

1. Visit your deployed URL: `https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app/login`
2. Click the Google login button
3. You should be redirected to Google's OAuth consent screen
4. After authorizing, you should be redirected back to `/dashboard`

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
