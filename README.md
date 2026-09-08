# IG Link Page

A dark, chrome-inspired Instagram bio link page built with React, TypeScript, Vite, and [Fluent UI v9](https://react.fluentui.dev/).

## Requirements

[Node.js](https://nodejs.org/) 18 or later.

## Development

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal, typically `http://localhost:5173`.

## Scripts

```bash
npm run dev       # Start the development server
npm run typecheck # Check TypeScript types
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build locally
```

## Content

Edit the data files to update page content:

- `src/data/profile`: profile image, handle, taglines, and footer note.
- `src/data/products`: product categories and product links.

Each product uses the following fields:

```ts
{
  id: string
  tag?: string
  name: string
  note?: string
  image: string
  link: string
}
```

To add a product, add an object to the relevant category's `items` array. To add a category, add an object with `category` and `items` properties to the `categories` array.

## Localization

The app's UI text (labels, buttons, the intro dialog, footer, etc.) is localized with [i18next](https://www.i18next.com/) and [react-i18next](https://react.i18next.com/). English and Chinese translations live in `src/i18n/locales/`. A language toggle button in the toolbar switches between them, and the choice is remembered in `localStorage`.

Product catalog content (`src/data/`) is authored directly by the site owner and is not translated automatically.

## Theme

The Fluent UI theme is configured in `src/theme.js`. Update the `chromeBrand` color ramp to adjust the page's brand colors.

## Project Structure

```text
src/
  assets/                 Local images
  components/
    Footer.tsx            Footer note
    Header.tsx            Profile header
    ProductCard.tsx       Product link
    ProductSection.tsx    Product category
  data/
    products.js           Product catalog
    profile.js            Profile content
  i18n/
    index.ts              i18next configuration
    locales/               English and Chinese translation files
  App.tsx                 Page composition
  index.css               Global styles
  main.tsx                Application entry point
  theme.js                Fluent UI theme
  types.ts                Shared TypeScript types
```

## Deployment

Run `npm run build` and deploy the generated `dist` directory to a static hosting provider such as [Vercel](https://vercel.com), [Netlify](https://netlify.com), or [GitHub Pages](https://pages.github.com/).
