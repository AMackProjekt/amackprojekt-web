# Google Analytics Setup

## Get Your Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property or select existing one
3. Navigate to **Admin** → **Data Streams**
4. Select your web stream
5. Copy your **Measurement ID** (looks like `G-XXXXXXXXXX`)

## Configure Environment Variable

Add to your `.env.local` file (for local development):
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Add to GitHub Secrets

```bash
gh secret set NEXT_PUBLIC_GA_MEASUREMENT_ID --body "G-XXXXXXXXXX"
```

Or add manually:
1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Value: Your GA4 measurement ID

## Update Azure Static Web App Configuration

Add the environment variable in Azure Portal:
1. Go to Azure Portal → Static Web Apps
2. Select your app
3. Navigate to **Configuration**
4. Add new application setting:
   - Name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Value: `G-XXXXXXXXXX`

## What's Tracked

The Google Analytics implementation automatically tracks:
- Page views
- User sessions
- Geographic location
- Device type and browser
- Traffic sources
- User engagement metrics

## Testing

1. Deploy the app with the GA measurement ID
2. Visit your site
3. Check Google Analytics Real-Time report to see active users
4. Events should appear within 24-48 hours in standard reports

## Privacy Compliance

Google Analytics is GDPR compliant when configured correctly. The implementation:
- Doesn't use cookies for GA4 (uses first-party data)
- Respects user privacy settings
- Can be enhanced with cookie consent if needed
