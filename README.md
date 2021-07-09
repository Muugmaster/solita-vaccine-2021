# solita-vaccine-2021

## Built With

- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://expressjs.com/)
- [Reactjs](https://reactjs.org/)
- [Nodejs](https://nodejs.org/en/)
- [SequelizeORM](https://sequelize.org/)

## Setup

### Requirements

- Nodejs
- NPM or Yarn
- PostgreSQL

### Installation

1. Clone this repository:

```
git clone https://github.com/Muugmaster/solita-vaccine-2021.git
```

2. Let's setup `server` first.

- `cd server/` and run cmd `npm install or yarn`
- Edit database config `cd config/` open `config.json`:
  ```json
  // This db gets connected when running in dev mode.
  "development": {
      "username": "postgres",
      "password": "postgres",
      "database": "dev_db", // Remember to great database
      "host": "127.0.0.1",
      "dialect": "postgres",
      "logging": false
  },
  ```
- Create databases manually or run `npm run db:create:dev` that creates `development` database what are specified in `config.json`.

- Seed `development` database with initial data by running: `npm run seed`.

3. Setup `web`, Reactjs app.

- `cd web/` and run cmd `npm install or yarn`

### Usage

1. Start server in development `npm run dev` in `server/`.
2. Start React app in development `npm start` in `web/`.
   - The React app wil start in `http://localhost:3000/`
   - and server on: `http://localhost:4000/`.

## Tests

### Server

1. `cd server/`
2. Setup `test` database in `config/config.json`.
   ```json
   // You need to set up test database to run tests.
   "test": {
       "username": "postgres",
       "password": "postgres",
       "database": "test_db", // Remember to great database
       "host": "127.0.0.1",
       "dialect": "postgres",
       "logging": false
   }
   ```
3. Create that database manually or run `npm run db:create:test`.
4. Seed `test` database with data by running: `npm run seed:test`.
5. Run tests: `npm test`.
