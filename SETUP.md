# Quick Setup Guide

## Initial Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **iOS Setup (macOS only):**
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Start Metro Bundler:**
   ```bash
   npm start
   ```

4. **Run the app:**
   - iOS: `npm run ios`
   - Android: `npm run android`

## Important Notes

### React Native Paper Icons
React Native Paper uses Material Community Icons by default. All icons used in this app are from the Material Community Icons set and should work out of the box.

### Redux Persist
The app automatically saves todos to AsyncStorage. No additional configuration needed.

### API Integration
The app fetches todos from JSONPlaceholder API. Make sure you have internet connectivity when testing the "Fetch from API" feature.

## Project Structure Overview

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── slices/         # Redux slices (state management)
├── store/          # Redux store configuration
├── types/          # TypeScript type definitions
└── utils/          # Utility functions and themes
```

## Key Features Implemented

✅ CRUD Operations (Create, Read, Update, Delete)
✅ Local Storage with Redux Persist
✅ Search/Filter functionality
✅ Sorting (by name, date, time)
✅ API Integration with Axios
✅ Rich UI with React Native Paper
✅ TypeScript for type safety
✅ iOS and Android support

## Troubleshooting

If you encounter icon issues:
- React Native Paper handles icons automatically
- Icons are from Material Community Icons library
- No manual configuration needed

If you encounter build issues:
- Clean build folders
- Delete node_modules and reinstall
- For iOS: Run `pod install` again
- For Android: Run `./gradlew clean` in android folder
