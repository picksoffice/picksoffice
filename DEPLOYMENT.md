# PicksOffice Deployment Guide

## Backend (Render) Deployment

### Environment Variables Required

Set these in Render Dashboard:

```
NODE_VERSION=20.11.0
NODE_ENV=production
DATABASE_URL=(auto-populated by Render)
JWT_SECRET=(auto-generated)
ADMIN_JWT_SECRET=(auto-generated)
APP_KEYS=(auto-generated)
API_TOKEN_SALT=(auto-generated)
TRANSFER_TOKEN_SALT=(auto-generated)
HOST=0.0.0.0
PORT=10000
CORS_ALLOWED_ORIGINS=https://picksoffice.vercel.app,https://www.picksoffice.com,http://localhost:3000
```

### Deployment Steps

1. Push changes to GitHub
2. Render will auto-deploy from main branch
3. Check logs for any errors
4. Verify health check at: https://picksoffice.onrender.com/_health

## Frontend (Vercel) Deployment

### Environment Variables Required

Set these in Vercel Dashboard:

```
NEXT_PUBLIC_STRAPI_API_URL=https://picksoffice.onrender.com
NEXT_PUBLIC_SITE_URL=https://picksoffice.vercel.app
```

### Deployment Steps

1. Push changes to GitHub
2. Vercel will auto-deploy from main branch
3. Check build logs for any errors
4. Verify deployment at: https://picksoffice.vercel.app

## Common Issues

### 502 Bad Gateway

- Backend not started properly
- Check Node version (must be 20.11.0)
- Verify all environment variables are set
- Check database connection

### CORS Errors

- Update CORS_ALLOWED_ORIGINS in backend
- Ensure credentials are included in requests

### Database Connection Issues

- Verify DATABASE_URL is set
- Check SSL configuration
- Monitor connection pool limits