# WWW Subdomain Configuration for mackprojekt.com

## Current Status
- ✅ **mackprojekt.com** (apex domain) - Already configured in Azure
- 🔧 **www.mackprojekt.com** - Needs DNS configuration

## Step 1: Add DNS Records in Cloudflare

Log into Cloudflare and add the following records for mackprojekt.com:

### Option A: CNAME Record (Recommended)
```
Type: CNAME
Name: www
Target: calm-sand-0e9f2e010.6.azurestaticapps.net
Proxy status: DNS only (click the cloud icon to disable proxy)
TTL: Auto
```

### Option B: If CNAME Doesn't Work, Use A Records
Sometimes Cloudflare requires A records instead. Get the IP first:

```powershell
# Resolve Azure Static Web App IP
nslookup calm-sand-0e9f2e010.6.azurestaticapps.net
```

Then add:
```
Type: A
Name: www
IPv4 address: [IP from nslookup]
Proxy status: DNS only
TTL: Auto
```

## Step 2: Verify DNS Propagation

After adding the record, verify it's working:

```powershell
# Check CNAME resolution
nslookup www.mackprojekt.com

# Should return:
# www.mackprojekt.com    canonical name = calm-sand-0e9f2e010.6.azurestaticapps.net
```

## Step 3: Add to Azure Static Web App

Once DNS is configured and propagated (may take 1-5 minutes):

```powershell
az staticwebapp hostname set `
  --name "AMackProjekt" `
  --resource-group AMackProjekt_group `
  --hostname "www.mackprojekt.com"
```

## Step 4: Verify Configuration

Check that both domains are configured:

```powershell
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

## Step 5: Test Both Domains

After configuration, test both URLs:
- https://mackprojekt.com
- https://www.mackprojekt.com

Both should load your site with automatic HTTPS.

## Cloudflare Configuration Screenshots

### CNAME Record Example:
```
┌─────────┬──────┬────────────────────────────────────────────────┬────────────┬─────┐
│ Type    │ Name │ Target                                         │ Proxy      │ TTL │
├─────────┼──────┼────────────────────────────────────────────────┼────────────┼─────┤
│ CNAME   │ www  │ calm-sand-0e9f2e010.6.azurestaticapps.net      │ DNS only   │ Auto│
└─────────┴──────┴────────────────────────────────────────────────┴────────────┴─────┘
```

## Important Notes

1. **Proxy Status MUST be "DNS only"** (gray cloud icon)
   - Cloudflare's proxy can interfere with Azure Static Web Apps
   - Click the orange cloud icon to disable proxy

2. **Wait for DNS Propagation**
   - Typically 1-5 minutes with Cloudflare
   - Can take up to 48 hours in rare cases

3. **HTTPS is Automatic**
   - Azure Static Web Apps provides free SSL
   - Certificate is automatically issued after domain validation

4. **Apex Domain (mackprojekt.com)**
   - Already configured, no action needed

## Troubleshooting

### Error: "CNAME Record is invalid"
**Solution:** DNS hasn't propagated yet. Wait 5 minutes and try again.

### Error: "Domain is already assigned"
**Solution:** The domain is already configured. Check with:
```powershell
az staticwebapp show --name "AMackProjekt" --resource-group AMackProjekt_group --query "customDomains"
```

### www Domain Shows Error in Browser
**Possible Causes:**
1. DNS not propagated - Check with `nslookup www.mackprojekt.com`
2. SSL certificate not issued yet - Wait 10-15 minutes
3. Cloudflare proxy enabled - Disable proxy (DNS only mode)

### Both Domains Work but Show Different Content
**Solution:** This shouldn't happen with Azure Static Web Apps, but clear browser cache.

## Redirect Configuration (Optional)

After both domains work, you can set up redirects:

### Option 1: Redirect www to non-www (in staticwebapp.config.json)
```json
{
  "routes": [
    {
      "route": "/*",
      "headers": {
        "x-redirect-from": "www"
      },
      "redirect": "https://mackprojekt.com{route}",
      "statusCode": 301
    }
  ]
}
```

### Option 2: Redirect non-www to www
```json
{
  "routes": [
    {
      "route": "/*",
      "headers": {
        "x-redirect-from": "apex"
      },
      "redirect": "https://www.mackprojekt.com{route}",
      "statusCode": 301
    }
  ]
}
```

**Recommendation:** Use non-www (mackprojekt.com) as primary for cleaner branding.

## DNS Records Summary

After completing all setup, your Cloudflare DNS should have:

```
mackprojekt.com DNS Records:

1. Domain Verification TXT
   Name: @
   Content: ms-domain-verification=...

2. SPF TXT Record
   Name: @
   Content: v=spf1 include:_spf.azurecomm.net include:spf.protection.outlook.com -all

3. DKIM2 CNAME
   Name: selector2-azurecomm-prod-net._domainkey
   Target: selector2-azurecomm-prod-net._domainkey.azurecomm.net

4. DKIM1 CNAME (STILL MISSING - ADD THIS)
   Name: selector1-azurecomm-prod-net._domainkey
   Target: selector1-azurecomm-prod-net._domainkey.azurecomm.net

5. WWW CNAME (ADD THIS NOW)
   Name: www
   Target: calm-sand-0e9f2e010.6.azurestaticapps.net
   Proxy: DNS only (gray cloud)

6. Apex Domain (already configured in Azure)
   Points to: calm-sand-0e9f2e010.6.azurestaticapps.net
```

## Next Steps After WWW Configuration

1. ✅ Add www CNAME to Cloudflare
2. ✅ Verify DNS propagation
3. ✅ Add to Azure Static Web App
4. ⏳ Wait for SSL certificate (10-15 min)
5. ✅ Test both domains
6. 🎯 Configure Google Ads with custom domain
7. 🚀 Launch ad campaigns

## Quick Commands Reference

```powershell
# Check DNS
nslookup www.mackprojekt.com

# Add www domain to Azure
az staticwebapp hostname set --name "AMackProjekt" --resource-group AMackProjekt_group --hostname "www.mackprojekt.com"

# List all configured domains
az staticwebapp show --name "AMackProjekt" --resource-group AMackProjekt_group --query "customDomains"

# Check SSL certificate status
az staticwebapp show --name "AMackProjekt" --resource-group AMackProjekt_group --query "{domains:customDomains}" -o json
```

## Support

If you encounter issues:
- Azure Static Web Apps Docs: https://learn.microsoft.com/azure/static-web-apps/custom-domain
- Cloudflare DNS Docs: https://developers.cloudflare.com/dns/
- Email: ampstudio@mackprojekt.com
