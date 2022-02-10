module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-empty-pattern': 'off',
    'vue/no-unused-components': 'off',
    'no-unused-vars': 'off',
    'vue/no-parsing-error': 'off',
    'no-empty': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
