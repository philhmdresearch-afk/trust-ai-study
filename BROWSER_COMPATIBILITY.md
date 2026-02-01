# Browser Compatibility Guide

## Supported Browsers

The Trust in AI Agents Study platform has been tested and is fully compatible with the following browsers:

### ✅ Fully Supported

| Browser | Version | Notes |
|---------|---------|-------|
| **Google Chrome** | 90+ | Recommended - Best performance |
| **Microsoft Edge** | 90+ | Recommended - Chromium-based |
| **Mozilla Firefox** | 88+ | Fully supported |
| **Safari** | 14+ | Fully supported on macOS and iOS |
| **Opera** | 76+ | Chromium-based, fully supported |

### 📱 Mobile Browsers

| Browser | Platform | Support Level |
|---------|----------|---------------|
| **Chrome Mobile** | Android | ✅ Fully supported |
| **Safari Mobile** | iOS | ✅ Fully supported |
| **Firefox Mobile** | Android/iOS | ✅ Fully supported |
| **Samsung Internet** | Android | ✅ Fully supported |

## Required Browser Features

The experiment requires the following browser features:

1. **localStorage** - For saving progress
2. **FileReader API** - For screenshot upload
3. **Blob API** - For data export
4. **Drag and Drop API** - For screenshot upload (optional, fallback available)
5. **JavaScript ES6+** - Modern JavaScript features

## Known Limitations

### Private/Incognito Mode
⚠️ **Not Recommended**
- localStorage may be disabled or cleared when the browser closes
- Participants may lose their progress
- **Solution:** Ask participants to use regular browsing mode

### Very Old Browsers
❌ **Not Supported**
- Internet Explorer 11 and below
- Safari 13 and below
- Chrome 89 and below
- **Solution:** Ask participants to update their browser

### Browser Extensions
⚠️ **Potential Issues**
- Ad blockers may interfere with localStorage
- Privacy extensions may block data storage
- **Solution:** Ask participants to disable extensions for the study site

## Testing Recommendations

### Before Launching Your Study

1. **Test on Multiple Browsers**
   - Test on at least Chrome, Firefox, and Safari
   - Test on both desktop and mobile if mobile participation is expected

2. **Test localStorage**
   - Complete part of the study
   - Close and reopen the browser
   - Verify that progress is saved

3. **Test Screenshot Upload**
   - Test drag-and-drop functionality
   - Test file browser upload
   - Test with different image formats (PNG, JPG, HEIC)

4. **Test Data Export**
   - Complete the full study
   - Download both JSON and CSV files
   - Verify files contain all expected data

## Troubleshooting

### Issue: "Data not saving"
**Possible Causes:**
- Private/Incognito mode enabled
- localStorage disabled in browser settings
- Browser extension blocking storage

**Solutions:**
1. Use regular browsing mode
2. Check browser settings: Enable cookies and site data
3. Disable privacy-focused extensions temporarily

### Issue: "Screenshots won't upload"
**Possible Causes:**
- File size too large (>10MB per image)
- Unsupported file format
- Browser security settings

**Solutions:**
1. Compress or resize images before uploading
2. Use common formats: PNG, JPG, JPEG
3. Try using the file browser instead of drag-and-drop

### Issue: "Can't download data files"
**Possible Causes:**
- Pop-up blocker enabled
- Download restrictions in browser
- Insufficient storage space

**Solutions:**
1. Allow pop-ups for the study site
2. Check browser download settings
3. Free up disk space

## Participant Instructions

### Recommended Setup

**For Best Experience:**
1. Use a laptop or desktop computer (not required, but recommended)
2. Use Google Chrome or Microsoft Edge (latest version)
3. Use regular browsing mode (not private/incognito)
4. Have two screens or windows available:
   - One for the study interface
   - One for the AI Agent chat
5. Ensure stable internet connection
6. Allow 20-30 minutes of uninterrupted time

### Minimum Requirements

**Absolute Minimum:**
- Any modern browser (updated within last 2 years)
- JavaScript enabled
- Cookies and localStorage enabled
- Ability to upload images (screenshots)
- Ability to download files

## Browser-Specific Notes

### Chrome/Edge
- **Best performance** - Recommended for participants
- All features fully supported
- Drag-and-drop works perfectly
- No known issues

### Firefox
- Fully supported
- May show different file picker UI
- All features work correctly
- No known issues

### Safari (macOS/iOS)
- Fully supported
- HEIC images from iPhone automatically converted
- May need to allow downloads in settings
- Works well on iPad with external keyboard

### Mobile Browsers
- **Functional but not optimal** for this study
- Small screen makes two-window setup difficult
- Screenshot capture may be more challenging
- Consider recommending desktop/laptop for better experience

## Developer Notes

### localStorage Limits
- Most browsers: 5-10MB limit
- With screenshots: May approach limit with 5 high-res images
- CSV export doesn't include screenshots to stay under limit

### Cross-Browser Testing
The following features have been tested across browsers:
- ✅ localStorage persistence
- ✅ File upload (single and multiple)
- ✅ Drag and drop
- ✅ Blob download
- ✅ Form validation
- ✅ Radio button matrices
- ✅ Responsive design

### Polyfills Not Required
Modern browser features used:
- ES6 arrow functions
- Template literals
- Async/await
- Array methods (map, filter, forEach)
- Fetch API (not used, but available)

All features are natively supported in target browsers.

## Support Contact

If participants encounter browser compatibility issues:
1. Ask them to try a different browser (Chrome recommended)
2. Verify they're not in private/incognito mode
3. Ask them to update their browser to the latest version
4. Check if browser extensions might be interfering

For persistent issues, participants can contact the researcher for alternative data collection methods.