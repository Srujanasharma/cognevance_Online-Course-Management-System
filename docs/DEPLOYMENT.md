# Deployment Guide

The client can be deployed to GitHub Pages. The API must run separately (for
example, on Render) because GitHub Pages only serves static files. Deployment
requires service accounts and environment variables; no public API URL is
configured in this source tree.

## 1. Provision MongoDB

1. Create a MongoDB Atlas cluster and database.
2. Create a database user and allow network access from the Render service.
3. Copy the connection string into Render as `MONGODB_URI`. Do not commit it.

## 2. Deploy the API to Render

Use the included `server/render.yaml` Blueprint or create a Node web service
with `server/` as its root directory.

- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `MONGODB_URI`: Atlas connection string
  - `JWT_SECRET`: long, randomly generated secret
  - `CLIENT_URL`: `https://srujanasharma.github.io`; comma-separated origins
    are supported

Wait for the service to start, then verify its `/api/health` endpoint reports
`"status": "ok"`.

## 3. Deploy the client to GitHub Pages

In the GitHub repository, add the `VITE_API_URL` Actions variable under
**Settings → Secrets and variables → Actions → Variables**. Set it to the
public Render API origin without a trailing slash (for example,
`https://your-api.onrender.com`). Do not put database credentials or JWT
secrets in this variable.

In **Settings → Pages**, select **GitHub Actions** as the build and deployment
source. The workflow in `.github/workflows/deploy-pages.yml` builds and
publishes the client when changes are pushed to `main`. The expected site URL
is `https://srujanasharma.github.io/cognevance_Online-Course-Management-System/`.
The Vite configuration sets the repository subpath for Pages and generates a
SPA fallback so refreshing a client-side route works.

After the API is deployed, set Render's `CLIENT_URL` to
`https://srujanasharma.github.io` and redeploy the API if necessary. Confirm
the API `/api/health` endpoint reports `"status": "ok"` before deploying the
frontend.

## 4. Seed demo data (optional)

For local development, set the backend environment variables and run
`npm run seed` from `server/`. The seed script creates demo users with known
passwords. Do not use those accounts or credentials on a public production
deployment; create a private admin account and change/remove demo credentials
before exposing the application.

## 5. Smoke test and screenshots

Verify the health endpoint, student registration and login, course search and
filters, enrollment, progress updates, and admin course management. Capture
the screenshots listed in [`../screenshots/README.txt`](../screenshots/README.txt)
from the deployed application, and ensure screenshots do not expose
credentials or tokens.
