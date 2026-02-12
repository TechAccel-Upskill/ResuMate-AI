# ResuMate-AI

**Introduction**

ResuMate is an AI-powered recruitment assistant that speeds up candidate screening and shortlisting. It extracts and scores resume content, matches candidates to job descriptions, and produces clear candidate reports. The platform uses a React frontend and an N8N-driven AI backend to automate workflows like job parsing, bulk resume processing, ATS scoring, skill tagging, and email automation. The dashboard shows real-time metrics, search, notifications, and candidate summaries so recruiters can make faster and unbiased decisions.

## 🚀 Live Demo

**Deployment URL:** [https://resu-mate-ai.vercel.app](https://resu-mate-ai.vercel.app)

### Demo Credentials
- **Username:** recruiter@techaccel
- **Password:** interns@techaccel

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
3. Use build command `npm run build` and output `build` (defaults for Create React App)
4. **Set Environment Variables** (Optional - already configured in code):
   ```
   REACT_APP_SUPABASE_URL=https://eecxsxlkbdaaawbhfnxh.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=sb_publishable_B0SICeYzqU81Q-frlkKG2w_A3QH7-z6
   REACT_APP_SITE_URL=https://your-deployment-url.vercel.app
   ```
5. Deploy
### ✨ Automatic PR Previews

Vercel automatically creates preview deployments for every Pull Request:
- Each PR gets a unique preview URL
- Automatically updates on new commits
- Perfect for testing changes before merging
- Preview URLs are shared in PR comments by Vercel bot
**📖 For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)**
