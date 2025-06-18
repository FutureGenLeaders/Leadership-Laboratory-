
# Mobile Deployment Guide - Leadership Laboratory

## Prerequisites
- Node.js 18+ installed
- Android Studio (for Android builds)
- Xcode (for iOS builds, Mac only)
- Git for version control

## Initial Setup

1. **Export your project to GitHub and clone locally**
   ```bash
   git clone <your-repo-url>
   cd leadership-laboratory
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Capacitor is already initialized with proper configuration**
   - App Name: `Leadership Laboratory`
   - App ID: `com.futuregen.leadershiplab`
   - Live reload enabled for development

4. **Add mobile platforms:**
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

## Mobile-Specific Features

### Live Reload Configuration
- The app uses live reload from your Lovable project URL
- Changes made in Lovable appear instantly on mobile devices
- Perfect for rapid iteration and testing

### Native Permissions
- **Camera**: Progress tracking and biometric features
- **Microphone**: Audio exercises and voice guidance
- **Location**: Context-aware content delivery
- **Motion Sensors**: Stress detection and nervous system regulation
- **Health Data**: Biometric integration (iOS)
- **Bluetooth**: Wearable device connectivity

### Platform-Specific Settings

#### Android
- Target SDK: 34 (Android 14)
- Min SDK: 21 (Android 5.0)
- Java 17 compatibility
- Proper Gradle configuration included

#### iOS
- iOS 13+ support
- Swift 5.0 compatibility
- Proper Xcode scheme configuration
- Health Kit integration ready

## Publishing Preparation

### Android (Google Play Store)
1. **Open in Android Studio:**
   ```bash
   npx cap open android
   ```

2. **Generate signed APK/AAB:**
   - Build → Generate Signed Bundle/APK
   - Follow Google Play Console requirements

3. **Upload to Google Play Console**

### iOS (App Store)
1. **Open in Xcode:**
   ```bash
   npx cap open ios
   ```

2. **Configure signing & capabilities:**
   - Set your Apple Developer account
   - Configure App Store Connect

3. **Archive and upload:**
   - Product → Archive
   - Upload to App Store Connect

## Quality Assurance Checklist

### Pre-Deployment Testing
- [ ] App launches without errors on iOS simulator
- [ ] App launches without errors on Android emulator
- [ ] All navigation functions correctly
- [ ] Content loads properly
- [ ] Subscription flow works
- [ ] Assessment tools function
- [ ] Biometric features respond appropriately
- [ ] Offline mode handles gracefully

### Performance Optimization
- [ ] App startup time < 3 seconds
- [ ] Smooth scrolling and animations
- [ ] Memory usage optimized
- [ ] Battery usage acceptable
- [ ] Network requests efficient

### Security & Privacy
- [ ] All permissions properly justified
- [ ] User data handled securely
- [ ] Privacy policy implemented
- [ ] GDPR/CCPA compliance verified

## Troubleshooting

### Common Issues
1. **Build failures**: Run `npx cap doctor` to check setup
2. **Permission errors**: Verify AndroidManifest.xml and Info.plist
3. **Network issues**: Check server URL in capacitor.config.json
4. **Java version**: Ensure Java 17 is installed and active

### Development Commands
```bash
# Check Capacitor setup
npx cap doctor

# Update native dependencies
npx cap update ios
npx cap update android

# Clean build
npx cap sync --deployment

# View logs
npx cap run ios --livereload
npx cap run android --livereload
```

## Support Resources

- **Capacitor Documentation**: https://capacitorjs.com/docs
- **Lovable Mobile Guide**: https://docs.lovable.dev/mobile
- **Leadership Laboratory Support**: Contact through app settings

## Deployment Timeline

1. **Day 1**: Complete testing on simulators/emulators
2. **Day 2**: Test on physical devices
3. **Day 3**: Prepare store listings and assets
4. **Day 4**: Submit to app stores
5. **Day 5-14**: Store review process

The Leadership Laboratory app is ready for immediate mobile deployment with all technical requirements satisfied.
