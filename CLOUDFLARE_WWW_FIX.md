# Quick Fix: Configure www.mackprojekt.com for Azure Static Web App

## Current Problem
www.mackprojekt.com is currently pointing to Cloudflare proxy IPs, not your Azure Static Web App.

## Solution: Update DNS in Cloudflare

### Step 1: Log into Cloudflare Dashboard
1. Go to https://dash.cloudflare.com
2. Select domain: **mackprojekt.com**
3. Click **DNS** in the left menu
4. Click **Records**

### Step 2: Find the www Record
Look for a record with:
- **Type**: A, AAAA, or CNAME
- **Name**: www
- **Content**: Any IP address or domain

### Step 3: Edit or Delete the www Record

**Option A: Edit Existing Record (Recommended)**
1. Click **Edit** on the www record
2. Change **Type** to: **CNAME**
3. Change **Name** to: **www**
4. Change **Target/Content** to: **calm-sand-0e9f2e010.6.azurestaticapps.net**
5. **CRITICAL:** Click the orange cloud ☁️ to disable proxy (must be gray "DNS only")
6. Click **Save**

**Option B: Delete and Create New**
1. Click **Delete** on the existing www record
2. Click **Add record**
3. Select **Type**: **CNAME**
4. **Name**: **www**
5. **Target**: **calm-sand-0e9f2e010.6.azurestaticapps.net**
6. **Proxy status**: Click to disable (gray cloud = "DNS only")
7. **TTL**: Auto
8. Click **Save**

### Step 4: Wait for DNS Propagation
Wait 1-5 minutes, then verify:

```powershell
# Check DNS resolution
nslookup www.mackprojekt.com

# Should show:
# www.mackprojekt.com    canonical name = calm-sand-0e9f2e010.6.azurestaticapps.net
```

### Step 5: Add to Azure Static Web App

Once DNS is correct, run this command:

```powershell
az staticwebapp hostname set `
  --name "AMackProjekt" `
  --resource-group AMackProjekt_group `
  --hostname "www.mackprojekt.com"
```

### Step 6: Verify Both Domains Work

```powershell
# Check configured domains
az staticwebapp show `
  --name "AMackProjekt" `
  --resource-group AMackProjekt_group `
  --query "customDomains" -o json
```

Should return:
```json
[
  "mackprojekt.com",
  "www.mackprojekt.com"
]
```

### Step 7: Test in Browser
- https://mackprojekt.com ✅
- https://www.mackprojekt.com ✅

Both should load your site!

---

## Visual Guide: Cloudflare DNS Settings

Your DNS records should look like this:

```
┌──────────┬──────────────────────────────────────┬─────────────────────────────────────────────┬──────────────┬──────┐
│ Type     │ Name                                  │ Content                                     │ Proxy        │ TTL  │
├──────────┼──────────────────────────────────────┼─────────────────────────────────────────────┼──────────────┼──────┤
│ TXT      │ @                                     │ ms-domain-verification=...                  │ DNS only     │ Auto │
│ TXT      │ @                                     │ v=spf1 include:_spf.azurecomm.net...        │ DNS only     │ Auto │
│ CNAME    │ selector2-azurecomm-prod-net._domain..│ selector2-azurecomm-prod-net._domain...    │ DNS only     │ Auto │
│ CNAME    │ www                                   │ calm-sand-0e9f2e010.6.azurestaticapps.net   │ DNS only ⚠️  │ Auto │
└──────────┴──────────────────────────────────────┴─────────────────────────────────────────────┴──────────────┴──────┘
```

⚠️ **The "www" row MUST have "DNS only" (gray cloud), NOT "Proxied" (orange cloud)**

---

## Why "DNS only" is Required

Azure Static Web Apps needs to:
1. Validate domain ownership via DNS
2. Issue SSL certificate
3. Handle HTTPS traffic directly

When Cloudflare proxy is enabled (orange cloud):
- Azure can't validate the domain
- SSL certificate won't be issued
- Custom domain configuration fails

**Always use "DNS only" (gray cloud) for Azure Static Web Apps custom domains!**

---

## Troubleshooting

### "CNAME Record is invalid" Error
**Cause:** DNS hasn't propagated or proxy is enabled  
**Solution:** 
1. Verify proxy is disabled (gray cloud)
2. Wait 5 minutes
3. Try the `az staticwebapp hostname set` command again

### www Shows Cloudflare Error Page
**Cause:** Proxy is enabled  
**Solution:** Click the orange cloud to disable proxy (make it gray)

### DNS Check Shows IP Addresses Instead of CNAME
**Cause:** Proxy is enabled or A/AAAA record exists instead of CNAME  
**Solution:** 
1. Delete A/AAAA records for www
2. Create CNAME record
3. Disable proxy

### Certificate Error in Browser
**Cause:** SSL certificate not issued yet  
**Solution:** Wait 10-15 minutes after adding domain to Azure

---

## Quick Commands

```powershell
# Check DNS
nslookup www.mackprojekt.com

# Add domain to Azure (after DNS is correct)
az staticwebapp hostname set --name "AMackProjekt" --resource-group AMackProjekt_group --hostname "www.mackprojekt.com"

# Verify domains
az staticwebapp show --name "AMackProjekt" --resource-group AMackProjekt_group --query "customDomains"

# Test both URLs
Start-Process "https://mackprojekt.com"
Start-Process "https://www.mackprojekt.com"
```

---

## After Configuration

Once both domains work:

1. ✅ Update Google Analytics settings to use custom domain
2. ✅ Update Google Tag Manager to track custom domain
3. ✅ Test all forms and functionality on custom domain
4. ✅ Launch Google Ads campaigns using custom domain URLs
5. 🎯 Start generating revenue!

---

**Need Help?** See full guide in `WWW_SUBDOMAIN_SETUP.md`
