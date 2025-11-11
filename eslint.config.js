import js from "@eslint/js"
import tseslint from "typescript-eslint"
import prettier from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"

export default [
  // 🔹 Configurações recomendadas básicas do ESLint
  js.configs.recommended,

  // 🔹 Configurações recomendadas do TypeScript
  ...tseslint.configs.recommended,

  // 🔹 Desativa regras que conflitam com o Prettier
  prettier,

  {
    // Ignora diretórios desnecessários
    ignores: ["node_modules", "dist", "build"],

    languageOptions: {
      parser: tseslint.parser, // Substitui o "parser": "@typescript-eslint/parser"
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    // 🔌 Plugins (equivalente ao "plugins": ["@typescript-eslint", "prettier"])
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: prettierPlugin,
    },

    // 🧠 Regras (equivalente à seção "rules")
    rules: {
      "no-console": "warn",
      "prettier/prettier": "error",
    },
  },
]
