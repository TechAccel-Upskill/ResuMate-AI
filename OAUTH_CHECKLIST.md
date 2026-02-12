# OAuth Configuration Checklist

Use this checklist to ensure Gmail/Google login works on Vercel deployment.

## Pre-Deployment

- [ ] Repository imported to Vercel
- [ ] Root directory set to `client`
- [ ] Build command: `npm run build`
- [ ] Output directory: `build`

## Vercel Environment Variables

Go to: Vercel Dashboard → Your Project → Settings → Environment Variables

- [ ] `REACT_APP_SUPABASE_URL` = `https://eecxsxlkbdaaawbhfnxh.supabase.co`
- [ ] `REACT_APP_SUPABASE_ANON_KEY` = `sb_publishable_B0SICeYzqU81Q-frlkKG2w_A3QH7-z6`
- [ ] `REACT_APP_SITE_URL` = `https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app`

## Supabase Configuration

Go to: [Supabase Dashboard](https://supabase.com/dashboard) → Your Project

### URL Configuration
Authentication → URL Configuration:

- [ ] **Site URL** set to: `https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app`
- [ ] **Redirect URLs** includes: `https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app/**`

### Google OAuth Provider
Authentication → Providers → Google:

- [ ] Google provider is **Enabled**
- [ ] **Client ID** is filled in (from Google Cloud Console)
- [ ] **Client Secret** is filled in (from Google Cloud Console)

## Google Cloud Console

Go to: [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials

- [ ] OAuth 2.0 Client ID created
- [ ] Application type: **Web application**
- [ ] **Authorized JavaScript origins** includes:
  - `https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app`
  - `http://localhost:3000` (for local development)
- [ ] **Authorized redirect URIs** includes:
  - `https://eecxsxlkbdaaawbhfnxh.supabase.co/auth/v1/callback`

## Post-Configuration

- [ ] Vercel application **redeployed** after setting environment variables
- [ ] Tested Gmail login at: `https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app/login`
- [ ] Successfully redirected to `/dashboard` after login

## Troubleshooting

If Gmail login still doesn't work:

1. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for error messages in the Console tab
   - Check Network tab for failed requests

2. **Verify URLs Match Exactly**
   - `REACT_APP_SITE_URL` in Vercel
   - Site URL in Supabase
   - Redirect URLs in Supabase
   - All should match your exact Vercel deployment URL

3. **Common Issues**
   - ❌ Trailing slashes in URLs (use without: `https://app.vercel.app`)
   - ❌ HTTP instead of HTTPS
   - ❌ Forgot to redeploy after adding environment variables
   - ❌ Google OAuth not enabled in Supabase
   - ❌ Wrong redirect URI in Google Cloud Console

4. **Test Each Step**
   - Click Gmail button → Should redirect to Google
   - Google login → Should show consent screen
   - After consent → Should redirect back to your app
   - Final redirect → Should land on `/dashboard`

## Quick Fix for Current Deployment

For your current deployment at:
`https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app`

### Vercel Environment Variables:
```
REACT_APP_SITE_URL=https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app
```

### Supabase URLs:
- Site URL: `https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app`
- Redirect URLs: `https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app/**`

### Then:
1. Save all changes
2. Redeploy Vercel app
3. Test login

---

**Need help?** See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed instructions.
