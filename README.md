# ResuMate-AI

**Introduction**

ResuMate is an AI-powered recruitment assistant that speeds up candidate screening and shortlisting. It extracts and scores resume content, matches candidates to job descriptions, and produces clear candidate reports. The platform uses a React frontend and an N8N-driven AI backend to automate workflows like job parsing, bulk resume processing, ATS scoring, skill tagging, and email automation. The dashboard shows real-time metrics, search, notifications, and candidate summaries so recruiters can make faster and unbiased decisions.

**Documentation**

- **Source:**
	1. [Application (source)](src/app/src_app.md)
	2. [Database (source)](src/database/src_database.md)
	3. [UI (source)](src/UI/src_UI.md)

- **Docs:**
	1. [Application (docs)](docs/app/app_doc.md)
	2. [Database (docs)](docs/database/database_doc.md)
	3. [UI (docs)](docs/UI/UI_doc.md)

📌FAQs
Have questions? Check our live FAQs:
🔗 https://github.com/TechAccel-Upskill/ResuMate-AI/discussions/categories/q-a 

## Deployment (Vercel)

### Quick Deploy Steps

1. Import the repo in Vercel
2. Set **Root Directory** to `client`
3. Use build command `npm run build` and output `build` (defaults for CRA)
4. **Set Environment Variables** (Required):
   ```
   REACT_APP_SUPABASE_URL=https://eecxsxlkbdaaawbhfnxh.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=sb_publishable_B0SICeYzqU81Q-frlkKG2w_A3QH7-z6
   REACT_APP_SITE_URL=https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app
   ```
5. Deploy
6. **After deployment**: Configure Supabase OAuth (see below)

### Auth (Supabase OAuth) - REQUIRED FOR GMAIL LOGIN

⚠️ **Gmail/Google login will NOT work until you complete these steps:**

#### 1. Configure Supabase
Go to [Supabase Dashboard](https://supabase.com/dashboard) → Authentication → URL Configuration:
- **Site URL**: `https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app`
- **Redirect URLs**: `https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app/**`

#### 2. Set Vercel Environment Variable
In Vercel Project Settings → Environment Variables:
- `REACT_APP_SITE_URL` = `https://resu-mate-fhds27rfu-vinods-projects-ac4db69e.vercel.app`

#### 3. Enable Google OAuth in Supabase
- Go to Authentication → Providers → Google
- Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/)
- Add redirect URI: `https://eecxsxlkbdaaawbhfnxh.supabase.co/auth/v1/callback`
- Copy Client ID & Secret to Supabase

#### 4. Redeploy
After setting environment variables, redeploy your Vercel application.

**📖 For detailed step-by-step instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)**
