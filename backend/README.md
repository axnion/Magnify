# backend

[![generator-api](https://img.shields.io/badge/built%20with-generator--api-green.svg)](https://github.com/ndelvalle/generator-api)





## dependencies

node 6.3.x or later and mongodb

## developing

run the app:

```bash
JWT_SECRET=keyboardcat npm run dev
```

the JWT_SECRET environment variable can of course be anything, not just keyboardcat

the app runs on `localhost:8080`

## production

_you'll likely be consuming mongodb as a service, so make sure you set the env var to connect to it._

```bash
npm start
```





--------------------------------------------------------------------------------
