module.exports = {
  extends: ['../../packages/config/eslint/index.cjs'],
  parserOptions: {
    project: ['./tsconfig.json']
  },
  ignorePatterns: ['.nuxt', 'dist', '.output']
};
