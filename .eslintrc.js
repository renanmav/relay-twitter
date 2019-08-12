module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    'standard',
    '@react-native-community',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
