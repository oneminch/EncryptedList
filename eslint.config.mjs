import { defineConfig, globalIgnores } from "eslint/config";
import unusedImports from "eslint-plugin-unused-imports";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
    globalIgnores([
        ".next/**",
        "node_modules/**"
    ]),
    {
        extends: compat.extends("next/core-web-vitals"),

        plugins: {
            "unused-imports": unusedImports,
        },

        rules: {
            "no-unused-vars": "warn",
            "@next/next/no-img-element": "off",
            "unused-imports/no-unused-imports": "warn",

            "unused-imports/no-unused-vars": ["warn", {
                vars: "all",
                varsIgnorePattern: "^_",
                args: "after-used",
                argsIgnorePattern: "^_",
            }],
        },
    }
]);
