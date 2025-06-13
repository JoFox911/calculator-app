# Calculator App

This project is a modern calculator built with **Vue 3** and **Vite**, showcasing best practices in frontend development.

---

## ✨ Key Features & Technologies Used

In developing this application, I focused on building a **scalable and well-structured frontend architecture**. I implemented a range of modern techniques and tools:

✅ **State Management with Pinia**: Utilized stores with actions, getters, and filtering logic to manage application data in a clean and modular way.

🧱 **Scalable Project Architecture**: Designed with reusable components, a layout system, and a routing structure that supports adding new pages, dynamic views, and route guards.

🎨 **Advanced Theme Switching (Light/Dark/System)**: Implemented via CSS variables and a centralized Pinia store, ensuring a dynamic and user-friendly experience.
    * **Dynamic Theme Resolution**: Automatically detects and applies the system's preferred color scheme (`prefers-color-scheme`).
    * **Persistent User Preference**: Remembers the user's last selected theme (`light`, `dark`, or `system`) using `localStorage`.
    * **Extensible Theme System**: Built to be easily expanded. New themes can be added by simply defining their CSS variables and updating the `availableThemes` constant, automatically reflecting across the application without code changes in the store. This allows for effortless addition of new color schemes.

♿ **Focus on Accessibility & Semantic HTML**: Including proper use of ARIA attributes and keyboard-friendly components.

🚀 **Automated Deployment to GitHub Pages**: Configured continuous deployment using GitHub Actions, dynamic base path configuration via Vite, and branch-based publishing with `peaceiris/actions-gh-pages`.

🔢 **Precise Calculations with `mathjs`**: Integrated the `mathjs` library to perform high-precision computations, avoiding JavaScript's floating-point inaccuracies and ensuring reliable results for all calculations.

🧪 **Unit Testing** used Vitest as test runner and Vue Test Utils to easily mount and interact with Vue components in a testing environment.

This project significantly strengthened my skills in building adaptable, maintainable, and modern Vue applications with a clean design system and an automated deployment pipeline.

---

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
