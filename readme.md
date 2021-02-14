npm init -y
npm i express --save
npm i mongoose --save
npm i --save -D nodemon

```js
  "scripts": {
    "start": "nodemon index.js"
  },
```

npm i joi --save
npm i --save lodash
npm i jsonwebtoken
npm i config

- For this error type instead of nodemon use node index.js

```js
FATAL ERROR: jwtPrivateKey is not defined.
[nodemon] app crashed - waiting for file changes before starting...
```

-Lets set the env variable

```js
set newAuth_jwtPrivateKey=mySecureKey
node index.js
```

npm i dotenv

1. if we dont have a toke
2. http://localhost:3000/api/genres/60294e60bb0193133877b857

3. we will login
   -http://localhost:3000/api/auth
   {
   "email":"selinc@gmail.com",
   "password":"123456"
   }

```

```

1. Delete genres
2. http://localhost:3000/api/genres/60294e60bb0193133877b857
3. x-auth-token --> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDI5Mzk1ZGIwMDEyODQ3MjQ3MmQwMjAiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTMzMTk5ODN9.cLGkuCewRPZC2DGFoR5L5X0Iz2zzL1dMgY8AdROORFo
