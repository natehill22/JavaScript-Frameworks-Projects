import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  //Applies recommended JavaScript rules globally
  js.configs.recommended,

  //Sets up custom workspace options
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, //Merges both browser and node globals safely
      },
    },
  },
]);