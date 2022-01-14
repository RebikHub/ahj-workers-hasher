{
  "extends": "airbnb-base",
  "env": {
     "es2020": true,
     "browser": true,
     "jest": true,
     "worker": true
  },
  "rules": {
    "no-restricted-syntax": [
      "error",
      "LabeledStatement",
      "WithStatement"
    ]
  }
}
