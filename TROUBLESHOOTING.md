# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### ❌ App Won't Start

**Issue**: Terminal shows errors when running `npx expo start`

**Solutions**:
```bash
# 1. Clear cache
npx expo start -c

# 2. Reinstall node_modules
rm -rf node_modules
npm install

# 3. Clear Metro bundler cache
npx expo start --clear
```

---

### ❌ QR Code Won't Scan

**Issue**: Expo Go can't scan the QR code

**Solutions**:
1. Make sure phone and computer are on **same WiFi network**
2. Try typing the URL manually in Expo Go
3. Use the tunnel option: `npx expo start --tunnel`
4. Check firewall settings

---

### ❌ TypeScript Errors

**Issue**: Red underlines in VS Code

**Solutions**:
```bash
# Restart TypeScript server in VS Code
# Press: Ctrl+Shift+P (Windows) or Cmd+Shift+P (Mac)
# Type: "TypeScript: Restart TS Server"

# Or reload VS Code window
# Press: Ctrl+Shift+P
# Type: "Developer: Reload Window"
```

---

### ❌ Cards Not Loading

**Issue**: "No cards match your filters" message

**Solution**:
1. Go to **Settings tab**
2. Make sure at least one **category** is enabled
3. Make sure at least one **type** is enabled
4. Check **intensity range** is not empty
5. Or tap **Reset to Defaults**

---

### ❌ Favorites Not Saving

**Issue**: Favorites disappear after closing app

**Solution**:
- This shouldn't happen with AsyncStorage
- If it does, check console for errors
- Try clearing app data and reopening

---

### ❌ Quiz Not Starting

**Issue**: Can't start quiz

**Solution**:
1. Make sure you selected a **mode** (Chill/Versus/Team)
2. Make sure you selected a **category**
3. Both must be selected before "Start Quiz" button activates

---

### ❌ Theme Not Changing

**Issue**: App stays in light/dark mode

**Solution**:
1. Go to **Settings**
2. Select **Auto** to follow system theme
3. Or select **Light** or **Dark** manually
4. Settings persist via AsyncStorage

---

### ❌ Navigation Issues

**Issue**: Can't navigate between screens

**Solution**:
- Make sure React Navigation is properly installed
- Check terminal for warnings
- Restart the app: `npx expo start -c`

---

### ❌ Performance Issues

**Issue**: App is slow or laggy

**Solutions**:
```bash
# 1. Enable development mode
npx expo start

# 2. Build for production (faster)
npx expo build

# 3. Check if running in debug mode
# Shake device → Disable "Debug Remote JS"
```

---

### ❌ Module Not Found Errors

**Issue**: `Cannot find module '@react-navigation/...'`

**Solution**:
```bash
# Reinstall all dependencies
npm install

# Or install missing package specifically
npx expo install @react-navigation/native
```

---

### ❌ AsyncStorage Warnings

**Issue**: Deprecation warnings about AsyncStorage

**Solution**:
- We're using `@react-native-async-storage/async-storage`
- This is the correct, maintained version
- Warnings are safe to ignore

---

### ❌ Gesture Handler Issues

**Issue**: Swipes or touches not working

**Solution**:
```bash
# Make sure gesture handler is imported in App.tsx
import 'react-native-gesture-handler';

# Reinstall if needed
npx expo install react-native-gesture-handler
```

---

## 🔍 Debugging Tips

### Check Console Logs
```bash
# In terminal where expo is running
# All console.log() outputs will appear here
```

### React DevTools
```bash
# Press 'j' in Expo terminal to open debugger
j
```

### Check Errors
```bash
# Look for red error screens in the app
# Check terminal for error messages
# Look for yellow warning boxes
```

---

## 🚨 Emergency Reset

If nothing works, try complete reset:

```bash
# 1. Stop expo server (Ctrl+C)

# 2. Clear everything
rm -rf node_modules
rm -rf .expo
rm package-lock.json

# 3. Reinstall
npm install

# 4. Start fresh
npx expo start -c
```

---

## 💡 Pro Tips

### Development Shortcuts
```bash
r  # Reload app
m  # Toggle menu
j  # Open debugger
i  # Run on iOS simulator
a  # Run on Android emulator
w  # Run on web
?  # Show all commands
```

### Better Development Experience
1. **Enable Hot Reload**: Changes auto-update
2. **Use Fast Refresh**: Preserves component state
3. **Console Logs**: Use `console.log()` for debugging
4. **React DevTools**: Install Chrome extension

---

## 📱 Device-Specific Issues

### iOS
- Make sure you're using **Camera app** to scan (not Expo Go scanner)
- Allow camera permissions
- Update to latest Expo Go from App Store

### Android
- Use **Expo Go app** to scan QR code
- Enable camera permissions
- Make sure phone is on same WiFi
- Update Expo Go from Play Store

---

## 🌐 Network Issues

### Firewall Blocking
```bash
# Allow Metro bundler through firewall
# Port: 8081
# Protocol: TCP
```

### Different Networks
```bash
# Use tunnel mode (slower but works on different networks)
npx expo start --tunnel
```

### Localhost Issues
```bash
# Use LAN instead of localhost
npx expo start --lan
```

---

## 📞 Getting Help

If issues persist:

1. **Check Expo Docs**: https://docs.expo.dev
2. **React Native Docs**: https://reactnative.dev
3. **Stack Overflow**: Tag `expo` and `react-native`
4. **Expo Discord**: Join community
5. **GitHub Issues**: Check React Navigation issues

---

## ✅ Health Check

Run this checklist if something seems wrong:

- [ ] Node.js version 18+ installed?
- [ ] `npm install` completed successfully?
- [ ] Expo started without errors?
- [ ] Phone and computer on same WiFi?
- [ ] Expo Go app installed and updated?
- [ ] All dependencies in package.json?
- [ ] No TypeScript errors in VS Code?
- [ ] Terminal shows QR code?

---

## 🎯 Common Questions

**Q: Why are there only 24 quiz questions?**
A: This is the initial set. You can easily add more in `src/data/cards.ts`

**Q: Can I add my own cards?**
A: Yes! Edit `src/data/cards.ts` and add to `BASE_GAME_PROMPTS` array

**Q: How do I change the theme colors?**
A: Edit `src/theme/colors.ts` to customize the color palette

**Q: Can I remove categories?**
A: Yes, but you'll need to update the type definitions in `src/data/cards.ts`

**Q: How do I build for production?**
A: Run `npx expo build` or use EAS Build: `eas build`

---

**Still having issues?**

Double-check:
1. All files are saved
2. No TypeScript errors
3. Terminal shows "Metro waiting on..."
4. QR code is visible
5. Expo Go is latest version

**If all else fails, try the Emergency Reset above!** 🔧
