# scrilio-api

## installation

## Install the node modules dependencies
```bash
npm install
```

## Testing
```bash
npm test
```

## Install the database and tables

### MySQL dependency

You will need to install `mysql 5.6` or greater. See [mysql installer](https://dev.mysql.com/downloads/installer/) instructions for more detail

### Create the database

You will need to initially create the `scrilio_api` database prior to running any database scripts:

```bash
mysql -uroot
CREATE DATABASE scrilio_api;
exit
```

### Running the migration script


```bash
./node_modules/.bin/knex migrate:latest
```

## running the application (in development)
```
npm start
```


## create the admin user
* go to `http://localhost:3000/admin/setup`
* follow the instructions... TBD
