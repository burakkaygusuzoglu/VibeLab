# Sound Files for Quiz Arena

This directory should contain the following sound files for the Quiz Arena feature:

## Required Sound Files:

1. **click.mp3** - Button click/tap sound (short, subtle)
2. **correct.mp3** - Correct answer sound (positive, rewarding)
3. **wrong.mp3** - Wrong answer sound (gentle negative feedback)
4. **start.mp3** - Quiz start sound (energetic, motivating)
5. **end.mp3** - Quiz end/completion sound (celebratory)

## Sound Requirements:

- **Format**: MP3 (recommended for cross-platform compatibility)
- **Duration**: 0.2-1.5 seconds (keep them short)
- **Volume**: Normalized to prevent clipping
- **Quality**: 128-192 kbps (balance between quality and file size)

## Sound Sources:

You can obtain these sounds from:
- **Freesound.org** (Creative Commons licenses)
- **Zapsplat.com** (Free sound effects)
- **Mixkit.co** (Royalty-free sound effects)
- **BBC Sound Effects** (Free for personal use)
- Create your own using audio editing software

## Placeholder Behavior:

Until real sound files are added:
- The app will function normally WITHOUT sounds
- No errors will be thrown
- soundManager.ts gracefully handles missing files
- Users can still toggle sound settings in Settings screen

## Adding Sound Files:

1. Download/create the 5 required sound files
2. Place them in this directory (assets/sounds/)
3. Ensure file names match exactly: click.mp3, correct.mp3, wrong.mp3, start.mp3, end.mp3
4. Reload the app (sound manager will auto-load them)

## Testing:

After adding sound files:
1. Enable "Sound Effects" in Settings
2. Adjust volume to 70-100%
3. Play Quiz Arena to test all sounds:
   - **click.mp3**: Plays on button presses
   - **correct.mp3**: Plays on correct answers (green animation)
   - **wrong.mp3**: Plays on wrong answers (red shake animation)
   - **start.mp3**: Plays when quiz begins
   - **end.mp3**: Plays on quiz completion

## Sound Integration:

Sounds are managed by:
- **src/utils/soundManager.ts** - Sound loading, playing, volume control
- **src/context/SettingsContext.tsx** - Sound settings persistence
- **src/screens/QuizClassicScreen.tsx** - Sound event triggers
- **src/screens/SettingsScreen.tsx** - Sound settings UI

All sounds respect the user's sound settings (enabled/disabled, volume level).
