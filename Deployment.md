<div align="center">
  <h1 align="center">🚀 Deployment Guide: GitHub, Vercel & Netlify</h1>
  <p align="center">
    A step-by-step guide to take the Placement Cell Portal from your local machine to live production servers.
  </p>
</div>

---

## 📑 Table of Contents
1. [Uploading Code to GitHub](#1-uploading-code-to-github)
2. [Preparing the Backend for Production](#2-preparing-the-backend-for-production)
3. [Deploying the Backend on Vercel](#3-deploying-the-backend-on-vercel)
4. [Preparing the Frontend for Production](#4-preparing-the-frontend-for-production)
5. [Deploying the Frontend on Vercel (or Netlify)](#5-deploying-the-frontend-on-vercel-or-netlify)
6. [Updating Environment Variables Post-Deployment](#6-updating-environment-variables-post-deployment)

---

## 1. Uploading Code to GitHub

First, you need to push your entire project (both `FRONTEND` and `BACKEND` folders) to a GitHub repository.

1. Go to [GitHub](https://github.com/) and create a new repository (e.g., `placement-portal`).
2. Open your terminal at the root of your project (`PLACEMENT/`).
3. Run the following commands to initialize Git and push your code:

```bash
git init
git add .
git commit -m "Initial commit: Ready for deployment"
git branch -M main
git remote add origin https://github.com/yourusername/placement-portal.git
git push -u origin main
```

*(Ensure you have a `.gitignore` that ignores `node_modules` and `.env` files in both the frontend and backend folders so you don't leak secrets!)*

---

## 2. Preparing the Backend for Production

To deploy a Node.js/Express app on Vercel, Vercel needs to know how to build and route it.

1. Create a `vercel.json` file inside the `BACKEND/` folder with the following content:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```
2. Make sure your `server.js` exports the app correctly at the end. Open `server.js`, and if you have `app.listen(...)` you can leave it, but add this at the very end of the file:
```javascript
export default app;
```
3. Commit and push these changes to GitHub.

---

## 3. Deploying the Backend on Vercel

1. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
2. Click **Add New...** -> **Project**.
3. Import your `placement-portal` repository.
4. **Important Configuration:**
   - **Framework Preset:** Other
   - **Root Directory:** Click "Edit" and select `BACKEND`.
5. Open the **Environment Variables** section and add all your backend `.env` variables exactly as they are locally:
   - `MONGODB_URI` = `mongodb+srv://...`
   - `JWT_SECRET` = `your_secret`
   - `EMAIL_USER` = `your_email@gmail.com`
   - `EMAIL_PASS` = `your_gmail_app_password`
   - `FRONTEND_URL` = `https://your-frontend-deployment-url.vercel.app` *(You can set this to `*` temporarily, or update it later once frontend is deployed)*.
6. Click **Deploy**.
7. Once finished, Vercel will give you a live URL for your backend (e.g., `https://placement-backend-xyz.vercel.app`). **Copy this URL.**

---

## 4. Preparing the Frontend for Production

1. Next, you must tell the frontend React app to use the new live backend API URL instead of `localhost`.
2. Do not hardcode this in the code—Vercel will inject it via environment variables.

---

## 5. Deploying the Frontend on Vercel (or Netlify)

### Option A: Deploying Frontend to Vercel
1. Go back to the Vercel Dashboard and click **Add New...** -> **Project**.
2. Import the exact same `placement-portal` repository again.
3. **Configuration:**
   - **Framework Preset:** Vite (it should auto-detect this).
   - **Root Directory:** Click "Edit" and select `FRONTEND`.
4. Open **Environment Variables** and add:
   - `VITE_API_URL` = `https://placement-backend-xyz.vercel.app/api` *(Paste the URL Vercel gave you for the backend, make sure to add `/api` at the end)*.
5. Click **Deploy**.
6. Vercel will give you a frontend URL (e.g., `https://placement-frontend-xyz.vercel.app`).

### Option B: Deploying Frontend to Netlify
1. Go to [Netlify](https://www.netlify.com/) and sign in with GitHub.
2. Click **Add new site** -> **Import an existing project** -> GitHub.
3. Select the `placement-portal` repository.
4. **Configuration:**
   - **Base directory:** `FRONTEND`
   - **Build command:** `npm run build`
   - **Publish directory:** `FRONTEND/dist`
5. Click **Add environment variables** and add:
   - `VITE_API_URL` = `https://placement-backend-xyz.vercel.app/api`
6. Click **Deploy Site**.
7. A common issue with React SPAs on Netlify is page refreshes causing 404 errors. To fix this, create a file named `_redirects` (no extension) inside `FRONTEND/public/` with the following content:
```text
/*   /index.html   200
```
8. Commit and push that `_redirects` file to GitHub for Netlify to pick it up.

---

## 6. Updating Environment Variables Post-Deployment

Now that your frontend has a live URL (e.g., `https://placement-frontend-xyz.vercel.app`), you MUST tell your backend to expect requests from it (for CORS protection).

1. Go to the **Backend Vercel Project Dashboard**.
2. Go to **Settings** -> **Environment Variables**.
3. Edit `FRONTEND_URL`.
4. Change the value to your new live frontend URL (e.g., `https://placement-frontend-xyz.vercel.app`). Ensure there is NO trailing slash at the end.
5. Save the variable.
6. **Very Important:** Go to the "Deployments" tab for the backend and click the three dots (`...`) -> **Redeploy**. Environment variables only take effect on the next build!

---

### 🎉 Congratulations!
Your MERN stack Placement Cell application is now completely live and accessible on the internet!
