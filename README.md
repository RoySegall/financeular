# Financeular 🤑

Welcome to `financeular`. The project aims for tracking the incomes and 
expenses for everyone. The project is open source, you can take it and do what 
ever you want.

## Why to use this project 🤷‍♂️🙄 😸

A lot of solutions which already exists need your bank account details, at least
in Israel (where I live in), and it's a matter of time until one of them will be 
hacked. You don't want to take this risk. 

Other solutions which are might only track your receipts; Still, that data can 
reach people you don't want to and provide sensitive data about you.

Financeular deals with those issues in two ways:
  1. Host it your self - you can host the project your self. It's already 
  dockerized, so you just need to hit a couple of commands... and Bam! you got 
  ready to use. 
  2. You can use financular. Unlike to other services we store all the data. By
  managing the income and expenses in a predefined excel sheet you can upload
  a single file and get insights about you finance behaviour. One you are done,
  delete the file. It's would be like you never been here.
  
## Using docker 🐳

### For local development
Just hit in the terminal:
```bash
docker-compose up -d
````  

The next is to create a user

```bash
docker-compose exec backend php artisan financeular:user-create
```

Once you created the user go to `http://localhost:2000` and you ready to go.

### For production development
You'll need to create a file with a different client ID and secret.
TBD more about this section.

## YOLO - self hosting 🤘

### Backend 
First, go the `backend` folder. This is a simple laravel application. Read the
documentation on how to set it up with apache/nginx.

TBD more on this one.

### Frontend
After you created the backend, you'll need to create a custom `.env` file - TBD.

## Testing 🧪

There are several ways to test.

## Backend

For linting run:
```bash
composer run lint
```

If the lint has failed you can run:
```bash
composer run lint-fix
```

We have `PHPUnit` which cover all the aspects of the system:
```bash
php artisan test
```

## frontend

For linting run:
```bash
npm run lint
```

We have `Jest` which are unit test for components:
```bash
npm run test
```

This is just a unit test and mock most the data the components need. For more 
elaborate test we have E2E. The E2E is using cypress and you need to go to the 
`cypress` folder and run:

```bash
npm i
npm run test
```

This will install the dev data and will run only if you have financeular running
in the background. That's it.
