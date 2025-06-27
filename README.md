# Open Palette Dev Tools

> **Dev tool app for real-time Tailwind color palette generation.**  
> Built with Next.js, Tailwind CSS, Prisma, Supabase, and TypeScript.

---

## Technologies

- **Framework:** Next.js (App Router)
- **Backend:** Node.js, PostgreSQL, Prisma ORM
- **Styling:** Tailwind CSS
- **Language:** TypeScript

---

## What is Open Palette?

**Open Palette Dev Tools** is an open-source developer tool designed for frontend engineers working with Tailwind CSS. It helps you generate, visualize, and apply complete color palettes — live — during development.

The app runs locally on port `4000` and connects to any project under active development (e.g., running on port `3000`). It **automatically overrides a separate `tailwindColors.js` file**, which is then imported into `tailwind.config.ts`. This keeps the Tailwind config clean and safe, without risking overwriting core settings.

---

## Modes of Operation

Open Palette Dev Tools works in two distinct modes:

| Mode     | Function                                                                      |
| -------- | ----------------------------------------------------------------------------- |
| `local`  | Saves generated colors directly to a local file using `fs`                    |
| `remote` | Saves palettes to a PostgreSQL database via Prisma (configured with Supabase) |

---

## Color System

- **Color space:** HSL
- **Schema options:**
  - Monochrome
  - Complementary
  - Split-Complementary
  - Triadic
  - Analogous
- **Shading styles (11 tones):**
  - Soft, Contrast, Pastel, Neutral, Earthy, Dark
- **Base Hue:** Selectable via color wheel or text input for precision

---

## Core Features

### Color Wheel

- Central part of the interface
- Interactive representation of the full 0–359 HUE spectrum
- Visualizes base hue + schema-specific hues
- Centered **"Apply"** button to write the palette to file

### Path to File

- Input field to specify the path to `tailwindColors.js`
- _Planned improvement:_ store multiple paths via CRUD (in Settings)

### Tailwind Palettes Viewer

- Visual representation of 1–3 Tailwind-compatible palettes
- Simple, clear structure: `primary`, `secondary`, `tertiary`

### Output & Code Preview

- Fields to name output palettes (e.g., `primary`, `secondary`, `tertiary`)
- Even mono palettes generate 3 sets (ensures compatibility across schemas)
- JS object preview (in Tailwind format), using:
  - Shades: `50, 100, ..., 900, 950`
  - Values: `hsl(...)`
- **Copy to Clipboard** button for quick use

### Terminal

- In-app developer terminal
- Displays logs, actions, and feedback in real-time

### TopBar Controls

- Mode toggle: `local` / `remote`
- Buttons:
  - `Save` – Save palette (to file or DB)
  - `Load` – Load existing palette
  - `Delete` – Delete saved palette
  - `Export` – Save as JSON or copy to clipboard
  - `Import` – Load from JSON or paste as text
  - `Settings` – _planned features_:
    - Unique user ID (demo mode / Vercel)
    - Multiple project path manager (CRUD)

---

## Developer Workflow Integration

Open Palette Dev Tools is built with **real developer workflows** in mind.

### Typical scenario:

1. In your target project, import the generated Tailwind colors file inside your `tailwind.config.js` or `tailwind.config.ts`:

   ```js
   const { tailwindColors } = require('./src/lib/tailwind/tailwindColors')
   ```

   Then destructure the palette into your Tailwind config:

   ```js
   module.exports = {
     theme: {
       extend: {
         colors: {
           ...tailwindColors,
           // other custom colors here (make sure no namespace collisions occur)
         },
       },
     },
   }
   ```

   > This path can vary depending on your project structure — just make sure it matches the output file location defined in Open Palette.

2. Start your main app (e.g. on port `3000`):  
   `npm run dev`

3. Start Open Palette on port `4000`:  
   `npm run dev:4000`

4. Inside Open Palette, paste the **full local file path** to `tailwindColors.js` in the path input field.  
   This is essential — without it, the palette cannot sync with your running app.

5. Adjust your palette settings and click **Apply**.  
   Open Palette will overwrite the file, and Tailwind will apply the new colors via hot reload.

> Whether you use two monitors, split-screen, or tab-switching, Open Palette is fully responsive and includes a dedicated 500px-wide layout for side-by-side use during development.

No manual editing of `tailwind.config` required after initial setup.

---

## Using Remote Mode

To use `app mode: remote` and save palettes to your own Supabase database, you’ll need to provide your own connection credentials.

Create a `.env` file at the project root with the following variables:

```env
NODE_ENV="development"
DATABASE_URL=your_postgres_connection_url
DIRECT_URL=your_postgres_direct_connection_url
```

> Make sure your Supabase project is set up and the URL values are valid.  
> For security and portability, this project does **not** include default database credentials.

---

## Contributing

Open Palette Dev Tools is open to contributions! Whether it's bug fixes, new features, or feedback — all contributions are welcome.

## License

GPL v3 License
