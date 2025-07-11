
## Project Structure

```
root/
  src/
    code.ts           # Main plugin code (TypeScript)
    models.ts         # TypeScript models/types
  public/
    manifest-base.json     # Figma plugin manifest
  ui.html           # Plugin UI (must be at project root)
  dist/
    code.js         # Bundled plugin code (output)
    manifest.json   # Copied manifest for distribution
    ui.html           # Copied  UI
  package.json      # Project configuration and scripts
  tsconfig.json     # TypeScript configuration
  README.md         # This file
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Edit your plugin code:**
   - Write your main logic in `code.ts`.
   - UI logic and HTML go in `ui.html`.

## Build

To bundle and prepare your plugin for Figma:

```bash
npm run build
```

This will:
- Bundle and minify `code.ts` into `dist/code.js` using esbuild.
- Copy `manifest.json` to `dist/manifest.json`.
- Copy the `ui.html` folder to `dist/ui.html`.

## Using the Plugin in Figma

1. Open Figma and go to **Menu → Plugins → Development → Import Plugin from Manifest**
2. Select the `manifest.json` file from the `dist` folder.
3. Run your plugin from the Figma plugins menu.