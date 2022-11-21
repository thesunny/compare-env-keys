# compare-env-keys

A simple script you can use in your package.json to make sure that all the keys in a dotenv file are present in other dotenv files.

The use case for this is to run this script before you deploy a website or web application where you just to make sure your `staging.env` or `production.env` dotenv files have all the environment variables that are present in a `local.env`.

This helps prevent a deploy that fails in `staging` or `production` because an environment variable is missing.

## Install

Install with npm:

```sh
$ npm install --save-dev compare-env-keys
```

Install with yarn:

```sh
$ yarn add --dev arr-diff compare-env-keys
```

## Usage

In your `package.json`, add to scripts:

```json
{
  // ...
  "scripts": {
    "predeploy:staging": "compare-env-keys env/local.env env/staging.env",
    "predeploy:production": "compare-env-keys env/local.env env/production.env",
    "predeploy:all": "compare-env-keys env/local.env env/staging.env env/production.env"
  }
}
```
