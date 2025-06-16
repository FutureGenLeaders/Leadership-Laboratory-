
# Mobile Deployment Guide

## Prerequisites
- Node.js installed
- Android Studio (for Android)
- Xcode (for iOS, Mac only)

## Initial Setup

1. **Export your project to GitHub and clone locally**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Initialize Capacitor (if not already done):**
   ```bash
   npx cap init
   ```
   - App Name: `Leadership Laboratory`
   - App ID: `app.lovable.49d84abc4329467aa355de4b6c94d90c`

4. **Add platforms:**
   ```bash
   npx cap add ios
   npx cap add android
   ```

## Development Workflow

1. **Build the web app:**
   ```bash
   npm run build
   ```

2. **Sync with native platforms:**
   ```bash
   npx cap sync
   ```

3. **Run on device/emulator:**
   ```bash
   # For iOS (Mac only)
   npx cap run ios
   
   # For Android
   npx cap run android
   ```

## Live Reload During Development

The app is configured to use live reload from your Lovable project URL. This means:
- Changes made in Lovable will appear instantly on your mobile device
- No need to rebuild for UI/content changes
- Perfect for rapid iteration

## Configuration Files

- `capacitor.config.json` - Main Capacitor configuration
- `ios/App/App/Info.plist` - iOS-specific settings
- `android/app/src/main/AndroidManifest.xml` - Android permissions and settings

## Publishing

### iOS App Store
1. Open project in Xcode: `npx cap open ios`
2. Configure signing & capabilities
3. Archive and upload to App Store Connect

### Google Play Store
1. Open project in Android Studio: `npx cap open android`
2. Generate signed APK/AAB
3. Upload to Google Play Console

## Troubleshooting

- Ensure all permissions are properly configured
- Check device/emulator compatibility
- Verify network connectivity for live reload
- Run `npx cap doctor` to check setup

For detailed Capacitor documentation: https://capacitorjs.com/docs
