# DNS Records for mackprojekt.com

## 📧 Email Domain Verification (Azure Communication Services)

Add these DNS records to your domain registrar for **mackprojekt.com**:

### 1. Domain Verification TXT Record
**Purpose:** Verifies you own the domain

- **Type:** `TXT`
- **Host/Name:** `@` (or root domain)
- **Value:** `ms-domain-verification=2f6a0a2d-d9ee-49bc-b0cb-85072689e99a`
- **TTL:** `3600` (1 hour)

### 2. SPF TXT Record
**Purpose:** Prevents email spoofing, authorizes Azure to send emails

- **Type:** `TXT`
- **Host/Name:** `@` (or root domain)
- **Value:** `v=spf1 include:spf.protection.outlook.com -all`
- **TTL:** `3600` (1 hour)

### 3. DKIM CNAME Record (Selector 1)
**Purpose:** Email authentication and integrity

- **Type:** `CNAME`
- **Host/Name:** `selector1-azurecomm-prod-net._domainkey`
- **Value:** `selector1-azurecomm-prod-net._domainkey.azurecomm.net`
- **TTL:** `3600` (1 hour)

### 4. DKIM CNAME Record (Selector 2)
**Purpose:** Email authentication and integrity (backup selector)

- **Type:** `CNAME`
- **Host/Name:** `selector2-azurecomm-prod-net._domainkey`
- **Value:** `selector2-azurecomm-prod-net._domainkey.azurecomm.net`
- **TTL:** `3600` (1 hour)

---

## 🌐 Website DNS Records (Existing)

### Azure Static Web App
- **Type:** `CNAME`
- **Host/Name:** `www` (or `@` for root)
- **Value:** `calm-sand-0e9f2e010.6.azurestaticapps.net`

### Azure Static Web App (IPv4)
- **Type:** `A`
- **Host/Name:** `@`
- **Value:** `20.3.34.31`

---

## ⏱️ DNS Propagation

After adding these records:
- **Wait 15-30 minutes** for DNS propagation
- Some providers may take up to 24-48 hours
- Check propagation: https://dnschecker.org/

---

## ✅ Verification Commands

### Check DNS Records
```powershell
# Check TXT records
nslookup -type=TXT mackprojekt.com

# Check CNAME records
nslookup -type=CNAME selector1-azurecomm-prod-net._domainkey.mackprojekt.com
```

### Verify Domain in Azure
```powershell
# After DNS records are live, run this:
az communication email domain initiate-verification `
  --domain-name mackprojekt.com `
  --email-service-name mackprojekt-email `
  --resource-group mackprojekt-rg `
  --verification-type Domain

# Verify DKIM
az communication email domain initiate-verification `
  --domain-name mackprojekt.com `
  --email-service-name mackprojekt-email `
  --resource-group mackprojekt-rg `
  --verification-type DKIM

az communication email domain initiate-verification `
  --domain-name mackprojekt.com `
  --email-service-name mackprojekt-email `
  --resource-group mackprojekt-rg `
  --verification-type DKIM2

# Verify SPF
az communication email domain initiate-verification `
  --domain-name mackprojekt.com `
  --email-service-name mackprojekt-email `
  --resource-group mackprojekt-rg `
  --verification-type SPF
```

### Check Verification Status
```powershell
az communication email domain show `
  --domain-name mackprojekt.com `
  --email-service-name mackprojekt-email `
  --resource-group mackprojekt-rg `
  --query "verificationStates"
```

---

## 📨 After Verification Complete

### Get Connection String
```powershell
az communication list-key `
  --name mackprojekt-email `
  --resource-group mackprojekt-rg
```

### Update Environment Variables
Add to `api/.env`:
```env
COMMUNICATION_SERVICES_CONNECTION_STRING=endpoint=https://...
SENDER_EMAIL=ampstudio@mackprojekt.com
```

Add to GitHub Secrets:
```powershell
gh secret set COMMUNICATION_SERVICES_CONNECTION_STRING --body "your-connection-string"
gh secret set SENDER_EMAIL --body "ampstudio@mackprojekt.com"
```

### Test Email Sending
```powershell
az communication email send `
  --sender "DoNotReply@mackprojekt.com" `
  --subject "Test Email" `
  --text "Testing Azure Communication Services" `
  --to "your-email@example.com" `
  --connection-string "your-connection-string"
```

---

## 🚨 Common Issues

**DNS not propagating:**
- Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
- Use different DNS checker tools
- Contact your domain registrar support

**Verification failing:**
- Ensure records are exactly as shown (no extra spaces)
- Check TTL is set correctly
- Confirm @ symbol maps to root domain in your registrar's interface

**Email sending fails:**
- Verify all 4 DNS records are validated
- Check domain verification status is "Verified"
- Ensure sender email uses verified domain (@mackprojekt.com)

---

## 📝 Notes

- **Sender Email:** `ampstudio@mackprojekt.com`
- **Domain:** `mackprojekt.com`
- **Azure Resource:** `mackprojekt-email`
- **Resource Group:** `mackprojekt-rg`
- **Verification Code:** `2f6a0a2d-d9ee-49bc-b0cb-85072689e99a`

Created: January 16, 2026
