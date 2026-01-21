#!/bin/bash

# Script to link react-native-vector-icons fonts to iOS project
# This script adds font files to the Xcode project

echo "Linking react-native-vector-icons fonts to iOS project..."

FONTS_DIR="node_modules/react-native-vector-icons/Fonts"
IOS_FONTS_DIR="ios/TodoApp/Fonts"

# Create Fonts directory in iOS project if it doesn't exist
mkdir -p "$IOS_FONTS_DIR"

# Copy fonts to iOS project
cp "$FONTS_DIR"/*.ttf "$IOS_FONTS_DIR/"

echo "Fonts copied to $IOS_FONTS_DIR"
echo ""
echo "⚠️  IMPORTANT: You need to manually add these fonts to Xcode:"
echo "1. Open ios/TodoApp.xcworkspace in Xcode"
echo "2. Right-click on 'TodoApp' in the Project Navigator"
echo "3. Select 'Add Files to TodoApp...'"
echo "4. Navigate to ios/TodoApp/Fonts"
echo "5. Select all .ttf files"
echo "6. Check 'Copy items if needed' and 'Create groups'"
echo "7. Click 'Add'"
echo ""
echo "Alternatively, fonts should be auto-linked if Info.plist is configured correctly."
