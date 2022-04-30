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
$ cd client
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
```

You can then access those variables after `require("dotenv").config()` by calling `process.env.<VARIABLE>`.

## Prettier

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Run below command **before creating any pull requests!**

```bash
$ cd server
$ npm run prettier
```
