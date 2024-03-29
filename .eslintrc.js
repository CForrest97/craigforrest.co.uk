module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true,
    browser: true,
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "max-len": ["off"],
    "arrow-body-style": ["error", "as-needed"],
    "@typescript-eslint/no-explicit-any": "off",
    "import/extensions": ["error", "never"],
    "import/prefer-default-export": "off",
    "no-useless-constructor": "off",
    "no-unused-vars": "off",
    "no-empty-function": "off",
    semi: "off",
    "@typescript-eslint/semi": ["error"],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "class-methods-use-this": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  globals: {
    localStorage: true,
    document: true,
  },
};
