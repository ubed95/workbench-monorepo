export default {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
  ],
  '*.{json,css,md,scss,html,yml,yaml}': [
    'prettier --write',
  ],
}
