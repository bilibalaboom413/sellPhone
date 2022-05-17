## Installation

### Backend

```bash
$ cd webdev-13/server
$ npm ci
```

### Frontend

```bash
$ cd webdev-13/client
$ npm ci
```

> [Why `npm ci` over `npm install`](https://stackoverflow.com/questions/48524417/should-the-package-lock-json-file-be-added-to-gitignore)

## Run

To run both the back-end server and React app front-end in one command:

```bash
$ cd server
$ npm run dev
```

### Back-end Server

```bash
$ cd server
```

Start development server `nodemon`:

```bash
$ npm run dev
```

Start actual server `node`:

```bash
$ npm start
```

### Front-end React App

```bash
$ cd client
$ npm start
```

## Environment Variables

Edit `.env` file to add relevant variables.
E.p.

```
MONGO_URL=<Database URL>
SESSION_SECRET=<Secret String>
```

You can then access those variables after `require("dotenv").config()` by calling `process.env.<VARIABLE>`.

## Database

Our database is hosted on cloud and you can access it through URL:

```
mongodb+srv://admin:V6oygYYf0XjD4JOt@cluster0.qilqs.mongodb.net/comp5347
```

> You can simply append this link after `MONGO_URL` to allow the server to connect to it or you can use your own URL either to local/remote MongoDB server.

### Schema

We didn't employ a significant change to the designated schema. We only added a new collection `link` alongside the orignal `userlist` and `phonelist` to store activation and password reset pending requests.
![Schema](doc/schema.png)

#### Link

```javascript
{
  "_id": {    "$oid": "628342531396d876fe6f737c"  },
  "email": "lkon0010@uni.sydney.edu.au",
  "type": "register", // Can be either 'register' or 'reset'
  "password": "e10adc3949ba59abbe56e057f20f883e",
  "firstname": "Liang",
  "lastname": "Kong"
}
```

### Indexes

We also utilised indexes to help speed up **best seller** and **sold out soon** queries.
![Indexes](doc/indexes.png)

## Email SMTP Server

We used `emailjs`'s SMTP server to connect to USYD's SMTP server to send out our activation and password reset emails. Therefore, for this service to be available. You are **requested to connect to [USYD's VPN](vpn.sydney.edu.au)** before running the server.

## Prettier

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Run below command **before creating any pull requests!**

```bash
$ cd server
$ npm run prettier
```
